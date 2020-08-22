<template>
  <div class="fl1">
    <div class="in-block div2">
      <div class="jiaodian border back-white">
        <div class="title">
          <h1 class="in-block">焦点赛事</h1>
          <router-link to="/bifen" class="fr unl green" tag="span">
            更多比赛
            <img :src="icons.more" alt />
          </router-link>
        </div>
        <div class="list">
          <div v-for="(li, i) in jiaodian" :key="i" class="box">
            <div>
              <img :src="li.zhudui_image" alt class="icon-img" />
              <p>{{ li.home_name }}</p>
            </div>

            <div>
              <p>{{ li.match_name }}</p>
              <img :src="icons.vs" alt class="vs" />
              <p>{{ li.match_time }}</p>
            </div>
            <div>
              <img :src="li.kedui_image" alt class="icon-img" />
              <p>{{ li.away_name }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="renqi border back-white">
        <div class="title">
          <h1 class="in-block">人气推手</h1>
          <router-link to="/gaoshou" class="fr unl green" tag="span">
            更多推手
            <img :src="icons.more" alt />
          </router-link>
        </div>
        <div class="list">
          <div v-for="(li, i) in renqi" :key="i">
            <div class="box">
              <div>
                <img :src="li.avatar" alt class="avator" />
                <h2>{{ li.name }}</h2>
              </div>
              <div>
                <p class="p1" @click="goPush(li)">{{ li.tuijian_num }}篇推荐</p>
                <p>人气： {{ li.hot }}</p>
              </div>
              <div>
                <img :src="li.code_image" alt class="code" />
                <p>微信扫码了解</p>
              </div>
              <!-- <div class="box">
                <img :src="li.avatar" alt class="avator" />
                <div>
                  <h2>{{ li.name }}</h2>
                  <p>
                    <img :src="icons.hot" alt="icon" />
                    {{ li.hot }}
                  </p>
                </div>
              </div>-->
              <!-- <img :src="li.code_image" alt class="code" /> -->
            </div>
            <!-- <div class="box">
              <p class="red pusher" @click="goPush(li)">{{ li.tuijian_num }}篇推荐 [点击查看]</p>
              <p>微信扫码了解</p>
            </div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      icons: {
        renqi: require('../assets/renqi_icon.png'),
        hot: require('../assets/hot.png'),
        jiaodian: require('../assets//jiaodian_icon.png'),
        vs: require('../assets/bifen/vs.png'),
        more: require('../assets/more.png')
      },
      renqi: [],

      jiaodian: []
    };
  },
  methods: {
    async focusMatch() {
      let res = await this.$api.focusMatch();
      this.jiaodian = res.data.slice(0, 4);
    },
    // 人气推手
    async hotPushers() {
      let res = await this.$api.hotPushers();
      this.renqi = res.data.slice(0, 5);
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
    }
    // goPush(pusher) {
    //   this.$store.commit('choosePusher', pusher);
    //   this.$router.push({
    //     path: `/tuijianDetail`
    //   });
    // }
  },
  mounted() {
    // 焦点赛事
    this.focusMatch();
    // 人气推手
    this.hotPushers();
  },
  computed: {}
};
</script>
<style scoped lang="stylus">
.fl1 {
  width: 340px;
}
.unl {
  cursor: pointer;
}
.pusher {
  cursor: pointer;
}
.title {
  img {
    vertical-align: middle;
  }
}
.div2 {
  width: 100%;
  height: 100%;
  .jiaodian {
    width: 340px;
    height: 420px;
    .icon-img {
      width: 40px;
      height: 40px;
    }
    .vs {
      width: 15px;
      height: 10px;
    }
    .title {
      // margin-bottom: 10px;
      span {
        line-height: 45px;
      }
    }
    .list {
      padding: 14px ;
      text-align: center;
      .box{
        margin:20px 0
        div{
          width 33%
          p{
            font-size:12px
          }
        }
      }
      .in-block {
        margin: 0 20px;
        vertical-align: top;
        text-align: center;
        p {
          line-height: 40px;

        }
      }
    }
  }
  .renqi {
    width: 100%;
    height: 510px;
    margin-top: 40px;
    // text-align: center;
    h2 {
      color: #000;
      font-size: 12px;
    }
    .list {
      padding: 14px 20px;
      text-align: center;
      color: #797979;
      &>div {
        border-bottom: 1px solid #ddd;
        padding: 10px 0;
      }
      p {
        font-size: 12px;
      }
      .p1 {
        line-height: 40px;
        text-decoration: underline;
        cursor: pointer;
        &:hover {
          color: #8dc116;
        }
      }
    }
  }
  .avator {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #666;
  }
  .code {
    width: 45px;
    height: 45px;
    // margin-right: 15px;
  }
  .title {
    line-height: 40px;
    height: 40px;
    box-sizing: border-box;
    padding: 0 10px;
    background: url('../assets/jiaodian-back.png');
    background-size: 100% 100%;
    h1 {
      padding: 0 5px;
    }
  }
}
</style>
