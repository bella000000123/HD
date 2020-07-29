<template>
  <div class="footer">
    <div class="center box">
      <div class="div1">
        <div>
          <img :src="icons.link" alt />
          <span class="green">友情链接</span>
        </div>
      </div>
      <div class="div2">
        <div>
          <img :src="icons.map" alt />
          <span class="green">网站地图</span>
        </div>
        <ul class="ul1 box">
          <router-link tag="li" to="/bifen" exact>即时比分</router-link>
          <router-link tag="li" to="/soccer" exact>足球推荐</router-link>
          <router-link tag="li" to="/qingbao" exact>情报中心</router-link>
          <router-link tag="li" to="/gaoshou" exact>高手排行</router-link>
        </ul>
        <div>
          <img :src="icons.mail" alt />
          <span class="green">联系方式</span>
        </div>
        <ul class="ul2">
          <li>客服qq：333333</li>
          <li>客服电话：333333</li>
        </ul>
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
        link: require('../assets/link.png'),
        map: require('../assets/map.png'),
        mail: require('../assets/mail.png')
      }
    };
  },
  methods: {},
  created() {},
  computed: {}
};
</script>
<style scoped lang="stylus">
.footer {
  width: 100%;
  margin-top: 50px;
  // height: 200px;
  padding: 50px;
  background: #141414;
  color: #fff;
  box-sizing: border-box;
  .green {
    color: #91c619;
  }
  img {
    margin-right: 10px;
    vertical-align: middle;
    width: 30px;
    height: 30px;
  }
  .div2 {
    .ul1 {
      padding-left: 30px;
      li {
        border: 1px solid #fff;
      }
    }
    .ul2 {
      padding-left: 10px;
    }
    ul {
      margin: 10px auto 30px;
      li {
        padding: 5px 20px;
        margin: 5px;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
}
</style>
