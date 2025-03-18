<template>
	<div class="toolbar">
	    <div>
			<el-button type="text" @click="ReturnTo">返回上一级</el-button>
	    </div>
		<div class="toolbar-right">
			<el-button @click="MkdirFormVisible = true" type="primary" plain>创建文件夹</el-button>
			<el-button @click="UploadFormVisible = true" type="primary" plain>上传</el-button>
		</div>
	</div>
	<el-table :data="FileList" border style="width: 100%" highlight-current-row="true">
  	<el-table-column label="文件名">
		<template #default="scope">
		<el-icon v-if="scope.row.ObjectType=='file'">
			<Document/>
		</el-icon>
		<el-icon v-else-if="scope.row.ObjectType=='directory'">
			<Folder/>
		</el-icon>
		<span style="margin-left: 10px  text-aligned=left" @dblclick="JumpTo(scope.row.Title)" show-overflow-tooltip="true"> {{scope.row.Title}} </span>
		</template>
		</el-table-column>
		<el-table-column label="日期">
		<template #default="scope">
		<span style="margin-left: 10px  text-aligned=left" @dblclick="JumpTo(scope.row.Title)" show-overflow-tooltip="true" > {{scope.row.ModifyDate}} </span>
		</template>
		</el-table-column>
		<el-table-column label="操作" fixed="right" align="center" width="280">
  		<template #default="scope">
			<el-button size="small" @click='ShareTo(scope.row.fileid)' v-if="scope.row.fileid!='fix'" >分享</el-button>
			<el-divider direction="vertical" v-if="scope.row.fileid!='fix'" ></el-divider>
			<el-button size="small" @click="PatchTo(scope.row.fileid)" v-if="scope.row.fileid!='fix'" >批注</el-button>
			<el-divider direction="vertical" v-if="scope.row.fileid!='fix'" ></el-divider>
			<el-button size="small" @click="EditFormVisible = true;EditTo(scope.row.Title,scope.row.ObjectType,scope.row.fileid)" v-if="scope.row.fileid!='fix'" >编辑</el-button>
			<el-divider direction="vertical" v-if="scope.row.fileid!='fix'" ></el-divider>
			<el-popconfirm
			  confirm-button-text="确认"
			  cancel-button-text="取消"
			  icon="el-icon-info"
			  icon-color="red"
			  title="确认删除？"
			  @confirm="DeleTo(scope.row.Title)">
			  <template #reference>
			    <el-button size="small" type="danger">删除</el-button>
			  </template>
			</el-popconfirm>
		</template>
		</el-table-column>
	</el-table>
	<el-dialog  title="文件修改" v-model="EditFormVisible">
	   <el-form :model="EditForm">
	      <el-form-item label="操作" :label-width="formLabelWidth">
	        <el-select v-model="EditForm.OperationType" placeholder="请选择操作">
				<el-option label="重命名" value="rename" />
				<el-option label="移动" value="move" />
				<el-option label="复制" value="copy" />
	        </el-select>
	      </el-form-item>
		  <el-form-item label="目标路径" :label-width="formLabelWidth">
		    <el-input v-model="EditForm.DestinationPath" :placeholder="Paths.ThisPath"/>
		  </el-form-item>
	    </el-form>
	    <template #footer>
	      <span class="dialog-footer">
	        <el-button @click="EditFormVisible = false">取消</el-button>
	        <el-button type="primary" @click="EditFormVisible = false;EditConfirm()">确认</el-button>
	      </span>
	    </template>
	</el-dialog>
	<el-dialog  title="创建文件夹 文本框内为当前文件夹路径" v-model="MkdirFormVisible">
	   <el-form :model="MkdirForm">
		  <el-form-item label="新建文件夹名:" :label-width="formLabelWidth">
		    <el-input v-model="MkdirForm.NewName" :placeholder="Paths.ThisPath"/>
		  </el-form-item>
	    </el-form>
	    <template #footer>
	      <span class="dialog-footer">
	        <el-button @click="MkdirFormVisible = false">取消</el-button>
	        <el-button type="primary" @click="MkdirFormVisible = false; ; MkdirConfirm()">确认</el-button>
	      </span>
	    </template>
	</el-dialog>

	<el-dialog title="上传文件" v-model="UploadFormVisible">
		<p> 选择文件:<input id="upload_file" type="file" name="files">
		        <input type="button" value="提交" @click="uploadFile()" id="upload"> </p>
				<p> 请上传PDF文件,文件体积小于100M</p>
	</el-dialog>
	<el-dialog title="分享" v-model="ShareVisible">
    <p>仅分享文件链接: {{ ShareUrl0 }} </p><br>
    <p>直接分享链接 : {{ ShareUrl }}</p><br>
    <p>登录分享链接 : {{ ShareUrl2 }}</p>
	</el-dialog>
