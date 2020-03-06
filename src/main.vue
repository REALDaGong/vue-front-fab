<template>
  <div id="app" class="app-wrapper">
    <el-container>
      <el-header class="header">
        <vheader />
      </el-header>
      <el-container>
        <!--<el-aside width="200px">
          <navmenu></navmenu>
        </el-aside>-->
        <el-main>
          <router-view></router-view>
        </el-main>
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
}
.app-wrapper {
  overflow: hidden;
  height: 100%;
  width: 100%;
}
.el-aside {
  background-color: #545c64;
}
.el-main{
  padding: 0%;
}
</style>
