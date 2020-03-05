<template>
  <div id=app>
    <router-view></router-view>
  </div>
</template>
<script>
import {test} from '@/router/request'

export default {
  name: 'app',
  beforeMount () {
    if(typeof localStorage.name === 'undefined'){
      this.$router.push({path:'/login'})
    }
  },
  mounted () {
    // test().then(res => console.log(res)).catch(res => console.log(res))
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
body{
  /*设置内部填充为0，几个布局元素之间没有间距*/
  padding: 0px;
  /*外部间距也是如此设置*/
  margin: 0px;
  /*统一设置高度为100%*/
  height: 100%;
}
#app{
  height: 100%;
}
</style>
