<template>
  <div class="center">
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>高手排行</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <img :src="yingli.image" alt="盈利" class="banner-img" />
    <div class="content clearfix">
      <div class="fl left">
        <div class="in-block tuishou" v-for="(li,i) in pusherList" :key="i">
          <img class="avatar" :src="li.avatar" alt />
          <h2>{{li.name}}</h2>
          <p>描述</p>
          <div class="bottom">
            <img :src="li.code_image" alt />
            <div class="in-block">
              <p>微信扫码 专业推荐</p>
              <span class="in-block" @click="goPush(li)">更多推荐</span>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="fl right">
        <jifen></jifen>
      </div>-->
    </div>
  </div>
</template>

<script>
// import jifen from "@/components/jifen.vue";
export default {
  components: {
    //  jifen
  },
  data() {
    return {
      yingli: "",
      pusherList: []
    };
  },
  methods: {
    async getBanner() {
      let res = await this.$api.getBanner();
      this.yingli = res["yingli"][0];
    },
    // 人气推手
    async hotPushers() {
      let res = await this.$api.hotPushers();
      this.pusherList = res.data;
    },
    goPush(pusher) {
      this.$store.commit("choosePusher", pusher);
      this.$router.push({
        path: `/tuijianDetail`
      });
    }
  },
  mounted() {
    this.getBanner();
    this.hotPushers();
  },
  computed: {}
};
</script>
<style scoped lang="stylus">
.bread {
  padding: 30px 10px 15px;
}
.center {
  width: 80%;
}
.content {
  margin-top: 20px;
}
.banner-img {
  width: 100%;
  display: block;
  margin: 0 auto;
}
.content .left {
  height: 100%;
  // padding: 10px 20px;
  // width: 65%;
  .tuishou {
    margin: 0 25px 40px;
    padding: 10px;
    background-color: #FFF9EF;
    border: 1px dashed #ccc;
    text-align: center;
    p {
      line-height: 30px;
    }
    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    .bottom {
      padding-top: 10px;
      border-top: 1px solid #ccc;
      img {
        width: 60px;
        height: 60px;
        margin-right: 15px;
        vertical-align: middle;
      }
      span {
        width: 100px;
        height: 26px;
        line-height: 26px;
        background: url('../assets/btn.png');
        background-size: 100% 100%;
        cursor: pointer;
      }
    }
  }
}
</style>