<!--项目列表的主控件的列表部分-->
<template>
  <div id="main-container">
    <el-card v-for="(o,index) in ListData" :key="o.id" class="box-card" shadow="hover" v-on:click.native="open(index)">
      <div>
        <span id="id">{{o.id}}</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="quit(index)">退出</el-button>
      </div>
    </el-card>
    <el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import {searchSIPByStu, quitProject} from "@/router/request"
export default {
  data () {
    return {
      ListData: []
    }
  },
  mounted () {
    this.refresh()
  },
  methods: {
    refresh () {
      var data = {
        stuName: localStorage.name
      }
      console.log(data)
      searchSIPByStu(data)
      .then(res => {
        console.log(res)
        this.ListData = []
        res.result.forEach(element => {
          this.ListData.push({
            id: element.Key,
            final_score: element.final_score,
            relative_score: element.relative_score
          })
        })
      })
    },
    open (e) {
      this.change(this.ListData[e].id)
    },
    quit (index) {
      this.$confirm('退出这个项目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(this.ListData[index].id)
          quitProject({SipID: this.ListData[index].id})
          .then(res => {
            if (res.status !=='wrong') {
              console.log(res)
              this.$message({
              type: 'success',
              message: '退出成功!'
            })
            } else {
              this.$message({
              type: 'error',
              message: '网络错误'
            })
            }
          })
          .catch(res => {
              this.$message({
              type: 'error',
              message: '网络错误'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });          
        });
    } 
  },
  props: {
    change: {
      type: Function,
      default: null
    }
  },
  watch:{

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
.no-pointer{
  pointer-events: none;
}

</style>
