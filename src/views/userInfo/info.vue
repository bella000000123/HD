<template>
  <div class="info">
    <h2>基本资料</h2>
    <div class="inputs">
      <div>
        <span>我的头像：</span>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="info.avatar" :src="info.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon">点击添加</i>
        </el-upload>
      </div>
      <div>
        <span>我的昵称：</span>
        <el-input
          :placeholder="userInfo.nickname?userInfo.nickname:'请输入昵称'"
          v-model="info.nickname"
        ></el-input>
      </div>
      <div>
        <span>性 别：</span>
        <el-input :placeholder="userInfo.sex?userInfo.sex:'请输入性别'" v-model="info.sex"></el-input>
      </div>
      <div>
        <span>出生日期：</span>
        <el-input
          :placeholder="userInfo.birthday?userInfo.birthday:'请输入出生日期'"
          v-model="info.birthday"
        ></el-input>
      </div>
      <div>
        <span>所在地：</span>
        <el-input :placeholder="userInfo.address?userInfo.address:'请输入所在地'" v-model="info.address"></el-input>
      </div>
      <div>
        <span>微 信：</span>
        <el-input :placeholder="userInfo.wechat?userInfo.wechat:'请输入微信'" v-model="info.wechat"></el-input>
      </div>
      <div>
        <span>Q Q：</span>
        <el-input :placeholder="userInfo.qq?userInfo.qq:'请输入qq'" v-model="info.qq"></el-input>
      </div>
    </div>
    <div class="submit" @click="updateUserInfo">确定</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  components: {},
  data() {
    return {
      info: {
        nickname: '',
        sex: '',
        birthday: '',
        address: '',
        wechat: '',
        qq: '',
        avatar: ''
      },
      disableds: [false, false, false, false, false, false]
    };
  },
  methods: {
    async updateUserInfo() {
      if (!this.info.nickname || !this.info.sex || !this.info.birthday || !this.info.address || !this.info.wechat || !this.info.qq || !this.info.avatar) {
        this.$message.error('请输入修改内容');
        return;
      }
      let res = await this.$api.updateUserInfo(this.info);
    },

    handleAvatarSuccess(res, file) {
      this.info.avatar = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1);
      const extension = testmsg === 'jpg' || testmsg === 'JPG' || testmsg === 'png' || testmsg === 'PNG';
      if (!extension) {
        this.$message.error('上传文件只能是jpg或者png格式');

        return false; //必须加上return false; 才能阻止
      }

      const isLt1M = file.size / 1024 / 1024 < 1;

      if (!isLt1M) {
        this.$message.error('上传头像图片大小不能超过1M');
        return false;
      }
      return extension && isLt1M;
    }
  },
  mounted() {},
  computed: {
    ...mapState(['userInfo'])
  }
};
</script>
<style scoped lang="stylus">
.info {
  h2::before {
    content: '';
    display: inline-block;
    height: 10px;
    margin-right: 5px;
    border-left: 2px solid #9dc543;
  }
  .inputs {
    margin: 80px auto 0;
    text-align: center;
    div {
      margin: 5px;
    }
    .avatar-uploader {
      width: 275px;
      display: inline-block;
      text-align: left;
    }
    span {
      display: inline-block;
      width: 80px;
      text-align: center;
      &:first-child::before {
        content: '';
        display: inline-block;
        height: 10px;
        margin-right: 5px;
        border-left: 2px solid #9dc543;
      }
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
    width: 30%;
  }
}
</style>
