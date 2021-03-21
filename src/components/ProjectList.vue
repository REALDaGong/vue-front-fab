<!--项目列表的主控件-->
<template>
  <div class="main-container">
    <el-row :gutter="24" id="row">
      <el-col :span="6">
        <div id="list">
          <div id="topic">
          项目列表
          </div>
          <projectlistcontent ref="content" :change="changeRightContent"></projectlistcontent>
        </div>
        <div id="add">
          <el-button type="success" icon="el-icon-plus" circle @click="dialogFormVisible = true" style="box-shadow: 0px 0px 4px #000000"></el-button>
          <el-button type="success" icon="el-icon-refresh-left" circle @click="fetchAllProject" style="box-shadow: 0px 0px 4px #000000"></el-button>
          <el-dialog :title= 'formTitle' :visible.sync="dialogFormVisible">

            <el-radio-group v-model="formPage" class="buttons">
              <el-radio-button label="新建"></el-radio-button>
              <el-radio-button label="加入"></el-radio-button>
            </el-radio-group>
            <el-form :model="form" :class="{inactive:isNewClosed}">
              <el-form-item label="活动名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="负责人名称" :label-width="formLabelWidth">
                <el-input v-model="form.Tname" autocomplete="off" :disabled = "this.isTeacher"></el-input>
              </el-form-item>
              <el-form-item label="结束时间" :label-width="formLabelWidth">
                <el-date-picker
                  v-model="form.date"
                  type="datetime"
                  placeholder="选择时间"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="活动形式" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="form.desc"></el-input>
              </el-form-item>
            </el-form>
            <el-form :model="form" :class="{inactive:isJoinClosed}">
              <el-form-item label="项目ID" :label-width="formLabelWidth">
                <el-input v-model="form.proID" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="confirmMultex">确 定</el-button>
            </div>
          </el-dialog>
          <el-dialog title="搜索项目" :visible.sync="searchFormVisible">
            <span>{{searchResultString}}</span>
            <el-form>
              <el-form-item label="用户名称" :label-width="formLabelWidth">
                <el-input v-model="searchName" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
          </el-dialog>
        </div>
      </el-col>
      <el-col :span="18">
        <el-main id="content">
          <el-menu router default-active="/app/projectlist/projectSub" class="el-menu-demo" mode="horizontal" @select="handleSelect" @open="handleOpen" @close="handleClose">
            <el-menu-item index="/app/projectlist/projectSub">子项目</el-menu-item>
            <el-menu-item index="/app/projectlist/projectMember">成员</el-menu-item>
          </el-menu>
          <router-view :proID="selectedProID"></router-view>
        </el-main>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ProjectListContent from '@/components/ProjectListContent'
import {createProject, addProMember, teacherJoinPro} from '@/router/request'
import {formatDate} from '@/utils/dateFormatter'

