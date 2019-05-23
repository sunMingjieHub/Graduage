<template>
  <div id="admin">
    <el-container>
      <el-header style="text-align:center;font-size:26px;margin-top: 15px">实验室管理系统管理员系统</el-header>
      <el-main>
        <el-tabs @tab-click="changeTabs" style="height: 600px">
          <el-tab-pane
          label="排课信息">
            <template>
              <el-table
                :data="experimentData"
                border
                style="width: 100%">
                <el-table-column
                  prop="teacher"
                  label="教师">

                </el-table-column>
                <el-table-column
                  prop="class_name"
                  label="班级">

                </el-table-column>
                <el-table-column
                  prop="course_name"
                  label="课程">

                </el-table-column>
                <el-table-column
                  prop="count"
                  label="学时">

                </el-table-column>

              </el-table>
            </template>
          </el-tab-pane>
          <el-tab-pane
            label="管理班级">
            <el-container>
              <el-header style="text-align: right;height: 60px">
                <el-button type="primary" @click="AddClass">增加班级</el-button>
              </el-header>
              <el-main>
                <template>
                  <el-dialog title="新增班级" width="36%" :visible.sync="dialogClassFormVisible">
                    <el-form :model="cl_form" label-position="left">
                      <el-form-item label="班级名称" :label-width="formLabelWidth">
                        <el-input v-model="cl_form.name" autocomplete="off"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="cancelAddClass">取 消</el-button>
                      <el-button type="primary" @click="postAddClass">确 定</el-button>
                    </div>
                  </el-dialog>
                </template>
                <template>
                  <el-table
                    :data="classData"
                    border
                    width="100%"
                  >
                    <el-table-column
                      prop="id"
                      label="id"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="班级名称"
                    >
                    </el-table-column>
                    <el-table-column
                      label="操作"
                    >
                      <template slot-scope="scope1">
                        <el-button @click="deleteClass(scope1.row)" type="text" size="small">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-main>
            </el-container>
          </el-tab-pane>
          <el-tab-pane
            label="管理课程">
            <el-container>
              <el-header style="text-align: right;height: 60px">
                <el-button type="primary" @click="AddCourse">增加课程</el-button>
              </el-header>
              <el-main>
                <template>
                  <template>
                    <el-dialog title="新增课程" width="36%" :visible.sync="dialogCourseFormVisible">
                      <el-form :model="co_form" label-position="left">
                        <el-form-item label="课程名称" :label-width="formLabelWidth">
                          <el-input v-model="co_form.name" autocomplete="off"></el-input>
                        </el-form-item>
                      </el-form>
                      <div slot="footer" class="dialog-footer">
                        <el-button @click="cancelAddCourse">取 消</el-button>
                        <el-button type="primary" @click="postAddCourse">确 定</el-button>
                      </div>
                    </el-dialog>
                  </template>
                  <el-table
                    :data="courseData"
                    border
                    style="width: 100%;">
                    <el-table-column
                      prop="id"
                      label="id"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="课程名"
                    >
                    </el-table-column>
                    <el-table-column
                      label="操作">
                      <template slot-scope="scope">
                        <el-button @click="deleteCourse(scope.row)" type="text" size="small">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-main>
            </el-container>
          </el-tab-pane>
          <el-tab-pane
            label="管理座区">
            <el-container>
              <el-header style="text-align: right;height: 60px">
                <el-button type="primary" @click="AddSeat">增加座区</el-button>
              </el-header>
              <el-main>
                <template>
                  <el-dialog title="新增座区" width="36%" :visible.sync="dialogSeatFormVisible">
                    <el-form :model="s_form" label-position="left">
                      <el-form-item label="名称" :label-width="formLabelWidth">
                        <el-input v-model="s_form.name" autocomplete="off"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="cancelAddSeat">取 消</el-button>
                      <el-button type="primary" @click="postAddSeat">确 定</el-button>
                    </div>
                  </el-dialog>

                </template>
                <template>
                  <el-table
                    :data="seatData"
                    border
                    style="width: 100%;">
                    <el-table-column
                      prop="id"
                      label="id"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="座区号"
                    >
                    </el-table-column>
                    <el-table-column
                      label="操作">
                      <template slot-scope="scope">
                        <el-button @click="deleteSeat(scope.row)" type="text" size="small">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-main>
            </el-container>
          </el-tab-pane>
          <el-tab-pane
            label="管理教师">
            <el-container>
              <el-header style="text-align: right;height: 60px">
                <el-button type="primary" @click="AddTeacher">增加教师</el-button>
              </el-header>
              <el-main>
                <template>
                  <el-dialog
                    title="新增教师"
                    width="36%"
                    :visible.sync="dialogTeacherFormVisible"
                    :modal-append-to-body = "false">

                    <el-form :model="t_form" label-position="left">
                      <el-form-item label="教师名称" :label-width="formLabelWidth">
                        <el-input v-model="t_form.name" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="账户" :label-width="formLabelWidth">
                        <el-input v-model="t_form.account" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="密码" :label-width="formLabelWidth">
                        <el-input
                          placeholder="初始密码为 123456"
                          :disabled="true">
                        </el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="cancelAddTeacher">取 消</el-button>
                      <el-button type="primary" @click="postAddTeacher">确 定</el-button>
                    </div>
                  </el-dialog>
                </template>
                <template>
                  <el-table
                    :data="teacherData"
                    border
                    style="width: 100%;">
                    <el-table-column
                      prop="t_id"
                      label="id"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="t_name"
                      label="姓名"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="t_account"
                      label="账户"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="t_password"
                      label="密码"
                    >
                    </el-table-column>
                    <el-table-column
                      label="操作">
                      <template slot-scope="scope">

                        <el-button @click="resetPassword(scope.row)" type="text" size="small">重置密码</el-button>
                        <el-button @click="deleteTeacher(scope.row)" type="text" size="small">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-main>
            </el-container>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>


