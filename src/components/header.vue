<template>
  <header>
    <div class="center">
      <img :src="logo.image" alt="LOGO" />
      <ul>
        <router-link v-for="(li, i) in nav" :key="i" tag="li" :to="li.link" exact>{{ li.title }}</router-link>
        <li class="login" @click="show1" v-if="!isLogin">登录</li>
        <li class="reg" @click="show2" v-if="!isLogin">注册</li>
        <li class="login-box" v-if="isLogin">
          <img :src="userInfo.avatar ? userInfo.avatar : icons.avatar" alt />
          <div>
            <p>{{ userInfo.username }}</p>
            <router-link class="green" tag="p" to="/user">用户中心</router-link>
          </div>
          <span class="logout" v-if="isLogin" @click="logout">退出</span>
        </li>
      </ul>
    </div>
    <reg v-if="showReg"></reg>
    <login v-if="showLogin"></login>
    <!-- <login
      :show_reg="show_reg"
      :show_user="show_user"
      :dialogVisible="dialogVisible"
      @close="close"
      @user_reg="user_reg"
    ></login>-->
  </header>
</template>

<script>
import { mapState } from 'vuex';

import reg from '@/components/reg.vue';
import login from '@/components/login.vue';
export default {
  name: 'Header',
  components: {
    login,
    reg
  },
  data() {
    return {
      icons: {
        avatar: require('../assets/avatar.png')
      },
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
      show_reg: false,

      dialogVisible: false,
      show_user: false
      // logo: ''
    };
  },

  mounted() {
    // this.getBanner();
  },
  methods: {
    show1() {
      this.$store.commit('setShowLogin', true);
    },
    show2() {
      this.$store.commit('setShowReg', true);
    },

    user_reg(param1, param2) {
      this[param1] = true;
      this[param2] = false;
    },
    // close() {
    //   // this.dialogVisible = false;
    //   this.show_reg = false;
    //   this.$store.commit('showLogin', false);
    // },
    //banner
    async getBanner() {
      let res = await this.$api.getBanner();
      this.$store.commit('getBanner', res);
      this.logo = res.logo[0];
    },
    async logout() {
      let res = await this.$api.logOut();
      if (res.code == 1) {
        this.$store.commit('setUserinfo', {});
        this.$store.commit('setLogin', false);
        this.$store.commit('setToken', '');
        this.$router.push('/home');
      }
    }
  },
  computed: {
    ...mapState(['isLogin', 'userInfo', 'showLogin', 'showReg', 'banners']),
    logo() {
      return this.banners.logo[0];
    }
  }
};
</script>
<style lang="stylus" scoped>
header {
  // background: url('../assets/nav.png');
  background #1d2029
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
    // height: 100%;
    vertical-align: middle;
  }
  ul {
    width: 85%;
    height: 100%;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    li {
      font-size: 16px;
      text-align: center;
      display: inline-block;
      width: 14%;
      height: 100%;
      cursor: pointer;
      position: relative;
      color: #fff;
    }
    li::after {
      position: absolute;
      content: '';
      top: 96%;
      left: 0;
      width: 100%;
      height: 2px;
      // background: #d11d19;
      transform: scaleX(0);
      transition: 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
    .login {
      margin-right: 10px;
    }
    .reg, .login {
      width: 70px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #8dc116;
      border: 1px solid #8dc116;
      border-radius: 5px;
      font-size: 14px;
    }
    .login-box {
      position: absolute;
      right: 39px;
      top: 25px;
      height: 50px;
      line-height: 50px;
      .logout {
        padding: 0 15px;
        border-radius: 5px;
        background-color: #9dc543;
        position: absolute;
        right: -55px;
        top: 6px;
        height: 30px;
        line-height: 30px;
      }
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        vertical-align: top;
      }
      div {
        display: inline-block;
        p {
          width: 70px;
          overflow: hidden; // 超出的文本隐藏
          text-overflow: ellipsis; // 溢出用省略号显示
          white-space: nowrap; // 溢出不换行
          line-height: 20px;
          cursor: pointer;
        }
      }
    }
  }
  .router-link-active {
    color: #8dc116;
  }
  .router-link-active:after {
    transform: scaleX(0.5);
  }
}
</style>
