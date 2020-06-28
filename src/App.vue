<template>
  <div id="app">
    <Vheader></Vheader>
    <router-view />
    <Vfooter></Vfooter>
  </div>
</template>
<script>
import Vheader from "@/components/header.vue";
import Vfooter from "@/components/footer.vue";
export default {
  components: {
    Vheader,
    Vfooter
  },
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  }
};
</script>
<style lang="stylus">
#app {
  background: url('./assets/back.png');
  background-size: 100% 100%;
}
</style>
