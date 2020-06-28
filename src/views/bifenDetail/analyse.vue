<template>
  <div class="analyse center">
    <h2>比赛事件</h2>
    <div class="box">
      <p>{{ home_team }}</p>
      <p>{{ away_team }}</p>
    </div>
    <div v-for="(li, i) in events" :key="i" class="box event-wrap">
      <p>
        <img :src="li.team == 1 ? li.src : ''" alt />
        {{ li.team == 1 && li.name != "替补" ? li.name : "" }}
        {{ li.team == 1 ? li.player : "" }}
        <img
          :src="li.team == 1 && li.name == '替补' ? li.in : ''"
          alt
        />
        {{ li.team == 1 && li.player2 ? li.player2 : "" }}
        <img
          :src="li.team == 1 && li.name == '替补' ? li.out : ''"
          alt
        />
      </p>
      <p class="red">{{ li.time }}'</p>
      <p>
        <img :src="li.team == 2 ? li.src : ''" alt />
        {{ li.team == 2 && li.name != "替补" ? li.name : "" }}
        {{ li.team == 2 ? li.player : "" }}
        <img
          :src="li.team == 2 && li.name == '替补' ? li.in : ''"
          alt
        />
        {{ li.team == 2 && li.player2 ? li.player2 : "" }}
        <img
          :src="li.team == 2 && li.name == '替补' ? li.out : ''"
          alt
        />
      </p>
    </div>
    <img :src="icons.icons" alt class="icons" />
    <h2>技术统计</h2>

    <div>
      <div class="box">
        <p>{{ home_team }}</p>
        <p>{{ away_team }}</p>
      </div>
      <div v-for="(li, i) in statics" :key="i" class="box event-wrap">
        <p>{{li.type_en_name=="BallPossession" ?parseInt(li.team1)+'%':parseInt(li.team1)}}</p>
        <p>{{ li.type_cn_name }}</p>
        <p>{{li.type_en_name=="BallPossession" ?parseInt(li.team2)+'%':parseInt(li.team2)}}</p>
      </div>
    </div>

    <h2>历史交锋</h2>
    <div class="history">
      <div class="title">
        <span
          v-for="(li,i) in history_tab"
          :key="i"
          @click="history_check(i)"
          :class="{'active':history_index===i}"
        >{{li}}</span>
        <el-select v-model="history_page" placeholder="请选择" @change="getTwoTeamMatchEd">
          <el-option label="10条" value="10"></el-option>
          <el-option label="15条" value="15"></el-option>
        </el-select>
      </div>
      <div class="box event-wrap">
        <el-table :data="history_data" style="width: 100%">
          <el-table-column prop="tournament_cn_name" label="赛事" width></el-table-column>
          <el-table-column label="日期" width="120">
            <template slot-scope="scope">{{scope.row.match_time.split(' ')[0]}}</template>
          </el-table-column>
          <el-table-column prop="home_team_name" label="主队" width>
            <template slot-scope="scope">
              <span :class="scope.row.level">{{scope.row.home_team_name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="比分" width="50">
            <template slot-scope="scope">{{scope.row.home_team_score}}-{{scope.row.away_team_score}}</template>
          </el-table-column>
          <el-table-column prop="away_team_name" label="客队" width>
            <template slot-scope="scope">
              <span
                :class="scope.row.level"
                v-if="scope.row.away_team_id==match.home_team_id"
              >{{scope.row.away_team_name}}</span>
              <span v-else>{{scope.row.away_team_name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="半场" width="50">
            <template
              slot-scope="scope"
            >{{scope.row.home_team_half_time_score}}-{{scope.row.away_team_half_time_score}}</template>
          </el-table-column>
          <el-table-column label="亚盘" width>
            <el-table-column prop="yapan[0]" label="主" width="70"></el-table-column>
            <el-table-column prop="yapan[1]" label="盘口" width="70"></el-table-column>
            <el-table-column prop="yapan[2]" label="客" width="70"></el-table-column>
          </el-table-column>
          <el-table-column label="欧赔" width>
            <el-table-column prop="oupei[0]" label="主" width="70"></el-table-column>
            <el-table-column prop="oupei[1]" label="盘口" width="70"></el-table-column>
            <el-table-column prop="oupei[2]" label="客" width="70"></el-table-column>
          </el-table-column>
          <el-table-column prop="sheng" label="胜负" width="70">
            <template slot-scope="scope">
              <span
                :class="{red:scope.row.sheng=='胜',green:scope.row.sheng=='负',blue:scope.row.sheng=='平'}"
              >{{scope.row.sheng}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ya" label="亚盘" width="70">
            <template slot-scope="scope">
              <span
                :class="{red:scope.row.ya=='赢',green:scope.row.ya=='负输',blue:scope.row.ya=='走'}"
              >{{scope.row.ya}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="qiu" label="大小球" width="70">
            <template slot-scope="scope">
              <span
                :class="{red:scope.row.qiu=='大',green:scope.row.qiu=='小',blue:scope.row.qiu=='走'}"
              >{{scope.row.qiu}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="txt">
        近{{parseInt(this.history_page)}}场：胜出
        <span class="red">{{historycount.sheng.length}}</span> 场，
        平局
        <span class="blue">{{historycount.ping.length}}</span> 场，
        负
        <span class="green">{{historycount.fu.length}}</span> 场，
        胜率:
        <span
          class="red"
        >{{(historycount.sheng.length/parseInt(history_page).toFixed(2))*100}}%</span> ,
        赢盘率:
        <span
          class="red"
        >{{(historycount.ying.length/parseInt(history_page).toFixed(2))*100}}%</span> ,
        大球率:
        <span
          class="red"
        >{{(historycount.da.length/parseInt(history_page).toFixed(2))*100}}%</span>
      </div>
    </div>

    <h2>近期战绩</h2>
    <div class="latest history">
      <div class="title">
        <div class="team-name red">{{match.home_team_name}}</div>
        <span
          v-for="(li,i) in home_latest_tab"
          :key="i"
          @click="home_latest_check(i)"
          :class="{'active':home_latest_index===i}"
        >{{li}}</span>
        <el-select v-model="home_latest_page" placeholder="请选择" @change="getEndMatchByTeamId">
          <el-option label="10条" value="10"></el-option>
          <el-option label="15条" value="15"></el-option>
        </el-select>
      </div>
      <div class="box event-wrap">
        <el-table :data="home_latest" style="width: 100%">
          <el-table-column prop="tournament_cn_name" label="赛事" width></el-table-column>
          <el-table-column label="日期" width="120">
            <template slot-scope="scope">{{scope.row.match_time.split(' ')[0]}}</template>
          </el-table-column>
          <el-table-column prop="home_team_name" label="主队" width>
            <template slot-scope="scope">
              <span :class="scope.row.level">{{scope.row.home_team_name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="比分" width="50">
            <template slot-scope="scope">{{scope.row.home_team_score}}-{{scope.row.away_team_score}}</template>
          </el-table-column>
          <el-table-column prop="away_team_name" label="客队" width>
            <template slot-scope="scope">
              <span
                :class="scope.row.level"
                v-if="scope.row.away_team_id==match.home_team_id"
              >{{scope.row.away_team_name}}</span>
              <span v-else>{{scope.row.away_team_name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="半场" width="50">
            <template
              slot-scope="scope"
            >{{scope.row.home_team_half_time_score}}-{{scope.row.away_team_half_time_score}}</template>
          </el-table-column>
          <el-table-column label="亚盘" width>
            <el-table-column prop="yapan[0]" label="主" width="70"></el-table-column>
            <el-table-column prop="yapan[1]" label="盘口" width="70"></el-table-column>
            <el-table-column prop="yapan[2]" label="客" width="70"></el-table-column>
          </el-table-column>
          <el-table-column label="欧赔" width>
            <el-table-column prop="oupei[0]" label="主" width="70"></el-table-column>
            <el-table-column prop="oupei[1]" label="盘口" width="70"></el-table-column>
            <el-table-column prop="oupei[2]" label="客" width="70"></el-table-column>
          </el-table-column>
          <el-table-column prop="sheng" label="胜负" width="70">
            <template slot-scope="scope">
              <span
                :class="{red:scope.row.sheng=='胜',green:scope.row.sheng=='负',blue:scope.row.sheng=='平'}"
              >{{scope.row.sheng}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ya" label="亚盘" width="70">
            <template slot-scope="scope">
              <span
                :class="{red:scope.row.ya=='赢',green:scope.row.ya=='负输',blue:scope.row.ya=='走'}"
              >{{scope.row.ya}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="qiu" label="大小球" width="70">
            <template slot-scope="scope">
              <span
                :class="{red:scope.row.qiu=='大',green:scope.row.qiu=='小',blue:scope.row.qiu=='走'}"
              >{{scope.row.qiu}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="txt">
        近{{parseInt(this.history_page)}}场：胜出
        <span class="red">{{homecount.sheng.length}}</span> 场，
        平局
        <span class="blue">{{homecount.ping.length}}</span> 场，
        负
        <span class="green">{{homecount.fu.length}}</span> 场，
        胜率:
        <span
          class="red"
        >{{(homecount.sheng.length/parseInt(history_page).toFixed(2))*100}}%</span> ,
        赢盘率:
        <span
          class="red"
        >{{(homecount.ying.length/parseInt(history_page).toFixed(2))*100}}%</span> ,
        大球率:
        <span
          class="red"
        >{{(homecount.da.length/parseInt(history_page).toFixed(2))*100}}%</span>
      </div>
    </div>
    <div class="latest history">
      <div class="title">
        <div class="team-name blue">{{match.away_team_name}}</div>
        <span
          v-for="(li,i) in away_latest_tab"
          :key="i"
          @click="away_latest_check(i)"
          :class="{'active':away_latest_index===i}"
        >{{li}}</span>
        <el-select v-model="away_latest_page" placeholder="请选择" @change="getEndMatchByTeamId">
          <el-option label="10条" value="10"></el-option>
          <el-option label="15条" value="15"></el-option>
        </el-select>
      </div>
      <div class="box event-wrap">
        <el-table :data="away_latest" style="width: 100%">
          <el-table-column prop="tournament_cn_name" label="赛事" width></el-table-column>
          <el-table-column label="日期" width="120">
            <template slot-scope="scope">{{scope.row.match_time.split(' ')[0]}}</template>
          </el-table-column>
          <el-table-column prop="home_team_name" label="主队" width>
            <template slot-scope="scope">
              <span
                :class="scope.row.level"
                v-if="scope.row.away_team_id==match.home_team_id"
              >{{scope.row.home_team_name}}</span>
              <span v-else>{{scope.row.home_team_name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="比分" width="50">
            <template slot-scope="scope">{{scope.row.home_team_score}}-{{scope.row.away_team_score}}</template>
          </el-table-column>
          <el-table-column prop="away_team_name" label="客队" width>
            <template slot-scope="scope">
              <span
                :class="scope.row.level"
                v-if="scope.row.away_team_id!=match.home_team_id"
              >{{scope.row.away_team_name}}</span>
              <span v-else>{{scope.row.away_team_name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="半场" width="50">
            <template
              slot-scope="scope"
            >{{scope.row.home_team_half_time_score}}-{{scope.row.away_team_half_time_score}}</template>
          </el-table-column>
          <el-table-column label="亚盘" width>
            <el-table-column prop="yapan[0]" label="主" width="70"></el-table-column>
            <el-table-column prop="yapan[1]" label="盘口" width="70"></el-table-column>
            <el-table-column prop="yapan[2]" label="客" width="70"></el-table-column>
          </el-table-column>
          <el-table-column label="欧赔" width>
            <el-table-column prop="oupei[0]" label="主" width="70"></el-table-column>
            <el-table-column prop="oupei[1]" label="盘口" width="70"></el-table-column>
            <el-table-column prop="oupei[2]" label="客" width="70"></el-table-column>
          </el-table-column>
          <el-table-column prop="sheng" label="胜负" width="70">
            <template slot-scope="scope">
              <span
                :class="{red:scope.row.sheng=='胜',green:scope.row.sheng=='负',blue:scope.row.sheng=='平'}"
              >{{scope.row.sheng}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ya" label="亚盘" width="70">
            <template slot-scope="scope">
              <span
                :class="{red:scope.row.ya=='赢',green:scope.row.ya=='负输',blue:scope.row.ya=='走'}"
              >{{scope.row.ya}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="qiu" label="大小球" width="70">
            <template slot-scope="scope">
              <span
                :class="{red:scope.row.qiu=='大',green:scope.row.qiu=='小',blue:scope.row.qiu=='走'}"
              >{{scope.row.qiu}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="txt">
        近{{parseInt(this.history_page)}}场：胜出
        <span class="red">{{awaycount.sheng.length}}</span> 场，
        平局
        <span class="blue">{{awaycount.ping.length}}</span> 场，
        负
        <span class="green">{{awaycount.fu.length}}</span> 场，
        胜率:
        <span
          class="red"
        >{{(awaycount.sheng.length/parseInt(history_page).toFixed(2))*100}}%</span> ,
        赢盘率:
        <span
          class="red"
        >{{(awaycount.ying.length/parseInt(history_page).toFixed(2))*100}}%</span> ,
        大球率:
        <span
          class="red"
        >{{(awaycount.da.length/parseInt(history_page).toFixed(2))*100}}%</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import odds from "../../common/odds";
export default {
  props: ["events", "statics", "home_team", "away_team"],
  data() {
    return {
      icons: {
        icons: require("../../assets/bifen/icons.png")
      },

      history_page: "10条",
      history_tab: ["全部赛事", "主客相同"],
      history_index: 0,
      history_data: [],
      homeLike: 0,

      home_latest: [],
      home_latest_page: "10条",
      home_latest_tab: ["全部赛事", "主相同"],
      home_latest_index: 0,
      home_latest_homelike: 0,

      away_latest: [],
      away_latest_page: "10条",
      away_latest_tab: ["全部赛事", "客相同"],
      away_latest_index: 0,
      away_latest_homelike: 0,

      home_future: [],
      away_future: [],
      historycount: {
        sheng: [],
        fu: [],
        ping: [],
        da: [],
        ying: []
      },
      homecount: {
        sheng: [],
        fu: [],
        ping: [],
        da: [],
        ying: []
      },
      awaycount: {
        sheng: [],
        fu: [],
        ping: [],
        da: [],
        ying: []
      }
    };
  },
  methods: {
    history_check(i) {
      this.history_index = i;
      this.homeLike = i;
      this.getTwoTeamMatchEd();
    },
    home_latest_check(i) {
      this.home_latest_index = i;
      this.home_latest_homelike = i;
      this.getEndMatchByTeamId("home");
    },
    away_latest_check(i) {
      this.away_latest_index = i;
      this.away_latest_homelike = i;
      this.getEndMatchByTeamId("away");
    },
    //历史交锋
    async getTwoTeamMatchEd() {
      let data = {
        home_team_id: this.match.home_team_id,
        away_team_id: this.match.away_team_id,
        per_page: parseInt(this.history_page),
        homeLike: this.homeLike
      };
      let res = await this.$api.getTwoTeamMatchEd(data);

      this.dealMathchData(res.data, "history");

      this.history_data = res.data;
    },
    changehomelike() {
      this.homeLike = 1;
    },

    dealMathchData(data, type) {
      data.map(i => {
        debugger;
        //主队红绿蓝显示
        let scoreReduce1 = i.home_team_score - i.away_team_score;
        let scoreReduce2 = i.away_team_score - i.home_team_score;
        if (i.home_team_id == this.match.home_team_id) {
          if (scoreReduce1 > 0) {
            i["level"] = "red";
          } else if (scoreReduce1 < 0) {
            i["level"] = "green";
          } else {
            i["level"] = "blue";
          }
        } else {
          if (scoreReduce2 > 0) {
            i["level"] = "red";
          } else if (scoreReduce2 < 0) {
            i["level"] = "green";
          } else {
            i["level"] = "blue";
          }
        }

        //指数
        if (i.match_detail) {
          i.match_detail.map(item => {
            switch (item.type_id) {
              case 1:
                i["yapan"] = [
                  (item.fields[0].value - 1).toFixed(2),
                  item.ovalue > 0
                    ? "受" + odds[Math.abs(item.ovalue)]
                    : odds[Math.abs(item.ovalue)],
                  (item.fields[1].value - 1).toFixed(2)
                ];
                if (item.ovalue > 0) {
                  i["rang"] = i.away_team_score;
                  i["shou"] = i.home_team_score;
                } else {
                  i["rang"] = i.home_team_score;
                  i["shou"] = i.away_team_score;
                }
                i["pan"] = Math.abs(item.ovalue);

                break;
              case 2:
                i["oupei"] = [
                  item.fields[0].value.toFixed(2),
                  item.fields[2].value.toFixed(2),
                  item.fields[1].value.toFixed(2)
                ];

                break;
              case 3:
                i["daxiao"] = [
                  (item.fields[0].value - 1).toFixed(2),
                  odds[Math.abs(item.ovalue)],
                  (item.fields[1].value - 1).toFixed(2)
                ];
                i["qiupan"] = item.ovalue;
                break;
            }
          });
        }

        //胜
        if (i.home_team_score > i.away_team_score) {
          i["sheng"] = "胜";

          if (type == "away") {
            i["sheng"] = "负";
          }
        } else if (i.home_team_score < i.away_team_score) {
          i["sheng"] = "负";

          if (type == "away") {
            i["sheng"] = "胜";
          }
        } else {
          i["sheng"] = "平";
        }
        // 亚盘
        if (i["rang"] - i["pan"] - i["shou"] > 0) {
          i["ya"] = "赢";
          if (type == "away") {
            i["sheng"] = "输";
          }
        } else if (i["rang"] - i["pan"] - i["shou"] < 0) {
          i["ya"] = "输";
          if (type == "away") {
            i["sheng"] = "赢";
          }
        } else {
          i["ya"] = "走";
        }
        //大小球
        if (i.home_team_score - i["qiupan"] > 0) {
          i["qiu"] = "大";
          if (type == "away") {
            i["sheng"] = "小";
          }
        } else if (i.home_team_score - i["qiupan"] < 0) {
          i["qiu"] = "小";
          if (type == "away") {
            i["sheng"] = "大";
          }
        } else {
          i["qiu"] = "走";
        }
      });
      data.map(item => {
        if (item.sheng == "胜") {
          this[type + "count"].sheng.push(item.sheng);
        } else if (item.sheng == "负") {
          this[type + "count"].fu.push(item.sheng);
        } else if (item.sheng == "平") {
          this[type + "count"].ping.push(item.sheng);
        }
        if (item.qiu == "大") {
          this[type + "count"].da.push(item.qiu);
        }
        if (item.ya == "赢") {
          this[type + "count"].ying.push(item.ya);
        }
      });
      console.log(data);
      return data;
    },

    //近期比赛
    async getEndMatchByTeamId(team) {
      let data = {
        team_id:
          team == "home" ? this.match.home_team_id : this.match.away_team_id,
        per_page:
          team == "home"
            ? parseInt(this.home_latest_page)
            : parseInt(this.away_latest_page),
        homeLike: team
      };
      let res = await this.$api.getEndMatchByTeamId(data);

      if (team == "home") {
        this.dealMathchData(res.data, "home");
        this.home_latest = res.data;
      } else {
        this.dealMathchData(res.data, "away");
        this.away_latest = res.data;
      }
    },
    //未来比赛
    async getUnBeginMatchByTeamId(team) {
      let res = await this.$api.getUnBeginMatchByTeamId({
        team_id:
          team == "home" ? this.match.home_team_id : this.match.away_team_id
      });
      if (team == "home") {
        this.home_future = res;
      } else {
        this.away_future = res;
      }
    }
  },
  mounted() {
    this.getTwoTeamMatchEd();
    this.getEndMatchByTeamId("home");
    this.getEndMatchByTeamId("away");
    this.getUnBeginMatchByTeamId("home");
    this.getUnBeginMatchByTeamId("away");
  },
  computed: {
    ...mapState(["match"])
  }
};
</script>

<style scoped lang="stylus">
.analyse {
  width: 1200px;
  padding: 50px;
  margin: 0 auto;
  text-align: center;
  .team-name {
    display: inline-block;
    padding-left: 20px;
    color: #d11d19;
  }
  .txt {
    line-height: 80px;
    background: #fff;
  }
  .icons {
    display: block;
    width: 700px;
    height: 80px;
    margin: 0 auto;
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
  h2 {
    line-height: 120px;
    font-size: 26px;
  }
  .box {
    background-color: #fff;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
    p {
      width: 50%;
    }
  }
  .event-wrap {
    p {
      &:nth-child(1), &:nth-child(3) {
        width: 45%;
      }
      &:nth-child(2) {
        width: 8%;
      }
      line-height: 50px;
    }
  }
  .history {
    font-size: 12px;
    .title {
      padding: 20px 0;
      text-align: left;
      background-color: #fff;
      span {
        display: inline-block;
        width: 100px;
        height: 35px;
        line-height: 35px;
        margin: 0 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
      }
      .active {
        background-color: #d11d19;
        color: #fff;
      }
    }
  }
}
</style>
