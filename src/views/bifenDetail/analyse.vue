<template>
  <div class="analyse center">
    <h2>比赛事件</h2>
    <div v-if="events.length > 0">
      <div class="box">
        <p>{{ home_team }}</p>
        <p>{{ away_team }}</p>
      </div>
      <div v-for="(li, i) in events" :key="i" class="box event-wrap">
        <p>
          <img :src="li.team == 1 ? li.src : ''" alt />
          {{ li.team == 1 && li.name != '替补' ? li.name : '' }}
          {{ li.team == 1 ? li.player : '' }}
          <img
            :src="li.team == 1 && li.name == '替补' ? li.in : ''"
            alt
          />
          {{ li.team == 1 && li.player2 ? li.player2 : '' }}
          <img
            :src="li.team == 1 && li.name == '替补' ? li.out : ''"
            alt
          />
        </p>
        <p class="red">{{ li.time }}'</p>
        <p>
          <img :src="li.team == 2 ? li.src : ''" alt />
          {{ li.team == 2 && li.name != '替补' ? li.name : '' }}
          {{ li.team == 2 ? li.player : '' }}
          <img
            :src="li.team == 2 && li.name == '替补' ? li.in : ''"
            alt
          />
          {{ li.team == 2 && li.player2 ? li.player2 : '' }}
          <img
            :src="li.team == 2 && li.name == '替补' ? li.out : ''"
            alt
          />
        </p>
      </div>
      <img :src="icons.icons" alt class="icons" />
    </div>
    <div v-else>暂无数据</div>

    <h2>技术统计</h2>
    <div>
      <div v-if="statics.length > 0">
        <div class="box">
          <p>{{ home_team }}</p>
          <p>{{ away_team }}</p>
        </div>
        <div v-for="(li, i) in statics" :key="i" class="box event-wrap">
          <p>{{ li.type_en_name == 'BallPossession' ? parseInt(li.team1) + '%' : parseInt(li.team1) }}</p>
          <p>{{ li.type_cn_name }}</p>
          <p>{{ li.type_en_name == 'BallPossession' ? parseInt(li.team2) + '%' : parseInt(li.team2) }}</p>
        </div>
      </div>
      <div v-else>暂无数据</div>
    </div>

    <h2>联赛积分榜</h2>
    <div class="jifen box">
      <div class="home">
        <h3 class="bg_gray">{{ matchDetail.home_team_name }}</h3>
        <ul>
          <li>全场</li>
          <li>赛</li>
          <li>胜</li>
          <li>平</li>
          <li>负</li>
          <li>得</li>
          <li>失</li>
          <li>净</li>
          <li>得分</li>
          <li>排名</li>
          <li>胜率</li>
        </ul>
        <ul>
          <li>总</li>
          <li>{{ home_rank.matchesTotal }}</li>
          <li>{{ home_rank.winTotal }}</li>
          <li>{{ home_rank.drawTotal }}</li>
          <li>{{ home_rank.lossTotal }}</li>
          <li>{{ home_rank.goalsForTotal }}</li>
          <li>{{ home_rank.goalsAgainstTotal }}</li>
          <li>{{ home_rank.goalDiffTotal }}</li>
          <li class="red">{{ home_rank.pointsTotal }}</li>
          <li>{{ home_rank.positionTotal }}</li>
          <li
            class="red"
          >{{ parseInt((home_rank.winTotal / home_rank.matchesTotal) * 100)?parseInt((home_rank.winTotal / home_rank.matchesTotal) * 100):'-' }}%</li>
        </ul>
        <ul>
          <li>主</li>
          <li>{{ home_rank.matchesHome }}</li>
          <li>{{ home_rank.winHome }}</li>
          <li>{{ home_rank.drawHome }}</li>
          <li>{{ home_rank.lossHome }}</li>
          <li>{{ home_rank.goalsForHome }}</li>
          <li>{{ home_rank.goalsAgainstHome }}</li>
          <li>{{ home_rank.goalDiffHome }}</li>
          <li class="red">{{ home_rank.pointsHome }}</li>
          <li>{{ home_rank.positionHome }}</li>
          <li
            class="red"
          >{{ parseInt((home_rank.winHome / home_rank.matchesHome) * 100)?parseInt((home_rank.winHome / home_rank.matchesHome) * 100):'-' }}%</li>
        </ul>
        <ul>
          <li>客</li>
          <li>{{ home_rank.matchesAway }}</li>
          <li>{{ home_rank.winAway }}</li>
          <li>{{ home_rank.drawAway }}</li>
          <li>{{ home_rank.lossAway }}</li>
          <li>{{ home_rank.goalsForAway }}</li>
          <li>{{ home_rank.goalsAgainstAway }}</li>
          <li>{{ home_rank.goalDiffAway }}</li>
          <li class="red">{{ home_rank.pointsAway }}</li>
          <li>{{ home_rank.positionAway }}</li>
          <li
            class="red"
          >{{ parseInt((home_rank.winAway / home_rank.matchesAway) * 100)? parseInt((home_rank.winAway / home_rank.matchesAway) * 100):'-' }}%</li>
        </ul>
      </div>
      <div class="away">
        <h3 class="bg_gray">{{ matchDetail.away_team_name }}</h3>
        <ul>
          <li>全场</li>
          <li>赛</li>
          <li>胜</li>
          <li>平</li>
          <li>负</li>
          <li>得</li>
          <li>失</li>
          <li>净</li>
          <li>得分</li>
          <li>排名</li>
          <li>胜率</li>
        </ul>
        <ul>
          <li>总</li>
          <li>{{ away_rank.matchesTotal }}</li>
          <li>{{ away_rank.winTotal }}</li>
          <li>{{ away_rank.drawTotal }}</li>
          <li>{{ away_rank.lossTotal }}</li>
          <li>{{ away_rank.goalsForTotal }}</li>
          <li>{{ away_rank.goalsAgainstTotal }}</li>
          <li>{{ away_rank.goalDiffTotal }}</li>
          <li class="red">{{ away_rank.pointsTotal }}</li>
          <li>{{ away_rank.positionTotal }}</li>
          <li
            class="red"
          >{{ parseInt((away_rank.winTotal / away_rank.matchesTotal) * 100)?parseInt((away_rank.winTotal / away_rank.matchesTotal) * 100):'-' }}%</li>
        </ul>
        <ul>
          <li>主</li>
          <li>{{ away_rank.matchesHome }}</li>
          <li>{{ away_rank.winHome }}</li>
          <li>{{ away_rank.drawHome }}</li>
          <li>{{ away_rank.lossHome }}</li>
          <li>{{ away_rank.goalsForHome }}</li>
          <li>{{ away_rank.goalsAgainstHome }}</li>
          <li>{{ away_rank.goalDiffHome }}</li>
          <li class="red">{{ away_rank.pointsHome }}</li>
          <li>{{ away_rank.positionHome }}</li>
          <li
            class="red"
          >{{ (away_rank.winHome / away_rank.matchesHome).toFixed(2) * 100?(away_rank.winHome / away_rank.matchesHome).toFixed(2) * 100 :'-'}}%</li>
        </ul>
        <ul>
          <li>客</li>
          <li>{{ away_rank.matchesAway }}</li>
          <li>{{ away_rank.winAway }}</li>
          <li>{{ away_rank.drawAway }}</li>
          <li>{{ away_rank.lossAway }}</li>
          <li>{{ away_rank.goalsForAway }}</li>
          <li>{{ away_rank.goalsAgainstAway }}</li>
          <li>{{ away_rank.goalDiffAway }}</li>
          <li class="red">{{ away_rank.pointsAway }}</li>
          <li>{{ away_rank.positionAway }}</li>
          <li
            class="red"
          >{{ parseInt((away_rank.winAway / away_rank.matchesAway) * 100)?parseInt((away_rank.winAway / away_rank.matchesAway) * 100):'-' }}%</li>
        </ul>
      </div>
    </div>
    <h2>联赛盘路走势</h2>
    <div class="panlu box">
      <table width="50%" class="left_border">
        <tr height="48" class="bg_gray">
          <td colspan="10" align="center">{{matchDetail.home_team_name}}</td>
        </tr>
        <tr height="48" class="bg_gray bg_gray2">
          <td align="center" rowspan="2">全场</td>
          <td align="center" rowspan="2" class="left_border right_border">赛</td>
          <td align="center" colspan="4" class="right_border">亚盘</td>
          <td align="center" colspan="4">大小球</td>
        </tr>
        <tr height="48" class="bg_gray bg_gray2">
          <td align="center">赢盘</td>
          <td align="center">走水</td>
          <td align="center">输盘</td>
          <td align="center" class="right_border">赢盘率</td>
          <td align="center">大球</td>
          <td align="center">大球率</td>
          <td align="center">小球</td>
          <td align="center">小球率</td>
        </tr>
        <tr height="48">
          <td align="center">
            <span class="text_gray">总</span>
          </td>
          <td align="center">{{team1_all.len}}</td>
          <td align="center">{{team1_all.ying}}</td>
          <td align="center">{{team1_all.zou}}</td>
          <td align="center">{{team1_all.shu}}</td>
          <td align="center">{{((team1_all.ying/team1_all.len)*100).toFixed(2)}}%</td>
          <td align="center">{{team1_all.daqiu}}</td>
          <td align="center">{{((team1_all.daqiu/team1_all.len)*100).toFixed(2)}}%</td>
          <td align="center">{{team1_all.xiaoqiu}}</td>
          <td align="center">{{((team1_all.xiaoqiu/team1_all.len)*100).toFixed(2)}}%</td>
        </tr>
        <tr height="48">
          <td align="center">
            <span class="text_gray">主</span>
          </td>
          <td align="center">{{team1_home.len}}</td>
          <td align="center">{{team1_home.ying}}</td>
          <td align="center">{{team1_home.zou}}</td>
          <td align="center">{{team1_home.shu}}</td>
          <td align="center">{{((team1_home.ying/team1_home.len)*100).toFixed(2)}}%</td>
          <td align="center">{{team1_home.daqiu}}</td>
          <td align="center">{{((team1_home.daqiu/team1_home.len)*100).toFixed(2)}}%</td>
          <td align="center">{{team1_home.xiaoqiu}}</td>
          <td align="center">{{((team1_home.xiaoqiu/team1_home.len)*100).toFixed(2)}}%</td>
        </tr>
        <tr height="48">
          <td align="center">
            <span class="text_gray">客</span>
          </td>
          <td align="center">{{team1_away.len}}</td>
          <td align="center">{{team1_away.ying}}</td>
          <td align="center">{{team1_away.zou}}</td>
          <td align="center">{{team1_away.shu}}</td>
          <td align="center">{{((team1_away.ying/team1_away.len)*100).toFixed(2)}}%</td>
          <td align="center">{{team1_away.daqiu}}</td>
          <td align="center">{{((team1_away.daqiu/team1_away.len)*100).toFixed(2)}}%</td>
          <td align="center">{{team1_away.xiaoqiu}}</td>
          <td align="center">{{((team1_away.xiaoqiu/team1_away.len)*100).toFixed(2)}}%</td>
        </tr>
      </table>

      <table width="50%" class="left_border">
        <tr height="48" class="bg_gray">
          <td colspan="10" align="center">{{matchDetail.away_team_name}}</td>
        </tr>
        <tr height="48" class="bg_gray bg_gray2">
          <td align="center" rowspan="2">全场</td>
          <td align="center" rowspan="2" class="left_border right_border">赛</td>
          <td align="center" colspan="4" class="right_border">亚盘</td>
          <td align="center" colspan="4">大小球</td>
        </tr>
        <tr height="48" class="bg_gray bg_gray2">
          <td align="center">赢盘</td>
          <td align="center">走水</td>
          <td align="center">输盘</td>
          <td align="center" class="right_border">赢盘率</td>
          <td align="center">大球</td>
          <td align="center">大球率</td>
          <td align="center">小球</td>
          <td align="center">小球率</td>
        </tr>
        <tr height="48">
          <td align="center">
            <span class="text_gray">总</span>
          </td>
          <td align="center">{{team2_all.len}}</td>
          <td align="center">{{team2_all.ying}}</td>
          <td align="center">{{team2_all.zou}}</td>
          <td align="center">{{team2_all.shu}}</td>
          <td align="center">{{((team2_all.ying/team2_all.len)*100).toFixed(2)}}%</td>
          <td align="center">{{team2_all.daqiu}}</td>
          <td align="center">{{((team2_all.daqiu/team2_all.len)*100).toFixed(2)}}%</td>
          <td align="center">{{team2_all.xiaoqiu}}</td>
          <td align="center">{{((team2_all.xiaoqiu/team2_all.len)*100).toFixed(2)}}%</td>
        </tr>
        <tr height="48">
          <td align="center">
            <span class="text_gray">主</span>
          </td>
          <td align="center">{{team2_home.len}}</td>
          <td align="center">{{team2_home.ying}}</td>
          <td align="center">{{team2_home.zou}}</td>
          <td align="center">{{team2_home.shu}}</td>
          <td align="center">{{((team2_home.ying/team2_home.len)*100).toFixed(2)}}%</td>
          <td align="center">{{team2_home.daqiu}}</td>
          <td align="center">{{((team2_home.daqiu/team2_home.len)*100).toFixed(2)}}%</td>
          <td align="center">{{team2_home.xiaoqiu}}</td>
          <td align="center">{{((team2_home.xiaoqiu/team2_home.len)*100).toFixed(2)}}%</td>
        </tr>
        <tr height="48">
          <td align="center">
            <span class="text_gray">客</span>
          </td>
          <td align="center">{{team2_away.len}}</td>
          <td align="center">{{team2_away.ying}}</td>
          <td align="center">{{team2_away.zou}}</td>
          <td align="center">{{team2_away.shu}}</td>
          <td align="center">{{((team2_away.ying/team2_away.len)*100).toFixed(2)}}%</td>
          <td align="center">{{team2_away.daqiu}}</td>
          <td align="center">{{((team2_away.daqiu/team2_away.len)*100).toFixed(2)}}%</td>
          <td align="center">{{team2_away.xiaoqiu}}</td>
          <td align="center">{{((team2_away.xiaoqiu/team2_away.len)*100).toFixed(2)}}%</td>
        </tr>
      </table>
    </div>

    <h2>历史交锋</h2>
    <div class="history">
      <div class="title">
        <span
          v-for="(li, i) in history_tab"
          :key="i"
          @click="history_check(i)"
          :class="{ active: history_index === i }"
        >{{ li }}</span>
        <el-select v-model="history_page" placeholder="请选择" @change="getTwoTeamMatchEd">
          <el-option label="10条" value="10"></el-option>
          <el-option label="15条" value="15"></el-option>
        </el-select>
      </div>
      <div class="box event-wrap">
        <el-table :data="history_data" style="width: 100%">
          <el-table-column prop="tournament_alias" label="赛事" width></el-table-column>
          <el-table-column label="日期" width="120">
            <template slot-scope="scope">{{ scope.row.match_time.split(' ')[0] }}</template>
          </el-table-column>
          <el-table-column prop="home_team_name" label="主队" width>
            <template slot-scope="scope">
              <span :class="scope.row.level">{{ scope.row.home_team_name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="比分" width="50">
            <template
              slot-scope="scope"
            >{{ scope.row.home_team_score }}-{{ scope.row.away_team_score }}</template>
          </el-table-column>
          <el-table-column prop="away_team_name" label="客队" width>
            <template slot-scope="scope">
              <span
                :class="scope.row.level"
                v-if="scope.row.away_team_id == home_team_id"
              >{{ scope.row.away_team_name }}</span>
              <span v-else>{{ scope.row.away_team_name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="半场" width="50">
            <template
              slot-scope="scope"
            >{{ scope.row.home_team_half_time_score }}-{{ scope.row.away_team_half_time_score }}</template>
          </el-table-column>
          <el-table-column label="亚盘" width>
            <el-table-column prop="yapan[0]" label="主" width="70">
              <template slot-scope="scope">{{ scope.row.yapan[0] ? scope.row.yapan[0] : '-' }}</template>
            </el-table-column>
            <el-table-column prop="yapan[1]" label="盘口" width="70">
              <template slot-scope="scope">{{ scope.row.yapan[1] ? scope.row.yapan[1] : '-' }}</template>
            </el-table-column>
            <el-table-column prop="yapan[2]" label="客" width="70">
              <template slot-scope="scope">{{ scope.row.yapan[2] ? scope.row.yapan[2] : '-' }}</template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="欧赔" width>
            <el-table-column prop="oupei[0]" label="主" width="70">
              <template slot-scope="scope">{{ scope.row.oupei[0] ? scope.row.oupei[0] : '-' }}</template>
            </el-table-column>
            <el-table-column prop="oupei[1]" label="盘口" width="70">
              <template slot-scope="scope">{{ scope.row.oupei[1] ? scope.row.oupei[1] : '-' }}</template>
            </el-table-column>
            <el-table-column prop="oupei[2]" label="客" width="70">
              <template slot-scope="scope">{{ scope.row.oupei[2] ? scope.row.oupei[2] : '-' }}</template>
            </el-table-column>
          </el-table-column>
          <el-table-column prop="sheng" label="胜负" width="70">
            <template slot-scope="scope">
              <span
                :class="{ red: scope.row.sheng == '胜', green: scope.row.sheng == '负', blue: scope.row.sheng == '平' }"
              >{{ scope.row.sheng }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ya" label="亚盘" width="70">
            <template slot-scope="scope">
              <span
                :class="{ red: scope.row.ya == '赢', green: scope.row.ya == '输', blue: scope.row.ya == '走' }"
              >{{ scope.row.ya }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="qiu" label="大小球" width="70">
            <template slot-scope="scope">
              <span
                :class="{ red: scope.row.qiu == '大', green: scope.row.qiu == '小', blue: scope.row.qiu == '走' }"
              >{{ scope.row.qiu }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="txt">
        近{{ parseInt(this.history_page) }}场：胜出
        <span class="red">{{ historycount.sheng.length }}</span> 场， 平局
        <span class="blue">{{ historycount.ping.length }}</span> 场， 负
        <span class="green">{{ historycount.fu.length }}</span> 场， 胜率:
        <span
          class="red"
        >{{ (historycount.sheng.length / parseInt(history_page).toFixed(2)) * 100 }}%</span>
        , 赢盘率:
        <span
          class="red"
        >{{ (historycount.ying.length / parseInt(history_page).toFixed(2)) * 100 }}%</span>
        , 大球率:
        <span
          class="red"
        >{{ (historycount.da.length / parseInt(history_page).toFixed(2)) * 100 }}%</span>
      </div>
    </div>

    <h2>近期战绩</h2>
    <div class="latest history">
      <div class="title">
        <div class="team-name red">{{ matchDetail.home_team_name }}</div>
        <span
          v-for="(li, i) in home_latest_tab"
          :key="i"
          @click="home_latest_check(i)"
          :class="{ active: home_latest_index === i }"
        >{{ li }}</span>
        <el-select v-model="home_latest_page" placeholder="请选择" @change="getEndMatchByTeamId">
          <el-option label="10条" value="10"></el-option>
          <el-option label="15条" value="15"></el-option>
        </el-select>
      </div>
      <div class="box event-wrap">
        <el-table :data="home_latest" style="width: 100%">
          <el-table-column prop="tournament_alias" label="赛事" width></el-table-column>
          <el-table-column label="日期" width="120">
            <template slot-scope="scope">{{ scope.row.match_time.split(' ')[0] }}</template>
          </el-table-column>
          <el-table-column prop="home_team_name" label="主队" width>
            <template slot-scope="scope">
              <span :class="scope.row.level">{{ scope.row.home_team_name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="比分" width="50">
            <template
              slot-scope="scope"
            >{{ scope.row.home_team_score }}-{{ scope.row.away_team_score }}</template>
          </el-table-column>
          <el-table-column prop="away_team_name" label="客队" width>
            <template slot-scope="scope">
              <span
                :class="scope.row.level"
                v-if="scope.row.away_team_id == home_team_id"
              >{{ scope.row.away_team_name }}</span>
              <span v-else>{{ scope.row.away_team_name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="半场" width="50">
            <template
              slot-scope="scope"
            >{{ scope.row.home_team_half_time_score }}-{{ scope.row.away_team_half_time_score }}</template>
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
                :class="{ red: scope.row.sheng == '胜', green: scope.row.sheng == '负', blue: scope.row.sheng == '平' }"
              >{{ scope.row.sheng }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ya" label="亚盘" width="70">
            <template slot-scope="scope">
              <span
                :class="{ red: scope.row.ya == '赢', green: scope.row.ya == '输', blue: scope.row.ya == '走' }"
              >{{ scope.row.ya }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="qiu" label="大小球" width="70">
            <template slot-scope="scope">
              <span
                :class="{ red: scope.row.qiu == '大', green: scope.row.qiu == '小', blue: scope.row.qiu == '走' }"
              >{{ scope.row.qiu }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="txt">
        近{{ parseInt(this.history_page) }}场：胜出
        <span class="red">{{ homecount.sheng.length }}</span> 场， 平局
        <span class="blue">{{ homecount.ping.length }}</span> 场， 负
        <span class="green">{{ homecount.fu.length }}</span> 场， 胜率:
        <span
          class="red"
        >{{ (homecount.sheng.length / parseInt(history_page).toFixed(2)) * 100 }}%</span>
        , 赢盘率:
        <span
          class="red"
        >{{ (homecount.ying.length / parseInt(history_page).toFixed(2)) * 100 }}%</span>
        , 大球率:
        <span
          class="red"
        >{{ (homecount.da.length / parseInt(history_page).toFixed(2)) * 100 }}%</span>
      </div>
    </div>
    <div class="latest history">
      <div class="title">
        <div class="team-name blue">{{ matchDetail.away_team_name }}</div>
        <span
          v-for="(li, i) in away_latest_tab"
          :key="i"
          @click="away_latest_check(i)"
          :class="{ active: away_latest_index === i }"
        >{{ li }}</span>
        <el-select v-model="away_latest_page" placeholder="请选择" @change="getEndMatchByTeamId">
          <el-option label="10条" value="10"></el-option>
          <el-option label="15条" value="15"></el-option>
        </el-select>
      </div>
      <div class="box event-wrap">
        <el-table :data="away_latest" style="width: 100%">
          <el-table-column prop="tournament_alias" label="赛事" width></el-table-column>
          <el-table-column label="日期" width="120">
            <template slot-scope="scope">{{ scope.row.match_time.split(' ')[0] }}</template>
          </el-table-column>
          <el-table-column prop="home_team_name" label="主队" width>
            <template slot-scope="scope">
              <span
                :class="scope.row.level"
                v-if="scope.row.away_team_id == home_team_id"
              >{{ scope.row.home_team_name }}</span>
              <span v-else>{{ scope.row.home_team_name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="比分" width="50">
            <template
              slot-scope="scope"
            >{{ scope.row.home_team_score }}-{{ scope.row.away_team_score }}</template>
          </el-table-column>
          <el-table-column prop="away_team_name" label="客队" width>
            <template slot-scope="scope">
              <span
                :class="scope.row.level"
                v-if="scope.row.away_team_id != home_team_id"
              >{{ scope.row.away_team_name }}</span>
              <span v-else>{{ scope.row.away_team_name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="半场" width="50">
            <template
              slot-scope="scope"
            >{{ scope.row.home_team_half_time_score }}-{{ scope.row.away_team_half_time_score }}</template>
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
                :class="{ red: scope.row.sheng == '胜', green: scope.row.sheng == '负', blue: scope.row.sheng == '平' }"
              >{{ scope.row.sheng }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ya" label="亚盘" width="70">
            <template slot-scope="scope">
              <span
                :class="{ red: scope.row.ya == '赢', green: scope.row.ya == '输', blue: scope.row.ya == '走' }"
              >{{ scope.row.ya }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="qiu" label="大小球" width="70">
            <template slot-scope="scope">
              <span
                :class="{ red: scope.row.qiu == '大', green: scope.row.qiu == '小', blue: scope.row.qiu == '走' }"
              >{{ scope.row.qiu }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="txt">
        近{{ parseInt(this.history_page) }}场：胜出
        <span class="red">{{ awaycount.sheng.length }}</span> 场， 平局
        <span class="blue">{{ awaycount.ping.length }}</span> 场， 负
        <span class="green">{{ awaycount.fu.length }}</span> 场， 胜率:
        <span
          class="red"
        >{{ (awaycount.sheng.length / parseInt(history_page).toFixed(2)) * 100 }}%</span>
        , 赢盘率:
        <span
          class="red"
        >{{ (awaycount.ying.length / parseInt(history_page).toFixed(2)) * 100 }}%</span>
        , 大球率:
        <span
          class="red"
        >{{ (awaycount.da.length / parseInt(history_page).toFixed(2)) * 100 }}%</span>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import odds from '../../common/odds'
export default {
  props: ['events', 'statics', 'home_team', 'away_team', 'matchDetail'],
  data() {
    return {
      icons: {
        icons: require('../../assets/bifen/icons.png')
      },

      history_page: '10条',
      history_tab: ['全部赛事', '主客相同'],
      history_index: 0,
      history_data: [],
      homeLike: 0,

      home_latest: [],
      home_latest_page: '10条',
      home_latest_tab: ['全部赛事', '主相同'],
      home_latest_index: 0,
      home_latest_homelike: 0,

      away_latest: [],
      away_latest_page: '10条',
      away_latest_tab: ['全部赛事', '客相同'],
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
      },
      home_rank: {
        drawAway: '-',
        drawHome: '-',
        drawTotal: '-',
        goalsAgainstAway: '-',
        goalsAgainstHome: '-',
        goalsAgainstTotal: '-',
        goalsForAway: '-',
        goalsForHome: '-',
        goalsForTotal: '-',
        lossAway: '-',
        lossHome: '-',
        lossTotal: '-',
        matchesAway: '-',
        matchesHome: '-',
        matchesTotal: '-',
        pointsAway: '-',
        pointsHome: '-',
        pointsTotal: '-',
        positionAway: '-',
        positionHome: '-',
        positionTotal: '-',
        winAway: '-',
        winHome: '-',
        winTotal: '-'
      },
      away_rank: {
        drawAway: '-',
        drawHome: '-',
        drawTotal: '-',
        goalsAgainstAway: '-',
        goalsAgainstHome: '-',
        goalsAgainstTotal: '-',
        goalsForAway: '-',
        goalsForHome: '-',
        goalsForTotal: '-',
        lossAway: '-',
        lossHome: '-',
        lossTotal: '-',
        matchesAway: '-',
        matchesHome: '-',
        matchesTotal: '-',
        pointsAway: '-',
        pointsHome: '-',
        pointsTotal: '-',
        positionAway: '-',
        positionHome: '-',
        positionTotal: '-',
        winAway: '-',
        winHome: '-',
        winTotal: '-'
      },
      //盘路
      team1_all: {},
      team1_home: {},
      team1_away: {},
      team2_all: {},
      team2_home: {},
      team2_away: {}
    }
  },
  methods: {
    history_check(i) {
      this.history_index = i
      this.homeLike = i
      this.getTwoTeamMatchEd()
    },
    home_latest_check(i) {
      this.home_latest_index = i
      this.home_latest_homelike = i
      this.getEndMatchByTeamId('home')
    },
    away_latest_check(i) {
      this.away_latest_index = i
      this.away_latest_homelike = i
      this.getEndMatchByTeamId('away')
    },
    //历史交锋
    async getTwoTeamMatchEd() {
      let data = {
        home_team_id: this.home_team_id,
        away_team_id: this.away_team_id,
        per_page: parseInt(this.history_page),
        homeLike: this.homeLike
      }
      let res = await this.$api.getTwoTeamMatchEd(data)

      this.dealMathchData(res.data, 'history')

      this.history_data = res.data
    },
    changehomelike() {
      this.homeLike = 1
    },

    dealMathchData(data, team) {
      data.map(i => {
        //主队红绿蓝显示
        let scoreReduce1 = i.home_team_score - i.away_team_score
        let scoreReduce2 = i.away_team_score - i.home_team_score
        // 主队和客队区别

        if (i.home_team_id == this.home_team_id) {
          if (scoreReduce1 > 0) {
            i['level'] = 'red'
          } else if (scoreReduce1 < 0) {
            i['level'] = 'green'
          } else {
            i['level'] = 'blue'
          }
        } else {
          if (scoreReduce2 > 0) {
            i['level'] = 'red'
          } else if (scoreReduce2 < 0) {
            i['level'] = 'green'
          } else {
            i['level'] = 'blue'
          }
        }

        //亚盘
        if (i.match_yapan) {
          let yapan = i.match_yapan['Bet365'] ? i.match_yapan['Bet365'] : i.match_yapan['Vcbet']
          if (Object.prototype.toString.call(yapan) != '[object Object]') {
            yapan = i.match_yapan['suibian']
          }
          if (Object.prototype.toString.call(yapan) == '[object Object]') {
            i['yapan'] = [
              (yapan.fields[0].value - 1).toFixed(2),
              yapan.ovalue > 0 ? '受' + odds[Math.abs(yapan.ovalue)] : odds[Math.abs(yapan.ovalue)],
              (yapan.fields[1].value - 1).toFixed(2)
            ]

            let bifen = i.home_team_score + yapan.ovalue - i.away_team_score
            if (bifen > 0) {
              if (i.home_team_id == this.home_team_id) {
                i['ya'] = '赢'
              } else {
                i['ya'] = '输'
              }
            } else if (bifen < 0) {
              if (i.home_team_id == this.home_team_id) {
                i['ya'] = '输'
              } else {
                i['ya'] = '赢'
              }
            } else {
              i['ya'] = '走'
            }
          }
        }
        //欧赔
        if (i.match_oupei) {
          let oupei = i.match_oupei['Bet365'] ? i.match_oupei['Bet365'] : i.match_oupei['Vcbet']
          if (Object.prototype.toString.call(oupei) != '[object Object]') {
            oupei = i.match_oupei['suibian']
          }
          if (Object.prototype.toString.call(oupei) == '[object Object]') {
            i['oupei'] = [oupei.fields[0].value.toFixed(2), oupei.fields[2].value.toFixed(2), oupei.fields[1].value.toFixed(2)]
          }

          if (i.home_team_score > i.away_team_score) {
            i['sheng'] = '胜'

            if (team == 'away') {
              i['sheng'] = '负'
            }
          } else if (i.home_team_score < i.away_team_score) {
            i['sheng'] = '负'

            if (team == 'away') {
              i['sheng'] = '胜'
            }
          } else {
            i['sheng'] = '平'
          }
        }
        //大小球
        if (i.match_daxiaoqiu) {
          let daxiaoqiu = i.match_daxiaoqiu['Bet365'] ? i.match_daxiaoqiu['Bet365'] : i.match_daxiaoqiu['Vcbet']
          if (Object.prototype.toString.call(daxiaoqiu) != '[object Object]') {
            daxiaoqiu = i.match_daxiaoqiu['suibian']
          }
          if (Object.prototype.toString.call(daxiaoqiu) == '[object Object]') {
            i['daxiao'] = [(daxiaoqiu.fields[0].value - 1).toFixed(2), odds[Math.abs(daxiaoqiu.ovalue)], (daxiaoqiu.fields[1].value - 1).toFixed(2)]
            i['qiupan'] = i.home_team_score + i.away_team_score - daxiaoqiu.ovalue
          }
        }
        if (i['qiupan'] > 0) {
          i['qiu'] = '大'
        } else if (i['qiupan'] < 0) {
          i['qiu'] = '小'
        } else {
          i['qiu'] = '走'
        }
      })
      data.map(item => {
        if (item.sheng == '胜') {
          this[team + 'count'].sheng.push(item.sheng)
        } else if (item.sheng == '负') {
          this[team + 'count'].fu.push(item.sheng)
        } else if (item.sheng == '平') {
          this[team + 'count'].ping.push(item.sheng)
        }
        if (item.qiu == '大') {
          this[team + 'count'].da.push(item.qiu)
        }
        if (item.ya == '赢') {
          this[team + 'count'].ying.push(item.ya)
        }
      })
      return data
    },

    //近期比赛
    async getEndMatchByTeamId(team) {
      let data = {
        team_id: team == 'home' ? this.home_team_id : this.away_team_id,
        per_page: team == 'home' ? parseInt(this.home_latest_page) : parseInt(this.away_latest_page),
        homeLike: team
      }
      let res = await this.$api.getEndMatchByTeamId(data)

      if (team == 'home') {
        this.dealMathchData(res.data, 'home')
        this.home_latest = res.data
      } else {
        this.dealMathchData(res.data, 'away')
        this.away_latest = res.data
      }
    },

    //未来比赛
    async getUnBeginMatchByTeamId(team) {
      let res = await this.$api.getUnBeginMatchByTeamId({
        team_id: team == 'home' ? this.home_team_id : this.away_team_id
      })
      if (team == 'home') {
        this.home_future = res
      } else {
        this.away_future = res
      }
    },
    //积分榜
    async getMatchTournamentRankingByTeamId(team) {
      let res = await this.$api.getMatchTournamentRankingByTeamId({
        tournament_id: this.tournament_id,
        season_id: this.season_id,
        team_id: team == 'home' ? this.home_team_id : this.away_team_id
      })
      let home_rank_total = {
        matchesTotal: '',
        winTotal: '',
        drawTotal: '',
        lossTotal: '',
        goalsForTotal: '',
        goalsAgainstTotal: '',
        goalDiffTotal: '',
        pointsTotal: '',
        positionTotal: '',
        winPctTotal: ''
      }
      let home_rank = {}
      let home_rank_home = {
        matchesHome: '',
        winwinHome: '',
        drawHome: '',
        lossHome: '',
        goalsForHome: '',
        goalsAgainstHome: '',
        goalDiffHome: '',
        pointsHome: '',
        positionHome: '',
        winPctHome: ''
      }

      let away_rank = {}

      if (res.tables.length > 0 && res.tables[0].statics.length > 0) {
        if (team == 'home') {
          res.tables[0].statics.map(i => {
            this.home_rank[i.type_en_name] = i.value ? i.value : '-'
          })
        } else {
          res.tables[0].statics.map(i => {
            this.away_rank[i.type_en_name] = i.value ? i.value : '-'
          })
        }
      }
      // this.home_rank = home_rank
    },
    //盘路
    async getTournamentMatchByTeamId(team) {
      let res = await this.$api.getTournamentMatchByTeamId({
        tournament_id: this.tournament_id,
        season_id: this.season_id,
        team_id: team == 'home' ? this.home_team_id : this.away_team_id,
        per_page: 20
      })
      this.dealData(res.data, team)
    },
    dealData(data, team) {
      let yapan = null
      let daxiaoqiu = null
      let shu = 0
      let zhushu = 0
      let keshu = 0
      let ying = 0
      let zhuying = 0
      let keying = 0
      let zou = 0
      let zhuzou = 0
      let kezou = 0
      let daqiu = 0
      let zhudaqiu = 0
      let kedaqiu = 0
      let xiaoqiu = 0
      let zhuxiaoqiu = 0
      let kexiaoqiu = 0
      let zouqiu = 0
      let zhuzouqiu = 0
      let kezouqiu = 0
      let zhusai = 0
      let kesai = 0

      data.map(i => {
        if (i.match_yapan) {
          yapan = i.match_yapan['Bet365'] ? i.match_yapan['Bet365'] : i.match_yapan['Vcbet']
        }
        if (Object.prototype.toString.call(yapan) != '[object Object]') {
          yapan = i.match_yapan['suibian']
        }
        if (i.match_daxiaoqiu) {
          daxiaoqiu = i.match_daxiaoqiu['Bet365'] ? i.match_daxiaoqiu['Bet365'] : i.match_daxiaoqiu['Vcbet']
        }
        if (Object.prototype.toString.call(daxiaoqiu) != '[object Object]') {
          daxiaoqiu = i.match_daxiaoqiu['suibian']
        }
        //亚盘
        let bifen = i.home_team_score + yapan.ovalue - i.away_team_score
        //大小球
        let daxiao = i.home_team_score + i.away_team_score - daxiaoqiu.ovalue
        //主客队
        let team_id = team == 'home' ? this.home_team_id : this.away_team_id

        if (i.home_team_id == team_id) {
          zhusai++
          //亚盘
          if (bifen > 0) {
            i['yapan'] = '赢'
            ying++
            zhuying++
          } else if (bifen < 0) {
            i['yapan'] = '输'
            shu++
            zhushu++
          } else {
            i['yapan'] = '走'
            zou++
            zhuzou++
          }
          //大小球
          if (daxiao > 0) {
            daqiu++
            zhudaqiu++
          } else if (daxiao < 0) {
            xiaoqiu++
            zhuxiaoqiu++
          } else {
            zouqiu++
            zhuzouqiu++
          }
        } else {
          kesai++
          //亚盘
          if (bifen > 0) {
            i['yapan'] = '输'
            shu++
            keshu++
          } else if (bifen < 0) {
            i['yapan'] = '赢'
            ying++
            keying++
          } else {
            i['yapan'] = '走'
            zou++
            kezou++
          }
          //大小球
          if (daxiao > 0) {
            daqiu++
            kedaqiu++
          } else if (daxiao < 0) {
            xiaoqiu++
            kexiaoqiu++
          } else {
            zouqiu++
            kezouqiu++
          }
        }
      })
      if (team == 'home') {
        this.team1_all = {
          len: data.length,
          ying: ying,
          zou: zou,
          shu: shu,
          daqiu: daqiu,
          xiaoqiu: xiaoqiu
        }
        this.team1_home = {
          len: zhusai,
          ying: zhuying,
          zou: zhuzou,
          shu: zhushu,
          daqiu: zhudaqiu,
          xiaoqiu: zhuxiaoqiu
        }
        this.team1_away = {
          len: kesai,
          ying: keying,
          zou: kezou,
          shu: keshu,
          daqiu: kedaqiu,
          xiaoqiu: kexiaoqiu
        }
      } else {
        this.team2_all = {
          len: data.length,
          ying: ying,
          zou: zou,
          shu: shu,
          daqiu: daqiu,
          xiaoqiu: xiaoqiu
        }
        this.team2_home = {
          len: zhusai,
          ying: zhuying,
          zou: zhuzou,
          shu: zhushu,
          daqiu: zhudaqiu,
          xiaoqiu: zhuxiaoqiu
        }
        this.team2_away = {
          len: kesai,
          ying: keying,
          zou: kezou,
          shu: keshu,
          daqiu: kedaqiu,
          xiaoqiu: kexiaoqiu
        }
      }

      console.log(this.team2_all)
      console.log(this.team2_home)
      console.log(this.team2_away)
    }
  },
  mounted() {
    this.getTwoTeamMatchEd()
    this.getEndMatchByTeamId('home')
    this.getEndMatchByTeamId('away')
    this.getUnBeginMatchByTeamId('home')
    this.getUnBeginMatchByTeamId('away')
    this.getMatchTournamentRankingByTeamId('home')
    this.getMatchTournamentRankingByTeamId('away')
    this.getTournamentMatchByTeamId('home')
    this.getTournamentMatchByTeamId('away')
  },
  computed: {
    // ...mapState(['match'])
    match_id() {
      return this.$route.query.match_id
    },
    home_team_id() {
      return this.$route.query.home_team_id
    },
    away_team_id() {
      return this.$route.query.away_team_id
    },
    tournament_id() {
      return this.$route.query.tournament_id
    },
    season_id() {
      return this.$route.query.season_id
    }
  }
}
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
  .jifen {
    div {
      width: 50%;
    }
    .home {
      border-right: 1px solid #ccc;
    }
    ul {
      width: 100%;
      border-bottom: 1px solid #ccc;
    }
    h3 {
      border-bottom: 1px solid #ccc;
    }
    ul, li {
      display: inline-block;
    }
    li {
      width: 50px;
    }
  }
  .bg_gray {
    background: #F7F7F7;
  }
  .panlu {
    .bg_gray {
      background: #F7F7F7;
    }
    table {
      display: table;
    }
    td {
      border-bottom: 1px solid #DCE1E6;
      font-size: 14px;
      color: #2E3133;
      padding: 0 8px;
    }
    .bg_gray2 td {
      color: #5C6166 !important;
      font-weight: 400;
    }
    .right_border {
      border-right: 1px solid #DCE1E6;
    }
    .left_border {
      border-left: 1px solid #DCE1E6;
    }
  }
}
</style>