</template>

<script setup>
var test=localStorage.getItem("userid")
if(test==null){
  window.location.href = "http://10.131.167.11:8082/login"
}

import {ElMessage} from "element-plus";

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
import {ref, reactive, onBeforeMount, computed, watch} from "vue";
import {useRouter,useRoute} from "vue-router";
import {getFiles} from "../apis/file.js";
import baseURL from "../utils/request.js";
import axios from "axios";

//
// const userid = localStorage.getItem("userid");
// console.log("TeamShow", userid)


var  Paths = reactive({
	FormerPath:"",
	ThisPath:"/",
	JumpPath:"/",
	UserId:localStorage.getItem("teamid"),
	SourcePath:'',
	TimeStap:'',
	PlaceHolder:'',
	PrePath:"/team/",
})
const EditFormVisible=ref(false);
const MkdirFormVisible=ref(false);
const UploadFormVisible=ref(false);
const ShareVisible=ref(false);
var   libraryid =localStorage.getItem("libid");
const router = useRouter();
const formLabelWidth = '140px';
const identity = '/team';
var FileList = ref([]);
var ShareUrl0 = ref("");
var ShareUrl = ref("");
var ShareUrl2 = ref("");




const ShareTo = function(pdfid){
  if (pdfid == "fix") {
    open2();
  } else {
    ShareVisible.value = true;
    //http://10.131.167.11:8082/pdf/showpdf?fileid=1
    ShareUrl0.value = "http://10.131.167.11:8082/pdf/showpdf?fileid=" + pdfid;
    ShareUrl.value = "http://10.131.167.11:8082/index.html?pdfid=" + pdfid + "&&ownerid=" + Paths.UserId + "&&type=directshare";
    ShareUrl2.value = "http://10.131.167.11:8082/index.html?pdfid=" + pdfid + "&&ownerid=" + Paths.UserId + "&&type=indirectShare";
  }
}
const open7 = () => {
  ElMessage.error('文件夹不可被批注!')
}
const PatchTo = function(pdfid){
  if (pdfid == "fix") {
    open7();
  } else {
    //http://10.131.167.11:8082/index.html?pdfid=1&&ownerid=1&&type=normal

    var urltmp = "http://10.131.167.11:8082/index.html?" + "pdfid=" + pdfid + "&&ownerid=" + Paths.UserId + "&&type=normal";
    window.open(urltmp, "文件批注页");
  }
}
const getList = () => {
	var query = {
		  option: "list",
      //TODO  here
		  currentpath : Paths.PrePath+Paths.UserId+"/"+libraryid+Paths.ThisPath,
		  userid: Paths.UserId,
		  libraryid : libraryid,
		  identity : identity,
		  };
	  getFiles(query)
      .then((res) => {
        if (res.code == 0) {
		  console.log(query);
          console.log(res.data);
          console.log(res.msg);
          FileList.value = res.data;
        }
		else if(res.code == 500){
			alert("操作失败")
		}
    })
    .catch((err) => {
        console.log(err);
        }
    );
};
const JumpTo = function(RelPath){
	Paths.FormerPath=Paths.ThisPath;
	Paths.JumpPath=((Paths.ThisPath!='/')? Paths.ThisPath+'/'+RelPath : Paths.ThisPath+RelPath);
	Paths.ThisPath=Paths.JumpPath;
	var query = {
		  option: "list",
		  currentpath : Paths.PrePath+Paths.UserId+"/"+libraryid+Paths.ThisPath,
		  userid: Paths.UserId,
		  libraryid : libraryid,
		  identity : identity,
		  };
	Paths.JumpPath='';
	getFiles(query)
	  .then((res) => {
	    if (res.code == 0) {
			console.log(query)
			console.log(res.data);
			console.log(res.msg);
			FileList.value = res.data;
	    }
		else if(res.code == 500){
			alert("操作失败")
		}
	})
	.catch((err) => {
	    console.log(err);
	    }
	);
};
const open6 = () => {
  ElMessage({
    showClose: true,
    message: '已是根目录无法返回',
    type: 'warning',
  })
}

