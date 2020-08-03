<template>
  <div class="password">
    <h2>修改密码</h2>
    <div class="inputs">
      <!-- <el-steps :space="200" :active="active" finish-status="success">
        <el-step title="验证用户信息"></el-step>
        <el-step title="修改密码"></el-step>
        <el-step title="修改成功"></el-step>
      </el-steps>-->
      <div class="phone-box step1">
        <div>
          输入手机号：
          <el-input placeholder="请输入手机号" clearable v-model.trim="codelog.mobile" maxlength="11">
            <i slot="prefix" class="el-input__icon phone"></i>
          </el-input>
        </div>

        <div class="codes" maxlength="6">
          输入验证码：
          <el-input placeholder="请输入验证码" clearable v-model.trim="codelog.code" maxlength="6">
            <i slot="prefix" class="el-input__icon code"></i>
          </el-input>
          <div class="get-code">
            <span v-show="showCode" @click="getPhoneCode()">获取验证码</span>
            <span v-show="!showCode" class="count">{{ count }}S</span>
          </div>
        </div>
        <div>
          输入新密码：
          <el-input placeholder="请输入6-10位字母或数字的密码" clearable show-password v-model.trim="codelog.password" maxlength="10">
            <i slot="prefix" class="el-input__icon pwd"></i>
          </el-input>
        </div>
        <div>
          确认新密码：
          <el-input placeholder="请再次输入密码" clearable show-password v-model.trim="codelog.repwd" maxlength="10">
            <i slot="prefix" class="el-input__icon pwd"></i>
          </el-input>
        </div>
      </div>
    </div>
    <div class="submit" @click="submit">确认</div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      // active: 0,
      codelog: {
        mobile: '',
        code: '',
        password: '',
        repwd: ''
      },
      timer: null,
      showCode: true,
      count: 0
    };
  },
  methods: {
    async getPhoneCode() {
      if (!this.codelog.mobile) {
        this.$message.error('请输入手机号');
        return;
      }

      let res = await this.$api.getCode({ phone: this.codelog.mobile });
      if (res.code == 1) {
        this.getCode();
      }
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
    async submit() {
      if (!this.codelog.code || !this.codelog.password) {
        this.$message.error('请输入验证码和新密码');
        return;
      }

      let res = await this.$api.changePassword({ code: this.codelog.code, password: this.codelog.password });
      if (res.code == 1) {
        this.codelog = {
          mobile: '',
          code: '',
          password: '',
          repwd: ''
        };
      }
    }
  },
  mounted() {},
  computed: {}
};
</script>
<style scoped lang="stylus">
.password {
  h2::before {
    content: '';
    display: inline-block;
    height: 10px;
    margin-right: 5px;
    border-left: 2px solid #9dc543;
  }
  .inputs {
    width: 500px;
    margin: 100px auto 0;
    text-align: center;
    div {
      margin: 5px;
    }
    .phone-box {
      margin-top: 60px;
    }
    .codes {
      position: relative;
      .get-code {
        position: absolute;
        bottom: 10px;
        right: -35px;
        color: blue;
        text-decoration: underline;
        cursor: pointer;
      }
    }
    span {
      display: inline-block;
      width: 80px;
      text-align: center;
    }
  }
  .submit {
    width: 200px;
    height: 40px;
    margin: 30px auto;
    line-height: 40px;
    text-align: center;
    background-color: #9dc543;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
  }
  /deep/ .el-input {
    width: 60%;
  }
  /deep/ .el-step.is-horizontal .el-step__line {
    height: 2px;
    top: 11px;
    left: 103px;
    /* right: 0; */
    width: 110px;
  }
  /deep/ .el-step__title {
    text-align: center;
  }
}
</style>
