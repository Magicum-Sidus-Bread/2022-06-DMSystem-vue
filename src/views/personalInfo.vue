<template>
	<el-button type="primary" @click="dialogFormVisible1 = true"
	    >修改信息</el-button
	  >
	  <el-button type="primary" @click="dialogFormVisible2 = true"
	      >修改密码</el-button
	    >
  <div>
    <el-row :gutter="12" style="margin-top:10px;">
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>个人中心</span>
            </div>
            <div class="name-role">
              <span class="sender">{{dataForm.nickName}}</span>
            </div>
            <div class="registe-info">
          <span class="registe-info">
            注册时间：{{dataForm.time}}
            <li class="fa fa-clock-o"></li>
            
          </span>
            </div>
            <el-divider></el-divider>
            <div class="personal-relation">
              <div class="relation-item">手机号: {{dataForm.phone}} </div>
            </div>
<!--            <div class="personal-relation">-->
<!--              <div class="relation-item">所属企业:  <div style="float: right; padding-right:20px;">杭州诚聚</div></div>-->
<!--            </div>-->
            <div class="personal-relation">
              <div class="relation-item">邮箱: {{dataForm.email}} </div>
            </div>
            <div class="personal-relation">
              <div class="relation-item">个人简介: {{dataForm.desc}}</div>
            </div>
          </el-card>
        </div>
      </el-col>
	  
	  
	   <el-dialog v-model="dialogFormVisible1" title="修改个人信息">
	      <el-form :model="dataForm">
	        <el-form-item label="昵称" :label-width="formLabelWidth">
	          <el-input v-model="dataForm.nickName" autocomplete="off" />
	        </el-form-item>
			<el-form-item label="手机号" :label-width="formLabelWidth">
			  <el-input v-model="dataForm.phone" autocomplete="off" />
			</el-form-item>
			<el-form-item label="邮箱" :label-width="formLabelWidth">
			  <el-input v-model="dataForm.email" autocomplete="off" />
			</el-form-item>
			<el-form-item label="个人描述" :label-width="formLabelWidth">
			  <el-input v-model="dataForm.desc" autocomplete="off" />
			</el-form-item>
	       
	      </el-form>
	      <template #footer>
	        <span class="dialog-footer">
	          <el-button @click="dialogFormVisible1 = false">取消</el-button>
	          <el-button type="primary" @click="confirm1()"
	            >确定</el-button
	          >
	        </span>
	      </template>
	    </el-dialog>
		
		
		
		<el-dialog v-model="dialogFormVisible2" title="修改密码">
		   <el-form :model="pwdForm">
		     <el-form-item label="旧密码" :label-width="formLabelWidth">
		       <el-input v-model="pwdForm.formerPwd" autocomplete="off" />
		     </el-form-item>
					<el-form-item label="新密码" :label-width="formLabelWidth">
					  <el-input v-model="pwdForm.pwd" autocomplete="off" />
					</el-form-item>
					
		    
		   </el-form>
		   <template #footer>
		     <span class="dialog-footer">
		       <el-button @click="dialogFormVisible2 = false">取消</el-button>
		       <el-button type="primary" @click="confirm2()"
		         >确定</el-button
		       >
		     </span>
		   </template>
		 </el-dialog>



    </el-row>


  </div>

</template>

<script setup>

var test=localStorage.getItem("userid")
if(test==null){
  window.location.href = "http://10.131.167.11:8082/login"
}

