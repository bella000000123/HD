<template>
  <div class="soccer">
    <img :src="icons.back" alt class="back" />

    <div class="center">
      <div class="div1 box">
        <div class="left">
          <img :src="zixun.data[0].pusher_avatar" alt class="avatar" />
          <h2>{{ zixun.data[0].pusher_name }}</h2>
        </div>
        <div class="right">
          <p>{{ zixun.data[0].introduction }}</p>
          <div class="title">
            <img :src="icons.article" alt="icon" class="in-block" />
            <span>文章： {{ zixun.data[0].pusher_tuijian_num }}</span>

            <img :src="icons.hot" alt="icon" class="in-block hot" />
            <span>热度： {{ zixun.data[0].hot }}</span>
          </div>
        </div>
        <img :src="zixun.data[0].pusher_code_image" alt="二维码" class="code-img" />
      </div>
      <div class="box">
        <div class="article-box">
          <article-list :zixun="zixun" @articleList="articleList"></article-list>
        </div>
        <div class="jifen-box">
          <jifen></jifen>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import articleList from '@/components/articleList.vue';
import jifen from '@/components/jifen.vue';
export default {
  components: { articleList, jifen },
  data() {
    return {
      icons: {
        back: require('../assets/tuijian-back.png'),
        hot: require('../assets/hot.png'),
        article: require('../assets/article.png')
      },
      zixun: [],
      page: 1, // 初始页码
      per_page: 20
    };
  },
  methods: {
    async articleList(page) {
      let params = {
        per_page: page.per_page ? page.per_page : 20,
        page: page.page ? page.page : 1,
        pusher_id: this.$route.query.pusher_id
      };
      let res = await this.$api.articleList(params);
      this.zixun = res;
    },

    chooseArticle(article) {
      if (article.is_login_view == 0) {
        this.$store.commit('setShowLogin', true);
        return;
      }
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
  computed: {
    ...mapState(['pusher'])
  }
};
</script>
<style scoped lang="stylus">
.soccer {
  width: 100%;
  box-sizing: border-box;
  .back {
    width: 100%;
  }
  .center {
    // width: 70%;
    position: relative; /* 脱离文档流 */
    top: -200px; /* 偏移 */
    // height: 800px;
    // background-color: rgba(255, 255, 255, 0.85);
    .title {
      font-size: 16px;
      padding: 0 10px;
      line-height: 36px;
      background-size: 100% 100%;
      span {
        font-size: 12px;
      }
      img {
        margin-right: 5px;
      }
      .hot {
        margin-left: 100px;
      }
    }
    .div1 {
      padding: 50px 50px 7px 50px;
      margin-bottom 50px
      background-color: rgba(255, 255, 255, 0.85);
      .left {
        width: 110px;
        h2 {
          text-align: center;
        }
        .avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 2px solid #8dc116;
        }
      }
      .code-img{
        width:120px;
        height:120px
      }
      .right {
        width: 1000px;
        margin: 20px 20px 0 50px;
        p {
          height: 80px;
        }
      }
    }
  }
  .zixun {
    height: 100%;
    padding: 40px 20px 0;
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
