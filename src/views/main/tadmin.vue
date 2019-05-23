
<template>
  <div id="tadmin">
    <el-container>
        <el-header >实验室教师管理系统</el-header>
        <el-main>
          <el-tabs @tab-click="changeTab" type="card" >
            <el-tab-pane
              label="我的实验">
              <template >
                <el-table
                  :data="myExpData"
                  @before-close="closeDialog"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="t_id"
                    label=""
                    v-if="null">
                  </el-table-column>
                  <el-table-column
                    prop="co_id"
                    label=""
                    v-if="null">
                  </el-table-column>
                  <el-table-column
                      prop="cl_id"
                      label=""
                      v-if="null">
                  </el-table-column>
                  <el-table-column
                    prop="course_name"
                    label="课程">
                  </el-table-column>
                  <el-table-column
                    prop="class_name"
                    label="班级">
                  </el-table-column>
                  <el-table-column
                    prop="teacher_name"
                    label="教师">
                  </el-table-column>
                  <el-table-column
                    label="操作">
                    <template slot-scope="props">
                      <el-dialog
                        title="课程详细信息"
                        :visible.sync="dialogTableVisible">
                        <el-table :data="detailMyExpData">
                          <el-table-column property="week" label="周次"></el-table-column>
                          <el-table-column property="day" label="日期" ></el-table-column>
                          <el-table-column property="time" label="节"></el-table-column>
                          <el-table-column property="seats" label="座区" ></el-table-column>
                        </el-table>
                      </el-dialog>
                      <el-button type="text" @click="viewDetail(props.row)">查看</el-button>
                      <el-button type="text" @click="deleteItemExpriment(props.row)">删除</el-button>
                    </template>
                  </el-table-column>

                </el-table>
              </template>
            </el-tab-pane>
            <el-tab-pane
              label="增加实验">
              <template>
                <template>
                  <el-select
                    v-model="week_exp"
                    filterable
                    placeholder="请选择周次"
                    @change="weekChange"
                  >
                    <el-option
                      v-for="item in weeks_options"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </template>
                <el-row>
                  <el-col :span="19">
                    <div id="coursesTable" style="height: 1000px">
                    </div></el-col>
                  <el-col :span="5" style="margin-top: 85px">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                      <el-form-item label="课程名称" prop="courseId">
                        <el-select
                          v-model="ruleForm.courseId"
                          filterable
                          placeholder="请选择课程">
                          <el-option
                            v-for="item in course_options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="班级名称" prop="classId">
                        <el-select
                          v-model="ruleForm.classId"
                          filterable
                          placeholder="请选择班级">
                          <el-option
                            v-for="item in class_options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                        </el-select>
                      </el-form-item>

                      <el-form-item label="座区" prop="seats">
                        <el-select v-model="ruleForm.seats" multiple placeholder="请选择">
                          <el-option
                            v-for="item in seats_options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="周次" prop="weeks">
                        <el-select v-model="ruleForm.weeks" multiple placeholder="请选择">
                          <el-option
                            v-for="item in weeks_options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="日期" prop="days">
                        <el-select v-model="ruleForm.days" multiple placeholder="请选择">
                          <el-option
                            v-for="item in days_options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="时间" prop="times">
                        <el-select v-model="ruleForm.times" multiple placeholder="请选择">
                          <el-option
                            v-for="item in times_options"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">添加实验</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                      </el-form-item>
                    </el-form>
                  </el-col>

                </el-row>

              </template>

            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
  </div>
</template>


