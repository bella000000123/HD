<template>
  <div class="user">
    <div class="center box">
      <div class="left">
        <div class="in-block avatar-box">
          <img :src="userInfo.avatar?userInfo.avatar:icons.avatar" alt />
          <p>{{userInfo.username}}</p>
        </div>

        <hr />
        <ul class="tree">
          <router-link
            tag="li"
            v-for="(li,i) in navs"
            :key="i"
            :to="li.path"
            @click="go(li.path)"
            :class="{active:active==i}"
          >
            <div class="children">{{li.title}}</div>
          </router-link>
        </ul>
      </div>
      <div class="right">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  components: {},
  data() {
    return {
      icons: {
        avatar: require('../assets/avatar.png')
      },
      navs: [
        {
          title: '基本资料',
          path: '/user/info'
        },
        {
          title: '修改密码',
          path: '/user/password'
        },
        {
          title: '修改手机号',
          path: '/user/phone'
        },
        {
          title: '我的关注',
          path: '/user/follow'
        }
      ]
    };
  },
  methods: {
    go(path) {
      this.$router.push({ path: `/user/${path}` });
    },
    async articleList(page, per_page) {
      let params = {
        cate_id: 1,
        per_page: per_page,
        page: page
      };
      let res = await this.$api.articleList(params);
      this.zixun = res;
    }
  },
  mounted() {},
  computed: {
    active() {
      let val = 0;
      if (this.$route.path.indexOf('password') != -1) {
        val = 1;
      } else if (this.$route.path.indexOf('phone') != -1) {
        val = 2;
      } else if (this.$route.path.indexOf('follow') != -1) {
        val = 3;
      }
      return val;
    },
    ...mapState(['userInfo'])
  }
};
</script>
<style scoped lang="stylus">
.user {
  margin-top: 30px;
  height: 800px;
  color: #fff;
  .active {
    background-color: #9dc543;
    color: #fff;
  }
  .center {
    height: 100%;
  }
  .left {
    width: 200px;
    height: 100%;
    background-color: #1C1F29;
    text-align: center;
    .avatar-box {
      padding: 30px 0 10px;
      img {
        widows: 70px;
        height: 70px;
        border-radius: 50%;
      }
    }
    hr {
      width: 100%;
      height: 1px;
      background: #fff;
    }
    ul {
      padding-top: 20px;
      li {
        line-height: 30px;
        margin: 10px 0;
        cursor: pointer;
      }
    }
  }
  .right {
    width: 1000px;
    height: 100%;
    padding: 30px 40px 0;
    color: #000;
    background-color: #fff;
    box-sizing: border-box;
  }
}
</style>
