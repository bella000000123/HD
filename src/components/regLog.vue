<template>
  <div class="log">
    <div class="wrapper" v-if="dialogVisible">
      <div class="dialog">
        <span class="close" @click="close"></span>

        <div class="dialog-head">
          <img
            src="http://api.211aoa.com/upload/manage/20200528/f8a051dbf90d1a07fdb1a4b4cdb06a61.png"
            alt
          />
        </div>
        <div class="inputs">
          <div class="reg" v-if="show_reg">
            <el-input placeholder="请输入5-8位字母或数字的用户名" clearable v-model="reg.username">
              <i slot="prefix" class="el-input__icon user"></i>
            </el-input>
            <el-input placeholder="请输入6-10位字母或数字的密码" clearable show-password v-model="reg.pwd">
              <i slot="prefix" class="el-input__icon pwd"></i>
            </el-input>
            <el-input placeholder="请再次输入密码" clearable show-password v-model="reg.repwd">
              <i slot="prefix" class="el-input__icon pwd"></i>
            </el-input>
            <el-input placeholder="请输入手机号" clearable v-model="reg.phone">
              <i slot="prefix" class="el-input__icon phone"></i>
            </el-input>
            <div class="codes">
              <el-input placeholder="请输入验证码" clearable v-model="reg.code">
                <i slot="prefix" class="el-input__icon code"></i>
              </el-input>
              <p class="get-code">获取验证码</p>
            </div>
          </div>
          <div class="login" v-if="show_user && !show_phone">
            <el-input placeholder="请输入5-8位字母或数字的用户名" clearable v-model="reg.username">
              <i slot="prefix" class="el-input__icon user"></i>
            </el-input>
            <el-input placeholder="请输入6-10位字母或数字的密码" clearable show-password v-model="reg.pwd">
              <i slot="prefix" class="el-input__icon pwd"></i>
            </el-input>
          </div>
          <div v-if="!show_user && show_phone">
            <el-input placeholder="请输入手机号" clearable v-model="reg.phone">
              <i slot="prefix" class="el-input__icon phone"></i>
            </el-input>
            <div class="codes">
              <el-input placeholder="请输入验证码" clearable v-model="reg.code">
                <i slot="prefix" class="el-input__icon code"></i>
              </el-input>
              <p class="get-code">获取验证码</p>
            </div>
          </div>

          <div class="btn">{{show_reg?'注册':'登录'}}</div>
          <div class="tip" v-if="show_reg">
            已有账号？
            <span @click="user_reg('show_user','show_reg')">请登录</span>
          </div>
          <div class="tip clearfix" v-if="show_user || show_phone ">
            <span @click="user_reg('show_reg','show_user')" class="fl">立即注册</span>
            <span @click="user_phone()" class="fr">{{!show_phone?'手机号登录':'密码登录'}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- <el-dialog :visible.sync="dialogVisible" width="30%" center></el-dialog> -->
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      show_phone: false,
      //   dialogVisible: true,
      reg: {
        username: "",
        pwd: "",
        repwd: "",
        phone: "",
        code: ""
      }
    };
  },
  props: ["show_reg", "show_user", "dialogVisible"],
  methods: {
    close() {
      this.show_phone = false;
      this.$emit("close");
    },
    user_phone() {
      if (this.show_phone) {
        this.show_phone = false;
        this.user_reg("show_user", "");
      } else {
        this.show_phone = true;
        this.user_reg("", "show_user");
      }
    },
    user_reg(param1, param2) {
      if (param1 == "show_reg") {
        this.show_phone = false;
      }
      this.$emit("user_reg", param1, param2);
    }
  },
  created() {},
  computed: {}
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
    padding: 70px 0 50px;
    position: relative;
    margin: 15vh auto 50px;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    width: 30%;
    background: #fff;
    font-size: 14px;
    .dialog-head {
      margin-bottom: 30px;
      img {
        display: block;
        margin: 0 auto;
        width: 80%;
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
    width: 75%;
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
    background: url('../assets/login/btn.png') no-repeat;
    background-size: 100% 100%;
    color: #fff;
    text-align: center;
    cursor: pointer;
  }
  .codes {
    position: relative;
  }
  .get-code {
    position: absolute;
    bottom: 13px;
    right: 38px;
    color: blue;
    text-decoration: underline;
    cursor: pointer;
  }
  .tip {
    line-height: 50px;
    text-align: center;
    span {
      color: #D6AF7C;
      cursor: pointer;
      text-decoration: underline;
    }
  }
}
.log /deep/ .el-input__inner {
  margin: 5px 0;
  height: 35px;
  border-radius: 30px;
  background: #eee;
}
.log /deep/ .el-input__icon {
  display: inline-block;
}
</style>