const ReturnTo = function(){
	if(Paths.ThisPath!='/')
	{
		Paths.JumpPath=Paths.FormerPath
		Paths.ThisPath=Paths.JumpPath
		if(Paths.ThisPath=='/')
		{
			Paths.FormerPath=''
		}
		else{
			var TmpPath=Paths.FormerPath.split("/")
			var i = 0
			Paths.FormerPath=''
			while( i < TmpPath.length-2)
			{
				Paths.FormerPath = Paths.FormerPath  + TmpPath[i] + '/'
				i++
			}
			Paths.FormerPath += TmpPath[i]
		}
		var query = {
			  option: "list",
			  currentpath : Paths.PrePath+Paths.UserId+"/"+libraryid+Paths.ThisPath,
			  userid: Paths.UserId,
			  libraryid : libraryid,
			  identity : identity,
			  };
		getFiles(query)
		  .then((res) => {
			if (res.code == 0) {
			  console.log(query)
			  console.log(res.data);
			  console.log(res.msg);
			  FileList.value = res.data;
			}
			else if(res.code == 500){
				alert("操作失败")
			}
		})
		.catch((err) => {
			console.log(err);
			}
		);
	}
	else
	{
		Paths.FormerPath=''
    open6();
	}
};
// const getUser = function(){
// 	var MyUrl= window.location.search;
// 	console.log(MyUrl)
//   Paths.UserId=teamid
//   console.log("开始打印参数")
//   console.log(teamidGet)
//   console.log(libidGet)
//
//
// };

const DeleTo = function(RelPath,pdfid){
	var query = {
		option: "rm",
		source: Paths.PrePath+Paths.UserId+"/"+libraryid+((Paths.ThisPath != '/')? Paths.ThisPath +'/'+RelPath : Paths.ThisPath+RelPath),
	};
	getFiles(query)
	  .then((res) => {
	    if (res.code == 0) {
		  console.log(query);
	      console.log(res.data);
	      console.log(res.msg);
        getList()
	    }
		else if(res.code == 500){
			alert("操作失败")
		}
	})
	.catch((err) => {
	    console.log(err);
	    }
	);
	getList();
};


const EditForm = reactive({
	SourcePath : Paths.SourcePath,
	DestinationPath :'',
	OperationType :'',
	ObjectType:'',
	PdfId:'',
	EditTitle:'',
});
const EditTo = function(RelPath,type,pdfid){
	EditForm.EditTitle=RelPath;
	Paths.SourcePath = ((Paths.ThisPath != '/')? Paths.ThisPath +'/'+RelPath : Paths.ThisPath+RelPath);
	EditForm.ObjectType = type;
	EditForm.PdfId = pdfid;
};
const EditConfirm = function(){
	switch(EditForm.OperationType)
	{
		case "move": 
		if(EditForm.ObjectType=="directory"){
			alert("非法操作,不允许移动文件夹");
		}
		else{
			MoveTo();
		}
		break;
		case "rename": 
		if(EditForm.ObjectType=="directory"){
			alert("非法操作,不允许重命名文件夹");
		}
		else{
			RenameTo();
		}
		break;
		case "copy": 
		if(EditForm.ObjectType=="directory"){
			alert("非法操作,不允许复制文件夹");
		}
		else{
			CopyTo();
		};
		break;
		default: alert("请选择操作") ;
	}
};

