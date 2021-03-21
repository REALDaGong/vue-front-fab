<template>
  <el-row type="flex" align="middle" style="height:100%">
    <el-col :span="1" id="hleft">
      <router-link to="/userinfo">
      <el-avatar :size="40">{{name}}</el-avatar>
      </router-link>
    
    </el-col >
    <el-col :span="3" class="notice">
      <router-link to="/userinfo">
      {{name}}
      </router-link>
    </el-col>
    <el-col :span="17" style="text-align:right" class="divide notice">
      
      {{time}}
    </el-col>
    <el-col :span="3" id="hright">
      <el-button id="logout" type="text" @click="logout" style="color:whitesmoke">登出</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return{
      name: localStorage.name,
      time: ""
    }
  },
  methods:{
    logout () {
      localStorage.removeItem('name')
      this.$router.push({path:'/login'}).catch(() =>{})
    }
  },
  mounted:function(){
    var date = new Date();
    this.time = date.getFullYear()+"年"+(date.getMonth() + 1)+"月"+date.getDate()+"日    ";
  }
}
</script>

<style scoped>
  #hright{
    flex-direction: column;
    display: flex;
    text-align: right;
  }
  #hleft{
    vertical-align: center;
  }
  .text{
  display: inline-block;
  height: 100%;
  vertical-align: center;
  }
  .el-avatar--circle{
    box-sizing: border-box;
    
  }
  #logout{
    padding: 3px 0;
  }
  
  .divide{
    border-left: 1px solid #188bfd;
    border-right : 1px solid #188bfd ;
    padding-right: 30px;
    height: 60px;
    line-height: 60px;
  }
  .notice{
    font-size: 14px;
    
  }
  .notice a{
    text-decoration: none;
    color:whitesmoke;
  }
  .el-col{
    color: whitesmoke;
  }
  
</style>
