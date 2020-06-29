<template>
  <div class="home">
    <div class="center">
      <!-- banner -->
      <div class="con1">
        <div class="in-block div1">
          <el-carousel height="400px">
            <el-carousel-item v-for="(li, i) in bannerList.banner" :key="i">
              <img :src="li.image" alt />
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="in-block div2 border back-white">
          <div class="title">
            <img :src="icons.qingbao" alt="icon" class="in-block" />
            <h1 class="in-block">情报中心</h1>
            <router-link to="/qingbao" class="fr unl" tag="span"
              >查看更多</router-link
            >
          </div>
          <ul class="list">
            <li
              v-for="(li, i) in articleType['qingbao']['data']"
              :key="i"
              :class="{ red: li.is_red == 1 }"
              @click="chooseArticle(li)"
            >
              <span></span>
              {{ li.title }}
            </li>
          </ul>
        </div>
      </div>
      <!-- 焦点赛事 -->
      <div class="con2">
        <div class="in-block div1 border back-white">
          <div class="title">
            <img :src="icons.jiaodian" alt="icon" class="in-block" />
            <h1 class="in-block pankou">焦点赛事</h1>
            <router-link to="/bifen" class="fr unl" tag="span"
              >查看更多</router-link
            >
          </div>
          <div class="overflow">
            <div
              v-for="(li, i) in articleType['jiaodian']"
              :key="i"
              class="list"
            >
              <img :src="li.zhudui_image" alt class="icon-img" />
              <div class="in-block">
                <p>{{ li.match_name }}</p>
                <img :src="icons.vs" alt />
                <p>{{ li.match_time }}</p>
              </div>
              <img :src="li.kedui_image" alt class="icon-img" />
            </div>
          </div>
        </div>
        <div class="in-block div2 border back-white">
          <div class="title pankou">
            <img :src="icons.pankou" alt="icon" class="in-block" />
            <h1 class="in-block">盘口分析</h1>
            <router-link to="/soccer" class="fr unl" tag="span"
              >查看更多</router-link
            >
          </div>
          <div class="overflow">
            <div class="zixun">
              <div v-for="(li, i) in articleType['pankou']" :key="i">
                <img :src="li.image" alt class="icon-img" />
                <div
                  class="pankou-list"
                  :class="{ red: li.is_red == 1 }"
                  @click="chooseArticle(li)"
                >
                  <h2>{{ li.title }}</h2>
                  <p>{{ li.introduction }}</p>
                  <p>
                    ·{{ li.time }}
                    <!-- <span>·昨天</span> -->
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 高手成长之路 -->
      <img :src="icons.gaoshou" alt="高手成长之路" class="gaoshou" />
      <div class="con3">
        <div class="fl div1 border back-white">
          <el-tabs v-model="gaoshouType" @tab-click="gaoshouTab">
            <el-tab-pane label="全部" name="gaoshouAll"></el-tab-pane>
            <el-tab-pane label="赔盘技巧" name="peipan"></el-tab-pane>
            <el-tab-pane label="联赛攻略" name="liansai"></el-tab-pane>
            <el-tab-pane label="高手心得" name="gaoshou"></el-tab-pane>
          </el-tabs>
          <div class="overflow">
            <div class="zixun">
              <div v-for="(li, i) in articleType[gaoshouType]['data']" :key="i">
                <img :src="li.image" alt class="icon-img" />
                <div class="pankou-list" @click="chooseArticle(li)">
                  <h2>{{ li.title }}</h2>
                  <p>{{ li.introduction }}</p>
                  <p>
                    {{ li.time }}
                    <span>·昨天</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!-- 翻页 -->

          <el-pagination
            @size-change="handleSizeChange"
            @current-change="pagenatiOnchange"
            :current-page="page"
            :page-size="15"
            layout="prev, pager, next, jumper"
            :total="articleType[gaoshouType]['total']"
            background
          ></el-pagination>
        </div>
        <div class="fl div2">
          <div class="renqi border back-white">
            <div class="title">
              <img :src="icons.renqi" alt="icon" class="in-block" />
              <h1 class="in-block">人气推手</h1>
              <router-link to="/gaoshou" class="fr unl" tag="span"
                >查看更多</router-link
              >
            </div>
            <div class="list">
              <div v-for="(li, i) in pusherList" :key="i">
                <div class="box">
                  <div class="box">
                    <img :src="li.avatar" alt class="avator" />
                    <div>
                      <h2>{{ li.name }}</h2>
                      <p>
                        <img :src="icons.hot" alt="icon" />
                        {{ li.hot }}
                      </p>
                    </div>
                  </div>
                  <img :src="li.code_image" alt class="code" />
                </div>
                <div class="box">
                  <p class="red" @click="goPush(li)">
                    {{ li.tuijian_num }}篇推荐 [点击查看]
                  </p>
                  <p>微信扫码了解</p>
                </div>
              </div>
            </div>
          </div>
          <div class="jifen border back-white">
            <div class="title">
              <img :src="icons.jifen" alt="icon" class="in-block" />
              <h1 class="in-block">积分榜</h1>
            </div>
            <div class="list">
              <el-tabs
                type="border-card"
                v-model="jifenType"
                @tab-click="jifenTab"
              >
                <el-tab-pane name="yingchao" label="英超"></el-tab-pane>
                <el-tab-pane name="aochao" label="澳超"></el-tab-pane>
                <el-tab-pane name="xijia" label="西甲"></el-tab-pane>
                <el-tab-pane name="dejia" label="德甲"></el-tab-pane>
                <el-tab-pane name="yijia" label="意甲"></el-tab-pane>
                <el-tab-pane name="zhongchao" label="中超"></el-tab-pane>
              </el-tabs>
              <ul class="list-content">
                <li>
                  <span class="id">排名</span>
                  <span>胜</span>
                  <span>平</span>
                  <span>负</span>
                  <span>积分</span>
                </li>
                <li
                  v-for="(li, i) in jifen[jifenType]"
                  :key="i"
                  class="jifen-num"
                >
                  <span class="id">{{ li.paiming }} {{ li.team_name }}</span>
                  <span>{{ li.win }}</span>
                  <span>{{ li.draw }}</span>
                  <span>{{ li.defeat }}</span>
                  <span class="red">{{ li.score }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
// import jifen from "@/components/jifen.vue";
import WebSocketUtil from '@/utils/WebSocketUtil.js'

export default {
  name: 'Home',
  components: {
    // jifen
  },
  data() {
    return {
      icons: {
        jiaodian: require('../assets/jiaodian_icon.png'),
        jifen: require('../assets/jifen_icon.png'),
        pankou: require('../assets/pankou_icon.png'),
        qingbao: require('../assets/qingbao_icon.png'),
        renqi: require('../assets/renqi_icon.png'),
        hot: require('../assets/hot.png'),
        gaoshou: require('../assets/gaoshou.png'),
        vs: require('../assets/vs.png')
      },
      page: 1, // 初始页码
      per_page: 10,
      bannerList: [],
      articleType: {
        qingbao: [],
        jiaodian: [],
        pankou: [],
        peipan: [],
        liansai: [],
        gaoshou: [],
        gaoshouAll: []
      },
      gaoshouType: 'gaoshouAll',

      pusherList: [],
      jifenType: 'yingchao',
      jifen: [],
      activeName: 'all'
    }
  },
  mounted() {
    this.getBanner()
    // 情报中心
    this.articleList(3, 11, 'qingbao')
    // 焦点赛事
    this.focusMatch()
    // 盘口分析
    this.analyseList()
    // 赔盘
    this.articleList(4, 15, 'peipan')
    // 人气推手
    this.hotPushers()
    // 积分榜
    this.rankingList()
    // 高手全部
    this.gaoshouAllList(15)

    // 初始化websoket
    this.initSocket({ url: 'ws://ws.211aoa.com:8282' })
  },
  methods: {
    // 分页
    pagenatiOnchange(page) {
      this.page = page
      this.pusherList()
    },
    handleSizeChange(size) {
      this.per_page = size
      this.pusherList()
    },
    //banner
    async getBanner() {
      let res = await this.$api.getBanner()
      this.bannerList = res
    },
    //文章
    async articleList(cate_id, per_page, type) {
      // this.per_page = per_page;
      let params = {
        cate_id: cate_id,
        per_page: per_page ? per_page : this.per_page,
        page: this.page
      }
      let res = await this.$api.articleList(params)
      this.articleType[type] = res
    },
    // 焦点赛事
    async focusMatch() {
      let res = await this.$api.focusMatch()
      this.articleType['jiaodian'] = res.data
    },
    // 盘口分析
    async analyseList() {
      let res = await this.$api.analyseList()
      this.articleType['pankou'] = res.data
    },
    // 高手tab切换
    gaoshouTab(type) {
      if (type.name === 'peipan') {
        this.articleList(4, 15, 'peipan')
      } else if (type.name === 'liansai') {
        this.articleList(5, 15, 'liansai')
      } else if (type.name === 'gaoshou') {
        this.articleList(6, 15, 'gaoshou')
      }

      this.gaoshouType = type.name
    },
    async gaoshouAllList() {
      let params = {
        per_page: 15,
        page: this.page
      }
      let res = await this.$api.getThreeCateArticle(params)
      this.articleType['gaoshouAll'] = res
    },
    // 人气推手
    async hotPushers() {
      let res = await this.$api.hotPushers()
      this.pusherList = res.data.slice(0, 5)
    },
    // 积分榜
    async rankingList() {
      let res = await this.$api.rankingList()
      this.jifen = res
      console.log(this.jifen)
    },
    jifenTab(type) {
      this.jifenType = type.name
    },
    chooseArticle(article) {
      this.$store.commit('chooseArticle', article)
      this.$router.push({
        path: `/article`
      })
    },
    goPush(pusher) {
      this.$store.commit('choosePusher', pusher)
      this.$router.push({
        path: `/tuijianDetail`
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
p {
  line-height: 22px;
}
.title {
  font-size: 16px;
  padding: 0 10px;
  line-height: 36px;
  background: url('../assets/nav1.png');
  background-size: 100% 100%;
  span {
    font-size: 12px;
    cursor: pointer;
  }
  img {
    margin-right: 5px;
  }
}
.overflow {
  overflow: hidden;
  height: 88%;
}
.border {
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
}
.red {
  color: #d11d19 !important;
  font-weight: bold;
  cursor: pointer;
}
.icon-img {
  width: 90px;
  height: 90px;
}
.gaoshou {
  width: 100%;
  margin-top: 40px;
}
.pankou {
  height: 45px;
  line-height: 45px;
}
.zixun {
  height: 1150px;
  padding: 10px;
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
.con1 {
  width: 100%;
  height: 400px;
  margin-top: 40px;
  .div1 {
    width: 55%;
    height: 100%;
    margin-right: 30px;
  }
  .div2 {
    width: 42%;
    height: 100%;
    .list {
      padding: 10px;
      line-height: 30px;
      li {
        cursor: pointer;
      }
      span {
        display: inline-block;
        margin-right: 5px;
        width: 2px;
        height: 15px;
        background: #904a0c;
        vertical-align: middle;
      }
    }
  }
}
.con2 {
  width: 100%;
  height: 440px;
  margin-top: 40px;
  .div1 {
    width: 35%;
    height: 100%;
    margin-right: 30px;
    .title {
      margin-bottom: 10px;
      span {
        line-height: 45px;
      }
    }
    .list {
      padding: 14px 30px;
      text-align: center;
      .in-block {
        margin: 0 40px;
        vertical-align: top;
        text-align: center;
        p {
          line-height: 40px;
        }
      }
    }
  }
  .div2 {
    width: 62%;
    height: 100%;
    .zixun>div {
      margin-bottom: 15px;
      border-bottom: 1px solid #ddd;
      padding-bottom: 14px;
    }
  }
}
.con3 {
  width: 100%;
  height: 2600px;
  margin-top: 30px;
  .div1 {
    width: 67%;
    height: 100%;
    margin-right: 30px;
    .overflow {
      height: 94%;
      margin-bottom: 15px;
    }
  }
  .div2 {
    width: 30%;
    height: 100%;
    .renqi {
      width: 100%;
      height: 515px;
      .list {
        padding: 10px;
        text-align: center;
        &>div {
          border-bottom: 1px solid #ddd;
          padding: 10px 0;
        }
        p {
          font-size: 12px;
        }
      }
    }
    .jifen {
      width: 100%;
      height: 485px;
      margin-top: 30px;
      .list-content {
        padding: 10px;
        text-align: center;
        li {
          line-height: 33px;
          span {
            display: inline-block;
            vertical-align: middle;
            width: 15%;
          }
          .id {
            width: 40%;
            text-align: left;
          }
        }
        .jifen-num {
          span {
            color: #666;
          }
        }
      }
    }
    .avator {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #666;
    }
    .code {
      width: 45px;
      height: 45px;
      margin-right: 15px;
    }
    .title {
      line-height: 40px;
      height: 40px;
      box-sizing: border-box;
    }
  }
}
.div1 /deep/ .el-tabs__item {
  width: 60%;
  text-align: center;
  font-size: 16px;
}
.div1 /deep/ .el-tabs {
  line-height: 62px;
}
.div1 /deep/ .el-tabs__header {
  background: url('../assets/nav1.png');
  background-size: 100% 100%;
}
.div1 /deep/ .el-tabs__item.is-active, .div1 /deep/ .el-loading-text {
  color: #904a0c;
}
.div1 /deep/ .el-tabs__item.is-active:hover {
  color: #904a0c;
}
.div1 /deep/.el-tabs__active-bar {
  background-color: #904a0c;
}
.el-pagination {
  text-align: center;
  font-size: 16px;
}
/deep/ .el-pager li {
  font-size: 14px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.el-tabs--border-card {
  border: none;
  box-shadow: none;
}
.jifen /deep/ .el-tabs__item {
  padding: 0 13px;
}
.jifen /deep/ .el-tabs--border-card>.el-tabs__content {
  padding: 0;
}
</style>
