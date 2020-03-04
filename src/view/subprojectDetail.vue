<template>
  <div class="subdetail">
    <div class="block">
      <el-divider></el-divider>
      <el-row>
        <el-col span="3">
          <p></p>
        </el-col>
        <el-col span="11">
          <el-tabs v-model="activeName">
            <el-tab-pane label="子项目基本信息" name="first">
              <el-card>
                <div slot="header" style="text-align: center">
                  <span>子项目描述</span>
                </div>
                <h4 style="font-size: 16px;font-style:oblique;color:teal;text-align: center">这个子项目主要为了收集答辩所需的图片素材</h4>
                <el-divider content-position="right">所属项目ID</el-divider>
                <h4 style="font-size: 16px;font-style:oblique">&nbsp&nbsp&nbsp&nbsp{{sub.Value.proID}}</h4>
                <el-divider content-position="right">子项目ID</el-divider>
                <h4 style="font-size: 16px;font-style:oblique">&nbsp&nbsp&nbsp&nbsp{{sub.Value.subproID}}</h4>
                <el-divider content-position="right">子项目难度</el-divider>
                <h4 style="font-size: 16px;font-style:oblique">&nbsp&nbsp&nbsp&nbsp{{sub.Value.difficulty}}</h4>
                <el-divider content-position="right">开始时间</el-divider>
                <h4 style="font-size: 16px;font-style:oblique">&nbsp&nbsp&nbsp&nbsp{{sub.Value.subproStartTime}}</h4>
                <el-divider content-position="right">截止时间</el-divider>
                <h4 style="font-size: 16px;font-style:oblique">&nbsp&nbsp&nbsp&nbsp{{sub.Value.subproEndTime}}</h4>
                <el-divider content-position="right">当前版本</el-divider>
                <h4 style="font-size: 16px;font-style:oblique">&nbsp&nbsp&nbsp&nbsp{{sub.Timestamp.split(".")[0]}}</h4>
                <p></p>
              </el-card>
            </el-tab-pane>
            <el-tab-pane label="附件列表" name="second">
              <el-card>
                <div slot="header">
                  <span>附件列表</span>
                </div>
                <el-table
                  :data="sub.Value.appendix"
                  style="width: 100%">
                  <el-table-column
                    label="附件名称"
                    width="180">
                    <template slot-scope="scope">
                      <span style="margin-left: 9px">{{ scope.row.fileName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="上传时间"
                    width="180">
                    <template slot-scope="scope">
                      <el-popover trigger="hover" placement="top">
                        <p>{{ scope.row.upTime }}</p>
                        <div slot="reference" class="name-wrapper">
                          <i class="el-icon-time"></i>
                          <span style="margin-left: 10px">{{ scope.row.upTime.split(" ")[0] }}</span>
                        </div>
                      </el-popover>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="上传者"
                    width="150">
                    <template slot-scope="scope">
                      <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.upUser }}</el-tag>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="danger"
                        @click="download(scope.row.fileName, scope.row.upUser,scope.row.upTime)">下载
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <br>
                <input id="file" class="file" style="visibility: hidden" type="file" title="请选择文件" value="请选择文件">
                <span>
                  <el-button style="margin-left: 10px;" size="small" type="primary" @click="bindTwoButton">选择文件
                </el-button>
                <el-button style="margin-left: 10px;" size="small" type="primary" @click="submit">上传至服务器
                </el-button></span>
              </el-card>
            </el-tab-pane>
            <el-tab-pane label="评论" name="third">
              <el-card>
                <div slot="header">
                  <span>评论
                  <el-button style="float: right; padding: 3px 0" type="text"
                             @click="dialogFormVisible = true">添加评论</el-button></span>
                </div>
                <el-dialog title="评论" :visible.sync="dialogFormVisible">
                  <el-form :model="form">
                    <el-form-item label="评论内容" :label-width="formLabelWidth">
                      <el-input v-model="form.content" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="对该子项目打分" :label-width="formLabelWidth">
                      <div class="block">
                        <span class="demonstration"></span>
                        <el-rate
                          v-model="form.score">
                        </el-rate>
                      </div>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addNewComment(form.content,form.score)">确 定</el-button>
                  </div>
                </el-dialog>
                <div class="container">
                  <div class="comment" v-for="(comment,i) in sub.Value.comment">
                    <div class="info">
                      <el-avatar class="avatar" width="36" height="36">{{comment.userName}}</el-avatar>
                      <div class="right">
                        <div class="name">{{comment.userName}}
                        </div>
                        <div class="date">{{comment.time}}
                        </div>
                      </div>
                    </div>
                    <div class="content">{{comment.content}}
                    </div>
                    <div class="score">
                      <el-rate
                        v-model="comment.score"
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template="{value}">
                      </el-rate>
                    </div>
                  </div>
                </div>
              </el-card>
            </el-tab-pane>
            <el-tab-pane label="成员列表" name="fourth" @tab-click="getMember">
              <el-carousel :interval="4000" type="card" height="400px">
                <el-carousel-item v-for="item in sub.Value.member" :key="item">
                  <h3 class="medium" style="text-align: center;font-size: 24px">{{ item }}</h3>
                </el-carousel-item>
              </el-carousel>
              <el-button type="primary" v-if="this.identity=='student'" @click="joinSub">加入该子项目</el-button>
              <el-button type="danger" v-if="this.identity=='student'" @click="quitSub">退出该子项目</el-button>
            </el-tab-pane>
          </el-tabs>

        </el-col>
        <el-col span="1">
          <p></p>
        </el-col>
        <el-col span="6">
          <div class="timeline" v-for="(sub,i) in subHistory">
            <el-timeline>
              <el-timeline-item :timestamp="sub.Timestamp.split(' ')[0]" placement="top">
                <el-card>
                  <h4>{{sub.Value.info}}</h4>
                  <p> 提交于{{sub.Timestamp.split(".")[0]}}</p>
                  <el-button icon="el-icon-right" @click="getSub(i)" circle>前往该版本</el-button>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-col>
        <el-col span="3">
          <p>
          </p>
        </el-col>
      </el-row>

    </div>
  </div>
