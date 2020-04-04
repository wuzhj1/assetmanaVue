<template>
  <div class="app-container">
    <el-button type="primary" @click="this.new_click">
      新增
    </el-button>

    <el-button type="primary" @click="this.auto_click">
      角色分配
    </el-button>

    <el-button type="primary" @click="this.delete_submit">
      删除
    </el-button>

    <el-table
      :data="this.currentPageData"
      border
      stripe
      size="small"
      @selection-change="this.selectRow"
    >
      <el-table-column type="selection" width="40"> </el-table-column>

      <el-table-column label="名称" prop="name"></el-table-column>
      <!-- <el-table-column label="是否启用" >
        <template slot-scope="scope">
        <el-switch v-model="scope.row.enable" disabled=true></el-switch>
        </template>
      </el-table-column> -->
      <el-table-column label="密码" prop="password"></el-table-column>
      <el-table-column label="手机号码" prop="phone"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="住址" prop="address"></el-table-column>
      <el-table-column label="备注" prop="remark"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="edit_click(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="this.handleSizeChange"
      @current-change="this.handleCurrentChange"
      :current-page="this.currentPage"
      :page-sizes="[15, 30, 50, 100]"
      :page-size="this.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.tableData.length"
    >
    </el-pagination>

    <el-dialog
      :visible.sync="newDialogVisable"
      width="35%"
      show-close="flase"
      title="用户新增"
    >
      <el-form ref="form" :model="newUser" label-width="80px">
        <el-form-item label="名 称">
          <el-input v-model="newUser.name"></el-input>
        </el-form-item>
        <el-form-item label="密 码">
          <el-input v-model="newUser.password"></el-input>
        </el-form-item>
        <el-form-item label="电 话">
          <el-input v-model="newUser.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮 箱">
          <el-input v-model="newUser.email"></el-input>
        </el-form-item>
        <el-form-item label="住 址">
          <el-input v-model="newUser.address"></el-input>
        </el-form-item>
        <el-form-item label="备 注">
          <el-input v-model="newUser.remark"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="newDialogVisable = false">取 消</el-button>
        <el-button type="primary" @click="new_submit">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="editDialogVisable" width="35%" title="用户编辑">
      <el-form ref="form" :model="editUser" label-width="80px">
        <el-form-item label="名 称">
          <el-input v-model="editUser.name"></el-input>
        </el-form-item>
        <el-form-item label="密 码">
          <el-input v-model="editUser.password"></el-input>
        </el-form-item>
        <el-form-item label="电 话">
          <el-input v-model="editUser.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮 箱">
          <el-input v-model="editUser.email"></el-input>
        </el-form-item>
        <el-form-item label="住 址">
          <el-input v-model="editUser.address"></el-input>
        </el-form-item>
        <el-form-item label="备 注">
          <el-input v-model="editUser.remark"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel_click">取 消</el-button>
        <el-button type="primary" @click="edit_submit">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="用户角色分配" :visible.sync="authDialogVisible">
      <el-tree 
        :data="this.treeRoleData" 
        show-checkbox
        node-key="id"
        ref="tree"
        :default-checked-keys="this.defaultCheckedRole"
      ></el-tree>
      <el-button @click="authDialogVisible=false">取消</el-button>
      <el-button @click="this.auto_submit">确定</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { getAllUsers, addUser, deleteUser, updateUser,userDefaultRole ,setUserRole} from "@/api/user";
import {getAllRoles} from "@/api/role";
import { Message } from "element-ui";
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 15,
      tableData: [],
      newUser: {
        name: "",
        password: "",
        phone: "",
        email: "",
        address: "",
        remark: ""
      },
      editUser: {
        name: "",
        password: "",
        phone: "",
        email: "",
        address: "",
        remark: ""
      },
      selectList: [],

      treeRoleData:[],
      defaultCheckedRole:[],

      newDialogVisable: false,
      editDialogVisable: false,
      authDialogVisible:false
    };
  },
  computed: {  

    currentPageData: function() {
      return this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    }
  },

  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const _this = this;
      getAllUsers().then(res => {
        _this.tableData = res.data.users;
      });
    },
    new_click() {
      this.newDialogVisable = true;
    },
    new_submit() {
      const _this = this;
      addUser(_this.newUser).then(res => {
        if (res.success) {
          Message.success("添加成功");
          this.newDialogVisable = false;
          this.fetchData();
        } else {
          Message.error("添加失败");
        }
      });
    },
    edit_click(row) {
      this.editDialogVisable = true;
      this.editUser = row;
      console.log(row);
    },
    edit_submit() {
      const _this = this;
      updateUser(_this.editUser).then(res => {
        if (res.success) {
          Message.success("用户信息修改成功");
          _this.fetchData();
          _this.editDialogVisable = false;
        } else {
          Message.error("用户信息修改失败！");
        }
      });
    },
    cancel_click() {
      this.fetchData();
      this.editDialogVisable = false;
    },

    delete_submit() {
      const _this = this;
      if (this.selectList.length == 0) {
        Message.info("请选择需要删除的用户");
      }
      console.log(this.selectList);
      deleteUser(_this.selectList).then(res => {
        if (res.success) {
          Message.info("用户删除成功");
          _this.fetchData();
        } else {
          Message.error("用户删除失败");
        }
      });
    },
    auto_click(){
      const _this=this;
      if(this.selectList.length !=1){
        Message.warning("请选择一个用户！");
      }else{
        this.authDialogVisible=true;
        getAllRoles().then(res=>{
          let roles=res.data.roles;
          _this.treeRoleData=[];
          roles.forEach(item=>{
            let temp={"id":item.id,"label":item.name};
            _this.treeRoleData.push(temp);
          }) 
        })
        userDefaultRole({"uid":_this.selectList[0]}).then(res=>{
          _this.defaultCheckedRole=res.data.rids;
        })
      }
    },
    auto_submit(){
      let rids=this.$refs.tree.getCheckedKeys();
      let uid=this.selectList[0];
      let isAdd=rids.length>this.defaultCheckedRole.length;
      let formRids=[];
      if(isAdd){
        for(var rid of rids){
          if(!this.defaultCheckedRole.includes(rid)){
            formRids.push(rid);
          }
        }
      }else{
        for(var de of this.defaultCheckedRole){
          if(!rids.includes(de)){
            formRids.push(de);
          }
        }
      }
      if(formRids.length>0){
         setUserRole({"rids":formRids,"uid":uid,"isAdd":isAdd}).then(res=>{
           if(res.success){
             Message.info("修改成功");
             this.authDialogVisible = false;
           }else{
             Message.error("修改失败");
           }
        })
      }
     
      
    },


    selectRow(selection, row) {
      const _this = this;
      this.selectList = [];
      selection.forEach(item => {
        _this.selectList.push(item.id);
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      console.log(val);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(val);
    }
  }
};
</script>

<style></style>
