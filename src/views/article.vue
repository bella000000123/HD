<template>
  <div class="soccer">
    <div class="center">
      <div class="bread">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>文章</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="content clearfix">
        <div class="fl zixun">
          <div class="head">
            <span class="tag">推荐</span>
            <h1>{{article.title}}</h1>
            <div class="clearfix">
              <div class="fl">
                <img src alt />
                <span class="pusher-name">{{article.pusher_name}}</span>
                <span>·{{article.time}}</span>
              </div>
              <div class="fr">
                <img :src="icons.hot" alt />
                {{article.hot}}
              </div>
            </div>
          </div>
          <div>
            <img :src="icons.back" alt />
            <div class="text" style="white-space: pre-wrap;" v-html="article.detail"></div>
          </div>
        </div>
        <jifen></jifen>
      </div>
    </div>
  </div>
</template>

<script>
import jifen from "@/components/jifen.vue";
import { mapState } from "vuex";
export default {
  components: {
    jifen
  },
  data() {
    return {
      icons: {
        hot: require("../assets/hot.png"),
        back: require("../assets/11.gif")
      },
      zixun: [],
      page: 1, // 初始页码
      per_page: 20
    };
  },
  methods: {
    async articleList() {
      let params = {
        cate_id: 2,
        per_page: this.per_page,
        page: this.page
      };
      let res = await this.$api.articleList(params);
      this.zixun = res;
    },
    // 分页
    pagenatiOnchange(page) {
      this.page = page;
      this.pusherList();
    },
    handleSizeChange(size) {
      this.per_page = size;
      this.pusherList();
    }
  },
  mounted() {
    this.articleList();
  },
  computed: {
    ...mapState(["article"])
  }
};
</script>
<style scoped lang='stylus'>
.soccer {
  // height: 1200px;
  .bread {
    padding: 30px 10px 15px;
  }
  .zixun {
    height: 100%;
    padding: 10px 20px;
    margin-right: 30px;
    width: 62%;
    background: #fff;
    box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
    .head {
      margin: 30px 0;
      text-align: center;
      .tag {
        padding: 5px 20px;
        background-color: #BA03FF;
        color: #fff;
      }
      h1 {
        display: inline-block;
        padding-left: 20px;
        font-weight: bold;
        font-size: 18px;
      }
      .clearfix {
        padding: 0 5px;
        margin-top: 20px;
        line-height: 40px;
        border-bottom: 2px solid #ddd;
      }
    }
    .pusher-name {
      margin-right: 20px;
    }
    .text {
      padding: 30px 0;
    }
  }
}
</style>