</template>


<script>
  import {queryHistoryOfSubproject, joinSubproject, quitSubproject, addComment, searchStu} from '@/router/request'
  import axios from 'axios'
  import $ from 'jquery'

  export default {
    name: "subprojectDetail",
    data() {
      return {
        subproID: window.location.href.split("?id=")[1],
        subHistory: {},
        sub: {},
        activeName: 'second',
        userName: localStorage.getItem("name"),
        identity: localStorage.getItem("identity"),
        dialogFormVisible: false,
        form: {
          content: "",
          score: {}
        },
        formLabelWidth: '120px',
        memberInfo: []
      }
    },
    beforeMount() {
      var data = {
        subproID: window.location.href.split("?id=")[1]
      }
      queryHistoryOfSubproject(data)
        .then(
          res => {
            this.subHistory = res.result;
            this.sub = this.subHistory[this.subHistory.length - 1];
          }
        )
        .catch(

        )
    },
    methods: {
      getMember: function () {
        var i = 0;
        for (i = 0; i < this.sub.Value.member.length; i++) {
          var name = {
            stuName: this.sub.Value.member[i]
          }
          searchStu(name)
            .then(
              res => {
                this.memberInfo.append(res)
              }
            )
            .catch(
              res => {
                console.log(res.Response)
              }
            )
        }
      },
      getSub: function (i) {
        this.sub = this.subHistory[i]
      },
      joinSub: function () {
        var data = {
          subproID: this.subproID,
          stuName: this.userName
        }
        joinSubproject(data)
          .then(
            res => {
            }
          )
          .catch(
            res => {
              console.log(res.Response)
            }
          )
      },
      quitSub: function () {
        var data = {
          subproID: this.subproID,
          stuName: this.userName
        }
        quitSubproject(data)
          .then(
            res => {
            }
          )
          .catch(
            res => {
              console.log(res.Response)
            }
          )
      },
      addNewComment: function (con, sco) {
        var data = {
          subproID: this.subproID,
          userName: this.userName,
          userAvatar: this.userName,
          content: con,
          score: sco
        }
        this.dialogFormVisible = false
        addComment(data)
          .then(
            res => {
              alert("评论成功!")
              location.reload();
            }
          )
          .catch(
            res => {
              console.log(res.Response)
            }
          )
      },
      submit: function () {
        var formData = new window.FormData()
        formData.append('file', document.querySelector('#file').files[0]) // 'file' 这个名字要和后台获取文件的名字一样;
        formData.append('userName', this.userName)
        formData.append('description', "这是一条描述")
        formData.append('subproID', this.subproID)
        //'userfile'是formData这个对象的键名
        axios({
          url: 'http://localhost:8080/uploadAppendixForSub',   //****: 你的ip地址
          data: formData,
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data',
            // 'Access-Control-Allow-Origin': 'http://127.0.0.1:8080'
          }
        }).then((res) => {
          alert("上传成功！");
          location.reload();
        }) // 发送请求
      },
      bindTwoButton() {
        $(".file").click();
      },
      download: function (file, name, time) {
        window.open("http://localhost:8080/downloadAppendixForSub?subproID=" + this.subproID + "&upUser=" + name + "&upTime=" + time + "&fileName=" + file)
      }
    }
  }
</script>

<style scoped>
  .comment {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-bottom: 1px solid #F2F6FC;
  }

  .info {
    display: flex;
    align-items: center;
  }

  .avatar {
    border-radius: 50%;
  }

  .right {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  }

  .name {
    font-size: 16px;
    color: #303133;
    margin-bottom: 5px;
    font-weight: 500;
  }

  .date {
    font-size: 14px;
    color: #909399;
  }

  .score {
    display: flex;
    align-items: center;
    margin-right: 10px;
    cursor: pointer;
    color: #909399;
  }

  .content {
    font-size: 16px;
    color: #303133;
    line-height: 20px;
    padding: 10px 0;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .file {
    color: deepskyblue;
  }
</style>
