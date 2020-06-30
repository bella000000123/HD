<template>
  <div class="qingbao">
    <div class="match-info">
      <h2>比赛信息</h2>
      <div class="box">
        <div>
          <p>开赛时间：{{ matchDetail.match_time }}</p>
          <p>主裁判：{{ matchDetail.referee_cn_name ? matchDetail.referee_cn_name : '-' }}</p>
          <p>主裁国籍：{{ qingbao.referee.country_cn_name ? qingbao.referee.country_cn_name : '-' }}</p>
          <p>场均黄牌：{{ qingbao.referee.yellowCardsPerGame ? qingbao.referee.yellowCardsPerGame : '-' }}</p>
          <p>场均红牌：{{ qingbao.referee.redCardsPerGame ? qingbao.referee.redCardsPerGame : '-' }}</p>
        </div>
        <div>
          <p>场馆：{{ qingbao.stadium ? qingbao.stadium.cn_name : '-' }}{{ qingbao.attendanc ? qingbao.attendance : '-' }}</p>
          <p>地点：{{ qingbao.stadiu ? qingbao.stadium.city_cn_name : '-' }}{{ qingbao.stadiucity_cn_name ? qingbao.stadiucity_cn_name : '' }}</p>
          <p>地图坐标：{{ qingbao.stadiu ? qingbao.stadium.google_maps_coordinates : '-' }}</p>
        </div>
        <div v-if="matchDetail.weathe">
          <p>天气：{{ matchDetail.weather }}</p>
          <p>温度：{{ matchDetail.weather_desc[0].V }}</p>
        </div>
      </div>
    </div>
    <div class="coach">
      <h2>教练</h2>

      <div class="detail">
        <div>
          <p>队伍</p>
          <p>教练名称</p>
          <p>头像</p>
          <p>生日</p>
          <p>战术风格</p>
          <p>场均得分</p>
          <p>带队出赛</p>
        </div>
        <div>
          <p class="red">{{ matchDetail.home_team_name }}</p>
          <p>{{ qingbao.home_coach.en_name ? qingbao.home_coach.en_name : '-' }}</p>
          <p>
            <img v-if="qingbao.home_coach.logo" :src="'https://imgs.oss.cn-south-1.jcloudcs.com/' + qingbao.home_coach.logo.slice(6)" class="avatar" alt />
          </p>
          <p>{{ qingbao.home_coach.birthdate ? qingbao.home_coach.birthdate.slice(0, 10) : '-' }}</p>
          <p>{{ qingbao.home_coach.style ? qingbao.home_coach.style : '-' }}</p>
          <p>{{ qingbao.home_coach.score ? qingbao.home_coach.score : '-' }}</p>
          <p>
            {{ qingbao.home_coach.game_count ? qingbao.home_coach.game_count : '-' }}（胜：{{ qingbao.home_coach.win ? qingbao.home_coach.win : '-' }}，平{{
              qingbao.home_coach.draw ? qingbao.home_coach.draw : '-'
            }}，负{{ qingbao.home_coach.lose ? qingbao.home_coach.lose : '-' }}）
          </p>
        </div>
        <div>
          <p class="blue">{{ matchDetail.away_team_name }}</p>
          <p>{{ qingbao.away_coach.en_name ? qingbao.away_coach.en_name : '-' }}</p>
          <p>
            <img v-if="qingbao.away_coach.logo" :src="'https://imgs.oss.cn-south-1.jcloudcs.com/' + qingbao.away_coach.logo.slice(6)" class="avatar" alt />
          </p>
          <p>{{ qingbao.away_coach.birthdate ? qingbao.away_coach.birthdate.slice(0, 10) : '-' }}</p>
          <p>{{ qingbao.away_coach.style ? qingbao.away_coach.style : '-' }}</p>
          <p>{{ qingbao.away_coach.score ? qingbao.away_coach.score : '-' }}</p>
          <p>
            {{ qingbao.away_coach.game_count ? qingbao.away_coach.game_count : '-' }}（胜：{{ qingbao.away_coach.win ? qingbao.away_coach.win : '-' }}，平{{
              qingbao.away_coach.draw ? qingbao.away_coach.draw : '-'
            }}，负{{ qingbao.away_coach.lose ? qingbao.away_coach.lose : '-' }}）
          </p>
        </div>
      </div>
    </div>
    <div class="qingbao-box">
      <h2>新闻情报</h2>
      <table class="qingbao-item">
        <tr>
          <td class="td1">队伍</td>
          <td class="td1 red">{{ matchDetail.home_team_name }}</td>
          <td class="td1 blue">{{ matchDetail.away_team_name }}</td>
        </tr>
        <tr>
          <td>有利</td>
          <td>{{ news.zhuli ? news.zhuli.replace(/undefined/g, '') : '-' }}</td>
          <td>{{ news.keli ? news.keli.replace(/undefined/g, '') : '-' }}</td>
        </tr>
        <tr>
          <td>不利</td>
          <td>{{ news.zhuhai ? news.zhuhai.replace(/undefined/g, '') : '-' }}</td>
          <td>{{ news.kehai ? news.kehai.replace(/undefined/g, '') : '-' }}</td>
        </tr>
        <tr>
          <td>中立</td>
          <td>{{ news.zhuzhong ? news.zhuzhong.replace(/undefined/g, '') : '-' }}</td>
          <td>{{ news.kezhong ? news.kezhong.replace(/undefined/g, '') : '-' }}</td>
        </tr>
      </table>
    </div>
    <div class="zhishu">
      <h2>指数情报</h2>
      <p class="red">{{ matchDetail.home_team_name }}</p>
      <p>{{ qingbao.winningOdds.home_desc ? qingbao.winningOdds.home_desc : '-' }}</p>
      <p class="blue">{{ matchDetail.away_team_name }}</p>
      <p>{{ qingbao.winningOdds.away_desc ? qingbao.winningOdds.away_desc : '-' }}</p>
    </div>
    <div>
      <h2>比赛预测</h2>
      <p>{{ news.yuce ? news.zhuzhi.replace(/undefined/g, '') : '-' }}</p>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  props: ['matchDetail'],
  data() {
    return {
      qingbao: [],
      news: {}
    }
  },
  methods: {
    async getOneMatchInformation() {
      let res = await this.$api.getOneMatchInformation({
        id: this.matchDetail.id
      })
      if (res.informatins) {
        let news = {
          // zhuqing: '',
          // keqing: '',
          // zhushang: [],
          // keshang: [],
          // zhishu: [],
          // yuce: []
        }
        res.informatins.map(i => {
          if (i.type_id == 3) {
            if (i.benefit == 0) {
              news['zhuzhong'] += i.content
            } else if (i.benefit == 2) {
              news['zhuli'] += i.content
            } else if (i.benefit == 4) {
              news['zhuhai'] += i.content
            }
            // news["zhuqing"].push(i);
          } else if (i.type_id == 4) {
            if (i.benefit == 1) {
              news['kezhong'] += i.content
            } else if (i.benefit == 3) {
              news['keli'] += i.content
            } else if (i.benefit == 5) {
              news['kehai'] += i.content
            }
            // news["keqing"].push(i);
          } else if (i.type_id == 1) {
            news['zhushang'] = i.content
          } else if (i.type_id == 2) {
            news['keshang'] = i.content
          } else if (i.type_id == 6) {
            news['yuce'] += i.content
          }
        })

        this.news = news
      }
      this.qingbao = res
      console.log(this.news)
    }
  },
  mounted() {
    this.getOneMatchInformation()
  },
  computed: {
    // ...mapState(['match'])
  }
}
</script>

