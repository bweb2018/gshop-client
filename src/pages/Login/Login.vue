<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" @click="addClass = true" :class="{on: addClass}">短信登录</a>
          <a href="javascript:;" @click="addClass = false" :class="{on: !addClass}">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on: addClass}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled= "!isVerifyPhone || countDownTime > 0" class="get_verification"
                      :class="{right_phone_number: isVerifyPhone && countDownTime === 0}" @click.prevent="sendCode">{{countDownTime > 0 ? `已发送${countDownTime}s` : '获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="6" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !addClass}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" minlength="4" placeholder="用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input :type="isPwdShow ? 'tel' : 'password'" minlength="5" maxlength="8" placeholder="密码" v-model="pwd">
                <div class="switch_button"  :class="isPwdShow ? 'on' : 'off'" @click="isPwdShow = !isPwdShow">
                  <div :class="isPwdShow ? 'switch_circle right' : 'switch_circle'" ></div>
                  <span class="switch_text">{{isPwdShow ? isSwitchText : ''}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="6" placeholder="验证码" v-model="captcha" >
                <img class="get_verification" src="http://localhost:5000/captcha" ref='captcha' alt="captcha" @click="resetCaptcha">
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>

<script>
import {reqSendSmsCode,reqPhoneCodeLogin,reqUserPwdLogin} from '../../Api'
import { MessageBox ,Toast} from 'mint-ui'
  export default {

    data () {
      return {
        addClass: true,
        phone: '',//手机号
        captcha: '',//验证码
        name: '',//用户名
        pwd: '',//密码
        code: '',//短信验证码
        countDownTime: 0, //倒计时间
        isPwdShow: false,
        isSwitchText: 'ABC'
      }
    },
    computed: {
      isVerifyPhone () {
        return /^1\d{10}/.test(this.phone)
      }

    },
    methods: {
      async sendCode (e) {
        e.target.classList.remove('right_phone_number')
        this.countDownTime = 30
        console.log(this.phone)
        const result= await reqSendSmsCode(this.phone)
        console.log(result)
        const timerCode = setInterval(() => {
          this.countDownTime--
          if(this.countDownTime === 0){
            clearInterval(timerCode)
          }
        },1000)
      },
      async login () {
        const {code,addClass,name,pwd,captcha,phone} = this
        let result
        const isCode = /^\d{6}/.test(code)
        if(addClass){
          if(!this.isVerifyPhone){
            return alert('请输入正确的手机号码')
          }else if(!isCode || !this.code.length === 6){
            return alert('验证码必须是6位数字')
          }
          result = await reqPhoneCodeLogin(phone,code)
        }else {
          if(!name.trim()){
            return MessageBox.alert('请输入用户名')
          } else if(!pwd.trim()){
            return MessageBox.alert('请输入正确密码')
          }else if(!/^.{4}$/.test(captcha)){
            return MessageBox.alert('请输入正确验证码')
          }
          result = await reqUserPwdLogin({name,pwd,captcha})
        }
        console.log(111)
        if(result.code === 0){
          const user = result.data
          this.$store.dispatch('saveUser',user)
          this.$router.replace('/profile')
          this.resetCaptcha()
          console.log(111)
          Toast({
            message: '登陆成功',
            position: 'middle',
            duration: 2000
          })
        } else {
          MessageBox.alert('输入的密码或验证码有问题')
          this.resetCaptcha()
          this.pwd = ''
        }
      },
      resetCaptcha () {
        this.$refs.captcha.src = 'http://localhost:5000/captcha/?d='+Date.now()
      }
    },
    components: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 5px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone_number
                  color #000
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff

              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
