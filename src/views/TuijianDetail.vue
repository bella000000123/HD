<template>
  <div class="soccer">
    <img :src="icons.back" alt class="back" />

    <div class="center">
      <div class="div1 clearfix">
        <div class="fl left">
          <img :src="pusher.avatar" alt class="avatar" />
          <h2>{{ pusher.name }}</h2>
        </div>
        <div class="fl right">
          <p>{{ pusher.introduction }}</p>
          <div class="title">
            <img :src="icons.article" alt="icon" class="in-block" />
            <span>文章： {{ pusher.tuijian_num }}</span>

            <img :src="icons.hot" alt="icon" class="in-block hot" />
            <span>热度： {{ pusher.hot }}</span>
          </div>
        </div>
      </div>

      <div class="zixun">
        <div v-for="(li, i) in zixun.data" :key="i">
          <img :src="li.image" alt class="icon-img" />
          <div class="pankou-list" @click="chooseArticle(li)">
            <h2>{{ li.title }}</h2>
            <p>{{ li.introduction }}</p>
            <p>·{{ li.time }}</p>
          </div>
        </div>

        <!-- 翻页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="pagenatiOnchange"
          :current-page="page"
          :page-size="15"
          layout="prev, pager, next, jumper"
          :total="zixun['total']"
          background
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {},
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
    }
  },
  methods: {
    async articleList() {
      let params = {
        per_page: this.per_page,
        page: this.page,
        pusher_id: this.pusher.id
      }
      let res = await this.$api.articleList(params)
      this.zixun = res
    },
    // 分页
    pagenatiOnchange(page) {
      this.page = page
      this.pusherList()
    },
    handleSizeChange(size) {
      this.per_page = size
      this.pusherList()
    },
    chooseArticle(article) {
      this.$store.commit('chooseArticle', article)
      this.$router.push({
        path: `/article`
      })
    }
  },
  mounted() {
    this.articleList()
  },
  computed: {
    ...mapState(['pusher'])
  }
}
</script>
<style scoped lang="stylus">
.soccer {
  width: 100%;
  box-sizing: border-box;
  .back {
    width: 100%;
  }
  .center {
    width: 70%;
    position: relative; /* 脱离文档流 */
    top: -200px; /* 偏移 */
    // height: 800px;
    background-color: rgba(255, 255, 255, 0.85);
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
      padding: 50px;
      .left {
        h2 {
          text-align: center;
        }
        .avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
      }
      .right {
        margin: 20px 0 0 50px;
        p {
          height: 80px;
        }
      }
    }
  }
  .zixun {
    height: 100%;
    padding: 10px 20px;
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
