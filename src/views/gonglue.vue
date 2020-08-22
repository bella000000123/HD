<template>
  <div class="soccer">
    <div class="center clearfix">
      <div class="bread">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>高手心得</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="box">
        <article-list :zixun="zixun" @articleList="articleList"></article-list>
        <jifen></jifen>
      </div>
    </div>
  </div>
</template>

<script>
import articleList from '@/components/articleList.vue';
import jifen from '@/components/jifen.vue';
export default {
  components: {
    jifen,
    articleList
  },
  data() {
    return {
      zixun: [],
      page: 1, // 初始页码
      per_page: 20
    };
  },
  methods: {
    async articleList(page) {
      let params = {
        cate_id: 6,
        per_page: page.per_page ? page.per_page : 20,
        page: page.page ? page.page : 1
      };
      let res = await this.$api.articleList(params);
      this.zixun = res;
    },

    chooseArticle(article) {
      this.$store.commit('chooseArticle', article);
      let routeUrl = this.$router.resolve({
        path: '/article',
        query: {
          id: article.id
        }
      });
      window.open(routeUrl.href, '_blank');
    }
  },
  mounted() {
    this.articleList(1, 20);
  },
  computed: {}
};
</script>
<style scoped lang="stylus">
.soccer {
  // height: 1200px;
  .bread {
    padding: 30px 10px 15px;
  }
  .zixun {
    height: 100%;
    padding: 10px 20px;
    width: 65%;
    img {
      width: 20%;
      height: 100px;
    }
    &>div {
      margin-bottom: 30px;
      border-bottom: 1px solid #ddd;
      padding-bottom: 30px;
    }
    .pankou-list {
      width: 75%;
      height: 70px;
      display: inline-block;
      vertical-align: top;
      margin-left: 10px;
      cursor: pointer;
      h2 {
        font-size: 16px;
      }
      p {
        margin: 5px 0;
        color: #6F6F6F;
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}
.el-pagination {
  text-align: center;
  font-size: 16px;
}
</style>
