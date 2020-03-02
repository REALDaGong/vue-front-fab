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
                <input class="input100" type="text" v-model="gender" placeholder="性别">
                <span class="focus-input100"></span>
                <span class="symbol-input100">
                  <i class="fa fa-envelope" aria-hidden="true"></i>
                </span>
              </div>

              <div class="wrap-input100 validate-input">
                <input class="input100" type="text" v-model="role" placeholder="角色">
                <span class="focus-input100"></span>
                <span class="symbol-input100">
                  <i class="fa fa-envelope" aria-hidden="true"></i>
                </span>
              </div>

              <div class="wrap-input100 validate-input">
                <input class="input100" type="text" v-model="no" placeholder="学号">
                <span class="focus-input100"></span>
                <span class="symbol-input100">
                  <i class="fa fa-envelope" aria-hidden="true"></i>
                </span>
              </div>
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
      gender: '',
      role: '',
      no: ''
    }
  },
  methods: {
    reg () {
      var data = {
        // identity: this.role,
        identity: 'student',
        name: this.name,
        password: this.pass,
        gender: this.gender,
        university: this.uniname,
        major: '专业',
        stuNumber: this.no
      }
      register(data)
        .then(
          res => {
            console.log(res)
          }
        )
        .catch(
          res => {
            console.log(res.Response)
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
</style>
