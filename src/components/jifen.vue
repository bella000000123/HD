<template>
  <div class="fl">
    <div class="in-block div2">
      <div class="jiaodian border back-white">
        <div class="title">
          <img :src="icons.jiaodian" alt="icon" class="in-block" />
          <h1 class="in-block">焦点赛事</h1>
          <router-link to="/jiaodian" class="fr unl" tag="span">查看更多</router-link>
        </div>
        <div class="list">
          <div v-for="(li,i) in jiaodian" :key="i">
            <img :src="li.zhudui_image" alt class="icon-img" />
            <div class="in-block">
              <p>{{li.match_name}}</p>
              <img :src="icons.vs" alt />
              <p>{{li.match_time}}</p>
            </div>
            <img :src="li.kedui_image" alt class="icon-img" />
          </div>
        </div>
      </div>
      <div class="renqi border back-white">
        <div class="title">
          <img :src="icons.renqi" alt="icon" class="in-block" />
          <h1 class="in-block">人气推手</h1>
          <router-link to="/gaoshou" class="fr unl" tag="span">查看更多</router-link>
        </div>
        <div class="list">
          <div v-for="(li,i) in renqi" :key="i">
            <div class="box">
              <div class="box">
                <img :src="li.avatar" alt class="avator" />
                <div>
                  <h2>{{li.name}}</h2>
                  <p>
                    <img :src="icons.hot" alt="icon" />
                    {{li.hot}}
                  </p>
                </div>
              </div>
              <img :src="li.code_image" alt class="code" />
            </div>
            <div class="box">
              <p class="red pusher" @click="goPush(li)">{{li.tuijian_num}}篇推荐 [点击查看]</p>
              <p>微信扫码了解</p>
            </div>
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
        renqi: require("../assets/renqi_icon.png"),
        hot: require("../assets/hot.png"),
        jiaodian: require("../assets//jiaodian_icon.png"),
        vs: require("../assets/vs.png")
      },
      renqi: [],

      jiaodian: []
    };
  },
  methods: {
    async focusMatch() {
      let res = await this.$api.focusMatch();
      this.jiaodian = res.data.slice(0, 3);
    },
    // 人气推手
    async hotPushers() {
      let res = await this.$api.hotPushers();
      this.renqi = res.data.slice(0, 5);
    },
    goPush(pusher) {
      this.$store.commit("choosePusher", pusher);
      this.$router.push({
        path: `/tuijianDetail`
      });
    }
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
.fl {
  width: 360px;
}
.unl {
  cursor: pointer;
}
.pusher {
  cursor: pointer;
}
.div2 {
  width: 100%;
  height: 100%;
  .jiaodian {
    width: 100%;
    height: 380px;
    .icon-img {
      width: 80px;
      height: 80px;
    }
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
    height: 485px;
    margin-top: 30px;
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
    padding: 0 10px;
    background: url('../assets/nav1.png');
    background-size: 100% 100%;
    h1 {
      padding: 0 5px;
    }
  }
}
</style>