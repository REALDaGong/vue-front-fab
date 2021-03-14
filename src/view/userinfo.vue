<template>
    <div id="app">
      <div class="userCard" style="margin-top: 10px">
        <el-row>
          <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="16">
            <!--            card-->
            <el-card class="box-card">
              <!--                pic-->
              <el-row>
                <el-col :span="4">
                  <div v-model="userinfo" class="username">
                    {{userinfo.name}}
                  </div>
                  <div v-model="userinfo" class="userid">
                    ID:{{userinfo.stuNumber}}
                  </div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
        <br>
        <el-row>
          <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="16">
            <!--            card-->
            <el-card class="box-card2">
              <template>
                <el-tabs v-model="activeTab" @tab-click="handleClickOnUserinfoPage">
                  <el-tab-pane label="基本信息" name="first">
                    <el-form label-position="right" label-width="80px" :model="userinfo">
                      <el-form-item label="用户名">
                        <el-input v-model="userinfo.name" :disabled="true"></el-input>
                      </el-form-item>
                      <el-form-item label="ID">
                        <el-input id="stunuminput" v-model="userinfo.stuNumber"></el-input>
                      </el-form-item>
                      <el-form-item label="大学">
                        <el-input id="uniinput" v-model="userinfo.university"></el-input>
                      </el-form-item>
                      <el-form-item label="专业">
                        <el-input id="majorinput" v-model="userinfo.major"></el-input>
                      </el-form-item>
                      <el-form-item label="性别">
                        <el-select id="genderinput" v-model="userinfo.gender" placeholder="请选择性别">
                          <el-option label="男" value="male"></el-option>
                          <el-option label="女" value="female"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="Email">
                        <el-input id="emailinput" v-model="userinfo.email"></el-input>
                      </el-form-item>
                      <el-form-item label="手机号码">
                        <el-input id="phoneinput" v-model="userinfo.phone"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="onSubmitOnUserinfoPage">立即修改</el-button>
                        <el-button @click="back">返回</el-button>
                      </el-form-item>
                    </el-form>
                  </el-tab-pane>
                </el-tabs>
              </template>
            </el-card>
          </el-col>
          <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
  import {fixstuinfo, searchStu} from '@/router/request'
  import $ from 'jquery'
  import axios from 'axios'
  export default {
    data () {
      return {
        userinfo:{},
        activeTab: 'first'
      }
    },
    beforeMount() {
      this.finduserinfo(localStorage.getItem("name"));
    },
    methods: {
      getInput: function () {
        alert(this.input1);
        return this.input1;
      },
      handleClickOnUserinfoPage: function (tab, event) {
        console.log(tab, event);
      },
      onSubmitOnUserinfoPage: function () {
        let newStuNum = $("#stunuminput").val();
        let newUni = $("#uniinput").val();
        let newMajor = $("#majorinput").val();
        let newgender = $("#genderinput").val();
        let newemail = $("#emailinput").val();
        let newmobilePhone = $("#phoneinput").val();
        this.updateuserinfo(localStorage.name, newStuNum,newUni,newMajor, newgender, newemail, newmobilePhone);
      },
      updateuserinfo: function (_username, _stunum,_uni,_major, _gender, _email, _mobilephone) {
        let data = {
          userName: _username,
          stuNumber:_stunum,
          gender: _gender,
          email: _email,
          phone: _mobilephone,
          uni:_uni,
          major:_major
        };
        fixstuinfo(data).then(function (response) {
          if(response.status === 'right'){
            this.$message({
              type: 'success',
              message: response.details
            });
          }
          else{
            this.$message({
              type: 'error',
              message: response.details
            });
          }
        }.bind(this));
      },
      finduserinfo: function (_userName) {
        let data ={userName: localStorage.name};
        searchStu(data).then(function (response) {
          console.log(response)
          this.updateuser(response.result)
        }.bind(this));
      },
      updateuser: function (data) {
        this.userinfo = data;
      },
      open1: function () {
        this.$notify({
          title: '成功',
          message: '用户基本资料已更新',
          type: 'success'
        });
        console.log("资料修改成功");
      },
      closeHandle: function (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      back:function () {
        this.$router.push({path:'/app/ProjectList'}).catch(() =>{})
      }
    }
  }
</script>

<style scoped>
  body{
    padding: 0;
    margin: 0;
  }
  #app{
    margin: 0;
    padding: 0;
  }
  .top-nav {
    /*顶部导航栏*/
    background: rgba(255, 216, 77, 1);
    position: absolute;
    top: 0;
    width: 100%;
    height: 80px;
    z-index: 10;
    font-size: large;
    min-width: 1410px;
  }
  .top-div{
    float: left;
  }
  #searchBar{
    width: 260px;
    height: 20px;
    margin-top: 25px;
    margin-left: 150px;
  }
  #location_component{
    width: 80px;
    margin-left: 20%;
    margin-top: 30px;
    font-size: medium;
  }
  #clock{
    width: 320px;
    margin-left: 50px;
    margin-top: 30px;
    color: black;
    font-size: medium;
  }
  /*layout*/
  .el-row {
    margin-bottom: 20px;
    /*&:last-child {
      margin-bottom: 0;
    }*/
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #ffffff;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  /*card*/
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 960px;
    background-color: lavender;
  }
  .box-card2 {
    width: 960px;
  }

  .username {
    font-size: xx-large;
    font-weight: bold;

  }
  .userid {
    color: #cbd3da;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
