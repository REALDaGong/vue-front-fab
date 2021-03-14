<template>
  <div class="dowebok">
    <div class="container-login100">
      <div class="wrap-login100">
        <div class="login100-pic js-tilt" data-tilt>
          <img src="./image/img-01.png" alt="IMG">
        </div>

        <form class="login100-form validate-form">
          <span class="login100-form-title">
            会员登录
          </span>
          <div class="wrap-input100 validate-input">
          <el-radio v-model="radio" label="0">学生登录</el-radio>
          <el-radio v-model="radio" label="1">教师登录</el-radio>
          </div>
          <div class="wrap-input100 validate-input">
            <input class="input100" type="text" v-model="name" placeholder="用户名">
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <i class="fa fa-envelope" aria-hidden="true"></i>
            </span>
          </div>

          <div class="wrap-input100 validate-input">
            <input class="input100" type="password" v-model="password" placeholder="密码">
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <i class="fa fa-lock" aria-hidden="true"></i>
            </span>
          </div>

          <div class="container-login100-form-btn">
            <button class="login100-form-btn" @click="login">
              登陆
            </button>
          </div>

          <div class="text-center p-t-12">
            <a class="txt2" href="javascript:">
              忘记密码？
            </a>
          </div>

          <div class="text-center p-t-136">
            <router-link to="/register">
              还没有账号？立即注册
              <i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {login} from '@/router/request'
import {tokenGen} from '@/utils/safety'
export default {
  data () {
    return {
      status: {},
      name: '',
      password: '',
      radio: '0'
    }
  },
  created:function(){
    if (typeof localStorage.name !== 'undefined') {
      if (localStorage.token === tokenGen(this.name,this.identity)){
        this.$router.push({path:'/app'})
      } else {
        localStorage.name = undefined
      }
    }
  },
  methods: {
    login () {
      if (this.password === '' || this.email === '') {
        return
      }
      var data = {
        identity: this.radio === '0' ?'student':'teacher',
        name: this.name,
        password: this.password
      }
      login(data)
        .then(
          res => {
            console.log(res)
            if(res.status == 'wrong'){
              this.$message({
                type: 'error',
                message: '用户名或密码错误'
              })
            }else{
              localStorage.name=this.name
              localStorage.identity=this.radio === '0' ?'student':'teacher'
              localStorage.token=tokenGen(localStorage.name,localStorage.identity)
              this.$router.push({path:'/app'})
            }
          }
        )
        .catch(
          res => {
            console.log(res)
            this.$message({
              type: 'error',
              message: '网络错误'
            })
          }
        )
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
</style>
