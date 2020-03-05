<!--项目列表的详情部分,公告-->
<template>
  <div id=container>
    <el-main>
      <span>{{proID}}</span>
    </el-main>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    getProID () {
      console.log(this.$parent.getCurrentProID());
    }
  },
  watch: {
    proID () {
      console.log("watch了")
    }
  },
  props: [
    'proID'
  ]
}
</script>

<style scoped>
#container{
  width: 100%;
  height: 100%;
}
</style>