<style scoped lang="stylus">
.qingbao {
  width: 1200px;
  margin: 0 auto;
  padding: 30px 100px;
  background: #fff;
  box-sizing: border-box;
  .red {
    font-weight: normal !important;
  }
  .avatar {
    width: 50px;
    height: 50px;
  }
  .green {
    color: green;
  }
  .blue {
    color: blue;
  }
  h2 {
    width: 100px;
    height: 40px;
    line-height: 40px;
    margin: 50px 0;
    background-color: #E5D1B1;
    border-radius: 5px;
    text-align: center;
  }
  .match-info {
    p {
      line-height: 30px;
      padding-left: 20px;
    }
  }
  .detail {
    div {
      display: inline-block;
      width: 33%;
    }
  }
  .coach {
    // padding: 30px 100px;
    background-color: #fff;
    .detail {
      div {
        p:nth-child(3) {
          box-sizing: border-box;
          height: 70px;
          padding: 10px 20px;
        }
      }
    }
    p {
      padding-left: 20px;
      line-height: 50px;
      border-bottom: 1px solid #ddd;
    }
  }
  .qingbao-box {
    .qingbao-item {
      tr {
        td:nth-child(1) {
          width: 80px;
          text-align: center;
        }
        td {
          border: 1px solid #ddd;
          padding: 10px;
        }
        .td1 {
          text-align: center;
        }
      }
    }
  }
  .zhishu {
    p {
      line-height: 30px;
    }
  }
}
</style>
