<template>
  <div class="soccer">
    <div class="center clearfix">
      <div class="bread">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>足球推荐</el-breadcrumb-item>
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
import jifen from '@/components/jifen.vue';
import articleList from '@/components/articleList.vue';
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
    async articleList(page, per_page) {
      let params = {
        cate_id: 2,
        per_page: per_page,
        page: page
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
}
</style>
