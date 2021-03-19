<template>
  <div class="container">
    <el-table
      :data="tableData"
      height="250"
      border
      stripe
      style="width: 100%"
      max-height="900">
      <el-table-column
        prop="no"
        label="#"
        width="80">
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="id"
        label="学生ID">
      </el-table-column>
      <el-table-column
        prop="uni"
        label="学校">
      </el-table-column>
      <el-table-column
        prop="mail"
        label="电子邮箱">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机">
      </el-table-column>
      <el-table-column
        prop="relative_score"
        label="学生得分">
      </el-table-column>
      <el-table-column
        prop="final_score"
        label="最终得分">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        v-if="canScore">
        <template slot-scope="scope">
          <el-button v-if="canScore" @click="prepareScore(scope.$index)" type="text" size="small">打分</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="scoreFormVisible">
      <el-form>
        <el-form-item label="请为该子项目打分">
        </el-form-item>
        <el-form-item label="分数">
          <el-input-number size="small" v-model="score"></el-input-number>
        </el-form-item>
        <el-button @click="scoreFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="startScore">确 定</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {searchProinfo ,sesrchMemByproID, searchStu, score} from '@/router/request'

export default {
  data () {
    return{
      tableData: [],
      canScore: false,
      score: 0,
      selectedSubID: '',
      dialogFormVisible: false,
      scoreBuffer: {},
      scoreFormVisible: false
    }
  },
  beforeMount () {
    this.refresh()
  },
  created () {
    this.canScore = (localStorage.identity === 'teacher')
  },
  methods: {
    startScore : function () {
      this.score=Buffer.score = this.score.toString()
      console.log({SipID: this.scoreBuffer.SipID, score: this.scoreBuffer.score})
      score({SipID: this.scoreBuffer.SipID, score: this.scoreBuffer.score})
      .then(res => {
        console.log(res)
        if (res.status === 'right') {
          this.$message({
            type: 'success',
            message: '成功评分'
          })
        } else {
          this.$message({
            type: 'error',
            message: res.details
          })
        }
      })
      .catch(res => {
        console.log(res)
        this.$message({
          type: 'error',
          message: '网络错误'
        })
      })
    },
    prepareScore(index){
      this.scoreBuffer = {SipID: this.tableData[index].sipID, score: 0}
      this.scoreFormVisible = true
    },
    click(row){
      console.log(row)
    },
    refresh () {
      var templist = []
      if (this.proID!==-1){
        sesrchMemByproID({proID: this.proID})
        .then(res => {
          //console.log(res)
          var noo = 0
          res.Sip.forEach(
            element => {
              searchStu({userName: element.Record.sip_stu_name})
              .then(res2 => {
                templist.push({
                  no: noo,
                  name: res2.result.name,
                  id: res2.result.stuNumber,
                  uni: res2.result.university,
                  email: res2.result.email,
                  phone: res2.result.phone,
                  sipID: element.Record.sip_id,
                  sip_pro_id: element.Record.sip_pro_id,
                  relative_score: element.Record.relative_score,
                  final_score: element.Record.final_score
                })
                noo = noo + 1
              })
            }
          )
          this.tableData=templist
          console.log(this.tableData)
        })
        .catch(res => {
          console.log(res)
        })
      }
        this.tableData=[]
    }
  },
  watch:{
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
  padding: 10px;
}
</style>