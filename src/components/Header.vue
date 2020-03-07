<template>
  <el-row type="flex" align="middle">
    <el-col :span="23">欢迎 {{name}}</el-col>
    <el-col :span="1" id="ava">
      
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return{
      name: localStorage.name
    }
  }
}
</script>

<style scoped>
#ava{
  flex-direction: column;
  display: flex;
}

</style>
