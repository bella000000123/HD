<template>
  <div class="log">
    <div class="wrapper" v-if="dialogVisible">
      <div class="dialog">
        <span class="close" @click="close"></span>

        <div class="dialog-head">
          <img :src="logo.image" alt="LOGO" class="logo" />
        </div>
        <div class="inputs">
          <div class="reg" v-if="show_reg">
            <el-input
              placeholder="请输入5-8位字母或数字的用户名"
              clearable
              v-model.trim="reg.username"
              maxlength="8"
            >
              <i slot="prefix" class="el-input__icon user"></i>
            </el-input>
            <el-input
              placeholder="请输入6-10位字母或数字的密码"
              clearable
              show-password
              v-model.trim="reg.password"
              maxlength="10"
            >
              <i slot="prefix" class="el-input__icon pwd"></i>
            </el-input>
            <el-input
              placeholder="请再次输入密码"
              clearable
              show-password
              v-model.trim="reg.repwd"
              maxlength="10"
            >
              <i slot="prefix" class="el-input__icon pwd"></i>
            </el-input>
            <el-input placeholder="请输入手机号" clearable v-model.trim="reg.phone" maxlength="11">
              <i slot="prefix" class="el-input__icon phone"></i>
            </el-input>
            <div class="codes">
              <el-input placeholder="请输入验证码" clearable v-model.trim="reg.code" maxlength="6">
                <i slot="prefix" class="el-input__icon code"></i>
              </el-input>
              <div class="get-code">
                <span v-show="showCode" @click="getPhoneCode">获取验证码</span>
                <span v-show="!showCode" class="count">{{count}}S</span>
              </div>
            </div>
          </div>
          <div class="login" v-if="show_user && !show_phone">
            <el-input
              placeholder="请输入5-8位字母或数字的用户名"
              clearable
              v-model.trim="pwdlog.username"
              maxlength="8"
            >
              <i slot="prefix" class="el-input__icon user"></i>
            </el-input>
            <el-input
              placeholder="请输入6-10位字母或数字的密码"
              clearable
              show-password
              v-model.trim="pwdlog.password"
              maxlength="10"
            >
              <i slot="prefix" class="el-input__icon pwd"></i>
            </el-input>
          </div>
          <div v-if="!show_user && show_phone" maxlength="11">
            <el-input placeholder="请输入手机号" clearable v-model.trim="codelog.mobile" maxlength="11">
              <i slot="prefix" class="el-input__icon phone"></i>
            </el-input>
            <div class="codes" maxlength="6">
              <el-input placeholder="请输入验证码" clearable v-model.trim="codelog.code" maxlength="6">
                <i slot="prefix" class="el-input__icon code"></i>
              </el-input>
              <div class="get-code">
                <span v-show="showCode" @click="getPhoneCode">获取验证码</span>
                <span v-show="!showCode" class="count">{{count}}S</span>
              </div>
            </div>
          </div>

          <div class="btn" v-if="show_reg" @click="register">注册</div>
          <div class="btn" v-else @click="login(false)">登录</div>
          <!-- <div class="btn">{{ show_reg ? '注册' : '登录' }}</div> -->
          <div class="tip" v-if="show_reg">
            已有账号？
            <span @click="user_reg('show_user', 'show_reg')">请登录</span>
          </div>
          <div class="tip clearfix" v-if="show_user || show_phone">
            <span @click="user_reg('show_reg', 'show_user')" class="fl">立即注册</span>
            <span @click="user_phone()" class="fr">{{ !show_phone ? '手机号登录' : '密码登录' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      show_phone: false,
      logo: '',
      showCode: true,
      count: 0,
      timer: null,
      //   dialogVisible: true,
      reg: {
        username: '',
        password: '',
        repwd: '',
        phone: '',
        code: ''
      },
      pwdlog: {
        username: '',
        password: ''
      },
      codelog: {
        mobile: '',
        code: ''
      }
    };
  },
  props: ['show_reg', 'show_user', 'dialogVisible'],
  methods: {
    close() {
      this.show_phone = false;
      this.$emit('close');
    },
    user_phone() {
      if (this.show_phone) {
        this.show_phone = false;
        this.user_reg('show_user', '');
        this.codelog = {
          mobile: '',
          code: ''
        };
      } else {
        this.show_phone = true;
        this.user_reg('', 'show_user');
        this.pwdlog = {
          username: '',
          password: ''
        };
      }
    },
    user_reg(param1, param2) {
      if (param1 == 'show_reg') {
        this.show_phone = false;
      }
      this.$emit('user_reg', param1, param2);
    },
    async getBanner() {
      let res = await this.$api.getBanner();
      this.logo = res.logo[0];
    },
    getCode() {
      if (!this.timer) {
        let TIME_COUNT = 60;
        this.count = TIME_COUNT;
        this.showCode = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.showCode = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    async getPhoneCode() {
      //注册验证手机号是否重复
      if (this.show_reg) {
        if (!this.reg.phone && this.showCode) {
          this.$message.error('请输入手机号');
          return;
        }
        if (!this.checkPhone()) {
          return;
        }
      } else {
        if (!this.codelog.mobile && this.showCode) {
          this.$message.error('请输入手机号');
          return;
        }
      }

      let res = await this.$api.getCode({ phone: this.show_reg ? this.reg.phone : this.codelog.mobile });
      if (res.code == 1) {
        this.getCode();
      }
    },
    async checkPhone() {
      if (!this.reg.phone && this.showCode) {
        this.$message.error('请输入手机号');
        return;
      }
      let res = await this.$api.checkPhone({ phone: this.show_reg ? this.reg.phone : this.codelog.mobile });
      return res.code == 1 ? true : false;
    },

    validReg() {
      if (!this.reg.username) {
        this.$message.error('请输入用户名');
        return false;
      }
      if (!this.reg.password) {
        this.$message.error('请输入密码');
        return false;
      }
      if (!this.reg.repwd) {
        this.$message.error('请输入重复密码');
        return false;
      }
      if (!this.reg.phone) {
        this.$message.error('请输入电话号码');
        return false;
      }
      if (!this.reg.code) {
        this.$message.error('请输入验证码');
        return false;
      }
      return true;
    },
    validPwdlog() {
      if (!this.pwdlog.username) {
        this.$message.error('请输入用户名');
        return false;
      }
      if (!this.pwdlog.password) {
        this.$message.error('请输入密码');
        return false;
      }
      return true;
    },
    validCodelog() {
      if (!this.codelog.mobile) {
        this.$message.error('请输入手机号');
        return false;
      }
      if (!this.codelog.code) {
        this.$message.error('请输入验证码');
        return false;
      }
      return true;
    },
    async register() {
      if (!this.validReg()) {
        return;
      }

      let res = await this.$api.register(this.reg);
      if (res.code == 1) {
        this.login(true);
      }
    },
    async login(isreg) {
      let res = '';
      if (isreg) {
        res = await this.$api.passwordLogin({ username: this.reg.username, password: this.reg.password });
      } else {
        if (this.show_user && !this.show_phone) {
          if (!this.validPwdlog()) {
            return;
          }
          res = await this.$api.passwordLogin(this.pwdlog);
        } else {
          if (!this.validCodelog()) {
            return;
          }
          res = await this.$api.codeLogin({ username: this.codelog.mobile, code: this.codelog.code });
        }
      }

      if (res.code == 1) {
        this.close();
        this.$store.commit('setLogin', true);
        this.getUserInfo();
      }
    },
    async getUserInfo() {
      let res = await this.$api.getUserInfo();
      this.$store.commit('setUserinfo', res);
    }
  },
  mounted() {
    this.getBanner();
  }
};
</script>
<style scoped lang="stylus">
.log {
  .wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.6);
  }
  .dialog {
    padding: 50px 0;
    position: relative;
    margin: 15vh auto 50px;
    border-radius: 2px;
    // box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    width: 450px;
    background: #fff;
    font-size: 14px;
    .dialog-head {
      margin-bottom: 30px;
      img {
        display: block;
        margin: 0 auto;
        width: 70px;
      }
    }
    .close {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 22px;
      height: 22px;
      background: url('../assets/login/close.png') no-repeat;
      cursor: pointer;
    }
  }
  .inputs {
    width: 70%;
    margin: 0 auto;
  }
  .user {
    background: url('../assets/login/user.png') no-repeat center center;
  }
  .pwd {
    background: url('../assets/login/pwd.png') no-repeat center center;
  }
  .phone {
    background: url('../assets/login/phone.png') no-repeat center center;
  }
  .code {
    background: url('../assets/login/code.png') no-repeat center center;
  }
  .btn {
    width: 100%;
    height: 40px;
    margin-top: 15px;
    line-height: 40px;
    // background: url('../assets/login/btn.png') no-repeat;
    background-color: #9dc543;
    border-radius: 20px;
    // background-size: 100% 100%;
    color: #fff;
    text-align: center;
    cursor: pointer;
  }
  .codes {
    position: relative;
  }
  .get-code {
    position: absolute;
    bottom: 20px;
    right: 38px;
    color: blue;
    text-decoration: underline;
    cursor: pointer;
  }
  .tip {
    line-height: 50px;
    text-align: center;
    span {
      color: #9dc543;
      cursor: pointer;
      text-decoration: underline;
    }
  }
}
.log /deep/ .el-input__inner {
  margin: 10px 0;
  height: 40px;
  border-radius: 30px;
  background: #eee;
}
.log /deep/ .el-input__icon {
  display: inline-block;
}
</style>
