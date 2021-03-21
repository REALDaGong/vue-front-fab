<template>
  <div class="container">
    <div class="card-wrap" v-for="(o,index) in List" :key="index" v-on:click="open(index)">
      <el-card class="card" :diff="List[index].difficulty">
        <div slot="header" class="clearfix">
          <span class="tooltip title">{{o.name.length > 6? o.name.substring(0,6)+"..." :o.name}}
            <span v-if="o.name.length > 6" class="tooltiptext " v-on:click.stop>{{o.name}}</span>
          </span>
          
          <el-button v-if="canDelete(index)" style="float: right; padding: 3px 0" type="text" @click="deleteSub(index,$event)">删除</el-button>
        </div>
        <div class="">
          <span>{{o.memberNum}}名成员</span><br><br>
          <span class="tooltip small">创建于 {{o.start.substring(0,10)}}
            <span class="tooltiptext small" v-on:click.stop>{{o.start.substring(10)}}
              <br>结束于
              <br>{{o.end}}
            </span>
            
          </span><br>
        </div>
      </el-card>
    </div>
    <div class="card-wrap">
      <el-card class="new card" v-on:click.native="dialogFormVisible=true" v-if="newSubVisible">
        <i class="el-icon-circle-plus-outline" style="font-size: 40px;"></i>
      </el-card>
    </div>
    <div class="center notify">
      {{showSubProjectHint()}}
    </div>
    <el-dialog title="新建子项目" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="结束时间">
          <el-date-picker
            v-model="form.date"
            type="datetime"
            placeholder="选择时间"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="子项目名称">
          <el-input type="text" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="子项目描述">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="难度评级">
          <el-input-number size="small" v-model="form.diff" :min=1 :max=4 controls-position="right"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="newSubProject">确 定</el-button>
      </div>
    </el-dialog>
    <div class="footer">
    </div>
  </div>

</template>

<script>
import {querySubOfPro, createSubproject, joinSubproject, deleteSubproject} from '@/router/request'
import {formatDate} from '@/utils/dateFormatter'
export default {
  beforeMount () {
    this.refresh()
  },
  data () {
    return{
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '明天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周后',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      size: 1,
      List: [],
      dialogFormVisible: false,
      newSubVisible: false,
      willDelete: -1,
      form: {
        desc: '',
        date: new Date(),
        diff: '1',
        name: ''
      }
    }
  },
  methods: {
    canDelete (index) {
      if (1===1) {
        return true
      } else {
        return false
      }
    },
    showSubProjectHint (){
      if(typeof localStorage.selectedProID === 'undefined' || localStorage.selectedProID === 'null'){
        return "请选择项目";
      }else{
        return "点击卡片进入详情页面";
      }
    },
    newSubProject () {
      // start and join myself.
      createSubproject({
        proID: this.proID,
        endTime: formatDate(this.form.date),
        difficulty: this.form.diff.toString(),
        info: this.form.desc,
        userName: localStorage.name,
        subproName: this.form.name
      })
      .then(res => {
        joinSubproject({
          subproID: res.subproID,
          stuName: localStorage.name
        })
        .then(res => {
          this.$message({
            type: 'success',
            message: '创建成功'
          })
          setTimeout(function(){this.refresh()}.bind(this),6000)
        })
        .catch(res => {
          console.log(res)
        })
        this.dialogFormVisible=false;
      })
      .catch(res => {
        console.log("nope")
        this.dialogFormVisible=false;
      })
    },
    open (index) {
      this.$router.push({path:'/subprojectDetail?id=' + this.List[index].id});
      location.reload();
    },
    refresh () {
      console.log("id"+this.proID)
      this.newSubVisible = false;
      if(this.proID){
        if(this.proID === 'null'){
          return;
        }
      this.newSubVisible = true;
      this.List = []
      querySubOfPro({proID: this.proID})
      .then(res => {
        console.log(res)
        res.result.forEach(element => {
          this.List.push(
            {
              raw: element.Record,
              id: element.Key,
              name: element.Record.subproName,
              info: element.Record.info,
              memberNum: element.Record.member.length,
              difficulty: element.Record.difficulty,
              start:element.Record.subproStartTime,
              end:element.Record.subproEndTime
            }
          )
        })
        this.size = res.result.length
      })
      .catch(res => {
        console.log(res)
      })
      } else {
        this.List=[]
      }
    },
    deleteSub (index,e) {
      e.stopPropagation();
      this.willDelete=index;
      this.$confirm('删除这个子项目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      })
      .then(() => {
        deleteSubproject({subproID: this.List[index].id})
        .then(() => {
          this.$message({
          type: 'success',
          message: '删除成功!'
          })
          setTimeout(function(){this.refresh()}.bind(this),6000)
        })
        .catch(() => {
          this.$message({
          type: 'error',
          message: '网络错误'
          })
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  },
  watch: {
    proID () {
      this.refresh()
    }
  },
  props: [
    'proID'
  ]
}
</script>

<style>
.container{
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  height: 100%;
  width: 100%;
  overflow: auto;
  
}
.card-wrap{
  box-sizing: border-box;
  flex: 0 0 20%;
  padding: 10px;
  min-width: 220px;
  min-height: 150px;
}
.card{
  height: 100%;
  width: 100%;
}
.new{
  display: flex;
  align-items: center;
  justify-content: center;
}
.footer{
  box-sizing: border-box;
  height: 20%;
  width: 100%;
}
.no-click{
  pointer-events: none;
}
.center{
  text-align: center;
}
.notify{
  padding: 100px;
  width: 100%;
  color: #c2c2c2;
  font-size: 14px;

}
.card[diff="1"]{
  border-top: 3px solid rgb(84, 255, 121);
}
.card[diff="2"]{
  border-top: 3px solid rgb(255, 232, 28);
}
.card[diff="3"]{
  border-top: 3px solid rgb(255, 174, 0);
}
.card[diff="4"]{
  border-top: 3px solid rgb(255, 72, 0);
}
.card[diff="5"]{
  border-top: 3px solid rgb(72, 72, 73);
}
.el-card__header [diff="0"]{
  border-top: 3px solid blue;
  padding:10px 20px;
}

.tooltip {
    position: relative;
    display: inline-block;
    
}
 
/* Tooltip 文本 */
.tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: white;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
 
    /* 定位 */
    position: absolute;
    z-index: 999;
    width: 120px;
    top: 100%;
    left: 50%; 
    margin-left: -60px; /* 使用一半宽度 (120/2 = 60) 来居中提示工具 */

    
}
 
/* 鼠标移动上去后显示提示框 */
.tooltip:hover .tooltiptext {
    visibility: visible;
}

.card{
  overflow: unset;
}
.title{
  font-weight: bold;
}
.small{
  font-size: 10px;
}

</style>
