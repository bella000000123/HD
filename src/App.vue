<template>
  <div id="app">
    <Vheader></Vheader>
    <router-view />
    <Vfooter></Vfooter>
    <div class="code-wrapper">
      <p>请用 <span>手机浏览器</span></p>
      <p>扫描下载</p>
      <div class="code-box">
        <img :src="banners.code[0].image" alt="" />
      </div>
      <p>下载有惊喜</p>
    </div>
  </div>
</template>
<script>
import Vheader from '@/components/header.vue';
import Vfooter from '@/components/footer.vue';
import { mapState } from 'vuex';
export default {
  components: {
    Vheader,
    Vfooter
  },
  data() {
    return {
      icons: {
        float_bg: require('./assets/float_bg.png')
      }
    };
  },
  computed: {
    ...mapState(['banners'])
    // code() {
    //   return this.banners.code[0].image;
    // }
  },
  methods: {
    async getBanner() {
      let res = await this.$api.getBanner();
      this.$store.commit('getBanner', res);
    }
  },
  created() {
    this.getBanner();
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))));
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state));
    });
  }
};
</script>
<style lang="stylus" scoped>
#app {
  // background: url('./assets/back.png');
  background-color #EBEBEC
  background-size: 100% 100%;
  position relative

  .code-wrapper{
    position fixed;
    right:10px;
    top:300px;
    padding:15px 10px
    width:115px;
    height:200px;
    text-align center;
    z-index:10;
    background: url('./assets/float_bg.png') no-repeat;
    background-size: 100% 100%;
    color #fff;
    font-size 12px;
    span{
      color:#fff;
      font-size:16px;
      font-weight bold
    }
     .code-box {
            width:100px;
            height:100px;
            padding:1px;
            margin :10px auto;
            background:url(./assets/code-boder.png)
            background-size:100% 100%;
            img{
                display: block;
               margin: 0 auto;
               width:100%;
               height:100%
            }
          }

  }
}
</style>
