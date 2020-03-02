<!--项目列表的主控件的列表部分-->
<template>
  <div id="main-container">
    <el-card v-for="o in ListData" :key="o" class="box-card" shadow="hover">
      <div class="text item">
        <span>{{o.name}}</span>
        <el-button style="float: right; padding: 3px 0" type="text">退出</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ListData: [{
        name: '好',
        age: '2'
      }, {
        name: '不好',
        age: '2'
      }, {}]
    }
  },
  methods: {

  }
}
</script>

<style scoped>
#main-container{
  width: 100%;
}
.hide{
  display: none;
}
#no-data{
  width: 20cm;
  height: 20cm;
  background-color: aqua;
}
#sign{
  width: 10cm;
  height: 10cm;
  background-color: blue;
}
.box-card{
  padding: 0%;
}
#main-container{
  position: relative;
  height: 100%;
}

</style>
