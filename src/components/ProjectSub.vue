<template>
  <div class="container">
    <div class="card-wrap" v-for="(o,index) in List" :key="o.name" v-on:click="open(index)">
      <el-card class="card">
        {{o.name}}
      </el-card>
    </div>
    <div class="card-wrap">
      <el-card class="new card" v-on:click.native="dialogFormVisible=true">
        <i class="el-icon-circle-plus-outline" style="font-size: 40px;"></i>
      </el-card>
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
        <el-form-item label="项目描述">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-radio-group v-model="form.diff">
          <el-radio-button label="容易"></el-radio-button>
          <el-radio-button label="一般"></el-radio-button>
          <el-radio-button label="困难"></el-radio-button>
        </el-radio-group>
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
import {querySubOfPro, createSubproject, joinSubproject} from '@/router/request'
import {formatDate} from '@/utils/dateFormatter'
export default {
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
      form: {
        desc: '',
        date: new Date(),
        diff: '容易'
      }
    }
  },
  methods: {
    getSubs () {
      querySubOfPro({proID: this.proID})
      .then(res => {
        console.log(res)
      })
      .catch(res => {
        console.log(res.Response)
      })
    },
    insertNewCard (dataChunk) {
      
    },
    newSubProject () {
      // start and join myself.
      createSubproject({
        proID: this.proID,
        endTime: formatDate(this.form.date),
        difficulty: this.form.diff,
        info: this.form.desc
      })
      .then(res => {
        console.log(res)
        joinSubproject({
          subproID: res.subproID,
          stuName: localStorage.name
        })
        .then(res => {
          console.log(res)
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
      this.refresh()
    },
    open (index) {
      this.$router.push({path:'/subprojectDetail?id=' + this.List[index].id})
    },
    refresh () {
      this.List = []
      querySubOfPro({proID: this.proID})
      .then(res => {
        console.log(res)

        res.result.forEach(element => {
          this.List.push(
            {
              raw: element.Record,
              id: element.Key,
              name: element.Record.info,
              memberNum: element.Record.member 
            }
          )
        })
        this.size = res.result.length
      })
      .catch(res => {
        console.log(res)
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
  flex: 0 0 25%;
  padding: 10px;
  min-width: 200px;
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
</style>