window.alert = function(msg, callback) {
  var div = document.createElement("div");
  div.innerHTML = "<style type=\"text/css\">"
      + ".nbaMask { position: fixed; z-index: 1000; top: 0; right: 0; left: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); }                                                                                                                                                                       "
      + ".nbaMaskTransparent { position: fixed; z-index: 1000; top: 0; right: 0; left: 0; bottom: 0; }                                                                                                                                                                                            "
      + ".nbaDialog { position: fixed; z-index: 5000; width: 80%; max-width: 300px; top: 50%; left: 50%; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%); background-color: #fff; text-align: center; border-radius: 8px; overflow: hidden; opacity: 1; color: white; }"
      + ".nbaDialog .nbaDialogHd { padding: .2rem .27rem .08rem .27rem; }                                                                                                                                                                                                                         "
      + ".nbaDialog .nbaDialogHd .nbaDialogTitle { font-size: 17px; font-weight: 400; }                                                                                                                                                                                                           "
      + ".nbaDialog .nbaDialogBd { padding: 0 .27rem; font-size: 15px; line-height: 1.3; word-wrap: break-word; word-break: break-all; color: #000000; }                                                                                                                                          "
      + ".nbaDialog .nbaDialogFt { position: relative; line-height: 48px; font-size: 17px; display: -webkit-box; display: -webkit-flex; display: flex; }                                                                                                                                          "
      + ".nbaDialog .nbaDialogFt:after { content: \" \"; position: absolute; left: 0; top: 0; right: 0; height: 1px; border-top: 1px solid #e6e6e6; color: #e6e6e6; -webkit-transform-origin: 0 0; transform-origin: 0 0; -webkit-transform: scaleY(0.5); transform: scaleY(0.5); }               "
      + ".nbaDialog .nbaDialogBtn { display: block; -webkit-box-flex: 1; -webkit-flex: 1; flex: 1; color: #09BB07; text-decoration: none; -webkit-tap-highlight-color: transparent; position: relative; margin-bottom: 0; }                                                                       "
      + ".nbaDialog .nbaDialogBtn:after { content: \" \"; position: absolute; left: 0; top: 0; width: 1px; bottom: 0; border-left: 1px solid #e6e6e6; color: #e6e6e6; -webkit-transform-origin: 0 0; transform-origin: 0 0; -webkit-transform: scaleX(0.5); transform: scaleX(0.5); }             "
      + ".nbaDialog a { text-decoration: none; -webkit-tap-highlight-color: transparent; }"
      + "</style>"
      + "<div id=\"dialogs2\" style=\"display: none\">"
      + "<div class=\"nbaMask\"></div>"
      + "<div class=\"nbaDialog\">"
      + "	<div class=\"nbaDialogHd\">"
      + "		<strong class=\"nbaDialogTitle\"></strong>"
      + "	</div>"
      + "	<div class=\"nbaDialogBd\" id=\"dialog_msg2\">弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内</div>"
      + "	<div class=\"nbaDialogHd\">"
      + "		<strong class=\"nbaDialogTitle\"></strong>"
      + "	</div>"
      + "	<div class=\"nbaDialogFt\">"
      + "		<a href=\"javascript:;\" class=\"nbaDialogBtn nbaDialogBtnPrimary\" id=\"dialog_ok2\">确定</a>"
      + "	</div></div></div>";
  document.body.appendChild(div);

  var dialogs2 = document.getElementById("dialogs2");
  dialogs2.style.display = 'block';

  var dialog_msg2 = document.getElementById("dialog_msg2");
  dialog_msg2.innerHTML = msg;

  // var dialog_cancel = document.getElementById("dialog_cancel");
  // dialog_cancel.onclick = function() {
  // dialogs2.style.display = 'none';
  // };
  var dialog_ok2 = document.getElementById("dialog_ok2");
  dialog_ok2.onclick = function() {
    dialogs2.style.display = 'none';
    callback();
  };
};

import axios from "axios";
import {baseURL} from "../utils/request";
import { ref, reactive, onBeforeMount, computed, getCurrentInstance } from "vue";
import {getUserInfo,editinfo,editpassword} from "../apis/user.js"


import { ElMessage } from 'element-plus'

const userid = localStorage.getItem("userid");
console.log("个人页面", localStorage.getItem("userid"))

var post_info_edit;
var post_pass_edit;
let dialogFormVisible1 = ref(false);
let dialogFormVisible2 = ref(false);


var dataForm_copy;

//系统消息通知
//成功
const open1 = () => {
  ElMessage({
    showClose: true,
    message: '成功修改！',
    type: 'success',
  })
}
//失败


const open2 = () => {
  ElMessage.error('修改失败，请稍后再试')
}


// const open3 = () => {
//   ElMessage({
//     showClose: true,
//     message: '您已拒绝该消息',
//     type: 'warning',
//   })
// }





const confirm1 = () =>{
	
	console.log(dataForm.nickName);
	dialogFormVisible1.value = false;
	
	post_info_edit = {
		userid:userid,
		name:dataForm.nickName,
		email:dataForm.email,
		phone:dataForm.phone,
		description:dataForm.desc
	}
	
	editinfo(post_info_edit)
	    .then((res) => {
	      if (res.code == 0) {
	       open1();
	      }
	    })
	    .catch((err) => {
	      open2();
		  dataForm = dataForm_copy;
	    });

	
};


const confirm2 = () =>{
	
	console.log(pwdForm.formerPwd);
	dialogFormVisible2.value = false;
	
	post_pass_edit = {
		userid:userid,
		oldPassword:pwdForm.formerPwd,
		newPassword:pwdForm.pwd
	}
	
	editpassword(post_pass_edit)
	    .then((res) => {
	      if (res.code == 0) {
	       open1();
	      }
	    })
	    .catch((err) => {
	     open2();
	    });
	
	
};







