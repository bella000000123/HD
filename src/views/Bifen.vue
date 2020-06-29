<template>
  <div class="bifen center">
    <!-- <img :src="icons.banner" alt="盈利" class="banner" /> -->
    <div class="wrapper">
      <el-tabs v-model="tabType" @tab-click="chooseTab">
        <el-tab-pane label="比分" name="now"></el-tab-pane>
        <el-tab-pane label="完场" name="finish"></el-tab-pane>
        <el-tab-pane label="赛程" name="future"></el-tab-pane>
      </el-tabs>
      <div class="con box">
        <div class="div1" v-if="tabType == 'now'">
          <span :class="['btn', { btn1: !chooseAll }]" @click="getPartMatches">精简</span>
          <span :class="['btn', { btn1: chooseAll }]" @click="getAllMatches">完整</span>
          <span>
            共
            <span class="red">{{ total }}</span> 场
          </span>
          <span>
            隐藏
            <span class="red">0</span> 场
          </span>
        </div>
        <div class="div1 time-box" v-else>
          <p @click="toggleDate">
            <img :src="icons.date" alt="日期" />
            {{ checkedDate ? checkedDate : dateList[0] }}
            <img :src="icons.down" alt="日期" />
          </p>
          <div v-show="showDate">
            <p v-for="(li, i) in dateList" :key="i" @click="checkDate(li)">
              {{ li }}
            </p>
          </div>
        </div>
        <div class="div2">
          <span v-for="(item, i) in ups" :key="i" @click="up(i)" :class="{ red: nowUp === i }">
            {{ item }}
            <i :class="['icon', nowUp === i ? 'up' : 'down']"></i>
          </span>
        </div>
        <div class="div3">
          <el-input placeholder="请输入要搜索的赛事或球队" v-model="search">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </div>
      <ul class="checks" v-show="nowUp !== ''">
        <li v-for="(li, i) in 100" :key="i">{{ li }}</li>
      </ul>
      <div class="table">
        <el-table ref="multipleTable" :data="showMatches" tooltip-effect="dark" style="width: 100%" v-loading="loading">
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column label="赛事" width="120">
            <template slot-scope="scope">
              <img :src="scope.row.tournament_logo_url" alt="图标" class="logo" />
              <span>{{ scope.row.tournament_alias }}</span>
            </template>
          </el-table-column>
          <el-table-column label="时间" width="110">
            <template slot-scope="scope">{{ scope.row.match_time }}</template>
          </el-table-column>
          <el-table-column label="状态" width="80">
            <template slot-scope="scope">
              <span :class="[scope.row.status == 3 ? 'red' : '']">{{ scope.row.status_name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="home_team_name" label="主队" width></el-table-column>
          <el-table-column abel="比分" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.status != 1" class="red">
                <span class="red-card" v-show="scope.row.red1">{{ scope.row.red1 }}</span>
                <span class="yellow-card" v-show="scope.row.yellow1">{{ scope.row.yellow1 }}</span>
                {{ scope.row.home_team_score + '-' + scope.row.away_team_score }}
                <span class="yellow-card" v-show="scope.row.yellow2">{{ scope.row.yellow2 }}</span>

                <span class="red-card" v-show="scope.row.red2">{{ scope.row.red2 }}</span>
              </span>
              <img :src="icons.vs" v-else class="vs-icon" />
            </template>
          </el-table-column>
          <el-table-column prop="away_team_name" label="客队" width></el-table-column>
          <el-table-column label="半场" width>
            <template slot-scope="scope">
              <span>{{ scope.row.score1 }}-{{ scope.row.score2 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="角球" width>
            <template slot-scope="scope">
              <img :src="icons.corner" v-show="scope.row.corner1 || scope.row.corner2" alt />
              <span>{{ scope.row.corner1 }}-{{ scope.row.corner2 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="指数" width="250">
            <template slot-scope="scope">
              <p class="zhishu">
                <span v-for="(li, i) in scope.row.yapan" :key="i">{{ li }}</span>
              </p>
              <p class="zhishu">
                <span v-for="(li, i) in scope.row.daxiao" :key="i">{{ li }}</span>
              </p>
            </template>
          </el-table-column>
          <el-table-column label="数据" width="60">
            <template slot-scope="scope">
              <span @click="chooseMatch(scope.row)" class="fenxi red">分析</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="置顶" width="60">
            <template slot-scope="scope">
              <img :src="icons.top" alt @click="setTop(scope)" class="set-top" />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <ul class="sidebar">
        <li>
          <img :src="icons.show" alt />
          <p>显示</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import WebSocketUtil from '@/utils/WebSocketUtil.js'
import odds from '../common/odds'
export default {
  components: {},
  data() {
    return {
      icons: {
        banner: require('../assets/bifen/banner.png'),
        hidden: require('../assets/bifen/hidden.png'),
        show: require('../assets/bifen/show.png'),
        save: require('../assets/bifen/save.png'),
        top: require('../assets/bifen/top.png'),
        vs: require('../assets/vs.png'),
        corner: require('../assets/bifen/corner.png'),
        date: require('../assets/bifen/date.png'),
        down: require('../assets/bifen/down.png')
      },
      tabType: 'now',
      ups: ['选择公司', '选择赛事', '选择盘路'],
      nowUp: '',

      multipleSelection: [],
      search: '',
      matchList: [],
      unBegin: [],
      begin: [],
      end: [],
      chooseAll: false,
      loading: true,
      // 时间选择
      before7d: [],
      after7d: [],
      dateList: [],
      checkedDate: '',
      showDate: false
    }
  },
  methods: {
    //选择日期
    chooseTab(type) {
      this.tabType = type.name
      this.before7d = []
      this.after7d = []
      this.checkedDate = ''
      if (type.name === 'finish') {
        this.get7day(true, this.before7d)
        this.dateList = this.before7d
        let date = this.checkedDate.split(' ')[0] ? this.checkedDate.split(' ')[0] : this.dateList[0].split(' ')[0]
        this.getNowMatchList(200, date)
      } else if (type.name === 'future') {
        this.get7day(false, this.after7d)
        this.dateList = this.after7d
        let date = this.checkedDate.split(' ')[0] ? this.checkedDate.split(' ')[0] : this.dateList[0].split(' ')[0]
        this.getNowMatchList(100, date)
      }
    },
    get7day(before, dateArray) {
      //设置日期，当前日期的前七天
      let myDate = new Date() //获取今天日期
      let today = myDate.getMonth() + 1 + '-' + myDate.getDate()
      let year = myDate.getFullYear()
      let week = {
        0: '星期天',
        1: '星期一',
        2: '星期二',
        3: '星期三',
        4: '星期四',
        5: '星期五',
        6: '星期六'
      }

      if (before) {
        myDate.setDate(myDate.getDate() - 6)
      } else {
        myDate.setDate(myDate.getDate() + 1)
      }
      let dateTemp
      let flag = 1
      let len = before ? 6 : 7

      for (var i = 0; i < len; i++) {
        var weekday = myDate.getDay()

        dateTemp = year + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate() + ' ' + week[weekday]

        dateArray.push(dateTemp)
        myDate.setDate(myDate.getDate() + flag)
      }
      if (before) {
        dateArray.push(year + '-' + today + ' ' + week[myDate.getDay()])
        dateArray.reverse()
      }
    },
    toggleDate() {
      this.showDate = !this.showDate
    },
    checkDate(day) {
      this.checkedDate = day
      this.showDate = false
      let date = this.checkedDate.split(' ')[0] ? this.checkedDate.split(' ')[0] : this.dateList[0].split(' ')[0]
      this.getNowMatchList(200, date)
    },
    up(i) {
      if (this.nowUp === i) {
        this.nowUp = ''
        return
      }
      this.nowUp = i
    },
    // setTop(scope) {
    //   console.log(scope + '--------------------------------')
    // },

    //比赛列表(已完结和未开始)
    async getNowMatchList(per_page, date) {
      let res = await this.$api.getNowMatchList({
        per_page: per_page,
        date: date
      })
      //ststus:1 未开始 2 进行中 3 已结束
      let finish = []
      let future = []
      let ing = []
      res.data.map(item => {
        if (item.status == 1) {
          future.push(item)
        } else if (item.status == 2) {
          ing.push(item)
        } else if (item.status === 3) {
          finish.push(item)
        }
      })

      if (this.tabType === 'finish') {
        this.matchList = finish
      } else if (this.tabType === 'future') {
        this.matchList = future
      }
    },
    //当日未开始
    async getUnBeginMatch(per_page) {
      // const loading = this.$loading();
      let res = await this.$api.getUnBeginMatch({
        per_page: per_page
      })
      // loading.close();
      this.loading = false
      this.unBegin = res.data
    },
    //正在开始
    async getBeginMatch(per_page) {
      let res = await this.$api.getBeginMatch({
        per_page: per_page
      })
      this.begin = res.data
    },
    //当日已完结
    async getEndMatch(per_page) {
      let res = await this.$api.getEndMatch({
        per_page: per_page
      })
      this.end = res.data
    },
    //获取所有当日的比赛（未开始，开始，完结）
    getAllMatches() {
      this.chooseAll = true
      this.getUnBeginMatch(100)
      this.getBeginMatch(20)
      this.getEndMatch(100)
    },
    //获取一部分当日的比赛（未开始，开始，完结）
    getPartMatches() {
      this.chooseAll = false
      this.getUnBeginMatch(40)
      this.getBeginMatch(20)
      this.getEndMatch(10)
    },
    // 选择哪条比赛，进入详情页
    chooseMatch(match) {
      debugger
      this.$store.commit('chooseMatch', match)
      this.$router.push({
        path: `/bifenDetail`
      })
    },
    //websocket
    initSocket() {
      this.socket = new WebSocketUtil({ url: 'ws://ws.211aoa.com:8282' })
      // websocket 初始化成功
      this.socket.onCreate = () => {
        this.connected = true
        console.log('初始化成功')
      }
      this.socket.init()
    },
    //处理每个比赛数据，红牌，黄牌，比分，角球，百家赔率
    dealdata(data) {
      data.map(i => {
        i['yapan'] = ['-', '-', '-']
        i['daxiao'] = ['-', '-', '-']
        if (i.statics) {
          i.statics.map(j => {
            if (j.type_en_name === 'yellow') {
              i['yellow1'] = parseInt(j.team1)
              i['yellow2'] = parseInt(j.team2)
            }
            if (j.type_en_name === 'red') {
              i['red1'] = parseInt(j.team1)
              i['red2'] = parseInt(j.team2)
            }
            if (j.type_en_name === 'cornerKicks') {
              i['corner1'] = parseInt(j.team1)
              i['corner2'] = parseInt(j.team2)
            }
          })
        }
        if (i.scores) {
          i.scores.map(j => {
            if (j.type === 'Period1') {
              i['score1'] = parseInt(j.team1)
              i['score2'] = parseInt(j.team2)
            }
          })
        }

        //亚盘
        if (i.match_yapan) {
          let yapan = i.match_yapan['Bet365'] ? i.match_yapan['Bet365'] : i.match_yapan['Vcbet']
          if (yapan.length == 0) {
            yapan = i.match_yapan['suibian']
          }
          if (yapan.length != 0) {
            i['yapan'] = [
              (yapan.fields[0].value - 1).toFixed(2),
              yapan.ovalue > 0 ? '受' + odds[Math.abs(yapan.ovalue)] : odds[Math.abs(yapan.ovalue)],
              (yapan.fields[1].value - 1).toFixed(2)
            ]
          }
        }

        //大小球
        if (i.match_daxiaoqiu) {
          let daxiaoqiu = i.match_daxiaoqiu['Bet365'] ? i.match_daxiaoqiu['Bet365'] : i.match_daxiaoqiu['Vcbet']
          if (!daxiaoqiu.length == 0) {
            daxiaoqiu = i.match_daxiaoqiu['suibian']
          }
          if (daxiaoqiu.length != 0) {
            i['daxiao'] = [(daxiaoqiu.fields[0].value - 1).toFixed(2), odds[Math.abs(daxiaoqiu.ovalue)], (daxiaoqiu.fields[1].value - 1).toFixed(2)]
          }
        }
      })
      return data
    }
  },
  mounted() {
    this.getPartMatches()
    // 初始化websoket
    // this.initSocket({ url: 'ws://ws.211aoa.com:8282' })
  },
  computed: {
    //当日比赛
    now_matches() {
      let sumData = []
      let begin = this.begin
      let unbegin = this.unBegin

      let end = this.end
      this.dealdata(end)
      this.dealdata(unbegin)
      this.dealdata(begin)

      sumData = sumData
        .concat(this.begin)
        .concat(this.unBegin)
        .concat(end)
      return sumData
    },
    //比赛列表的length
    total() {
      return this.showMatches.length
    },
    //根据用户需求，点击完结和赛程展示getNowMatchList ，点击 比分 展示 getPartMatches
    showMatches() {
      if (this.tabType === 'now') {
        return this.now_matches
      } else {
        return this.matchList
      }
    }
  }
}
</script>
<style scoped lang="stylus">
.center {
  width: 85%;
}
.bifen {
  .banner {
    width: 100%;
    height: 150px;
    margin-top: 10px;
  }
  .logo {
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
  .yellow-card {
    font-size: 12px;
    color: #000;
    padding: 0 3px;
    margin: 0 1px;
    background-color: #FFC60A;
  }
  .red-card {
    font-size: 12px;
    color: #fff;
    padding: 0 3px;
    margin: 0 1px;
    background-color: #F21646;
  }
  .wrapper {
    position: relative;
    margin-top: 10px;
    padding-bottom: 30px;
    box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
    background: #fff;
    .table {
      text-align: center;
      img {
        padding: 0 2px;
        cursor: pointer;
      }
    }
    .sidebar {
      position: fixed;
      left: calc(((100% - 1300px) / 2));
      top: 420px;
    }
    .checks {
      position: absolute;
      top: 126px;
      right: 380px;
      width: 260px;
      height: 200px;
      padding: 10px;
      border: 1px solid #ddd;
      z-index: 10;
      background: #fff;
      li {
        display: inline-block;
      }
    }
    .red {
      color: #d11d19;
      font-weight: normal !important;
    }
    .vs-icon {
      width: 20px;
      height: 15px;
    }
    .zhishu {
      span {
        display: inline-block;
        text-align: center;
        // margin: 0 5px;
      }
      span:nth-child(2) {
        min-width: 100px;
        margin: 0 7px;
      }
    }
    .con {
      padding: 10px 0;
      .time-box {
        width: 200px;
        text-align: center;
        z-index: 10;
        background-color: #fff;
        img {
          vertical-align: middle;
        }
        cursor: pointer;
        div {
          padding-bottom: 5px;
          background-color: #fff;
          p {
            margin: 5px 5px;
            padding: 5px 0;
            &:hover {
              background-color: #904a0c;
              color: #fff;
            }
          }
        }
      }
      .icon {
        position: absolute;
        right: -2px;
        top: 5px;
        width: 12px;
        height: 10px;
      }
      .up {
        background: url('../assets/bifen/up.png') no-repeat;
      }
      .down {
        background: url('../assets/bifen/down.png') no-repeat;
      }
      .div1 {
        height: 40px;
        padding-top: 10px;
        span {
          margin: 0 15px;
        }
        .btn {
          padding: 5px 25px;
          border-radius: 20px;
          border: 1px solid #904A0C;
          cursor: pointer;
        }
        .btn1 {
          background: #904A0C;
          color: #fff;
          border: none;
        }
        .btn2 {
        }
      }
      .div2 {
        line-height: 40px;
        span {
          position: relative;
          padding-right: 10px;
          margin: 0 20px;
          cursor: pointer;
        }
      }
      .div3 {
        width: 250px;
        margin-right: 30px;
      }
    }
  }
  .fenxi {
    cursor: pointer;
  }
}
.bifen /deep/ .el-tabs__item {
  width: 60%;
  text-align: center;
  font-size: 16px;
}
.bifen /deep/ .el-tabs {
  line-height: 62px;
}
.bifen /deep/ .el-tabs__header {
  background: url('../assets/nav1.png');
  background-size: 100% 100%;
}
.bifen /deep/ .el-tabs__item.is-active, .bifen /deep/ .el-loading-text {
  color: #904a0c;
}
.bifen /deep/ .el-tabs__item.is-active:hover {
  color: #904a0c;
}
.bifen /deep/.el-tabs__active-bar {
  background-color: #904a0c;
}
.bifen /deep/ .el-input__inner {
  margin: 5px 0;
  height: 30px;
  border-radius: 30px;
  background: #eee;
}
.bifen /deep/ .el-input__icon {
  display: inline-block;
}
.bifen /deep/ .el-table th, .el-table tr {
  background: #EAEAEA;
  color: #000;
}
.bifen /deep/ .el-table .cell {
  text-align: center;
}
.bifen /deep/ .el-table__row:nth-child(2n) {
  background: #FCF9F3;
}
.bifen /deep/ .el-table__row td:nth-child(4), .bifen /deep/ .el-table__row td:nth-child(9), .bifen /deep/ .el-table__row td:nth-child(10) {
  border-right: 1px solid #ccc;
}
.bifen /deep/ .el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.bifen /deep/ .el-icon-arrow-down {
  font-size: 12px;
}
</style>
