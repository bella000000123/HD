<template>
  <header>
    <div class="center">
      <img src alt="LOGO" />
      <ul>
        <router-link v-for="(li, i) in nav" :key="i" tag="li" :to="li.link" exact>{{ li.title }}</router-link>
        <li class="login" @click="show('show_user')">登录</li>
        <li class="reg" @click="show('show_reg')">注册</li>
      </ul>
      <ul></ul>
    </div>
    <login :show_reg="show_reg" :show_user="show_user" :dialogVisible="dialogVisible" @close="close" @user_reg="user_reg"></login>
  </header>
</template>

<script>
import login from '@/components/regLog.vue'
export default {
  name: 'Header',
  components: {
    login
  },
  data() {
    return {
      nav: [
        {
          title: '首页',
          link: '/home'
        },
        {
          title: '即时比分',
          link: '/bifen'
        },
        {
          title: '足球推荐',
          link: '/soccer'
        },
        {
          title: '篮球推荐',
          link: '/basketball'
        },
        {
          title: '情报中心',
          link: '/qingbao'
        },
        {
          title: '高手排行',
          link: '/gaoshou'
        }
      ],
      dialogVisible: false,
      show_reg: false,
      show_user: false
    }
  },

  mounted() {},
  methods: {
    show(param) {
      this.dialogVisible = true
      this[param] = true
    },
    user_reg(param1, param2) {
      this[param1] = true
      this[param2] = false
    },
    close() {
      this.dialogVisible = false
      this.show_reg = false
      this.show_user = false
    }
  }
}
</script>
<style lang="stylus" scoped>
header {
  background: url('../assets/nav.png');
  background-size: 100% 100%;
  height: 90px;
}
.center {
  box-sizing: border-box;
  padding: 0 20px;
  height: 100%;
  line-height: 90px;
  img {
    display: inline-block;
    width: 11%;
    height: 100%;
    vertical-align: middle;
  }
  ul {
    width: 85%;
    height: 100%;
    display: inline-block;
    vertical-align: middle;
    li {
      font-size: 16px;
      text-align: center;
      display: inline-block;
      width: 14%;
      height: 100%;
      cursor: pointer;
      position: relative;
    }
    li::after {
      position: absolute;
      content: '';
      top: 96%;
      left: 0;
      width: 100%;
      height: 2px;
      background: #d11d19;
      transform: scaleX(0);
      transition: 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
    .login {
      width: 70px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: #904A0C;
      color: #fff;
      border-radius: 15px;
      margin-right: 10px;
      font-size: 14px;
    }
    .reg {
      width: 70px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #904A0C;
      border: 1px solid #904A0C;
      border-radius: 15px;
      font-size: 14px;
    }
  }
  .router-link-active {
    color: #d11d19;
  }
  .router-link-active:after {
    transform: scaleX(0.5);
  }
}
</style>
