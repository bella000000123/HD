<template>
  <div class="bifen center">
    <!-- <img :src="icons.banner" alt="盈利" class="banner" /> -->
    <div class="wrapper">
      <div class="tabs">
        <el-tabs v-model="tabType" @tab-click="chooseTab">
          <el-tab-pane label="比分" name="now"></el-tab-pane>
          <el-tab-pane label="完场" name="finish"></el-tab-pane>
          <el-tab-pane label="赛程" name="future"></el-tab-pane>
        </el-tabs>
      </div>

      <div class="con box">
        <div class="div1" v-if="tabType == 'now'">
          <!-- <span :class="['btn', { btn1: !chooseAll }]" @click="getPartMatches">精简</span> -->
          <!-- <span :class="['btn', { btn1: chooseAll }]" @click="getAllMatches">更多</span> -->
          <span>
            共
            <span class="red">{{ total }}</span> 场，
          </span>
          <span>
            隐藏
            <span class="red">0</span> 场
          </span>
          <span class="red show" @click="showAll">[显示]</span>
        </div>
        <div class="div1 time-box" v-else>
          <p @click="toggleDate">
            <img :src="icons.date" alt="日期" />
            {{ checkedDate ? checkedDate : dateList[0] }}
            <img
              :src="icons.down"
              alt="日期"
            />
          </p>
          <div v-show="showDate">
            <p v-for="(li, i) in dateList" :key="i" @click="checkDate(li)">{{ li }}</p>
          </div>
        </div>
        <div class="div2">
          <span v-for="(item, i) in ups" :key="i" @click="up(i)" :class="{ red: nowUp === i }">
            {{ item }}
            <i :class="['icon', nowUp === i ? 'up' : 'down']"></i>
          </span>
          <div class="checks" v-if="nowUp !== ''">
            <div v-if="showMatch">
              <div v-for="(li, i) in countMatchName" :key="i" class="in-block check-item">
                <el-checkbox-group v-model="checkedMatchs" @change="checkedChangeMatch">
                  <el-checkbox :label="li.id">{{li.name}}[{{li.num}}]</el-checkbox>
                </el-checkbox-group>
              </div>
              <div class="btns">
                <el-checkbox
                  :indeterminate="isIndeterminate1"
                  v-model="checkAll1"
                  @change="checkAllMatch"
                >全选</el-checkbox>
                <span class="span1" @click="nowUp = ''">取消</span>
                <span class="span2" @click="getBeginMatch('',search1)">确定</span>
              </div>
            </div>
            <div v-else>
              <el-tabs v-model="activeName">
                <el-tab-pane label="让球" name="first">
                  <div class="in-block">
                    <div v-for="(li, i) in countMatchName2" :key="i" class="in-block check-item">
                      <el-checkbox-group v-model="checkedMatchs2" @change="checkedChangeMatch2">
                        <el-checkbox :label="li.yapan">{{li.name}}[{{li.num}}]</el-checkbox>
                      </el-checkbox-group>
                    </div>

                    <div class="btns">
                      <el-checkbox
                        :indeterminate="isIndeterminate2"
                        v-model="checkAll2"
                        @change="checkAllMatch2"
                      >全选</el-checkbox>
                      <span class="span1" @click="nowUp = ''">取消</span>
                      <span class="span2" @click="getBeginMatch('','',search2)">确定</span>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="进球数" name="second">
                  <div class="in-block">
                    <div v-for="(li, i) in countMatchName3" :key="i" class="in-block check-item">
                      <el-checkbox-group v-model="checkedMatchs3" @change="checkedChangeMatch3">
                        <el-checkbox :label="li.daxiao">{{li.daxiao}}[{{li.num}}]</el-checkbox>
                      </el-checkbox-group>
                    </div>
                    <div class="btns">
                      <el-checkbox
                        :indeterminate="isIndeterminate3"
                        v-model="checkAll3"
                        @change="checkAllMatch3"
                      >全选</el-checkbox>
                      <span class="span1" @click="nowUp = ''">取消</span>
                      <span class="span2" @click="getBeginMatch('','','',search3)">确定</span>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </div>
        <div class="div3">
          <el-input placeholder="请输入要搜索的赛事或球队" v-model="search"></el-input>
          <i class="search-icon" @click="getBeginMatch(search)"></i>
        </div>
      </div>

      <div class="table">
        <el-table
          ref="multipleTable"
          :data="now_matches"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="tableSelectChange"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column label="赛事" width="120">
            <template slot-scope="scope">
              <img :src="scope.row.tournament_logo_url" alt="图标" class="logo" />
              <span>{{ scope.row.tournament_alias }}</span>
            </template>
          </el-table-column>
          <el-table-column label="时间" width="110">
            <template slot-scope="scope">
              <p>{{scope.row.match_time.split(' ')[0]}}</p>
              <p>{{scope.row.match_time.split(' ')[1]}}</p>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="80">
            <template slot-scope="scope">
              <span
                :class="[scope.row.status == 3 ||scope.row.status_code==1||scope.row.status_code==2? 'red' : '']"
              >{{scope.row.status_code==1||scope.row.status_code==2?scope.row.time_play.time:scope.row.status_name }}</span>
              <span class="flash red" v-if="scope.row.status_code==1||scope.row.status_code==2">'</span>
            </template>
          </el-table-column>
          <el-table-column prop="home_team_name" label="主队" width></el-table-column>
          <el-table-column abel="比分" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.status != 1" class="red">
                <span class="red-card" v-show="scope.row.red1">{{ scope.row.red1 }}</span>
                <span class="yellow-card" v-show="scope.row.yellow1">{{ scope.row.yellow1 }}</span>
                {{ scope.row.home_team_score + '-' + scope.row.away_team_score }}
                <span
                  class="yellow-card"
                  v-show="scope.row.yellow2"
                >{{ scope.row.yellow2 }}</span>

                <span class="red-card" v-show="scope.row.red2">{{ scope.row.red2 }}</span>
              </span>
              <img :src="icons.vs" v-else class="vs-icon" />
            </template>
          </el-table-column>
          <el-table-column prop="away_team_name" label="客队" width></el-table-column>
          <el-table-column label="半场" width>
            <template slot-scope="scope">
              <span>{{ scope.row.home_team_half_time_score }}-{{ scope.row.away_team_half_time_score }}</span>
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
                <span v-for="(li, i) in scope.row.yapan.slice(0,3)" :key="i">{{ li }}</span>
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
          <el-table-column label="直播" width="60">
            <template slot-scope="scope">
              <img :src="icons.video" @click="chooseVideo(scope.row)" class="fenxi red" />
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
        <li class="li1" @click="save">
          <!-- <img :src="icons.save" alt /> -->
          <span class="img img1"></span>
          <p>保留</p>
        </li>
        <li class="li2" @click="hidden">
          <!-- <img :src="icons.hidden" alt /> -->
          <span class="img img2"></span>
          <p>隐藏</p>
        </li>
        <li class="li3">
          <!-- <img :src="icons.voice" alt /> -->
          <span class="img img3"></span>
          <p>静音</p>
        </li>
      </ul>
    </div>
    <!-- <iframe allow="autoplay" :src="require('../assets/radio.mp3')"></iframe> -->
    <!-- 
    <audio
      :src="require('../assets/radio.mp3')"
      controls
      autoplay="autoplay"
      hidden="true"
      ref="audio"
    ></audio>-->
    <video :src="require('../../static/radio.mp3')" autoplay="autoplay" ref="audio"></video>
  </div>
