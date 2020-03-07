<template>
  <div id="app" class="app-wrapper">
    <el-container>
      <!--<el-header class="header">
        <vheader />
      </el-header>-->
      <el-container>
        <!--<el-aside width="200px">
          <navmenu></navmenu>
        </el-aside>-->
        
        <el-main>
          <el-header>
            <vheader />
          </el-header>
          <router-view class="main"></router-view>
        </el-main>
        <el-aside width="20px">
        </el-aside>
        <el-aside class="side" width="400px" style="border-radius: 25px 0px 0px 0px">
          <div class="function">
            <el-button style="float: right; padding: 3px 0; color:white;" type="text" @click="logout">登出</el-button>
            <!--
            <el-badge :value="3" class="item">
              <i class="el-icon-bell" style="font-size: 30px;"></i>
            </el-badge>
            -->
          </div>
          <div class="info">
            <router-link to="/userinfo">
              <el-avatar size="large">{{name}}</el-avatar>
            </router-link>
            <div class="name">{{name}}</div>
          </div>
          <div class="calendar-warp">
            <el-calendar v-model="date" style="border-radius: 25px 25px 0px 0px;">
            </el-calendar>
          </div>
          
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import NavMenu from '@/components/NavMenu'
import Header from '@/components/Header'

export default {
  beforeMount () {
    this.$router.push({path:'/app/ProjectList'}).catch(() =>{})
    if(typeof localStorage.name !== 'undefined'){
      name = localStorage.name
    }
  },
  data () {
    return {
      date: '',
      name: localStorage.name
    }
  },
  methods:{
    logout () {
      localStorage.removeItem('name')
      this.$router.push({path:'/login'}).catch(() =>{})
    }
  },
  name: 'mainApp',
  components: {
    'navmenu': NavMenu,
    'vheader': Header
  }
}

</script>

<style>
html{
  height: 100%;
}
.header {
  background-color: #409EFF;
  color: #fff;
  line-height: 60px;
}
#app,.el-container{
  /*设置内部填充为0，几个布局元素之间没有间距*/
  padding: 0px;
  /*外部间距也是如此设置*/
  margin: 0px;
  /*统一设置高度为100%*/
  height: 100%;
}
.el-main{
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.main{
  flex-grow: 1;
}
.app-wrapper {
  overflow: hidden;
  height: 100%;
  width: 100%;
}
.side {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 10px 10px 10px;
  background-color: #3399CC;
  box-shadow: -2px 2px 10px #000000
}
.function {
  width: 100%;
  margin-top:10px;
  margin-bottom: 30px;
  
}
.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0px;
  background-color: #FFFFFF;
  width: 60%;
  padding-bottom: 20px;
  padding-top: 20px;
  border-radius: 25px;
  box-shadow: inset 0px 0px 5px #000000;
}
.el-main{
  padding: 0%;
}
.calendar-warp{
  margin-top: auto;
  border-radius: 25px;
  box-shadow: inset 0px 0px 5px #000000;
}

.el-calendar /deep/
.el-calendar-day{
  height: 50px;
}
.name{
  padding-top: 30px;
}
.el-menu-item{
  width:50%;
}
.el-avatar--large {
  width: 80px;
  height: 80px;
  line-height: 80px;
}
</style>
