<template>
  <div class="bifen-detail">
    <div class="back">
      <div class="center box">
        <div
          class="score-box box"
          v-show="time_play.status_code == 1 || time_play.status_code == 2"
        >
          <p>{{time_play.home_team_score}}</p>
          <p>{{time_play.away_team_score}}</p>
        </div>
        <div>
          <img :src="homejifen.logo_url" alt class="logo" />
          <h2>{{ matchDetail.home_team_name }}</h2>
        </div>
        <div class="txt">
          <p>
            <span class="time">{{ matchDetail.match_time}}</span>
          </p>
          <img :src="icons.vs" alt class="vs" />
          <p class="status">
            <span :class="[time_play.status_code == 1 || time_play.status_code == 2 ? 'red' : '']">
              {{
              time_play.status_code == 1 || time_play.status_code == 2 ? time_play.time : time_play.status_name
              }}
            </span>
            <span
              class="flash red"
              v-if="time_play.status_code == 1 || time_play.status_code == 2"
            >'</span>
          </p>
        </div>
        <div>
          <img :src="awayjifen.logo_url" alt class="logo" />
          <h2>{{ matchDetail.away_team_name }}</h2>
        </div>
      </div>
    </div>
    <div class="tabs center">
      <el-tabs v-model="tabType" @tab-click="chooseTab">
        <el-tab-pane v-for="(li, i) in tabs" :key="i" :label="li.label" :name="li.name"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="center table" v-if="showZhishu">
      <el-table :data="tableData[tabType]" style="width: 100%">
        <el-table-column prop="company" label="公司" width="150"></el-table-column>
        <el-table-column label="初盘" width="150">
          <el-table-column :label="table[tabType][0]" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.chu1 ? scope.row.chu1 : '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="table[tabType][1]" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.chu2 ? scope.row.chu2 : '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="table[tabType][2]" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.chu3 ? scope.row.chu3 : '-' }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="date" label="即时盘" width="150">
          <el-table-column prop="date" :label="table[tabType][0]" width="150">
            <template slot-scope="scope">
              <span
                :class="[scope.row.level1 > 0 ? 'red' : 'green']"
              >{{ scope.row.gun1 ? scope.row.gun1 : '-' }}</span>
              <img
                :src="scope.row.level1 > 0 ? icons.up : icons.down"
                alt
                v-if="scope.row.gun1"
                class="up-icon"
              />
            </template>
          </el-table-column>
          <el-table-column prop="date" :label="table[tabType][1]" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.gun2 ? scope.row.gun2 : '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="date" :label="table[tabType][2]" width="150">
            <template slot-scope="scope">
              <span
                :class="[scope.row.level2 > 0 ? 'red' : 'green']"
              >{{ scope.row.gun3 ? scope.row.gun3 : '-' }}</span>
              <img
                :src="scope.row.level2 > 0 ? icons.up : icons.down"
                alt
                v-if="scope.row.gun3"
                class="up-icon"
              />
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <div class="center" v-if="showAnalyse">
      <analyse
        :events="analyseData['events']"
        :statics="analyseData['statics']"
        :home_team_name="matchDetail.home_team_name"
        :away_team_name="matchDetail.away_team_name"
        :matchDetail="matchDetail"
        :homejifen="homejifen"
        :awayjifen="awayjifen"
      ></analyse>
    </div>
    <div class="center" v-if="showQingbao">
      <qingbao :matchDetail="matchDetail"></qingbao>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import odds from '../common/odds';
