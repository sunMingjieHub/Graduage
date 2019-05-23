<template>
  <div id="home">
    <el-row>
      <el-col :span="12"  style="border: 1px">
        <el-container >
          <el-header     style="margin-left:65px;font-size: 20px;">
            <span>欢迎使用实验室排课系统</span>
          </el-header>
        </el-container>
      </el-col>
      <el-col :span="6" :offset="6" height="80px">
        <el-container >
          <el-header style="text-align:right;margin-right: 30px;font-size: 16px;">
            <router-link to="/login" style="color: #409EFF;text-decoration: none ">登录</router-link>
          </el-header>
        </el-container>
      </el-col>
    </el-row>
    <el-row>

      <el-container  style="text-align: center">
        <el-header style="margin-top: 150px">
          <span style="font-size: 34px;">请使用实验室排课系统进行查询</span>
        </el-header>
        <el-main height="500px" style="margin-top:25px">
          <el-row :gutter="20">
            <el-select v-model="explcs" filterable placeholder="请选择">
              <el-option
                v-for="item in class_options"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-button v-on:click="search" type="danger" style="margin-left: 18px" round>查询</el-button>
          </el-row>
        </el-main>
        <el-footer >
          <el-table
            :data="tableData"
            v-if="ishow"
            style="width: 100%">
            <el-table-column
              label="班级"
              prop="class_name">
            </el-table-column>
            <el-table-column
              label="课程"
              prop="course_name">
            </el-table-column>
            <el-table-column
              label="教师"
              prop="teacher_name">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="props">
                <el-dialog
                  title="课程详细信息"
                  :visible.sync="dialogVisible">
                  <el-table :data="ClassExpData">
                    <el-table-column property="course" label="课程"></el-table-column>
                    <el-table-column property="week" label="周次"></el-table-column>
                    <el-table-column property="day" label="日期" ></el-table-column>
                    <el-table-column property="time" label="节"></el-table-column>
                    <el-table-column property="seats" label="座区" ></el-table-column>
                    <el-table-column property="teacher" label="教师"></el-table-column>
                  </el-table>
                </el-dialog>
                <el-button type="text" @click="viewClassDetail(props.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-footer>
      </el-container>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'home',

    data(){

      return{
        FAL : false,
        ishow: false,
        dialogVisible: false,
        explcs: "",
        class_options: [],
        tableData: [],
        ClassExpData: [],
        }
    },
    created() {
      this.$axios.get('/clname').then(res=>{
          if (res.data.code === 200) {
            console.log(res.data.al_class)
            this.class_options = res.data.al_class
          }
        })
        .catch(function (error) {
       //   alert(error)
        })
        .finally();

    },
    mounted(){
    },
    methods:{
      search:function () {
        this.$axios.get('/clexperiment/'+this.explcs)
          .then(res =>{
            if(res.data.code === 200){
              this.tableData = res.data.clexp
            }
          })
        this.ishow= true;
      },
      viewClassDetail(row){
        console.log(row)
        this.$axios.post('/class_experiment_detail',this.qs.stringify(
          {
            class_id: row.class_id,
            course_id: row.course_id,
          }),
          {
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          .then(res => {
            if(res.data.code === 200){
              console.log(res.data)
              this.ClassExpData = res.data.experiment
            }
          })
        this.dialogVisible = true
      }
    },
  }
</script>


<style>

  .el-header, .el-footer {
    color: #409EFF;
    line-height: 60px;
    background: #FFFFFF;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .el-main {
    background-color: #FFFFFF;
    text-align: center;
  }


  .el-container {
    background-color: #FFFFFF;
  }

</style>
