<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item v-for="o in ListData" :key="o" :timestamp="o.date" placement="top">
        <el-card>
          <h4>{{o.desc}}</h4>
          <p>{{o.name}} 提交于 {{o.date}}</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/2" placement="top">
        <el-card>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/2 20:46</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ListData: [
        {
          desc: '实例描述',
          name: '名字',
          date: new Date()
        }
      ]
    }
  }
}
</script>

<style scoped>
#container{
  width: 100%;
  height: 100%;
}
</style>