</template>

<script>
import WebSocketUtil from '@/utils/WebSocketUtil.js'
import odds from '../common/odds'
import { mapState } from 'vuex'

export default {
  components: {},
  data() {
    return {
      icons: {
        banner: require('../assets/bifen/banner.png'),
        hidden: require('../assets/bifen/hidden.png'),
        hidden1: require('../assets/bifen/hidden1.png'),
        save: require('../assets/bifen/save.png'),
        save1: require('../assets/bifen/save1.png'),
        voice: require('../assets/bifen/voice.png'),
        voice1: require('../assets/bifen/voice1.png'),
        top: require('../assets/bifen/top.png'),
        vs: require('../assets/vs.png'),
        corner: require('../assets/bifen/corner.png'),
        date: require('../assets/bifen/date.png'),
        down: require('../assets/bifen/down.png'),
        video: require('../assets/bifen/video.png')
      },
      tabType: 'now',
      ups: ['选择赛事', '选择盘路'],
      nowUp: '',
      now_matches: [],
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
      showDate: false,
      arr: [],
      //赛事筛选
      countMatchName: [],
      countMatchId: [],
      checkedMatchs: [],
      checkAll1: true,
      isIndeterminate1: false,
      showMatch: false,
      search1: '',
      //选择盘路-亚盘
      countMatchName2: [],
      countMatchId2: [],
      checkedMatchs2: [],
      checkAll2: true,
      isIndeterminate2: false,
      showMatch2: false,
      search2: '',
      //选择盘路-大小球
      countMatchName3: [],
      countMatchId3: [],
      checkedMatchs3: [],
      checkAll3: true,
      isIndeterminate3: false,
      showMatch3: false,
      activeName: 'first',
      search3: ''
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
        this.getNowMatchList(date)
      } else if (type.name === 'future') {
        this.get7day(false, this.after7d)
        this.dateList = this.after7d
        let date = this.checkedDate.split(' ')[0] ? this.checkedDate.split(' ')[0] : this.dateList[0].split(' ')[0]
        this.getNowMatchList(date)
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
        myDate.setDate(myDate.getDate())
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
      this.getNowMatchList(date)
    },
    //隐藏保存数据
    tableSelectChange(val) {
      this.multipleSelection = val
    },
    save() {
      this.$store.commit('chooseSaveList', this.multipleSelection)
      this.now_matches = this.multipleSelection
      console.log(this.saveList)
    },
    hidden() {
      this.$store.commit('chooseHiddenList', this.multipleSelection)
      let list = this.multipleSelection
      let all = this.now_matches
      if (list.length > 0) {
        list.map(i => {
          let index = all.findIndex(item => {
            return i.id == item.id
          })
          if (index != -1) {
            all.splice(index, 1)
          }
        })
        this.now_matches = all
        console.log(this.hiddenList)
      }
    },
    showAll() {
      this.$store.commit('chooseHiddenList', [])
      this.$store.commit('chooseSaveList', [])
      this.getBeginMatch()
    },

    up(i) {
      if (i == 0) {
        this.showMatch = true
      } else {
        this.showMatch = false
      }
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
    async getNowMatchList(date, keywords, liansai, rangqiu, jinqiu) {
      let data = {
        date: date,
        per_page: 400,
        keywords: keywords ? keywords : '',
        liansai: liansai ? liansai : '',
        rangqiu: rangqiu ? rangqiu : '',
        jinqiu: jinqiu ? jinqiu : ''
      }

      let res = await this.$api.getNowMatchList(data)
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
        this.dealdata(finish)
        this.now_matches = finish
      } else if (this.tabType === 'future') {
        this.dealdata(future)
        this.now_matches = future
      }
    },

    //今日比赛
    async getBeginMatch(keywords, liansai, rangqiu, jinqiu) {
      this.nowUp = ''

      let data = {
        keywords: keywords ? keywords : '',
        liansai: liansai ? liansai : '',
        rangqiu: rangqiu ? rangqiu : '',
        jinqiu: jinqiu ? jinqiu : ''
      }

      let res = await this.$api.getBeginMatch(data)
      this.loading = true
      let list = res.beginmatch.concat(res.unbeginmatch).concat(res.endmatch)

      if (this.hiddenList.length > 0) {
        list.map(i => {
          let index = this.hiddenList.findIndex(item => {
            return i.id == item.id
          })
          if (index != -1) {
            list.splice(index, 1)
          }
        })
      }
      if (this.saveList.length > 0) {
        list = this.saveList
      }

      this.dealdata(list)
      this.now_matches = list
    },

    // 选择哪条比赛，进入详情页
    chooseMatch(match) {
      this.$store.commit('chooseMatch', match)
      let routeUrl = this.$router.resolve({
        path: '/bifenDetail',
        query: {
          match_id: match.id,
          home_team_id: match.home_team_id,
          away_team_id: match.away_team_id,
          tournament_id: match.tournament_id,
          season_id: match.season_id
        }
      })
      window.open(routeUrl.href, '_blank')
    },
    chooseVideo(match) {
      this.$store.commit('chooseMatch', match)
      let routeUrl = this.$router.resolve({
        path: '/bifenVideo',
        query: { match_id: match.id, home_team_id: match.home_team_id, away_team_id: match.away_team_id }
      })
      window.open(routeUrl.href, '_blank')
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

        //亚盘
        if (i.match_yapan) {
          let yapan = i.match_yapan['Bet365'] ? i.match_yapan['Bet365'] : i.match_yapan['Vcbet']
          if (Object.prototype.toString.call(yapan) != '[object Object]') {
            yapan = i.match_yapan['suibian']
          }
          if (Object.prototype.toString.call(yapan) == '[object Object]') {
            if (i.status == 1) {
              i['yapan'] = [
                (yapan.fields[0].value0 - 1).toFixed(2),
                yapan.ovalue0 > 0 ? '受' + odds[Math.abs(yapan.ovalue0)] : odds[Math.abs(yapan.ovalue0)],
                (yapan.fields[1].value0 - 1).toFixed(2),
                yapan.ovalue0
              ]
            } else {
              i['yapan'] = [
                (yapan.fields[0].value - 1).toFixed(2),
                yapan.ovalue > 0 ? '受' + odds[Math.abs(yapan.ovalue)] : odds[Math.abs(yapan.ovalue)],
                (yapan.fields[1].value - 1).toFixed(2),
                yapan.ovalue
              ]
            }
          }
        }

        //大小球
        if (i.match_daxiaoqiu) {
          let daxiaoqiu = i.match_daxiaoqiu['Bet365'] ? i.match_daxiaoqiu['Bet365'] : i.match_daxiaoqiu['Vcbet']
          if (Object.prototype.toString.call(daxiaoqiu) != '[object Object]') {
            daxiaoqiu = i.match_daxiaoqiu['suibian']
          }
          if (Object.prototype.toString.call(daxiaoqiu) == '[object Object]') {
            if (i.status == 1) {
              i['daxiao'] = [(daxiaoqiu.fields[0].value0 - 1).toFixed(2), daxiaoqiu.ovalue0, (daxiaoqiu.fields[1].value0 - 1).toFixed(2)]
            } else {
              i['daxiao'] = [(daxiaoqiu.fields[0].value - 1).toFixed(2), daxiaoqiu.ovalue, (daxiaoqiu.fields[1].value - 1).toFixed(2)]
            }
          }
        }

        //时间
        i['time_play'] = { time: '-' }
        if (i.status_code == 1 || i.status_code == 2) {
          if (i.time_running == 1) {
            if (i.time_update) {
              //足球已进行时间 = (当前时间 - time_update)(秒) + time_played
              let time = ((new Date().getTime() - new Date(i.time_update.slice(0, 19)).getTime()) / 1000 + parseInt(i.time_played)) / 60
              i['time_play'] = { time: parseInt(time) }
            }
          } else if (i.time_running == 0) {
            //足球已进行时间 = time_played
            i['time_play'] = { time: parseInt(parseInt(i.time_played) / 60) }
          }
        }
      })

      return data
    },
    //赛事筛选
    checkedChangeMatch(value) {
      let checkedCount = value.length
      this.checkAll1 = checkedCount === this.countMatchName.length
      this.isIndeterminate1 = checkedCount > 0 && checkedCount < this.countMatchName.length
      let val = value.join(',')
      this.search1 = val
      console.log(typeof val)
    },
    checkAllMatch(val) {
      this.checkedMatchs = val ? this.countMatchId : []
      this.isIndeterminate1 = false
      let value = this.checkedMatchs.join(',')

      this.search1 = value
      console.log(value)
    },
    checkedChangeMatch2(value) {
      let checkedCount = value.length
      this.checkAll2 = checkedCount === this.countMatchName2.length
      this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.countMatchName2.length
      let val = value.join(',')
      this.search2 = val
      console.log(val)
    },
    checkAllMatch2(val) {
      this.checkedMatchs2 = val ? this.countMatchId2 : []
      this.isIndeterminate2 = false
      let value = this.checkedMatchs2.join(',')
      this.search2 = value
      console.log(value)
    },
    checkedChangeMatch3(value) {
      let checkedCount = value.length
      this.checkAll3 = checkedCount === this.countMatchName3.length
      this.isIndeterminate3 = checkedCount > 0 && checkedCount < this.countMatchName3.length
      let val = value.join(',')
      this.search3 = val
      console.log(val)
    },
    checkAllMatch3(val) {
      this.checkedMatchs3 = val ? this.countMatchId3 : []
      this.isIndeterminate3 = false
      let value = this.checkedMatchs3.join(',')
      this.search3 = value
      console.log(value)
    }
  },
  mounted() {
    this.getBeginMatch()
    setInterval(() => {
      this.getBeginMatch()
    }, 1200000)
    // 初始化websoket
    this.initSocket({ url: 'ws://ws.211aoa.com:8282' })
    // this.dealdata([this.newMatchItem.message])
  },

  computed: {
    ...mapState(['newMatchItem', 'hiddenList', 'saveList']),

    //比赛列表的length
    total() {
      return this.now_matches.length
    }
  },
  watch: {
    now_matches(list) {
      if (Array.isArray(list)) {
        this.now_matches = list
        let names = []
        let ids = []

        let yapan = []
        let yapan_ids = []

        let daxiao = []
        let daxiao_ids = []

        list.map(i => {
          //选择赛事
          let index = names.findIndex(item => {
            return item.id == i.tournament_id
          })
          if (index != -1) {
            names[index].num += 1
          } else {
            names.push({ name: i.tournament_alias, id: i.tournament_id, num: 1 })
          }
          //选择亚盘
          if (i['yapan'][1] != '-') {
            let index2 = yapan.findIndex(item => {
              return parseFloat(item['yapan']) == parseFloat(i['yapan'][3])
            })
            if (index2 != -1) {
              yapan[index2].num += 1
            } else {
              yapan.push({ yapan: i['yapan'][3], name: i['yapan'][1], id: i.tournament_id, num: 1 })
            }
          }
          //选择大小球
          if (i['daxiao'][1] != '-') {
            let index3 = daxiao.findIndex(item => {
              return parseFloat(item['daxiao']) == parseFloat(i['daxiao'][1])
            })
            if (index3 != -1) {
              daxiao[index3].num += 1
            } else {
              daxiao.push({ daxiao: i['daxiao'][1], id: i.tournament_id, num: 1 })
            }
          }
        })

        names.map(i => {
          ids.push(i.id)
        })

        yapan.map(i => {
          yapan_ids.push(i.yapan)
        })
        daxiao.map(i => {
          daxiao_ids.push(i.daxiao)
        })

        this.countMatchName = names
        this.countMatchId = ids
        this.checkedMatchs = ids
        this.countMatchName2 = yapan
        this.countMatchId2 = yapan_ids
        this.checkedMatchs2 = yapan_ids
        this.countMatchName3 = daxiao
        this.countMatchId3 = daxiao_ids
        this.checkedMatchs3 = daxiao_ids
      }
    },
    newMatchItem(newMatchItem) {
      if (Array.isArray(this.now_matches) && this.now_matches.length) {
        const sumData = [...this.now_matches]

        if (sumData.length > 0) {
          let index = sumData.findIndex(item => {
            if (item.id == newMatchItem.match_id) {
              console.log(item.id + '===' + newMatchItem.match_id)
              this.$refs.audio.play()
            }
            return item.id == newMatchItem.match_id
          })
          if (index != -1) {
            let newItem = this.dealdata([newMatchItem.message])
            let del = sumData.splice(index, 1, newItem[0])

            if (
              parseInt(newItem[0].away_team_score) > parseInt(del[0].away_team_score) ||
              parseInt(newItem[0].home_team_score) > parseInt(del[0].home_team_score)
            ) {
              this.$refs.audio.play()
            }
            this.now_matches = [...sumData]
          }
        }
      }
    }
  }
}
</script>
<style scoped lang="stylus">
.center {
  // width: 85%;
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
  .bottom-border {
    border-bottom: 1px solid #ccc;
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
      left: 100px;
      top: 230px;
      li {
        margin: 15px 0;
        padding: 5px 10px;
        border-bottom: 1px solid #ccc;
        background: #fff;
        cursor: pointer;
        text-align: center;
        &:hover {
          color: #D9BB90;
        }
      }
      .li1:hover {
        .img1 {
          background: url('../assets/bifen/save1.png') no-repeat;
          background-size: contain;
        }
      }
      .li2:hover {
        .img2 {
          background: url('../assets/bifen/hidden1.png') no-repeat;
          background-size: contain;
        }
      }
      .li3:hover {
        .img3 {
          background: url('../assets/bifen/voice1.png') no-repeat;
          background-size: contain;
        }
      }
      .img {
        display: inline-block;
        width: 22px;
        height: 22px;
      }
      .img1 {
        background: url('../assets/bifen/save.png') no-repeat;
        background-size: contain;
        // &:hover {
        // background: url('../assets/bifen/save1.png') no-repeat;
        // background-size: contain;
        // }
      }
      .img2 {
        background: url('../assets/bifen/hidden.png') no-repeat;
        background-size: contain;
        // &:hover {
        // background: url('../assets/bifen/hidden1.png') no-repeat;
        // background-size: contain;
        // }
      }
      .img3 {
        background: url('../assets/bifen/voice.png') no-repeat;
        background-size: contain;
        // &:hover {
        // background: url('../assets/bifen/voice1.png') no-repeat;
        // background-size: contain;
        // }
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
        padding-left: 30px;
        span {
          // margin: 0 15px;
        }
        .show {
          cursor: pointer;
        }
        .btn {
          margin: 0 15px;
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
        position: relative;
        span {
          position: relative;
          padding-right: 10px;
          margin: 0 20px;
          cursor: pointer;
        }
        .checks {
          position: absolute;
          box-sizing: border-box;
          top: 45px;
          left: -25px;
          width: 500px;
          padding: 10px;
          border: 1px solid #ddd;
          z-index: 10;
          background: #fff;
          .all-check {
            padding-left: 10px;
            border-bottom: 1px dashed #ccc;
          }
          .check-item {
            margin: 0 10px;
          }
          .btns {
            text-align: right;
            border-top: 1px solid #ccc;
            padding: 10px 0;
            span {
              display: inline-block;
              padding: 0px 20px;
              height: 35px;
              border-radius: 5px;
              line-height: 35px;
              border-radius: 5px;
              margin: 0 5px;
            }
            .span2 {
              background: #904a0c;
              color: #fff;
            }
            .span1 {
              margin-left: 30px;
              border: 1px solid #ccc;
            }
          }
        }
      }
      .div3 {
        width: 250px;
        margin-right: 30px;
        position: relative;
        .search-icon {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 20px;
          height: 20px;
          background: url('../assets/bifen/search.png');
          background-size: contain;
          cursor: pointer;
        }
      }
    }
  }
  .fenxi {
    cursor: pointer;
  }
}
.bifen .tabs /deep/ .el-tabs__item {
  width: 60%;
  text-align: center;
  font-size: 16px;
}
.bifen .tabs /deep/ .el-tabs {
  line-height: 62px;
}
.bifen .tabs /deep/ .el-tabs__header {
  background: url('../assets/nav1.png');
  background-size: 100% 100%;
}
.bifen .tabs /deep/ .el-tabs__item.is-active, .bifen /deep/ .el-loading-text {
  color: #904a0c;
}
.bifen .tabs /deep/ .el-tabs__item.is-active:hover {
  color: #904a0c;
}
.bifen .tabs /deep/.el-tabs__active-bar {
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
