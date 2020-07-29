<template>
  <div class="soccer">
    <div class="center">
      <div class="bread">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>文章</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="content box">
        <div class="zixun">
          <div class="head">
            <span class="tag">推荐</span>
            <h1>{{ article_detail.title }}</h1>
            <div class="clearfix">
              <div class="fl">
                <span @click="goPush(article_detail)" class="pusher">
                  <img :src="article_detail.pusher_avatar" alt class="avatar" />
                  <span class="pusher-name">{{ article_detail.pusher_name }}</span>
                </span>

                <span>·{{ article_detail.time }}</span>
              </div>
              <div class="fr">
                <img :src="icons.hot" alt />
                {{ article_detail.hot }}
              </div>
            </div>
          </div>
          <div>
            <img :src="icons.back" alt />
            <div class="text" style="white-space: pre-wrap;" v-html="detail"></div>
          </div>
        </div>
        <jifen></jifen>
      </div>
      <div class="comments">
        <div class="comment">
          <h2>您的评论...</h2>
          <el-input type="textarea" :rows="4" placeholder="请输入评论内容" v-model="comment"></el-input>
          <div class="submit">
            <p class="fr" @click="addArticleComment">发布</p>
          </div>
        </div>

        <div class="new">
          <h2>最新评论</h2>
        </div>
        <div class="list">
          <div class="box" v-for="(li,i) in commentList" :key="i">
            <img :src="icons.hot" alt class="avatar" />
            <div class="detail">
              <div class="box">
                <p>eee</p>
                <p>ddd</p>
              </div>
              <div>
                <p>{{li.content}}</p>
              </div>
              <div class="time">
                <p class="in-block dianzan">
                  <img :src="icons.zan1" alt />点赞
                </p>
                <p class="in-block">
                  <img :src="icons.comment" alt />评论
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jifen from '@/components/jifen.vue';
import { mapState } from 'vuex';
export default {
  components: {
    jifen
  },
  data() {
    return {
      icons: {
        hot: require('../assets/hot.png'),
        back: require('../assets/11.gif'),
        zan1: require('../assets/zan1.png'),
        zan2: require('../assets/zan2.png'),
        comment: require('../assets/comment.png')
      },
      zixun: [],
      page: 1, // 初始页码
      per_page: 20,
      article_detail: '',
      detail: '',
      comment: '',
      commentList: []
    };
  },
  methods: {
    async getArticleDetail() {
      let params = {
        id: this.$route.query.id
      };
      let res = await this.$api.getArticleDetail(params);
      this.detail = res.detail.replace(/strong/g, 'h3');
      this.article_detail = res;
    },

    goPush(pusher) {
      this.$store.commit('choosePusher', pusher);
      let routeUrl = this.$router.resolve({
        path: '/tuijianDetail',
        query: {
          pusher_id: pusher.pusher_id
        }
      });
      window.open(routeUrl.href, '_blank');
      // this.$router.push({
      //   path: `/tuijianDetail`
      // });
    },
    async addArticleComment(pid) {
      let params = {
        content: this.comment,
        article_id: this.$route.query.id
        // pid: pid ? pid : ''
      };
      let res = await this.$api.addArticleComment(params);
      this.getArticleCommentList();
    },
    async getArticleCommentList(id) {
      let res = await this.$api.getArticleCommentList({ id: this.$route.query.id });
      this.commentList = res;
    }
  },
  mounted() {
    this.getArticleDetail();
    this.getArticleCommentList();
  },
  computed: {
    ...mapState(['article'])
  }
};
</script>
<style scoped lang="stylus">
.soccer {
  // height: 1200px;
  .bread {
    padding: 30px 10px 15px;
  }
  h5 {
    font-weight: bold;
  }
  .zixun {
    height: 100%;
    padding: 10px 20px;
    margin-right: 30px;
    width: 62%;
    background: #fff;
    // box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
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
    .avatar {
      width: 20px;
      height: 20px;
      margin-right: 5px;
      border-radius: 50%;
      background-color: #797979;
      vertical-align: middle;
    }
    .pusher {
      cursor: pointer;
    }
    .text {
      padding: 30px 0;
    }
  }
  .comments {
    margin-top: 30px;
    background-color: #fff;
    border-radius: 5px;
    h2 {
      line-height: 40px;
      color: #666;
    }
    .submit {
      height: 30px;
      margin: 20px 0;
      p {
        width: 50px;
        padding: 5px 20px;
        background-color: #91c619;
        color: #fff;
        text-align: center;
        border-radius: 5px;
        cursor: pointer;
      }
    }
    .comment {
      padding: 20px;
    }
    .new {
      h2 {
        width: 100px;
        text-align: center;
        border-bottom: 2px solid #91c619;
      }
    }
    .list {
      border-bottom: 1px solid #ccc;
      border-top: 1px solid #ccc;
      &>.box {
        padding: 20px;
      }
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #797979;
      }
      .detail {
        width: 1100px;
      }
      .time {
        text-align: right;
        cursor: pointer;
        img {
          width: 15px;
          height: 15px;
          margin-right: 3px;
          vertical-align: middle;
        }
        .dianzan {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
