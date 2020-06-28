<template>
  <div class="soccer">
    <div class="center clearfix">
      <div class="bread">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>篮球推荐</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="fl zixun">
        <div v-for="(li,i) in zixun.data" :key="i">
          <img :src="li.image" alt class="icon-img" />
          <div class="pankou-list" @click="chooseArticle(li)">
            <h2>{{li.title}}</h2>
            <p>{{li.introduction}}</p>
            <p>·{{li.time}}</p>
          </div>
        </div>

        <!-- 翻页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="pagenatiOnchange"
          :current-page="page"
          :page-size="15"
          layout="prev, pager, next, jumper"
          :total="zixun['total']"
          background
        ></el-pagination>
      </div>
      <jifen></jifen>
    </div>
  </div>
</template>

<script>
import jifen from "@/components/jifen.vue";
export default {
  components: {
    jifen
  },
  data() {
    return {
      zixun: [],
      page: 1, // 初始页码
      per_page: 20
    };
  },
  methods: {
    async articleList() {
      let params = {
        cate_id: 2,
        per_page: this.per_page,
        page: this.page
      };
      let res = await this.$api.articleList(params);
      this.zixun = res;
    },
    // 分页
    pagenatiOnchange(page) {
      this.page = page;
      this.pusherList();
    },
    handleSizeChange(size) {
      this.per_page = size;
      this.pusherList();
    },
    chooseArticle(article) {
      this.$store.commit("chooseArticle", article);
      this.$router.push({
        path: `/article`
      });
    }
  },
  mounted() {
    this.articleList();
  },
  computed: {}
};
</script>
<style scoped lang='stylus'>
.soccer {
  // height: 1200px;
  .bread {
    padding: 30px 10px 15px;
  }
  .zixun {
    height: 100%;
    padding: 10px 20px;
    width: 65%;
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
}
.el-pagination {
  text-align: center;
  font-size: 16px;
}
</style>