<template>
  <div class="password">
    <h2>我的关注</h2>
    <div class="inputs">
      <div class="in-block renqi-box" v-for="(li, i) in followPusher" :key="i">
        <div class="avatar-box">
          <img :src="li.avatar" alt class="avator" />
          <p>
            {{ li.name }}
            <span class="renqi-txt">
              （
              <img :src="icons.hot" alt="icon" />
              {{ li.hot }}）
            </span>
          </p>
        </div>
        <div class="box">
          <img :src="li.code_image" alt class="code" />
          <div class="guanzhu-box">
            <p class="guanzhu" @click="cancelFollow(li.id)">
              <span v-if="li.is_follow"> <img :src="icons.guanzhu2" alt /> 已关注 </span>
              <span v-else> <img :src="icons.guanzhu1" alt />关注 </span>
            </p>
            <p class="more" @click="goPush(li)">更多推荐</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 翻页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="pagenatiOnchange"
      :current-page="page"
      :page-size="12"
      layout="prev, pager, next, jumper"
      :total="all['total']"
      background
    ></el-pagination>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      followPusher: [],
      all: {},
      icons: {
        hot: require('../../assets/hot.png'),
        guanzhu1: require('../../assets/guanzhu1.png'),
        guanzhu2: require('../../assets/guanzhu2.png')
      },
      page: 1, // 初始页码
      per_page: 8
    };
  },
  methods: {
    async getFollowPushers() {
      let params = {
        per_page: this.per_page,
        page: this.page
      };
      let res = await this.$api.getFollowPushers(params);
      this.followPusher = res.data;
      this.all = res;
    },
    async unFollowPusher(id) {
      let res = await this.$api.unFollowPusher({ id: id });

      this.getFollowPushers();
    },
    // 分页
    pagenatiOnchange(page) {
      this.page = page;
      this.getFollowPushers();
    },
    handleSizeChange(size) {
      this.per_page = size;
      this.getFollowPushers();
    },
    goPush(pusher) {
      this.$store.commit('choosePusher', pusher);
      let routeUrl = this.$router.resolve({
        path: '/tuijianDetail',
        query: {
          pusher_id: pusher.id
        }
      });
      window.open(routeUrl.href, '_blank');
    },
    cancelFollow(id) {
      this.$confirm('确定取消关注该推手吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.unFollowPusher(id);
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.getFollowPushers();
  },
  computed: {}
};
</script>
<style scoped lang="stylus">
.password {
  h2::before {
    content: '';
    display: inline-block;
    height: 10px;
    margin-right: 5px;
    border-left: 2px solid #9dc543;
  }
  .inputs {
    // width: 500px;
    margin: 70px auto 0;
    // text-align: center;
    .renqi-box {
      width: 20%;
      margin: 10px;
      padding: 5px 10px;
      background-color: #fff;
      border-radius: 5px;
      text-align: center;
      border: 1px solid #ccc;
      p {
        line-height: 27px;
      }
      .box {
        width: 160px;
        margin: 10px auto;
        .guanzhu-box {
          p {
            width: 80px;
            height: 27px;
            border-radius: 5px;
            line-height: 27px;
            font-size: 12px;
            text-align: center;
            cursor: pointer;
          }
          .more {
            width: 83px;
            margin-top: 10px;
            background-color: #8dc116;
            color: #fff;
          }
          .guanzhu {
            border: 1px solid #8dc116;
          }
          img {
            width: 15px;
            height: 15px;
            vertical-align: middle;
          }
        }
      }
      .avatar-box {
        cursor: pointer;
        .renqi-txt {
          font-size: 12px;
          img {
            width: 10px;
            height: 10px;
          }
        }
      }
    }
    .avator {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #797979;
    }
    .code {
      width: 70px;
      height: 70px;
    }
  }
  /deep/ .el-pagination {
    margin-top: 50px;
    text-align: center;
    font-size: 16px;
  }
}
</style>
