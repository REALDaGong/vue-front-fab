<template>
  <div class="container">
    <el-table
      :data="tableData"
      height="250"
      border
      style="width: 100%">
      <el-table-column
        prop="no"
        label="#"
        width="180">
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
        fixed="right"
        label="操作">
        <el-button @click="click(scope.row)" type="text" size="small">删除</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {searchProinfo ,sesrchSIPByproID, searchStu, score} from '@/router/request'

export default {
  data () {
    return{
      tableData: [],
      canScore: false,
      score: 0,
      selectedSubID: '',
      dialogFormVisible: false
    }
  },
  beforeMount () {
    this.canScore = localStorage.identity === 'teacher'
  },
  methods: {
    click(row){
      console.log(row)
    },
    refresh () {
      console.log(this.proID)
      searchProinfo({ProID: this.proID})
      .then(res => {
        console.log(res)
        sesrchSIPByproID({proID: res.result.sip_pro_id})
        .then(res => {
          console.log(res)
          var templist = []
          var noo = 0
          res.result.forEach(element => {
            searchStu({userName: element.Record.sip_stu_name})
            .then(res => {
              console.log(res)
              templist.push({
                no: noo,
                name: res.result.name,
                id: res.result.stuNumber,
                uni: res.result.university,
                email: res.result.email,
                phone: res.result.phone
              })
              noo = noo + 1
            })
          });
          this.tableData = templist
        })
        .catch(res => {
          console.log(res)
        })
      })
      .catch(res => {
        console.log(res)
      })
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