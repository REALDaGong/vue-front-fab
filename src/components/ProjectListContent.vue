<!--项目列表的主控件的列表部分-->
<template>
  <div id="main-container">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open=""
      @close="">
      <el-menu-item v-for="(o,index) in ListData" :key="o.id" :index="index" style="width: 100%" v-on:click.native="open(index)">
        <div class = "pro-container">
          <span id="id">{{o.name}}</span>
          <el-dropdown @command="handleCommand" >
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{command:'info',ind:index}">项目详情</el-dropdown-item>
              <el-dropdown-item :command="{command:'end',ind:index}">结束项目</el-dropdown-item>
              <el-dropdown-item :command="{command:'quit',ind:index}">退出项目</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-menu-item>
    </el-menu>
    <el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import {searchSIPByStu,searchProByTeacher, quitProject, finishPro} from "@/router/request"
export default {
  data () {
    return {
      ListData: [],
      sip: []
    }
  },
  mounted () {
    this.refresh()
  },
  methods: {
    handleCommand (obj) {
      console.log(obj)

      if (obj.command === 'end'){
        this.finish(obj.ind)
      }else if(obj.command === 'quit'){
        this.quit(obj.ind)
      }else if(obj.command === 'info'){
        this.info(obj.ind)
      }
    },
    refresh () {

      (localStorage.identity == 'teacher'?
      searchProByTeacher({
        teacherName: localStorage.name
      }):
      searchSIPByStu({
        stuName: localStorage.name
      }))
      .then(res => {
        console.log(res)
        this.ListData = []
        res.proInfo.forEach(element => {
          if (element != null){
            this.ListData.push({
              id: element.project_id,
              name: element.project_name,
              info: element.pro_info,
              final_score: element.final_score,
              relative_score: element.relative_score
            })
          }
        })
        res.Sip.forEach(element => {
          if(element != null){
            this.sip.push({
              id: element.Record.sip_id
            })
          }
        })
      })
    },
    open (index) {
      if(index !== -1){
        this.change(this.ListData[index].id)
      }else{
        this.change(null)
      }
    },
    finish (index) {
      this.$confirm('结束这个项目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          finishPro({proID: this.ListData[index].id})
          .then(res => {
            console.log(res)
            if (res.status !=='wrong') {
              console.log(res)
              this.$message({
              type: 'success',
              message: '结束成功!'

              })
              this.open(-1)
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
            message: '已取消'
          });
        });
    },
    info(index){
      this.$alert(this.ListData[index].info, '项目详情', {
          confirmButtonText: '确定',
          callback: action => {
          }
        });
    },
    quit (index) {
      this.$confirm('退出这个项目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          quitProject({SipID: this.sip[index].id})
          .then(res => {
            if (res.status !=='wrong') {
              console.log(res)
              this.$message({
              type: 'success',
              message: '退出成功!'
              })
            this.open(-1)
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
  .pro-container{
    display: flex;
  }
  .pro-container .el-dropdown{
    flex-grow: 1;
    text-align: right;
  }
</style>
