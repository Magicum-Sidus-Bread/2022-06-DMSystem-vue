<template>
  <div class="toolbar">
    <div class="toolbar-right">
      <el-button @click="dialogFormVisible = true" type="primary" plain>新建文献库</el-button>
    </div>
  </div>
  <div class="table">
    <el-table :data="libList" border style="width: 100%">
      <!-- <el-table-column prop="avatar" label="图片" width="65">
        <template #default="scope">
          <el-avatar :src="scope.row.image"></el-avatar></template
      ></el-table-column> -->
      <el-table-column align="center" prop="lib_id" label="文献库编号" width="" />
      <el-table-column align="center" prop="libname" label="文献库名称" width="" />
      <el-table-column align="center" prop="libteamid" label="文献库所属团队编号" width="" />
      <el-table-column align="center" prop="libteamname" label="文献库所属团队名称" width="" />
	  <el-table-column align="center" prop="libfilenumber" label="文献库文献数量" width="" />
      <el-table-column align="center" label="操作" fixed="right" width="180"><template #default="scope">
          <el-button size="small" @click="EnterTo(scope.row.libteamid,scope.row.lib_id)">进入文献库</el-button>
<!--        <el-link-->
<!--            :href="'/#/TeamDocuments?teamid=' + scope.row.libteamid+'&&libid='+scope.row.lib_id"-->
<!--            type="primary"-->
<!--            :underline="false"-->
<!--        >进入团队文献库-->
<!--        </el-link>-->
		  <el-divider direction="vertical"></el-divider>
          <el-popconfirm
            confirm-button-text="确认"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            title="确认删除该文献库？"
            @confirm="handleDelete(scope.$index, scope.row)"
          >
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
  
  
  <el-dialog v-model="dialogFormVisible" title="新建文献库">
      <el-form :model="lib">
        <el-form-item label="请输入新建文献库名字:" :label-width="formLabelWidth">
          <el-input v-model="lib.name" autocomplete="off" />
        </el-form-item>
        
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="create_lib()"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
  
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
import { ref, reactive, onBeforeMount, computed } from "vue";
import { useRouter } from "vue-router";
import { Search } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from 'element-plus'
import { makelib , getlib } from "../apis/teamdocuments.js";

const userid = localStorage.getItem("userid");
console.log("TeamDocu", userid)



const router = useRouter();
const teamid = router.currentRoute.value.query["teamid"];
const dialogFormVisible = ref(false);
console.log("teamid为：",teamid)
const lib = reactive({
	name:'',
})

const open1 = () => {
  ElMessage({
    showClose: true,
    message: 'Oops！新建文献库失败，请稍后再试',
    type: 'error',
  })
};

const open2 = () => {
  ElMessage({
    showClose: true,
    message: '您已新建文献库，请刷新页面查看',
    type: 'success',
  })
}


const count = ref(0);

const libList = ref([]);


const EnterTo = (team, lib) => {
  console.log("发货件大事富海大厦尽快发货税扣减阿富汗辣的刷卡缴费单")
  localStorage.setItem("teamid",team)
  localStorage.setItem("libid",lib)

  window.location.href = 'http://10.131.167.11:8082/home#/TeamFileShow';
// lib	router.push({
//     http://10.131.167.11:8082/home#/TeamFileShow?teamid=2&libid=1
// 	  path:"home#/TeamFileShow",
// 	  query:{
//       "teamid":team,
// 		  "libid":lib
//
// 	  },
// 	})
};


const create_lib = () => {
 dialogFormVisible.value = false;
		const post_create_lib = {
			userid:userid,
			teamid:teamid,
			libname:lib.name,
		};
		console.log("!@!@@!@",post_create_lib);
		makelib(post_create_lib)
		  .then((res) => {
        getList()
		    if (res.code == 0) {
				open2();
				
		    }
		  })
		  .catch((err) => {
		 open1();
			
		  });
		
};




const getList = () => {

const post_get_lib = {
	teamid:teamid,
};

  getlib(post_get_lib)
    .then((res) => {
      if (res.code == 0) {
        libList.value = res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};




// //TODO: 新增文献库
// const add = () => {
//   // router.push("/depositRelease");
//   alert("新建文献库")
// };

const modify = (row) => {
  // router.push({
  //   path: "/depositRelease",
  //   query: { isModify: true, id: row.id },
  // });
  alert("进入该文献库页面");
};

const handleDelete = (index, invalid, list) => {
  // deleteDeposit({ id: depositList.value[index].id })
  //   .then((res) => {
  //     if (res.code == 200) {
  //       depositList.value.splice(index, 1);
  //       ElMessage.success(res.msg);
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  alert("执行了删除函数");
};

onBeforeMount(() => {
  getList();
});
</script>

<style scoped>
.toolbar {
  display: flex;
  position: relative;
  justify-content: space-between;
}
.toolbar-left {
  flex: 0 0 auto;
}
.input {
  display: inline-block;
  margin-right: 15px;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
  border-radius: 6px;
}
.toolbar input {
  width: calc(100% - 70px);
  height: 36px;
  margin-right: 10px;
  padding: 0.1rem 0.65rem;
  border: none;
  outline: none;
  font-size: 15px;
  background: transparent;
  box-shadow: none;
}
.toolbar-right {
  margin-top: 5px;
  margin-left: 20px;
  text-align: left;
  margin-right: 30px;
}
.table {
  margin-top: 20px;
  margin-right: 20px;
  text-align: center !important;
}
.el-pagination {
  justify-content: center;
}
</style>
