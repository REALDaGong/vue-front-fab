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
          <el-dialog title="新建项目" :visible.sync="dialogFormVisible">
            <el-radio-group v-model="formPage" class="buttons">
              <el-radio-button label="新建"></el-radio-button>
              <el-radio-button label="加入"></el-radio-button>
            </el-radio-group>
            <el-form :model="form" :class="{inactive:isNewClosed}">
              <el-form-item label="活动名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="负责人名称" :label-width="formLabelWidth">
                <el-input v-model="form.Tname" autocomplete="off"></el-input>
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
              <el-button type="primary" @click="newProject">确 定</el-button>
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
import {createProject, addProMember} from '@/router/request'
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
      selectedProID: ''
    }
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
        this.isNewClosed = false
        this.isJoinClosed = true
      }else{
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
    newProject () {
      if (this.isJoinClosed == false){
        addProMember({proID: this.form.ProID,stuName: localStorage.name})
            .then(res => {
              console.log(res)
            })
            .catch(res => {
              console.log(res.response)
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
            console.log(res)
            addProMember({proID: res.ProID,stuName: localStorage.name})
            .then(res => {
              console.log(res)
            })
            .catch(res => {
              console.log(res.response)
            })
            this.dialogFormVisible = false
          })
          .catch(res => {
            console.log(res)
            this.dialogFormVisible = false
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
}
#list{
  padding: 30px 10px 10px 10px;
  margin: 0;
  height: 100%;
  /*border-right: 1px solid #87888a;
  box-shadow: 5px 0px 5px -5px black;*/
}
#content{
  padding: 10px;
  margin: 0;
  height: 100%;
  width: 100%;
  float: right;
  background-color: white;
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
  padding-bottom: 50px;
}
</style>
