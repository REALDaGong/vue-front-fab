<template>
  <div class="dowebok">
    <div class="container-login100">
      <div class="wrap-login100">
        <div class="login100-pic js-tilt" data-tilt>
          <img src="images/img-01.png" alt="IMG">
        </div>

        <form class="login100-form validate-form">
          <span class="login100-form-title">
            会员登陆
          </span>

          <div class="wrap-input100 validate-input">
            <input class="input100" type="text" v-model="email" placeholder="邮箱">
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

export default {
  data () {
    return {
      status: {},
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      if (this.password === '' || this.email === '') {
        return
      }
      console.log('ok')
      var data = {
        identity: 'student',
        name: this.email,
        password: this.password
      }
      login(data).then(res => console.log(res)).catch(res => console.log(res.response))
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
