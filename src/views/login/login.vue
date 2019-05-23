<template>

  <el-container>
    <el-main style="width: 200px;height: 600px;margin-left: 40%;margin-top:100px" border>
      <el-form
        :model="loginForm"
        :rules="rules"
        label-position="left"
        ref="loginForm"
        style="width: 200px;">
        <el-form-item label="账户" prop="name">
          <el-input v-model="loginForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>

        <el-form-item label="登录方式" prop="type">
          <el-radio-group v-model="loginForm.type">
            <el-radio label="教师"></el-radio>
            <el-radio label="管理员"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" style="width:150px" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>

</template>

<script>
  export default {
    name: "login",
    data(){
      return{
        loginForm: {
          name: '',
          password: '',
          type: 0,  //默认为教师

        },
        rules: {
          name: [
            { required: true, message: '请输入账户', trigger: 'blur' },
            { min: 6, max: 6, message: '账户必须为6位', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'change' },
            { min: 6, max: 6, message: '密码必须为6位', trigger: 'blur' }

          ],
          type: [
            { required: true, message: '请选择登录方式', trigger: 'change' }
          ],
        }
      }

    },
    methods:{

      submitForm(form) {
        console.log(form)
        this.$refs[form].validate((valid) => {
          if (valid) {
            console.log(this.loginForm.type)
            if(this.loginForm.type === "教师"){
              this.login();
            }else if(this.loginForm.name ==="admins"&&this.loginForm.password === "admins"){
              this.$router.push('/admin')
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },


      login:function(){
        let that = this;
        this.$axios.post('/login',this.qs.stringify({
          uname:parseInt(this.loginForm.name),
          pwd:parseInt(this.loginForm.password),
        }),{
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(function (res) {
              if(res.data.status===200){
                that.$router.push({
                  path: "/tadmin",
                  query: {
                    tid: res.data.tid
                  }
                })
              }else if(res.data.status===502){
                alert("账号密码错误");
                that.username = "";
                that.password="";
              }
          })
          .catch(function (error) {
            console.log(error)
        })
      },
      toStudent:function () {
        this.$router.push('/')
      }
    }

  }
</script>

<style>
</style>