import qingbao from './bifenDetail/qingbao';
import analyse from './bifenDetail/analyse';
import WebSocketUtil from '@/utils/WebSocketUtil.js';
export default {
  components: { qingbao, analyse },
  data() {
    return {
      icons: {
        vs: require('../assets/vs.png'),
        tibu: require('../assets/bifen/tibu.png'),
        in: require('../assets/bifen/in.png'),
        out: require('../assets/bifen/out.png'),
        red: require('../assets/bifen/red.png'),
        yellow: require('../assets/bifen/yellow.png'),
        wulong: require('../assets/bifen/wulong.png'),
        jinqiu: require('../assets/bifen/jinqiu.png'),
        dianqiu: require('../assets/bifen/dianqiu.png'),
        lianghuang: require('../assets/bifen/lianghuang.png'),
        up: require('../assets/bifen/up_icon.png'),
        down: require('../assets/bifen/down_icon.png'),
        jiaoqiu: require('../assets/bifen/jiaoqiu.png')
      },
      tabType: 'yapan',
      tabs: [
        {
          label: '亚盘',
          name: 'yapan'
        },
        {
          label: '欧赔',
          name: 'oupei'
        },
        {
          label: '大小球',
          name: 'daxiao'
        },
        {
          label: '数据分析',
          name: 'analyse'
        },
        {
          label: '情报',
          name: 'qingbao'
        }
      ],
      table: {
        yapan: ['主队', '盘口', '客队'],
        daxiao: ['大球', '盘口', '小球'],
        oupei: ['主胜', '和', '客胜']
      },
      tableData: {},
      matchDetail: {},
      showZhishu: true,
      showAnalyse: false,
      showQingbao: false,
      analyseData: {},
      homejifen: [],
      awayjifen: [],
      time_play: { time: '-', status_name: '-', status_code: '-', away_team_score: '', home_team_score: '' }
    };
  },
  methods: {
    chooseTab(type) {
      this.tabType = type.name;
      switch (type.name) {
        case 'analyse':
          this.showZhishu = false;
          this.showQingbao = false;
          this.showAnalyse = true;
          break;
        case 'qingbao':
          this.showQingbao = true;
          this.showZhishu = false;
          this.showAnalyse = false;
          break;
        default:
          this.getOneMatchBaiJia();
          this.showZhishu = true;
          this.showQingbao = false;
          this.showAnalyse = false;
      }

      //   console.log(type.name);
    },
    async getOneMatchDetail() {
      let res = await this.$api.getOneMatchDetail({
        id: this.match_id
      });
      this.matchDetail = res;
      this.matchDetail.match_time = res.match_time.slice(0, 19);

      this.time_play.home_team_score = res.home_team_score;
      this.time_play.away_team_score = res.away_team_score;
      this.time_play.status_code = res.status_code;
      this.time_play.status_name = res.status_name;

      if (res.time_running == 1 && res.time_update != null) {
        //足球已进行时间 = (当前时间 - time_update)(秒) + time_played

        let time = ((new Date().getTime() - new Date(res.time_update.slice(0, 19)).getTime()) / 1000 + parseInt(res.time_played)) / 60;
        this.time_play.time = time ? parseInt(time) : '';
      } else if (res.time_running == 0 && res.time_played != null) {
        this.time_play.time = parseInt(parseInt(res.time_played) / 60);
      }

      //事件
      let eventdata = res['events'];
      let staticsdata = res['statics'];
      let event = [];
      let statics = [];
      eventdata.map(i => {
        switch (parseInt(i.type_id)) {
          case 23: //替补
            event.push({
              time: Math.ceil(i.time / 60),
              name: i.type_name,
              player: i.player_name,
              player2: i.player_name2,
              in: this.icons.in,
              out: this.icons.out,
              src: this.icons.tibu,
              team: i.team
            });
            break;
          case 30: //角球
            event.push({
              time: Math.ceil(i.time / 60),
              name: i.type_name,
              player: i.player_name,
              player2: i.player_name2 ? i.player_name2 : '',
              src: this.icons.jiaoqiu,
              team: i.team
            });
            break;
          case 9: //进球
            event.push({
              time: Math.ceil(i.time / 60),
              name: i.type_name,
              player: i.player_name,
              player2: i.player_name2 ? ` (助攻 ${i.player_name2})` : '',
              src: this.icons.jinqiu,
              team: i.team
            });
            break;
          case 18: //黄牌
            event.push({
              time: Math.ceil(i.time / 60),
              name: i.type_name,
              player: i.player_name,
              player2: i.player_name2 ? i.player_name2 : '',
              src: this.icons.yellow,
              team: i.team
            });
            break;
          // case 21: //红黄牌
          //   event.push({
          //     time: Math.ceil(i.time / 60),
          //     name: i.type_name,
          //     player: i.player_name,
          //     player2: i.player_name2 ? i.player_name2 : '',
          //     src: this.icons.lianghuang,
          //     team: i.team
          //   })
          //   break
          case 22: //红牌
            event.push({
              time: Math.ceil(i.time / 60),
              name: i.type_name,
              player: i.player_name,
              player2: i.player_name2 ? i.player_name2 : '',
              src: this.icons.red,
              team: i.team
            });
            break;
        }
        switch (i.goal_type) {
          case 2: //乌龙球
            event.push({
              time: Math.ceil(i.time / 60),
              name: i.type_name,
              player: i.player_name,
              src: this.icons.jiaoqiu,
              team: i.team == 1 ? this.matchDetail.home_team_name : this.matchDetail.away_team_name
            });
            break;

          case 4: //点球
            event.push({
              time: Math.ceil(i.time / 60),
              name: i.type_name,
              player: i.player_name,
              player2: i.player_name2 ? i.player_name2 : '',
              src: this.icons.jiaoqiu,
              team: i.team == 1 ? this.matchDetail.home_team_name : this.matchDetail.away_team_name
            });
            break;
        }
      });
      this.analyseData['events'] = event;
      //技术统计
      staticsdata.map(i => {
        switch (i.type_en_name) {
          case 'BallPossession': //控球率
            statics.push(i);
            break;
          case 'cornerKicks': //角球
            statics.push(i);
            break;
          case 'attack': //进攻
            statics.push(i);
            break;
          case 'goalKicks': //射门
            statics.push(i);
            break;
          case 'yellow': //黄牌
            statics.push(i);
            break;
          case 'red': //红牌
            statics.push(i);
            break;
          case 'dangerAttack': //危险进攻
            statics.push(i);
            break;
          case 'shotsBlocked': //射门被封
            statics.push(i);
            break;
          case 'accuratePasses': //准确传球
            statics.push(i);
            break;
        }
      });
      this.analyseData['statics'] = statics;
    },
    async getOneMatchBaiJia() {
      let res = await this.$api.getOneMatchBaiJia({
        id: this.match_id
      });
      let data = this.dealbaijiadata(res);
      this.tableData = data;
    },
    dealbaijiadata(res) {
      let yapan = [],
        oupei = [],
        daxiao = [];
      res.map(item => {
        switch (item.type_id) {
          case 1:
            yapan.push({
              company: item.book_cn_name,
              chu1: (item.fields[0].value0 - 1).toFixed(2),
              chu2: item.ovalue0 > 0 ? '受' + odds[Math.abs(item.ovalue0)] : odds[Math.abs(item.ovalue0)],
              chu3: (item.fields[1].value0 - 1).toFixed(2),
              gun1: (item.fields[0].value - 1).toFixed(2),
              gun2: item.ovalue > 0 ? '受' + odds[Math.abs(item.ovalue)] : odds[Math.abs(item.ovalue)],
              gun3: (item.fields[1].value - 1).toFixed(2),
              level1: item.fields[0].value - item.fields[0].value0,
              level2: item.fields[1].value - item.fields[1].value0
            });
            break;
          case 2:
            oupei.push({
              company: item.book_cn_name,
              chu1: item.fields[0].value0.toFixed(2),
              chu2: item.fields[2].value0.toFixed(2),
              chu3: item.fields[1].value0.toFixed(2),
              gun1: item.fields[0].value.toFixed(2),
              gun2: item.fields[2].value.toFixed(2),
              gun3: item.fields[1].value.toFixed(2),
              level1: item.fields[0].value - item.fields[0].value0,
              level2: item.fields[1].value - item.fields[1].value0
            });
            break;
          case 3:
            daxiao.push({
              company: item.book_cn_name,
              chu1: (item.fields[0].value0 - 1).toFixed(2),
              chu2: item.ovalue0,
              chu3: (item.fields[1].value0 - 1).toFixed(2),
              gun1: (item.fields[0].value - 1).toFixed(2),
              gun2: item.ovalue,
              gun3: (item.fields[1].value - 1).toFixed(2),
              level1: item.fields[0].value - item.fields[0].value0,
              level2: item.fields[1].value - item.fields[1].value0
            });
            break;
        }
      });
      return { yapan: yapan, oupei: oupei, daxiao: daxiao };
    },
    //积分榜
    async getOneMatchTeamInfo(team_id, team) {
      let res = await this.$api.getOneMatchTeamInfo({
        id: team_id
      });
      if (team == 'home') {
        this.homejifen = res;
      } else {
        this.awayjifen = res;
      }
    },
    //websocket
    initSocket() {
      this.socket = new WebSocketUtil({ url: 'ws://ws.211aoa.com:8282' });
      // websocket 初始化成功
      this.socket.onCreate = () => {
        this.connected = true;
        console.log('初始化成功');
      };
      this.socket.init();
    }
  },
  mounted() {
    this.getOneMatchBaiJia();
    this.getOneMatchDetail();
    this.getOneMatchTeamInfo(this.home_team_id, 'home');
    this.getOneMatchTeamInfo(this.away_team_id, 'away');
    // 初始化websoket
    this.initSocket({ url: 'ws://ws.211aoa.com:8282' });
  },
  computed: {
    ...mapState(['newBaijia', 'newMatchItem']),
    newTableData() {
      let data = this.tableData;
      return data;
    },
    match_id() {
      return this.$route.query.match_id;
    },
    home_team_id() {
      return this.$route.query.home_team_id;
    },
    away_team_id() {
      return this.$route.query.away_team_id;
    }
  },
  watch: {
    newMatchItem(newMatchItem) {
      if (newMatchItem.match_id == this.match_id) {
        let msg = newMatchItem.message;
        console.log(this.match_id + '===' + newMatchItem.match_id);
        if (msg.status_code == 1 || msg.status_code == 2) {
          this.time_play.home_team_score = msg.home_team_score;
          this.time_play.away_team_score = msg.away_team_score;
          this.time_play.status_code = msg.status_code;
          this.time_play.status_name = msg.status_name;

          if (msg.time_running == 1 && msg.time_update != null) {
            //足球已进行时间 = (当前时间 - time_update)(秒) + time_played

            let time = ((new Date().getTime() - new Date(msg.time_update.slice(0, 19)).getTime()) / 1000 + parseInt(msg.time_played)) / 60;
            this.time_play.time = time ? parseInt(time) : '';
          } else if (msg.time_running == 0 && msg.time_played != null) {
            this.time_play.time = parseInt(parseInt(msg.time_played) / 60);
          }
        }
      }
    }
  }
};
</script>