<script>
  import { Timetables } from '@/Timetables';
  import { Message } from 'element-ui';
  export default {
    name: 'tadmin',
    data() {

      return {
        timetable:null,
        ruleForm: {
          courseId: '',
          classId: '',
          weeks: [],
          times:[],
          seats:[],
          days: [],
        },
        rules: {
          courseId: [
            { required: true, message: '请选择实验课程', trigger: 'change' }
          ],
          classId: [
            { required: true, message: '请选择实验班级', trigger: 'change' }
          ],
          weeks: [
            { type: 'array', required: true, message: '请至少选择一周', trigger: 'change' }
          ],
          seats: [
            { type: 'array', required: true, message: '请至少选择一个座区', trigger: 'change' }
          ],
          days: [
            { type: 'array', required: true, message: '请至少选择一天', trigger: 'change' }
          ],
          times: [
            { type: 'array', required: true, message: '请至少选择一大节', trigger: 'change' }
          ],
        },



        courseList : [
          [
          "张三,软件153班,java程序设计,A区\n张三,软件153班,移动应用开发,C区D区\n",
          "张三,软件153班,移动应用开发,C区D区\n",
          "",
          "",

        ],
          [
          "张三,软件153班,移动应用开发,C区D区\n",
          "张三,软件153班,移动应用开发,C区D区\n",
          "",
          "",

        ],
          [
          "",
          "",
          "",
          "",
          ""

        ],
          [
          "张三,软件153班,移动应用开发,C区D区\n",
          "张三,软件153班,移动应用开发,C区D区\n",
          "",
          ""
        ],
          [
          "张三,软件153班,移动应用开发,C区D区\n",
          "张三,软件153班,移动应用开发,C区D区\n",
          "",
          ""
        ],
           ],

        week_exp:"",
        course_options: [],
        class_options: [],
        seats_options:[],
        weeks_options: [],
        days_options: [
          {id: 1,name: '星期一'},
          {id: 2,name: '星期二'},
          {id: 3,name: '星期三'},
          {id: 4,name: '星期四'},
          {id: 5,name: '星期五'},
        ],
        times_options: [
          {id: 1,name: '第一大节'},
          {id: 2,name: '第二大节'},
          {id: 3,name: '第三大节'},
          {id: 4,name: '第四大节'},
        ],
        detailMyExpData: [],

        dialogTableVisible: false,
        myExpData: [],
        AllExpDetailData: [],
      }
    },

    created(){
        this.myExperiment()
    },

    mounted() {
      for (let i = 1; i < 21; i++) {
        this.weeks_options.push({
          name: '第 ' + i + ' 周',
          id: i,
        })
      }
      this.getWeekExperiment(1)
      this.timetable = new Timetables({
        el: '#coursesTable',
        timetables: this.courseList,
        week: ['一', '二', '三', '四', '五'],
        timetableType: [
          ['第\n一\n大\n节', 3],
          ['第\n二\n大\n节', 3],
          ['第\n三\n大\n节', 3],
          ['第\n四\n大\n节', 3],
        ],
        gridOnClick: function (e) {
          Message.info(e.name)
        },
        styles : {
          Gheight: 50,
          palette: ['#ff6633', '#eeeeee'],
          leftHandWidth: 50,
        },
      })
    },

    methods: {
      myExperiment: function () {
        this.$axios.get('/teacher/' + this.$route.query.tid)
          .then(res => {
            this.myExpData = res.data.exp
          })
      },

      changeTab (event) {
        if (event.index === "0") {
          this.myExperiment()
        } else {
          this.getAllClass();
          this.getAllSeat()
          this.getAllCourse()
          //   this.getWeekExperiment(1)
        }
      },

      weekChange () {
        this.getWeekExperiment(this.week_exp)
      },

      getWeekExperiment (week) {
        this.$axios.get('weekExp/' + week)
          .then(res => {
            console.log(res.data)
            this.courseList = res.data.experiment
            this.timetable.setOption({
              el: '#coursesTable',
              timetables: this.courseList,
              week: ['一', '二', '三', '四', '五'],
              timetableType: [
                ['第\n一\n大\n节', 3],
                ['第\n二\n大\n节', 3],
                ['第\n三\n大\n节', 3],
                ['第\n四\n大\n节', 3],
              ],
              gridOnClick: function (e) {
                Message.success(e.name)
              },
              styles : {
                Gheight: 50,
                palette: ['#ff6633', '#eeeeee'],
                leftHandWidth: 50,
              },
            })
          })
      },

      deleteItemExpriment (row) {
        this.$confirm('确定删除该课程的实验么, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('teacher/delete/ban', this.qs.stringify({
              t_id: row.t_id,
              co_id: row.co_id,
              cl_id: row.cl_id,
            }), {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }
          )
            .then(res => {
              if (res.data.code === 200) {
                this.myExperiment()
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }else {
                this.$message({
                  type: 'worn',
                  message: '删除失败'
                });
              }
            })
        }).catch(() => {
          console.log(row.t_id, row.co_id, row.cl_id)
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      viewDetail (row) {
        this.$axios.post('experiment_detail',this.qs.stringify(
          {
            teacher_id: row.t_id,
            class_id: row.cl_id,
            course_id: row.co_id,
          }),
          {
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          .then(res => {
            if(res.data.code === 200){
              this.detailMyExpData = res.data.experiment
            }
          })
        console.log(row)
        this.dialogTableVisible = true
      },

      closeDialog () {
        this.dialogTableVisible = false
      },

      getAllClass () {
        this.$axios.get('clname')
          .then(res => {
            console.log(res.data)
            if (res.data.code === 200) {
              this.class_options = res.data.al_class
            }

          })
      },
      getAllSeat () {
        this.$axios.get('sname')
          .then(res => {
            console.log(res.data)
            if (res.data.code === 200) {
              this.seats_options = res.data.seats
            }

          })
      },
      getAllCourse () {
        this.$axios.get('coname')
          .then(res => {
            console.log(res.data)
            if (res.data.code === 200) {
              this.course_options = res.data.courses
            }
          })
      },

      submitForm (form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.$confirm('确定添加该实验么, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$axios.post('/add_experiment'
                ,JSON.stringify({
                  course_id:this.ruleForm.courseId,
                  class_id:this.ruleForm.classId,
                  teacher_id :this.$route.query.tid,
                  seats:this.ruleForm.seats,
                  weeks:this.ruleForm.weeks,
                  days:this.ruleForm.days,
                  times:this.ruleForm.times,
                }, { indices: false })
                , {
                  headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
                }
              ) .then(res=> {
                if(res.data.code===200){
                  this.$message({
                    type: 'success',
                    message: '添加实验成功!',
                  });
                  this.resetForm('ruleForm')
                  this.getWeekExperiment(this.week_exp);
                }else if(res.data.code===502){
                  this.$message({
                    type: 'error',
                    message: '此实验与现有实验发生冲突，添加失败'
                  });
                }
              })

            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          }
          else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }

  }
</script>



<style>

  .el-header {
    text-align:center;
    color: #409EFF;
    line-height: 60px;
    background: #FFFFFF;
    font-size:26px;
    margin-top: 15px
  }


  #coursesTable {
    padding: 15px 10px;
  }

  .Courses-head {
    background-color: #edffff;
  }

  .Courses-head > div {
    text-align: center;
    font-size: 14px;
    line-height: 28px;
  }

  .left-hand-TextDom, .Courses-head {
    background-color: #f2f6f7;
  }

  .Courses-leftHand {
    background-color: #f2f6f7;
    font-size: 12px;
  }

  .Courses-leftHand .left-hand-index {
    color: #9c9c9c;
    margin-bottom: 4px !important;
  }

  .Courses-leftHand .left-hand-name {
    color: #666;
  }

  .Courses-leftHand p {
    text-align: center;
    font-weight: 900;
  }

  .Courses-head > div {
    border-left: none !important;
  }

  .Courses-leftHand > div {
    padding-top: 5px;
    border-bottom: 1px dashed rgb(219, 219, 219);
  }

  .Courses-leftHand > div:last-child {
    border-bottom: none !important;
  }

  .left-hand-TextDom, .Courses-head {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
  }

  .Courses-content > ul {
    border-bottom: 1px dashed rgb(219, 219, 219);
    box-sizing: border-box;
  }

  .Courses-content > ul:last-child {
    border-bottom: none !important;
  }

  .highlight-week {
    color: #02a9f5 !important;
  }

  .Courses-content li {
    text-align: center;
    color: #666666;
    font-size: 14px;
    line-height: 50px;
  }

  .Courses-content li span {
    padding: 6px 2px;
    box-sizing: border-box;
    line-height: 18px;
    border-radius: 4px;
    white-space: normal;
    word-break: break-all;
    cursor: pointer;
  }


</style>
