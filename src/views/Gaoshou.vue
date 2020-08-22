<template>
  <div class="center">
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>高手排行</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <img :src="yingli.image" alt="盈利" class="banner-img" />
    <div class="content">
      <div class="in-block renqi-box" v-for="(li, i) in pusherList" :key="i">
        <div class="">
          <div class="hot">
            <img :src="icons.huangguan" alt="" />
            {{ li.hot + Math.ceil(Math.random() * 1000) }}
          </div>
          <div class="avatar-box">
            <img :src="li.avatar" alt class="avator" />
            <p>{{ li.name }}</p>
            <div class="code-box">
              <img :src="li.code_image" alt class="code" />
            </div>
          </div>
          <div class="guanzhu" @click="doFollowPusher(li.id)">
            <span v-if="li.is_follow"> <img :src="icons.guanzhu2" alt /> 已关注 </span>
            <span v-else> <img :src="icons.guanzhu1" alt />关注 </span>
          </div>
        </div>
        <div class="more" @click="goPush(li)">更多推荐</div>
      </div>
      <!-- <div class="fl right">
        <jifen></jifen>
      </div>-->
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
import { mapState } from 'vuex';
export default {
  components: {
    //  jifen
  },
  data() {
    return {
      yingli: '',
      pusherList: [],
      all: {},
      page: 1, // 初始页码
      per_page: 12,
      icons: {
        hot: require('../assets/hot.png'),
        guanzhu1: require('../assets/guanzhu1.png'),
        guanzhu2: require('../assets/guanzhu2.png'),
        huangguan: require('../assets/huangguan.png')
      }
    };
  },
  methods: {
    async getBanner() {
      let res = await this.$api.getBanner();
      this.yingli = res['yingli'][0];
    },
    // 人气推手
    async hotPushers() {
      let params = {
        per_page: this.per_page,
        page: this.page
      };
      let res = await this.$api.hotPushers(params);
      this.pusherList = res.data;
      this.all = res;
    },
    // 分页
    pagenatiOnchange(page) {
      this.page = page;
      this.hotPushers();
    },
    handleSizeChange(size) {
      this.per_page = size;
      this.hotPushers();
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
    async doFollowPusher(id) {
      if (!this.isLogin) {
        this.$store.commit('setShowLogin', true);
        return;
      }
      let res = await this.$api.doFollowPusher({ id: id });
      this.hotPushers();
    }
  },
  mounted() {
    this.getBanner();
    this.hotPushers();
  },
  computed: {
    ...mapState(['isLogin'])
  }
};
</script>
<style scoped lang="stylus">
.bread {
  padding: 30px 10px 15px;
}
// .center {
// width: 80%;
// }
.content {
  margin-top: 20px;
}
.banner-img {
  width: 100%;
  display: block;
  margin: 0 auto;
}
.content {
   .renqi-box {
        position:relative;
        width: 19%;
        margin: 20px;
        padding: 15px;
        background-color: #fff;
        border-radius: 5px;
        text-align: center;
        p {
          line-height: 27px;
        }
       .hot{
         position:absolute;
         top:0;
         left:0;
         height:25px;
         padding:0 5px;
         background:url(../assets/renqi.png);
            background-size:100% 100%;
            color:#fff
            font-size:12px
            img{
              width:15px;
              margin-top:5px;
            }
       }
        .avatar-box {
          cursor: pointer;
          .renqi-txt {
            font-size: 12px;
            img {
              width: 10px;
              height: 10px;
              vertical-align middle
            }
          }
          .code-box {
            width:80px;
            height:80px;
            padding:1px;
            margin :0 auto
            background:url(../assets/code-boder.png)
            background-size:100% 100%
            img{
              width:100%;
               height:100%
            }
          }
        }
        .guanzhu {
           position:absolute;
         top:5px;
         right:5px;
          cursor pointer;
          img{
            width: 20px;
            vertical-align middle
          }
        }
        .more{
          margin-top:10px
          width:100%;
          height:35px;
          line-height:35px
          background-color: #8dc116;
          color: #fff;
          border-radius:5px;
          cursor pointer
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
</style>
