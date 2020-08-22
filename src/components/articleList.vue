<template>
  <div class="zixun">
    <div v-for="(li, i) in zixun.data" :key="i" class="pankou-box">
      <img :src="li.image" alt class="icon-img" />
      <div class="pankou-list" @click="chooseArticle(li)">
        <h2>{{ li.title }}</h2>
        <p>{{ li.introduction }}</p>
        <div class="box">
          <div>
            <img :src="li.pusher_avatar" alt class="avatar" />
            <span class="name">{{ li.pusher_name }}</span>
            <span class="time">
              <!-- <span class="point">.</span> -->
              {{ li.time }}
            </span>
          </div>
          <div>
            <!-- <img src alt /> -->
            <span class="green">查看全文</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 翻页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="pagenatiOnchange"
      :current-page="page"
      :page-size="20"
      layout="prev, pager, next, jumper"
      :total="zixun['total']"
      background
    ></el-pagination>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  props: ['zixun'],
  data() {
    return {
      page: 1, // 初始页码
      per_page: 20
    };
  },
  methods: {
    // 分页
    pagenatiOnchange(page) {
      this.page = page;
      let data = { page: this.page, per_page: this.per_page };
      this.$emit('articleList', data);
      //   this.articleList();
    },
    handleSizeChange(size) {
      this.per_page = size;
      let data = { page: this.page, per_page: this.per_page };
      this.$emit('articleList', data);
      //   this.articleList();
    },
    chooseArticle(article) {
      if (article.is_login_view == 1 && !this.isLogin) {
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
  computed: {
    ...mapState(['isLogin'])
  }
};
</script>

<style scoped lang="stylus">
.zixun {
  height: 100%;
  padding: 35px 20px 0;
  margin-right: 30px;
  background-color: #fff;
  .avatar {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    border-radius: 50%;
    background-color: #797979;
    vertical-align: middle;
  }
  .name {
    margin-right: 20px;
  }
  .point {
    color: green;
    line-height: 20px;
  }
  .time {
    color: #666;
  }
  .green {
    text-decoration: underline;
  }
  img {
    width: 20%;
    height: 100px;
  }
  .pankou-box {
    border-bottom: 1px solid #ddd;
  }
  &>div {
    margin-bottom: 30px;
    // border-bottom: 1px solid #ddd;
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
      height: 40px;
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
.el-pagination {
  text-align: center;
  font-size: 16px;
}
</style>