const formLabelWidth = '140px';


      var dataForm = reactive({
        nickName: '请求中...',
        phone: '请求中...',
        email: '请求中...',
        desc:'请求中...',
        time:'请求中...',
      });
   //    const editForm = reactive({
   //      nickName: '请输入新昵称',
   //      phone: '请输入新电话号码',
   //      homeUrl: '请输入新邮箱地址',
   //      desc:'请输入新个人简介',
   //      formerPwd:"若要修改密码则必填",
   //      time:'请求中...可点击右上角刷新按钮重试',
   //      pwd:"新密码"
   //    });
      const pwdForm = reactive({
        formerPwd:"请输入旧密码",
        pwd:"请输入新密码"
      });
   //    const alreadyGet = ref(false);
   //    const show = ref(true) ;
	  // const dialogFormVisible = ref(false),
	  
 const post_userinfo = {
	 userid : userid,
 };
	
    const getInfo = () => {
		console.log("111");
		getUserInfo(post_userinfo)
		    .then((res) => {
		      if (res.code == 0) {
		       dataForm.nickName = res.data[0].name;
			   dataForm.phone = res.data[0].phone;
			   dataForm.time = res.data[0].registertime;
			    dataForm.email = res.data[0].email;
				dataForm.desc = res.data[0].description;
				dataForm_copy = dataForm;
				console.log("%%%%%",dataForm_copy)
				console.log(res.data[0].name)
		      }
		    })
		    .catch((err) => {
		      console.log(err);
		    });
		  
		};
		
		
		
   //    let data = {
   //      "userid": userid
   //    };
   //    axios.post(baseURL + '/user/info', data)
   //        .then(
   //            res => {
   //              console.log(res.data.data)
   //         dataForm = {
   //            nickName: res.data.data[0].name,
   //            phone: res.data.data[0].phone,
   //            homeUrl: res.data.data[0].email,
   //            desc: res.data.data[0].description,
   //            time: res.data.data[0].registertime,
   //            formerPwd: "若要修改密码则必填",
   //            pwd: "新密码"
   //          };
   //        editForm = {
   //            nickName: res.data.data[0].name,
   //            phone: res.data.data[0].phone,
   //            homeUrl: res.data.data[0].email,
   //            desc: res.data.data[0].description,
   //            time: res.data.data[0].registertime,
   //            formerPwd: "若要修改密码则必填",
   //            pwd: "新密码"
   //          };
			// console.log("成功")
   //          alreadyGet=true;
   //        }).catch(()=>alert("请求失败"))
    // };
	
	
   //  const submitInfo = () => {
   //    console.log(editForm)
   //      let data = {
   //        "userid": userid,
   //        name: editForm.nickName,
   //        phone: editForm.phone,
   //        email: editForm.homeUrl,
   //        description: editForm.desc,
   //        time: editForm.time,
   //        formerPwd: "若要修改密码则必填",
   //        pwd: "新密码"
   //      };
   //      axios.post(baseURL + '/user/editinfo', data)
   //          .then(
   //              res => {
   //                console.log(res.data.data)
   //                if(res.data.code==0){
   //                  dataForm = editForm;
   //                }
   //                getInfo();
   //              })
   //    };
   // const submitPwd = () => {
   //    console.log(pwdForm)
   //    if(pwdForm.pwd.length<6){
   //      alert("密码长度需大于等于6")
   //    }else if(pwdForm.pwd=="请输入新密码"||pwdForm.formerPwd=="请输入旧密码"){
   //      alert("请输入新/旧密码")
   //    }
   //    else
   //    {
   //    let data = {
   //      "userid": userid,
   //      "oldPassword": pwdForm.formerPwd,
   //      "newPassword": pwdForm.pwd
   //    };
   //    console.log(data)
   //    axios.post(baseURL + '/user/editpassword', data)
   //        .then(
   //            res => {
   //              console.log(res.data.code)
   //              if(res.data.code==0){
   //                    alert("密码修改成功")
   //              }else{
   //                alert("密码修改失败，请检查旧密码是否有误")
   //              }
   //              getInfo();
   //            })
   //  }
   //  };

  onBeforeMount(() => {
	  console.log("121212")
    getInfo();
    
  });

</script>

<style lang="scss" scoped>
//卡片样式
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 100%;
}
//文本样式区
.name-role {
  font-size: 16px;
  padding: 5px;
  text-align:center;
}
.sender{
  text-align:center;
}
.registe-info{
  text-align: center;
  padding-top:10px;
}
.personal-relation {
  font-size: 16px;
  padding: 0px 5px 15px;
  margin-right: 1px;
  width: 100%
}

.relation-item {
  padding: 12px;

}
.dialog-footer{
  padding-top:10px ;
  padding-left: 10%;
}
//布局样式区
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}


.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
