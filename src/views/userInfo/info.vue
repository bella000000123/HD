<template>
  <div class="info">
    <h2>基本资料</h2>
    <div class="inputs">
      <div class="avatar-box">
        <span>我的头像：</span>
        <el-upload
          name="image"
          class="avatar-uploader"
          action="/api/manage/upload/UploadOneImg"
          :show-file-list="false"
          :on-success="uploadSuccess"
          :before-upload="beforeUpload"
        >
          <img v-if="info.avatar" :src="info.avatar" class="avatar" />
          <i class="el-icon-plus avatar-uploader-icon">{{ info.avatar ? '点击更换' : '点击添加' }}</i>
        </el-upload>
      </div>
      <div>
        <span>我的昵称：</span>
        <el-input placeholder="请输入昵称" :disabled="info.nickname ? true : false" v-model="info.nickname" v-if="!modis[0]"></el-input>
        <el-input v-else placeholder="请输入昵称" v-model="info.nickname"></el-input>
        <span class="modify" @click="modify(0)">{{ info.nickname ? '修改' : '' }}</span>
      </div>
      <div>
        <span>性 别：</span>
        <div class="sex-wrap">
          <el-radio v-model="info.sex" label="0">男</el-radio>
          <el-radio v-model="info.sex" label="1">女</el-radio>
        </div>

        <!-- <el-input :placeholder="userInfo.sex?userInfo.sex:'请输入性别'" v-model="info.sex"></el-input> -->
      </div>
      <div>
        <span>出生日期：</span>
        <el-input placeholder="请输入出生日期" :disabled="info.birthday ? true : false" v-model="info.birthday" v-if="!modis[1]"></el-input>
        <el-input v-else placeholder="请输入出生日期" v-model="info.birthday"></el-input>
        <span class="modify" @click="modify(1)">{{ info.birthday ? '修改' : '' }}</span>
      </div>
      <div>
        <span>所在地：</span>
        <el-input placeholder="请输入所在地" v-model="info.address" :disabled="info.address ? true : false" v-if="!modis[2]"></el-input>
        <el-input v-else placeholder="请输入昵称" v-model="info.address"></el-input>
        <span class="modify" @click="modify(2)">{{ info.address ? '修改' : '' }}</span>
      </div>
      <div>
        <span>微 信：</span>
        <el-input placeholder="请输入昵称" v-model="info.wechat" :disabled="info.wechat ? true : false" v-if="!modis[3]"></el-input>
        <el-input v-else placeholder="请输入昵称" v-model="info.wechat"></el-input>
        <span class="modify" @click="modify(3)">{{ info.wechat ? '修改' : '' }}</span>
      </div>
      <div>
        <span>Q Q：</span>
        <el-input placeholder="请输入昵称" v-model="info.qq" :disabled="info.qq ? true : false" v-if="!modis[4]"></el-input>
        <el-input v-else placeholder="请输入昵称" v-model="info.qq"></el-input>
        <span class="modify" @click="modify(4)">{{ info.qq ? '修改' : '' }}</span>
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
      modis: [false, false, false, false, false, false]
    };
  },
  methods: {
    async updateUserInfo() {
      let res = await this.$api.updateUserInfo(this.info);
      this.getUserInfo();
    },
    async getUserInfo() {
      let res = await this.$api.getUserInfo();
      this.$store.commit('setUserinfo', res);
    },
    modify(id) {
      this.$set(this.modis, id, true);
    },

    uploadSuccess(res, img) {
      this.$message({ type: 'success', message: '图片选择成功,请点击确定' });
      this.info.avatar = res.data ? res.data.image : '';
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isLt1M) {
        this.$message.error('二维码图片大小不能超过 1MB!');
      }
      return isLt1M;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.info = JSON.parse(JSON.stringify(this.userInfo));
    });
  },
  computed: {
    ...mapState(['userInfo'])
  },
  watch: {
    userInfo(newMatchItem) {
      this.info = JSON.parse(JSON.stringify(newMatchItem));
    }
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
      width: 355px;
      display: inline-block;
      text-align: left;
    }
    .sex-wrap {
      display: inline-block;
      width: 39%;
      text-align: left;
    }
    span {
      display: inline-block;
      width: 80px;
      text-align: right;
      &:first-child::before {
        content: '';
        display: inline-block;
        height: 10px;
        margin-right: 5px;
        border-left: 2px solid #9dc543;
      }
    }
    .modify {
      color: blue;
      text-decoration: underline;
      cursor: pointer;
      text-align: left;
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