</template>

<script>
  export default {
    name: 'admin',
    data() {
      return {
        dialogTeacherFormVisible: false,
        dialogClassFormVisible: false,
        dialogCourseFormVisible: false,
        dialogSeatFormVisible: false,
        formLabelWidth: '120px',
        teacherData: [],
        classData: [],
        seatData: [],
        courseData: [],
        experimentData: [],
        t_form: {
          name: '',
          account: '',
        },
        cl_form: {
          name: '',
        },
        s_form: {
          name: '',
        },
        co_form: {
          name: '',
        },
      };
    },
    created(){
      this.getExperiment()
    },


    methods: {

      changeTabs(event){
       if(event.index === "0"){
          this.getExperiment()
       }else if(event.index === "1"){
         this.getAllClass()
       }else if(event.index === "2"){
         this.getAllCourse()
       }else if(event.index === "3"){
         this.getAllSeat()
       }else if(event.index === "4"){
         this.getAllTeacher()
       }
      },
      getExperiment(){
        this.$axios.get('all_experiment_count')
          .then(res=>{
            if(res.data.code === 200){
              this.experimentData = res.data.experiment
            }
          })
      },

      getAllTeacher(){
        this.$axios.get('all_teacher')
          .then(res=>{
            if(res.data.code === 200){
              this.teacherData = res.data.teachers
            }
          })
      },
      getAllClass(){
        this.$axios.get('clname')
          .then(res=>{
            console.log(res.data)
            if(res.data.code === 200){
              this.classData = res.data.al_class
            }

          })
      },
      getAllSeat(){
        this.$axios.get('sname')
          .then(res=>{
            console.log(res.data)
            if(res.data.code === 200){
              this.seatData = res.data.seats
            }

          })
      },
      getAllCourse(){
        this.$axios.get('coname')
          .then(res=>{
            console.log(res.data)
            if(res.data.code === 200){
              this.courseData = res.data.courses
            }
          })
      },

      AddTeacher(){
        this.dialogTeacherFormVisible = true
      },
      AddClass(){
        console.log("zengjia")
        this.dialogClassFormVisible = true
      },
      AddSeat(){
        this.dialogSeatFormVisible = true;
      },
      AddCourse(){
        this.dialogCourseFormVisible = true;
      },

      deleteTeacher(row){
        console.log(row)
        this.$confirm('确定删除该教师么其相关实验将全部删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('deleteteacher',this.qs.stringify({
              t_id : row.t_id,
            }),{
              headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }
          )
            .then(res =>{
              if(res.data.code === 200){
                this.getAllTeacher()
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      deleteClass(row){
        console.log(row)
        this.$confirm('确定删除该班级么，其相关实验将全部删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('deleteclass',this.qs.stringify({
              id : row.id,
            }),{
              headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }
          )
            .then(res =>{
              if(res.data.code === 200){
                this.getAllClass()
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      deleteSeat(row){
        console.log(row)
        this.$confirm('确定删除该座区么，其相关实验将全部删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('deleteseat',this.qs.stringify({
              id : row.id,
            }),{
              headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }
          )
            .then(res =>{
              if(res.data.code === 200){
                this.getAllSeat()
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      deleteCourse(row){
        console.log(row)
        this.$confirm('确定删除该课程么其相关实验将全部删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('deletecourse',this.qs.stringify({
              id : row.id,
            }),{
              headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }
          )
            .then(res =>{
              if(res.data.code === 200){
                this.getAllCourse()
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      resetPassword(row){
        console.log(row)
        this.$axios.post('reset',this.qs.stringify({
          t_account: row.t_account,
        }),{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(res =>{
          console.log(res.data)
          let code = res.data.code;
          if(code === 200){
            this.$message({
              type: 'success',
              message: '重置成功!'
            });
            this.getAllTeacher();
          }else {
          }
        })
        this.dialogTeacherFormVisible = false
      },

      postAddTeacher(){
        console.log(this.t_form)
        this.$axios.post('add_teacher',this.qs.stringify({
          t_name: this.t_form.name,
          t_account: this.t_form.account,
          }),{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
           }
          }).then(res =>{
            console.log(res.data)
            let code = res.data.code;
            if(code === 200){
              this.$message({
                type: 'success',
                message: '添加成功!'

              });
              this.getAllTeacher();
            }else {
              this.$message({
                type: 'error',
                message: '教师账户已存在'
              })
            }
            this.t_form= {
              name: '',
              account: '',
          }
        })
        this.dialogTeacherFormVisible = false

      },
      postAddClass(){
        console.log(this.cl_form)
        this.$axios.post('add_class',this.qs.stringify({
          name: this.cl_form.name,
        }),{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(res =>{
          console.log(res.data)
          let code = res.data.code;
          if(code === 200){
            this.$message({
              type: 'success',
              message: '添加成功!'

            });
            this.getAllClass();
          }else {
            this.$message({
              type: 'error',
              message: '班级已存在'
            })
          }
          this.cl_form= {
            name: '',
          }
        })
        this.dialogClassFormVisible = false
      },
      postAddSeat(){
        console.log(this.s_form)
        this.$axios.post('add_seat',this.qs.stringify({
          name: this.s_form.name,
        }),{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(res =>{
          console.log(res.data)
          let code = res.data.code;
          if(code === 200){
            this.$message({
              type: 'success',
              message: '添加成功!'

            });
            this.getAllSeat();
          }else {
            this.$message({
              type: 'error',
              message: '座区已存在'
            })
          }
          this.s_form= {
            name: '',
          }
        })
        this.dialogSeatFormVisible = false
      },
      postAddCourse(){
        console.log(this.co_form)
        this.$axios.post('add_course',this.qs.stringify({
          name: this.co_form.name,
        }),{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(res =>{
          console.log(res.data)
          let code = res.data.code;
          if(code === 200){
            this.$message({
              type: 'success',
              message: '添加成功!'

            });
            this.getAllCourse()
          }else {
            this.$message({
              type: 'error',
              message: '课程已存在'
            })
          }
          this.co_form= {
            name: '',
          }
        })
        this.dialogCourseFormVisible = false
      },

      cancelAddTeacher(){
        this.dialogTeacherFormVisible = false
        this.t_form= {
          name: '',
          account: '',
        }
      },
      cancelAddClass(){
        this.dialogClassFormVisible = false
        this.cl_form = {
          name: '',
        }
      },
      cancelAddSeat(){
        this.dialogSeatFormVisible = false
        this.s_form = {
          name: '',
        }
      },
      cancelAddCourse(){
        this.dialogCourseFormVisible = false
        this.co_form = {
          name: ''
        }
      }

    }
  }
</script>

<style>
  .el-header {
    color: #409EFF;
    line-height: 60px;
    background: #FFFFFF;
  }
</style>
