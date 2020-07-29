<template>
  <div class="home">
    <div class="banner-box">
      <!-- banner -->
      <div class="con1">
        <div class="div1">
          <el-carousel height="400px">
            <el-carousel-item v-for="(li, i) in bannerList.banner" :key="i">
              <img :src="li.image" alt class="banner-img" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <div class="center con2 box">
      <div class="qingbao">
        <div class="qingbao-list title">
          <!-- <img :src="icons.qingbao" alt="icon" class="in-block" /> -->
          <span>情报中心</span>
        </div>
        <ul class="list">
          <li
            v-for="(li, i) in articleType['qingbao']['data']"
            :key="i"
            :class="[{ '': li.is_red == 1 }, 'box']"
            @click="chooseArticle(li)"
          >
            <span class="span1">{{ li.title }}</span>

            <span class="black">{{ li.time }}</span>
          </li>
        </ul>
        <div class="qingbao-list qingbao-list1">
          查看
          <router-link to="/qingbao" tag="span" class="green">更多情报>></router-link>
        </div>
      </div>
      <div class="imgs">
        <div class="div1">
          <el-carousel height="400px">
            <el-carousel-item v-for="(li, i) in qingbaoImg" :key="i">
              <img :src="li.image" alt class="banner-img" />
              <div class="desc" @click="chooseArticle(li)">{{ li.title }}</div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>

    <div class="center con3">
      <p class="title box">
        <span>焦点赛事</span>
        <span class="more">
          <span>查看更多</span>

          <img :src="icons.more" alt />
        </span>
      </p>
      <div>
        <div class="jiaodian-box in-block" v-for="(li, i) in articleType['jiaodian']" :key="i">
          <div class="box">
            <span>{{ li.match_name }}</span>
            <span>{{ li.match_time }}</span>
          </div>
          <div class="box jiaodian">
            <div>
              <img :src="li.zhudui_image" alt class="logo" />
              <!-- <img src="https://imgs.oss.cn-south-1.jcloudcs.com/league/20160525/20160525151248998_280x280.png" alt="" class="logo" /> -->
              <!-- <span>{{ li.zhudui_image }}</span> -->
            </div>
            <div class="tuijian">
              <!-- <img :src="icons.vs" alt="" /> -->
              <p class="vs">VS</p>
              <p>
                <span class="red">5</span>
                <span class="green">篇推荐</span>
              </p>
            </div>
            <div>
              <img :src="li.kedui_image" alt class="logo" />
              <!-- <img src="https://imgs.oss.cn-south-1.jcloudcs.com/league/20160525/20160525151248998_280x280.png" alt="" class="logo" /> -->
              <!-- <span>{{ li.home_team_name }}</span> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="center con4">
      <div class="box">
        <div class="renqi">
          <p class="title box">
            <span>人气推手</span>
            <span class="more">
              <router-link to="/gaoshou" class="unl" tag="span">查看更多</router-link>
              <img :src="icons.more" alt />
            </span>
          </p>
          <div class="in-block renqi-box" v-for="(li, i) in pusherList" :key="i">
            <div class="avatar-box">
              <img :src="li.avatar" alt class="avator" />
              <p>
                {{ li.name }}
                <span class="renqi-txt">
                  （
                  <img :src="icons.hot" alt="icon" />
                  {{ li.hot}}）
                </span>
              </p>
            </div>
            <div class="box">
              <img :src="li.code_image" alt class="code" />
              <div class="guanzhu-box">
                <p class="guanzhu" @click="doFollowPusher(li.id)">
                  <span v-if="li.is_follow">
                    <img :src="icons.guanzhu2" alt /> 已关注
                  </span>
                  <span v-else>
                    <img :src="icons.guanzhu1" alt />关注
                  </span>
                </p>
                <p class="more" @click="goPush(li)">更多推荐</p>
              </div>
            </div>
            <p class="green">立即扫码，专业推荐</p>
          </div>
        </div>

        <div class="jifen border back-white">
          <div class="title">
            <!-- <img :src="icons.jifen" alt="icon" class="in-block" /> -->
            <h1 class="in-block">积分榜</h1>
          </div>
          <div class="list">
            <el-tabs type="border-card" v-model="jifenType" @tab-click="jifenTab">
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
              <li v-for="(li, i) in jifen" :key="i" class="jifen-num">
                <span class="id">{{ i+1 }} {{ li.team_name }}</span>
                <span>{{ li.winTotal }}</span>
                <span>{{ li.drawTotal }}</span>
                <span>{{ li.lossTotal }}</span>
                <span class="red">{{ li.pointsTotal }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="center con5">
      <p class="title gaoshou-title">高手攻略</p>
      <div class="gaoshou-box box">
        <div class="gaoshou">
          <div class="gaoshou-logo gaoshou-logo1">赔盘技巧</div>
          <span class="more" @click="goto('peipan')">
            <span>查看更多</span>
            <img :src="icons.more" alt />
          </span>
          <div class="imgs">
            <el-carousel height="200px" indicator-position="none">
              <el-carousel-item v-for="(li, i) in articleType['peipan']" :key="i">
                <img :src="li.image" alt class="banner-img" />
                <div class="desc" @click="chooseArticle(li)">{{ li.title }}</div>
              </el-carousel-item>
            </el-carousel>
          </div>
          <ul>
            <li v-for="(li, i) in articleType['peipan']" :key="i">
              <img :src="icons.right" alt />
              <span class="title span1" @click="chooseArticle(li)">{{ li.title }}</span>
              <span class="time">{{ li.time }}</span>
            </li>
          </ul>
        </div>
        <div class="gaoshou">
          <!-- <img :src="icons.gaoshou1" alt="" class="gaoshou-logo" /> -->
          <div class="gaoshou-logo gaoshou-logo2">联赛攻略</div>
          <span class="more" @click="goto('liansai')">
            <span>查看更多</span>
            <img :src="icons.more" alt />
          </span>
          <div class="imgs">
            <el-carousel height="200px" indicator-position="none">
              <el-carousel-item v-for="(li, i) in articleType['liansai']" :key="i">
                <img :src="li.image" alt class="banner-img" />
                <div class="desc" @click="chooseArticle(li)">{{ li.title }}</div>
              </el-carousel-item>
            </el-carousel>
          </div>
          <ul>
            <li v-for="(li, i) in articleType['liansai']" :key="i">
              <img :src="icons.right" alt />
              <span class="title span1" @click="chooseArticle(li)">{{ li.title }}</span>
              <span class="time">{{ li.time }}</span>
            </li>
          </ul>
        </div>
        <div class="gaoshou">
          <div class="gaoshou-logo gaoshou-logo3">高手心得</div>
          <span class="more" @click="goto('gonglue')">
            <span>查看更多</span>
            <img :src="icons.more" alt />
          </span>
          <div class="imgs">
            <el-carousel height="200px" indicator-position="none">
              <el-carousel-item v-for="(li, i) in articleType['gaoshou']" :key="i">
                <img :src="li.image" alt class="banner-img" />
                <div class="desc" @click="chooseArticle(li)">{{ li.title }}</div>
              </el-carousel-item>
            </el-carousel>
          </div>
          <ul>
            <li v-for="(li, i) in articleType['gaoshou']" :key="i">
              <img :src="icons.right" alt />
              <span class="title span1" @click="chooseArticle(li)">{{ li.title }}</span>
              <span class="time">{{ li.time }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="con6 center box">
      <div>
        <img :src="icons.quan" alt />
        <p>全球上千类体育</p>
        <p>赛事资料全网罗</p>
      </div>
      <div>
        <img :src="icons.quan" alt />
        <p>每日几百场比分</p>
        <p>比分信息瞬间掌握</p>
      </div>
      <div>
        <img :src="icons.quan" alt />
        <p>各类赔率数据</p>
        <p>变化时时更新</p>
      </div>
      <div>
        <img :src="icons.quan" alt />
        <p>不间断提供</p>
        <p>各类数据</p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
// import jifen from "@/components/jifen.vue";

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
        vs: require('../assets/vs.png'),
        more: require('../assets/more.png'),
        right: require('../assets/right.png'),
        gaoshou1: require('../assets/gaoshou1.png'),
        gaoshou2: require('../assets/gaoshou2.png'),
        gaoshou3: require('../assets/gaoshou3.png'),
        quan: require('../assets/quan.png'),
        guanzhu1: require('../assets/guanzhu1.png'),
        guanzhu2: require('../assets/guanzhu2.png')
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
      activeName: 'all',
      type: 0
    };
  },
  mounted() {
    this.getBanner();
    // 情报中心
    this.articleList(3, 11, 'qingbao');
    // 焦点赛事
    this.focusMatch();
    // 盘口分析
    // this.analyseList();
    // 赔盘
    // this.articleList(4, 15, 'peipan');
    // 人气推手
    this.hotPushers();
    // 积分榜
    this.rankingList(9);
    // 高手全部
    // this.gaoshouAllList(15);
    //赔pan
    this.articleList(4, 15, 'peipan');
    this.articleList(5, 15, 'liansai');
    this.articleList(6, 15, 'gaoshou');
  },
  methods: {
    // 分页

    handleSizeChange(size) {
      this.per_page = size;
      this.articleList();
    },
    //banner
    async getBanner() {
      let res = await this.$api.getBanner();
      this.bannerList = res;
    },
    //文章
    async articleList(cate_id, per_page, type) {
      // this.per_page = per_page;
      let params = {
        cate_id: cate_id,
        per_page: per_page ? per_page : this.per_page,
        page: this.page
      };
      let res = '';
      if (cate_id == 4 || cate_id == 5 || cate_id == 6) {
        let res1 = await this.$api.articleList(params);
        res = res1.data.slice(0, 10);
      } else {
        res = await this.$api.articleList(params);
      }
      this.articleType[type] = res;
    },
    // 焦点赛事
    async focusMatch() {
      let res = await this.$api.focusMatch();
      this.articleType['jiaodian'] = res.data.slice(0, 6);
    },
    // 盘口分析
    async analyseList() {
      let res = await this.$api.analyseList();
      this.articleType['pankou'] = res.data;
    },

    // 人气推手
    async hotPushers() {
      let res = await this.$api.hotPushers();
      this.pusherList = res.data.slice(0, 9);
    },
    // 积分榜
    // 澳超：49
    // 意甲：15
    // 英超：9
    // 西甲：3
    // 德甲：
    // 中超：
    async rankingList(id) {
      let res = await this.$api.rankingList({ tournament_id: id });
      this.jifen = res;
    },
    jifenTab(type) {
      if (type.name == 'yingchao') {
        this.rankingList(9);
      } else if (type.name == 'aochao') {
        this.rankingList(49);
      } else if (type.name == 'yijia') {
        this.rankingList(15);
      } else if (type.name == 'xijia') {
        this.rankingList(3);
      } else if (type.name == 'dejia') {
        this.rankingList(9);
      } else if (type.name == 'zhongchao') {
        this.rankingList(9);
      }
      this.jifenType = type.name;
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
      // this.$router.push({
      //   path: `/tuijianDetail`
      // });
    },
    goto(path) {
      this.$router.push({
        path: `/${path}`
      });
    },
    async doFollowPusher(id) {
      let res = await this.$api.doFollowPusher({ id: id });
      this.hotPushers();
    }
  },
  computed: {
    qingbaoImg() {
      let list = [];
      if (this.articleType['qingbao']['data'] && this.articleType['qingbao']['data'].length > 0) {
        list = this.articleType['qingbao']['data'].slice(0, 5);
      }
      return list;
    }
  }
};
</script>
<style lang="stylus" scoped>
.home {
  color: #797979;
  .span1 {
    display: inline-block;
    width: 380px;
    margin-right: 20px;
    overflow: hidden; // 超出的文本隐藏
    text-overflow: ellipsis; // 溢出用省略号显示
    white-space: nowrap; // 溢出不换行
    &:hover {
      transition: all 0.4s;
      transform: scale(1.04);
      color: #91c619 !important;
      font-weight: bold;
    }
  }
  .green {
    color: #91c619;
  }
  .black {
    color: #797979;
  }
  .banner-box {
    width: 1300px;
    margin: 0 auto;
    .con1 {
      // font-size 0
    }
    img {
      width: 100%;
      height: 400px;
    }
  }
  .con2 {
    margin-top: 30px;
    height: 400px;
    overflow: hidden;
    .qingbao {
      width: 500px;
      height: 400px;
      background-color: #fff;
      .qingbao-list {
        padding: 10px;
        background-color: #F3F2F2;
        background: url('../assets/jiaodian-back.png') no-repeat;
        background-size: 100% 100%;
      }
      .qingbao-list1 {
        color: #797979;
        text-align: center;
        cursor: pointer;
        span {
          text-decoration: underline;
        }
      }
      ul {
        height: 300px;
        padding: 10px;
        overflow: hidden;
        li {
          padding: 7px 0;
          cursor: pointer;
        }
      }
    }
    .imgs {
      width: 700px;
      margin-left: 20px;
      img {
        width: 100%;
        height: 400px;
      }
      .div1 {
        position: relative;
      }
    }
  }
  .desc {
    height: 50px;
    line-height: 50px;
    width: 100%;
    padding: 0 10px;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    overflow: hidden; // 超出的文本隐藏
    text-overflow: ellipsis; // 溢出用省略号显示
    white-space: nowrap; // 溢出不换行
  }
  .title {
    padding: 0 10px;
    color: #000;
    cursor: pointer;
    .more {
      color: #91c619;
      text-decoration: underline;
    }
    img {
      vertical-align: top;
    }
  }
  .con3 {
    margin-top: 50px;
    .logo {
      width: 50px;
      height: 50px;
    }
    .jiaodian-box {
      width: 29%;
      margin: 10px;
      padding: 15px;
      background-color: #fff;
      border-radius: 5px;
      .jiaodian {
        padding: 30px 0 10px;
        .tuijian {
          text-align: center;
          .vs {
            font-weight: bold;
          }
        }
      }
    }
  }
  .con4 {
    margin-top: 50px;
    height: 720px;
    .jifen {
      width: 390px;
      height: 580px;
      margin-top: 30px;
      .title {
        text-align: center;
        line-height: 40px;
        border-bottom: 1px solid #91c619;
      }
      .list-content {
        padding: 10px;
        text-align: center;
        li {
          line-height: 40px;
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
            color: #797979;
          }
        }
      }
    }
    .renqi {
      width: 800px;
      .renqi-box {
        width: 27%;
        margin: 10px;
        padding: 15px;
        background-color: #fff;
        border-radius: 5px;
        text-align: center;
        p {
          line-height: 27px;
        }
        .box {
          width: 160px;
          margin: 5px auto 0;
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
              background-color: #91c619;
              color: #fff;
            }
            .guanzhu {
              border: 1px solid #91c619;
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
  }
  .con5 {
    margin-top: 50px;
    .gaoshou-title {
      line-height: 40px;
    }
    .desc {
      line-height: 40px;
      height: 40px;
      bottom: 20px;
      font-size: 14px;
    }
    .gaoshou {
      width: 385px;
      padding: 65px 10px 30px;
      background: #fff;
      box-sizing: border-box;
      border-radius: 5px;
      position: relative;
      color: #797979;
      .more {
        position: absolute;
        right: 12px;
        top: 20px;
        color: #91c619;
        cursor: pointer;
        img {
          vertical-align: top;
        }
      }
      .gaoshou-logo {
        width: 130px;
        height: 40px;
        line-height: 30px;
        text-align: center;
        position: absolute;
        top: 15px;
        left: -10px;
        color: #fff;
      }
      .gaoshou-logo1 {
        background: url('../assets/gaoshou1.png') no-repeat;
      }
      .gaoshou-logo2 {
        background: url('../assets/gaoshou2.png') no-repeat;
      }
      .gaoshou-logo3 {
        background: url('../assets/gaoshou3.png') no-repeat;
      }
      li {
        line-height: 25px;
        img {
          vertical-align: top;
        }
      }
      .imgs {
        img {
          width: 100%;
          height: 180px;
          border-radius: 5px;
        }
      }
      .title {
        display: inline-block;
        width: 220px;
        margin-right: 20px;
        overflow: hidden; // 超出的文本隐藏
        text-overflow: ellipsis; // 溢出用省略号显示
        white-space: nowrap; // 溢出不换行
        color: #797979;
      }
    }
  }
  .con6 {
    box-sizing: border-box;
    margin: 50px auto;
    padding: 50px;
    background-color: #fff;
    text-align: center;
    img {
      width: 70px;
      height: 70px;
    }
    p {
    }
  }
  .con2 /deep/ .el-carousel__indicators--horizontal {
    bottom: 0;
    left: 590px;
  }
  .con2 /deep/ .el-carousel__button {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  .con4 /deep/ .el-tabs__item {
    padding: 0 13px;
  }
  .con4 /deep/ .el-tabs--border-card>.el-tabs__content {
    padding: 0;
  }
  .con4 /deep/.el-tabs--border-card {
    border: 0;
    box-shadow: none;
  }
}
</style>