<style scoped lang="stylus">
.bifen-detail {
  box-sizing: border-box;
  @keyframes flash {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes flash {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .flash {
    animation: flash 1s infinite;
    -webkit-animation: flash 1s infinite;
  }
  .back {
    width: 100%;
    height: 150px;
    padding: 50px 0;
    margin-bottom: 15px;
    background: url('../assets/bifen/bifen_back.png');
    background-size: 100% 100%;
    color: #fff;
    .logo {
      width: 120px;
      height: 120px;
      background: #fff;
      margin-bottom: 10px;
    }
    .red {
      font-weight: normal !important;
    }
    .green {
      color: green;
    }
    .blue {
      color: blue;
    }
    .center {
      text-align: center;
      width: 800px;
      position: relative;
      .score-box {
        position: absolute;
        top: 70px;
        left: 275px;
        width: 250px;
        color: #d11d19;
      }
      h2, p {
        font-size: 24px;
      }
      .time {
        font-size: 20px;
      }
      .status {
        font-size: 20px;
      }
      .txt {
        p {
          line-height: 60px;
        }
      }
      .vs {
        width: 50px;
        height: 50px;
      }
    }
  }
  .tabs {
    width: 950px;
    line-height: 60px;
    // margin: 20px 0;
  }
  .table {
    width: 1100px;
    margin: 20px auto;
  }
}
.bifen-detail /deep/ .el-tabs__item {
  width: 50%;
  text-align: center;
  font-size: 16px;
}
.bifen-detail /deep/.el-tabs__active-bar {
  color: #904a0c;
  background-color: #904a0c;
}
.bifen-detail /deep/ .el-tabs__item.is-active, .bifen-detail /deep/ .el-loading-text {
  color: #904a0c;
}
.bifen-detail /deep/ .el-tabs__item.is-active:hover {
  color: #904a0c;
}
.bifen-detail /deep/ table {
  display: block;
  margin: 0 auto;
}
.bifen-detail /deep/ .el-table .cell {
  text-align: center;
}
</style>
