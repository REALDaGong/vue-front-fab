<template>
  <div class="dowebok">
    <div class="container-login100">
      <div class="wrap-login100">
        <form class="login100-form validate-form">
          <span class="login100-form-title">
            注册
          </span>
          <div class="reg100-wrap">
            <div class="reg100-wrap-block">
              <div class="wrap-input100 validate-input">
                <input class="input100" type="text" v-model="email" placeholder="邮箱">
                <span class="focus-input100"></span>
                <span class="symbol-input100">
                  <i class="fa fa-envelope" aria-hidden="true"></i>
                </span>
              </div>

              <div class="wrap-input100 validate-input">
                <input class="input100" type="text" v-model="name" placeholder="昵称">
                <span class="focus-input100"></span>
                <span class="symbol-input100">
                  <i class="fa fa-envelope" aria-hidden="true"></i>
                </span>
              </div>

              <div class="wrap-input100 validate-input">
                <input class="input100" type="password" v-model="pass" placeholder="密码">
                <span class="focus-input100"></span>
                <span class="symbol-input100">
                  <i class="fa fa-envelope" aria-hidden="true"></i>
                </span>
              </div>

              <div class="wrap-input100 validate-input">
                <input class="input100" type="password" v-model="passver" placeholder="确认密码">
                <span class="focus-input100"></span>
                <span class="symbol-input100">
                  <i class="fa fa-lock" aria-hidden="true"></i>
                </span>
              </div>
            </div>

            <div class="reg100-wrap-block">
              <div class="wrap-input100 validate-input">
                <input class="input100" type="text" v-model="uniname" placeholder="学校名">
                <span class="focus-input100"></span>
                <span class="symbol-input100">
                  <i class="fa fa-envelope" aria-hidden="true"></i>
                </span>
              </div>
              <div class="wrap-input100 validate-input">
                <span class="el-radio-pad">性别</span>
                <el-radio v-model="gender" label="male">男</el-radio>
                <el-radio v-model="gender" label="female">女</el-radio>
              </div>
              <div class="wrap-input100 validate-input">
                <span class="el-radio-pad">身份</span>
                <el-radio v-model="role" label="student">学生</el-radio>
                <el-radio v-model="role" label="teacher">老师</el-radio>
              </div>
              <transition name="el-zoom-in-top">
                <div v-show="show" class="wrap-input100 validate-input">
                  <input class="input100" type="text" v-model="no" placeholder="学号">
                  <span class="focus-input100"></span>
                  <span class="symbol-input100">
                    <i class="fa fa-envelope" aria-hidden="true"></i>
                  </span>
                </div>
              </transition>
            </div>
          </div>
          <div class="container-login100-form-btn">
            <button class="login100-form-btn" @click="reg">
              注册
            </button>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {register} from '@/router/request'

export default {
  data () {
    return {
      email: '',
      name: '',
      pass: '',
      passver: '',
      uniname: '',
      gender: 'male',
      role: 'student',
      no: '',
      show: true
    }
  },
  methods: {
    reg () {
      var data = {
        identity: this.role,
        name: this.name,
        password: this.pass,
        gender: this.gender,
        university: this.uniname,
        major: '专业',
        stuNumber: this.no
      }
      if (this.role === 'student'){
        data = {
          identity: this.role,
          name: this.name,
          password: this.pass,
          gender: this.gender,
          university: this.uniname,
          major: '专业',
          stuNumber: this.no
        }
      } else {
        data = {
          identity: this.role,
          name: this.name,
          password: this.pass,
          gender: this.gender,
          university: this.uniname,
          major: '专业',
          teaNumber: '123'
        }
      }
      register(data)
        .then(
          res => {
            console.log(res)
            this.$router.push({path:'/login'})
          }
        )
        .catch(
          res => {
            console.log(res.Response)
          }
        )
    }
  },
  watch: {
    role : function () {
      if(this.role === 'student'){
        this.show = true
      } else {
        this.show = false
      }
    }
  }
}
</script>

<style scoped>
@import './../assets/css/login-main.css';
@import './../assets/css/login-util.css';
body {
  font-weight: 500;
  font-size: 1.05em;
  font-family: "Microsoft YaHei","Segoe UI", "Lucida Grande", Helvetica, Arial,sans-serif;
}
.wrap-login100{
  justify-content: center;
  padding-bottom: 100px;
}
.reg100-wrap{
  flex-direction: row;
}
.reg100-wrap-block{
  justify-content: center;
}
.el-radio {
    color: #606266;
    font-weight: 500;
    line-height: 1;
    position: relative;
    cursor: pointer;
    display: inline-block;
    white-space: nowrap;
    outline: none;
    font-size: 14px;
    margin-right: 30px;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
}
.el-radio-pad {
    color: #606266;
    font-weight: 500;
    line-height: 1;
    position: relative;
    display: inline-block;
    white-space: nowrap;
    outline: none;
    font-size: 14px;
    margin-right: 30px;
    margin-left: 30px;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
}
</style>