const RenameTo = function(){
	console.log(Paths.SourcePath)
	var query = {
		option: "rename",
		source:  Paths.PrePath+Paths.UserId+"/"+libraryid+Paths.SourcePath,
		dest: Paths.PrePath+Paths.UserId+"/"+libraryid+EditForm.DestinationPath,
		type: EditForm.ObjectType,
    pdfid:pdfid
	};
  console.log("fhdjsafhjdsaflhjkas")
  console.log(query)

	getFiles(query)
	  .then((res) => {
	    if (res.code == 0) {
		  console.log(query);
	      console.log(res.data);
	      console.log(res.msg);
        getList();
	    }
		else if(res.code == 500){
			alert("操作失败")
		}
	})
	.catch((err) => {
	    console.log(err);
	    }
	);
	var query = {
		  option: "list",
		  currentpath : Paths.PrePath+Paths.UserId+"/"+libraryid+Paths.ThisPath,
		  userid: Paths.UserId,
		  libraryid : libraryid,
		  identity : identity,
		  };
	  getFiles(query)
	  .then((res) => {
	    if (res.code == 0) {
		  console.log(query);
	      console.log(res.data);
	      console.log(res.msg);
	      FileList.value = res.data;
	    }
		else if(res.code == 500){
			alert("操作失败")
		}
	})
	.catch((err) => {
	    console.log(err);
	    }
	);
}
const MoveTo = function(){
	var query = {
		  option: "mv",
		  dest :  Paths.PrePath+Paths.UserId+"/"+libraryid+EditForm.DestinationPath+"/"+EditForm.EditTitle,
		  source: Paths.PrePath+Paths.UserId+"/"+libraryid+Paths.SourcePath,
		  pdfid : EditForm.PdfId,
		  ownerid : Paths.UserId,
		  identity : identity,
		  };
	  getFiles(query)
	  .then((res) => {
	    if (res.code == 0) {
		  console.log(query);
	      console.log(res.data);
	      console.log(res.msg);
        getList();
	    }
		else if(res.code == 500){
			alert("操作失败")
		}
	})
	.catch((err) => {
	    console.log(err);
	    }
	);
	getList();
};
const CopyTo = function(){
	if(EditForm.DestinationPath==EditForm.SourcePath)
	{
		alert("源路径与目标路径不能相同!");
	}
	else{
	var query = {
		  option: "copy",
		  dest : Paths.PrePath+Paths.UserId+"/"+libraryid + EditForm.DestinationPath + "/" +EditForm.EditTitle,
		  source: Paths.PrePath+Paths.UserId+"/"+libraryid + Paths.SourcePath,
		  pdfid : EditForm.PdfId,
		  };
	  getFiles(query)
	  .then((res) => {
	    if (res.code == 0) {
		  console.log(query);
	      console.log(res.data);
	      console.log(res.msg);
        getList();
	    }
		else if(res.code == 500){
			alert("操作失败")
		}
	})
	.catch((err) => {
	    console.log(err);
	    }
	);
	var query = {
		  option: "list",
		  currentpath : Paths.PrePath+Paths.UserId+"/"+libraryid+Paths.ThisPath,
		  userid: Paths.UserId,
		  libraryid : libraryid,
		  identity : identity,
		  };
	  getFiles(query)
	  .then((res) => {
	    if (res.code == 0) {
		  console.log(query);
	      console.log(res.data);
	      console.log(res.msg);
	      FileList.value = res.data;
	    }
		else if(res.code == 500){
			alert("操作失败")
		}
	})
	.catch((err) => {
	    console.log(err);
	    }
	);
}
}

const MkdirForm = reactive({
	NewName :'', 
});
const MkdirConfirm = function(){
	MkdirTo();
};
const MkdirTo = function(){
	if(MkdirForm.NewName[0]!="/"){
			alert("目标目录必须以/开始")
	}
	else{
	var query = {
		option: "mkdir",
		dest: Paths.PrePath+Paths.UserId+"/"+libraryid + MkdirForm.NewName,
		identity: identity,
		ownerid:Paths.UserId,
	};
	getFiles(query)
	  .then((res) => {
	    if (res.code == 0) {
		  console.log(query);
	      console.log(res.data);
	      console.log(res.msg);
	    }
		else if(res.code == 500){
			alert("操作失败")
		}
	})
	.catch((err) => {
	    console.log(err);
	    }
	);
	getList();
}
}

const UploadForm = reactive({
	Source :'',
	destination : "",
});
const UploadConfirm = function()
{
	alert("UploadTo函数");
	uploadFile()();
};

const uploadFile= function(){
  console.log("start")
  let formData = new FormData();
  formData.append("file", document.getElementById('upload_file').files[0]);
  let obj = {};
  obj.info = "附属信息";//用户名
  let data = JSON.stringify(obj);
  formData.append("path",Paths.PrePath+Paths.UserId+"/"+libraryid+Paths.ThisPath);
  axios.post("http://10.131.167.11:8082/receivefile", formData)
      .then(function (response) {
        console.log(response);
        getList();
		alert(response.data.msg);
      })
};

onBeforeMount(() => {
  getList();
}); 
</script>

<style type="text/css">
.toolbar {
  display: flex;
  position: relative;
  justify-content: space-between;
}
.toolbar-right {
  margin-top: 5px;
  margin-left: 20px;
  margin-bottom: 5px;
  text-align: left;
  margin-right: 30px;
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