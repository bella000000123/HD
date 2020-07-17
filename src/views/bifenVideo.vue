<template>
  <div class="bifen-detail">
    <div class="back">
      <div class="center box">
        <div>
          <img :src="home_team.logo_url" alt class="logo" />
          <h2>{{ matchDetail.home_team_name }}</h2>
        </div>
        <div class="txt">
          <p>
            <span class="time">{{ matchDetail.match_time }}</span>
          </p>
          <img :src="icons.vs" alt class="vs" />
          <p class="status">{{ matchDetail.status_name }}</p>
        </div>
        <div>
          <img :src="away_team.logo_url" alt class="logo" />
          <h2>{{ matchDetail.away_team_name }}</h2>
        </div>
      </div>
    </div>
    <div class="zhishu-box">
      <!-- <el-table :data="history_data" style="width: 100%"> -->
      <!-- <el-table-column prop="tournament_alias" label="赛事" width></el-table-column>
          <el-table-column label="日期" width="120">
            <template slot-scope="scope">{{ scope.row.match_time.split(' ')[0] }}</template>
          </el-table-column>
      </el-table>-->
    </div>
    <div class="video-box center box">
      <div class="video"></div>
      <div class="discuss">
        <div class="top">聊天室</div>
        <div class="middle"></div>
        <div class="bottom"></div>
      </div>
    </div>
    <div class="tab-box border center">
      <div class="tabs center">
        <el-tabs v-model="tabType" @tab-click="chooseTab">
          <el-tab-pane v-for="(li, i) in tabs" :key="i" :label="li.label" :name="li.name"></el-tab-pane>
        </el-tabs>
      </div>
      <div v-if="showWenzi" class="tab-cont">111</div>
      <div v-else class="tab-cont">
        <div v-show="home_player.length != 0" class="box">
          <div class="home list">
            <div class="logo-box">
              <img :src="home_team.logo_url" alt class="logo" />
              <p>{{ matchDetail.home_team_name }}({{ matchDetail.home_formation }})</p>
            </div>
            <div v-for="(li, i) in home_all_player" :key="i">
              <img :src="'https://imgs.oss.cn-south-1.jcloudcs.com/' + li.player_pic_url.slice(6)" alt />

              <span class="num">{{ li.shirt_number }}</span>
              <span>{{ li.player_name }}</span>
              <span v-for="(k, j) in li.event" :key="j" class="red">{{ k.name }}({{ Math.ceil(k.time / 60) }}')</span>
            </div>
            <div class="tibu">
              <h2>替补球员</h2>
              <div v-for="(k, j) in home_tibu" :key="j">
                <img :src="k.player_pic_url ? 'https://imgs.oss.cn-south-1.jcloudcs.com/' + k.player_pic_url.slice(6) : ''" alt />
                <span class="num">{{ k.shirt_number }}</span>
                <span>{{ k.player_name }}</span>
                <span v-for="(li, i) in k.event" :key="i" class="red">{{ li.name }}({{ Math.ceil(li.time / 60) }}')</span>
              </div>
            </div>
          </div>
          <div class="tab-back">
            <div class="play-wrap">
              <div class="home_play">
                <div class="player home-first">
                  <span class="num">{{ home_first_player.shirt_number }}</span>
                  <img
                    :src="home_first_player.player_pic_url ? 'https://imgs.oss.cn-south-1.jcloudcs.com/' + home_first_player.player_pic_url.slice(6) : ''"
                    alt
                  />
                  <p>{{ home_first_player.player_name }}</p>
                </div>
                <div v-for="(li, i) in home_player" :key="i" class="play-box box-center" :class="{ special: home_row.length < 4 }">
                  <div v-for="(k, j) in li" :key="j" class="player">
                    <span class="num">{{ k.shirt_number }}</span>
                    <img :src="k.player_pic_url ? 'https://imgs.oss.cn-south-1.jcloudcs.com/' + k.player_pic_url.slice(6) : ''" alt />
                    <p>{{ k.player_name }}</p>
                  </div>
                </div>
              </div>
              <div class="away-play">
                <div class="player away-first">
                  <span class="num2">{{ away_first_player.shirt_number }}</span>
                  <img
                    :src="away_first_player.player_pic_url ? 'https://imgs.oss.cn-south-1.jcloudcs.com/' + away_first_player.player_pic_url.slice(6) : ''"
                    alt
                  />
                  <p>{{ away_first_player.player_name }}</p>
                </div>
                <div v-for="(item, index) in away_player" :key="index" class="play-box box-center" :class="{ special: away_row.length < 4 }">
                  <div v-for="(k, j) in item" :key="j" class="player">
                    <span class="num2">{{ k.shirt_number }}</span>
                    <img :src="k.player_pic_url ? 'https://imgs.oss.cn-south-1.jcloudcs.com/' + k.player_pic_url.slice(6) : ''" alt />
                    <p>{{ k.player_name }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="away list">
            <div class="logo-box">
              <img :src="away_team.logo_url" alt class="logo" />
              <p>{{ matchDetail.away_team_name }}({{ matchDetail.away_formation }})</p>
            </div>
            <div v-for="(li, i) in away_all_player" :key="i">
              <span v-for="(k, j) in li.event" :key="j" class="red">{{ k.name }}({{ Math.ceil(k.time / 60) }}')</span>
              <span>{{ li.player_name }}</span>
              <span class="num2">{{ li.shirt_number }}</span>
              <img :src="li.player_pic_url ? 'https://imgs.oss.cn-south-1.jcloudcs.com/' + li.player_pic_url.slice(6) : ''" alt />
            </div>
            <div class="tibu">
              <h2>替补球员</h2>
              <div v-for="(k, j) in away_tibu" :key="j">
                <span v-for="(li, i) in k.event" :key="i" class="red">{{ li.name }}({{ Math.ceil(li.time / 60) }}')</span>
                <span>{{ k.player_name }}</span>
                <span class="num">{{ k.shirt_number }}</span>
                <img :src="k.player_pic_url ? 'https://imgs.oss.cn-south-1.jcloudcs.com/' + k.player_pic_url.slice(6) : ''" alt />
              </div>
            </div>
          </div>
        </div>
        <div v-show="home_player.length == 0" class="empty">暂无阵容信息</div>
      </div>
    </div>
  </div>
</template>

<script>
// import odds from '../common/odds'
// import { mapState } from 'vuex'
export default {
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
      tabType: 'wenzi',
      tabs: [
        {
          label: '文字直播',
          name: 'wenzi'
        },
        {
          label: '球队阵容',
          name: 'zhenrong'
        }
      ],

      matchDetail: {},
      showWenzi: true,
      analyseData: [],
      home_team: [],
      away_team: [],
      home_row: [],
      away_row: [],
      home_player: [],
      home_first_player: '',
      away_player: [],
      away_first_player: '',
      home_all_player: [],
      away_all_player: [],
      home_tibu: [],
      away_tibu: []
    };
  },

  methods: {
    chooseTab(type) {
      this.tabType = type.name;
      if (type.name == 'wenzi') {
        this.showWenzi = true;
      } else {
        this.showWenzi = false;
      }
    },
    //球队详情
    async getOneMatchDetail() {
      let res = await this.$api.getOneMatchDetail({
        id: this.match_id
      });
      this.matchDetail = res;

      //事件
      let staticsdata = res['statics'];
      let statics = [];

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
      this.analyseData = statics;
      let len1 = [...res.home_formation.split('-')];
      let len2 = [...res.away_formation.split('-')];

      len1.forEach((item, i) => {
        len1[i] = parseInt(item);
      });
      len2.forEach((item, i) => {
        len2[i] = parseInt(item);
      });
      this.home_row = len1;
      this.away_row = len2;
      let lineup = res.lineup;

      //球队阵容
      let arr1 = [];
      let arr2 = [];
      let home = [[], [], [], [], [], []];
      let away = [[], [], [], [], [], []];
      let home_all_player = [];
      let away_all_player = [];
      let home_tibu = [];
      let away_tibu = [];
      for (let i = 2; i < 12; i++) {
        lineup.forEach(item => {
          //站位
          if (item.position == 1) {
            if (item.team_id == res.home_team_id) {
              this.home_first_player = item;
            }
            if (item.team_id == res.away_team_id) {
              this.away_first_player = item;
            }
          }
          if (item.position == i) {
            if (item.team_id == res.home_team_id) {
              home_all_player.push(Object.assign(item, { event: [] }));
              this.dealData(item, home, 'home');
            }
            if (item.team_id == res.away_team_id) {
              away_all_player.push(Object.assign(item, { event: [] }));
              this.dealData(item, away, 'away');
            }
          }
        });
      }
      for (let i = 0; i < home.length; i++) {
        if (home[i] == '' || typeof home[i] == 'undefined') {
          home.splice(i, 1);
          i = i - 1;
        }
        home[i].reverse();
      }
      for (let i = 0; i < away.length; i++) {
        if (away[i] == '' || typeof away[i] == 'undefined') {
          away.splice(i, 1);
          i = i - 1;
        }
      }
      away.reverse();
      this.home_player = home;
      this.away_player = away;

      //两边列表
      let home_event = [];
      let away_event = [];
      res.events.map(i => {
        if (i.team == 1) {
          home_event.push(i);
        } else {
          away_event.push(i);
        }
      });
      //将守门员放在列表第一个
      home_all_player.unshift(Object.assign(this.home_first_player, { event: [] }));
      away_all_player.unshift(Object.assign(this.away_first_player, { event: [] }));
      //球员列表与事件匹配
      home_event.forEach(i => {
        home_all_player.forEach(item => {
          if (i.type_id == 23) {
            if (i.player_id2 == item.player_id) {
              item['event'].push({ name: i.type_name, time: i.time });
            }
          } else {
            if (i.player_id == item.player_id) {
              item['event'].push({ name: i.type_name, time: i.time });
            }
          }
        });
      });
      away_event.forEach(i => {
        away_all_player.forEach(item => {
          if (i.type_id == 23) {
            if (i.player_id2 == item.player_id) {
              item['event'].push({ name: i.type_name, time: i.time });
            }
          } else {
            if (i.player_id == item.player_id) {
              item['event'].push({ name: i.type_name, time: i.time });
            }
          }
        });
      });
      this.home_all_player = home_all_player;
      this.away_all_player = away_all_player;
      //替补

      lineup.map(item => {
        if (item.substitute == 1) {
          if (item.team_id == res.home_team_id) {
            home_tibu.push(Object.assign(item, { event: [] }));
          } else {
            away_tibu.push(Object.assign(item, { event: [] }));
          }
        }
      });

      res.events.map(i => {
        home_tibu.map(item => {
          if (i.type_id == 23 && i.player_id2 == item.player_id) {
            item.event.push({ name: i.type_name, time: i.time });
          }
          if (i.player_id == item.player_id) {
            item.event.push({ name: i.type_name, time: i.time });
          }
        });
      });
      res.events.map(i => {
        away_tibu.map(item => {
          if (i.type_id == 23 && i.player_id2 == item.player_id) {
            item.event.push({ name: i.type_name, time: i.time });
          }
          if (i.player_id == item.player_id) {
            item.event.push({ name: i.type_name, time: i.time });
          }
        });
      });
      this.home_tibu = home_tibu;
      this.away_tibu = away_tibu;
    },
    //阵容站队
    dealData(item, team, name) {
      let len1 = this[name + '_row'];

      if (parseInt(item.position) <= len1[0] + 1) {
        team[0].push(item);
        return;
      }
      if (parseInt(item.position) > len1[0] + 1 && parseInt(item.position) <= len1[0] + len1[1] + 1) {
        team[1].push(item);
        return;
      }
      if (parseInt(item.position) > len1[0] + len1[1] + 1 && parseInt(item.position) <= len1[0] + len1[1] + len1[2] + 1) {
        team[2].push(item);
        return;
      }
      if (parseInt(item.position) > len1[0] + len1[1] + len1[2] + 1 && parseInt(item.position) <= len1[0] + len1[1] + len1[2] + len1[3] + 1) {
        team[3].push(item);
        return;
      }
      if (
        parseInt(item.position) > len1[0] + len1[1] + len1[2] + len1[3] + 1 &&
        parseInt(item.position) <= len1[0] + len1[1] + len1[2] + len1[3] + len1[4] + 1
      ) {
        team[4].push(item);
        return;
      }
      if (
        parseInt(item.position) > len1[0] + len1[1] + len1[2] + len1[3] + len1[4] + 1 &&
        parseInt(item.position) <= len1[0] + len1[1] + len1[2] + len1[3] + len1[4] + len1[5] + 1
      ) {
        team[5].push(item);
      }
    },
    //球队
    async getOneMatchTeamInfo(team_id, team) {
      let res = await this.$api.getOneMatchTeamInfo({
        id: team_id
      });
      if (team == 'home') {
        this.home_team = res;
      } else {
        this.away_team = res;
      }
      // console.log(res)
    }
  },
  mounted() {
    this.getOneMatchDetail();
    this.getOneMatchTeamInfo(this.home_team_id, 'home');
    this.getOneMatchTeamInfo(this.away_team_id, 'away');
  },
  computed: {
    // ...mapState(['match'])
    match_id() {
      return this.$route.query.match_id;
    },
    home_team_id() {
      return this.$route.query.home_team_id;
    },
    away_team_id() {
      return this.$route.query.away_team_id;
    }
  }
};
</script>

<style scoped lang="stylus">
.bifen-detail {
  box-sizing: border-box;
  .back {
    width: 100%;
    height: 100px;
    padding: 5px 0;
    margin-bottom: 15px;
    box-sizing: border-box;
    background: url('../assets/bifen/bifen_back.png');
    background-size: 100% 100%;
    color: #fff;
    .logo {
      width: 50px;
      height: 50px;
      background: #fff;
      margin-bottom: 5px;
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
      h2, p {
        font-size: 20px;
      }
      .time {
        font-size: 16px;
      }
      .status {
        font-size: 16px;
      }
      .txt {
        p {
          line-height: 30px;
        }
      }
      .vs {
        width: 30px;
        height: 30px;
      }
    }
  }
  .tabs {
    width: 1050px;
    line-height: 60px;
  }
  .video-box {
    width: 1100px;
    height: 500px;
    background: #f7f7f7;
    .video {
      width: 800px;
      margin-right: 20px;
      background: #2B2B2B;
    }
    .discuss {
      width: 300px;
      height: 100%;
      border: 1px solid #ccc;
      .top {
        height: 39px;
        line-height: 39px;
        padding: 0 20px;
        background: #fff;
        border-bottom: 1px solid #ccc;
      }
      .middle {
        height: 340px;
      }
      .bottom {
        width: 100%;
        height: 120px;
        background: #fff;
      }
    }
  }
  .tab-box {
    margin-top: 20px;
    width: 1100px;
    background: #fff;
    .empty {
      padding: 50px;
      text-align: center;
    }
    .special {
      height: 70px !important;
    }
    .tab-cont {
      .num {
        border-radius: 50%;
        background: #000;
        display: inline-block;
        width: 18px;
        height: 18px;
        line-height: 18px;
        color: #fff;
        text-align: center;
      }
      .num2 {
        border-radius: 50%;
        background: #ccc;
        display: inline-block;
        width: 18px;
        height: 18px;
        line-height: 18px;
        color: #000;
        text-align: center;
      }
      .home, .away {
        // height: 600px;
        width: 315px;
      }
      .away {
        text-align: right;
      }
      .list {
        div {
          margin: 5px 10px;
          font-size: 12px;
        }
        img {
          width: 30px;
          height: 30px;
          margin: 0 5px;
          vertical-align: middle;
        }
        .logo {
          width: 50px;
          height: 50px;
          background: #fff;
        }
        .logo-box {
          text-align: center;
          margin-bottom: 30px;
        }
      }
      .tibu {
        margin: 30px 0 !important;
        h2 {
          margin-left: 20px;
        }
      }
      .tab-back {
        width: 450px;
        height: 650px;
        background: url('../assets/bifen/soccer-back.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
        .play-wrap {
          // width:33%
          .away-play {
            margin-top: 30px;
          }
          .home_play {
            margin-top: 100px;
          }
          .home-first {
            position: absolute;
            top: 30px;
            left: 170px;
          }
          .away-first {
            position: absolute;
            bottom: 30px;
            left: 170px;
          }
          .player {
            width: 100px;
            font-size: 12px;
            text-align: center;
            color: #fff;
            img {
              width: 20px;
              height: 20px;
              border-radius: 50%;
            }
          }
          .play-box {
            height: 55px;
          }
        }
      }
    }
  }
}
</style>