export default {
  data () {
    return {
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
      dialogFormVisible: false,
      formTitle: "新建项目",
      form: {
        name: '',
        Tname: '',
        date: new Date(),
        desc: '',
        proID: ''
      },
      searchFormVisible: false,
      searchName: '',
      searchResultString: '请输入项目内的成员名',
      formLabelWidth: '120px',
      userName: 'ghd',
      formPage: '新建',
      isNewClosed: false,
      isJoinClosed: true,
      selectedProID: '',
      isTeacher: false
    }
  },
  beforeMount() {
    this.isTeacher = localStorage.identity == 'teacher' ? (this.form.Tname = localStorage.name,true) : false
  },
  components: {
    'projectlistcontent': ProjectListContent
  },
  created: function () {
    this.debouncedGetQuery = this._.debounce(this.getQuery, 500)

  },
  watch: {
    searchName: function (newInput, oldInput) {
      this.searchResultString = ''
      this.debouncedGetQuery()
    },
    formPage: function () {
      if(this.formPage === '新建'){
        this.formTitle = "新建项目"
        this.isNewClosed = false
        this.isJoinClosed = true
      }else{
        this.formTitle = "加入项目"
        this.isNewClosed = true
        this.isJoinClosed = false
      }
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect (key, keyPath) {
    },
    getQuery () {
      this.searchResultString = '查找中...'
      var data = {
        'stuName': this.searchName
      }
      sesrchSIPByStu(data)
        .then(res => {
          this.searchResultString = '结果:' + res
          console.log(res)
        })
        .catch(res => {
          this.searchResultString = '网络错误'
          console.log(res.response)
        })
    },
    getTitle(){

    },
    confirmMultex () {
      if (this.isJoinClosed == false){
        (localStorage.identity === 'teacher' ?
        teacherJoinPro({proID: this.form.proID,teacherName: localStorage.name}):
        addProMember({proID: this.form.proID,stuName: localStorage.name,isCheck:1}))

        //addProMember({proID: this.form.ProID,stuName: localStorage.name})
            .then(res => {
              console.log(res);
              if(res.status === 'wrong'){
                this.$message({
                  type: 'error',
                  message: res.details
                });
              }else{
                this.$message({
                  type: 'success',
                  message: res.details
                });
              }
            this.dialogFormVisible = false
            })
            .catch(res => {
              console.log(res.response);
              this.$message({
              type: 'error',
              message: '网络错误'
            });
            }).finally(()=>{
              this.fetchAllProject();
            })
      } else {
      var data = {
        info: this.form.desc,
        leaderName: localStorage.name,
        teacherName: this.form.Tname,
        startTime: formatDate(new Date()),
        endTime: formatDate(this.form.date),
        proName: this.form.name
      }
        createProject(data)
          .then(res => {
            if(res.status === 'wrong'){
              this.$message({
                  type: 'error',
                  message: res.details
                });
            }else{
              if(localStorage.identity === 'student'){
                console.log(res);
                setTimeout(() => {
                  addProMember({proID: res.ProID,stuName: localStorage.name,isCheck:0})
                  .then(res => {
                    console.log(res)
                    this.$message({
                      type: 'success',
                      message: res.details
                    });
                  })
                  .catch(res => {
                    console.log(res.response)
                    this.$message({
                      type: 'error',
                      message: '加入成功'
                    });
                  })
                  .finally(()=>{
                    setTimeout(()=>{this.fetchAllProject();},1500)
                    
                  })
                }, 1500);
                
              }
            }
            this.dialogFormVisible = false
          })
          .catch(res => {
            console.log(res)
            this.dialogFormVisible = false
          })
          .finally(()=>{
              this.fetchAllProject();
            })
      }
      
    },
    fetchAllProject () {
      this.$refs.content.refresh()
    },
    changeRightContent (proID) {
      this.selectedProID = proID
      localStorage.selectedProID = proID // bad action...
      // this.$refs.sub.refresh(proID)
    },
    getCurrentProID () {
      return this.selectedProID
    }
  }
}
</script>

<style scoped>
.main-container{
  padding: 0;
  margin: 0;
  height: 100%;
  width:auto;
  position: relative;
  background: rgb(236, 236, 236);
    background-image:
        linear-gradient(rgba(255,255,255,.3) 1px, transparent 0),
        linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 0),
        linear-gradient(white 1px, transparent 0),
        linear-gradient(90deg, white 1px, transparent 0);
    background-size: 15px 15px, 15px 15px, 75px 75px, 75px 75px;
  
}
#list{
  
  margin: 0;
  height: 100%;
  /*border-right: 1px solid #87888a;
  box-shadow: 5px 0px 5px -5px black;*/
}
#content{
  padding: 10px;
  margin: 0;
  padding-right: 30px;
  height: 100%;
  width: 100%;
  float: right;
  background-color: white;
  box-shadow: 1px 5px 10px #000000;

}
#row{
  margin: 0 !important;
  height: 100%;
}
#row /deep/
.el-col{
  padding: 0 !important;
  height: 100%;
}
.el-menu--horizontal>.el-menu-item{
  text-align: center;
}
.el-menu--horizontal .transparent{
  background-color: beige;
}
#add{
  position: absolute;
  bottom: 10px;
  left: 10px;
}
.inactive{
  display: none;
}
.buttons{
  margin-bottom: 10px;
}
#topic{
  width: 100%;
  text-align: center;
  padding-bottom: 0px;
  line-height: 70px;
  background-color: white;
  border-bottom: 1px solid rgb(224, 224, 224);
  font-weight: bold;
}
</style>
