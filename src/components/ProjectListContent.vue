<!--项目列表的主控件的列表部分-->
<template>
  <div id="main-container">

    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open=""
      @close="">
      <el-menu-item v-for="(o,index) in ListData" :key="o.id"  style="width: 100%" v-on:click.native="open(index)">
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
    <el-dialog
      :title="this.ListData[this.curProj] ? this.ListData[this.curProj].name:'null' + '  项目详情'"
      :visible.sync="dialogVisible"
      width="30%">
      <div class = "detail-wrap clearfix">
        
        <span class = "detail-name copy" style="float:right">{{this.ListData[this.curProj] ? this.ListData[curProj].id :''}}</span>
        <span class = "detail-name ">项目ID</span>
      </div >
        <el-divider></el-divider>
      
      <div class = "detail-wrap clearfix">
        
        <span class = "detail-short" style="float:right">{{this.ListData[this.curProj] ? this.ListData[curProj].start_time :''}}</span>
        <span class = "detail-name">项目开始时间</span>
      </div>
      <div class = "detail-wrap  clearfix">
        
        <span class = "detail-short" style="float:right">{{this.ListData[this.curProj] ? this.ListData[curProj].end_time :''}}</span>
        <span class = "detail-name">项目结束时间</span>
      </div>
      <div class = "detail-wrap  clearfix">
        
        <span class = "detail-short" style="float:right">{{this.ListData[this.curProj] ? this.ListData[curProj].teacher_name :''}}</span>
        <span class = "detail-name">项目负责人</span>
      </div>
      <div class = "detail-wrap  clearfix">
        
        <span class = "detail-short" style="float:right">{{this.ListData[this.curProj] ? this.ListData[curProj].leader_name  :''}}</span>
        <span class = "detail-name">项目创建人</span>
      </div>
      <div class = "detail-wrap  clearfix">
        <span class = "detail-name">项目介绍</span>
        <div class = "detail-text">{{this.ListData[this.curProj] ? this.ListData[curProj].info :''}}<br><br></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import {searchSIPByStu,searchProByTeacher, quitProject, finishPro} from "@/router/request"
export default {
  data () {
    return {
      ListData: [],
      sip: [],
      dialogVisible: false,
      curProj: 0
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
              relative_score: element.relative_score,
              end_time: element.pro_end_time,
              start_time: element.pro_start_time,
              teacher_name: element.pro_teacher_name,
              leader_name: element.pro_leader_name
            })
          }
        })
        if(res.Sip)
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
      this.dialogVisible = true;
      this.curProj = index
    },
    quit (index) {
      this.$confirm('退出这个项目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          (localStorage.identity === 'student' ?
          quitProject({SipID: this.sip[index].id}):
          teacherQuitPro({proID: this.ListData[index].id, teacherName: localStorage.name}))
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
  .detail-name{
    display: inline-block;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    border-style:solid;
    border-color:rgb(129, 129, 129);
    border-width: 1px;
    border-radius: 5px;
    padding: 5px;
    margin-right: 10px;
  }
  .detail-wrap{
    padding: 5px;
  }
  .detail-text{
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    border-style:solid;
    border-color:rgb(129, 129, 129);
    border-width: 1px;
    border-radius: 5px;
    padding: 5px;
    margin : 15px;
  }
  .detail-short{
    padding: 5px;
    padding-right : 15px;
  }
  .clearfix:after{
    content: "020"; 
    display: block; 
    height: 0; 
    clear: both; 
    visibility: hidden;  
  }
  .copy{
    cursor:copy;
  }
</style>
