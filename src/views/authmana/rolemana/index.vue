<template>
  <div class="app-container">
    <el-button type="primary" icon="el-icon-plus" @click="add_click"
      >新增</el-button
    >
    <el-button
      type="primary"
      icon="el-icon-delete"
      @click="getTreeData"
      >授权</el-button
    >
    <el-button type="primary" icon="el-icon-delete" @click="this.delete"
      >删除</el-button
    >

    <el-table
      :data="this.tableData"
      border
      stripe
      size="small"
      @selection-change="this.selectRow"
    >
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column label="角色">
        <template slot-scope="scope">
          <el-link @click="edit_click(scope.row)">{{ scope.row.name }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="角色中文名" prop="nameZh"></el-table-column>
      <el-table-column label="备注" prop="remark"></el-table-column>
    </el-table>

    <el-dialog title="角色菜单分配" :visible.sync="authDialogVisible">
      <el-tree :data="this.treeData" show-checkbox></el-tree>
    </el-dialog>

    <el-dialog
      :title="btnState"
      :visible.sync="editDialogVisible"
      width="30%"
      center
    >
      <el-form v-model="role" label-width="90px">
        <el-form-item label="角色名">
          <el-input v-model="role.name"></el-input>
        </el-form-item>
        <el-form-item label="中文名">
          <el-input v-model="role.nameZh"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="role.remark" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">{{ btnState }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import ButtonGroup from "@/components/ButtonGroup/index";
import UniversalTable from "@/components/UniversalTable/index";
import { getAllRoles, addrole, deleteRole, updateRole } from "@/api/role";
import formatTreeData from '@/utils/formatTreeData';
import { Message } from "element-ui";
import {getTreeMenus} from '@/api/treeMenus'
export default {
  components: {
    ButtonGroup,
    UniversalTable
  },
  data() {
    return {
      tableData: [],
      btnState: "", // "新增"，"修改"
      editDialogVisible: false,
      authDialogVisible: false,
      role: {
        name: "",
        nameZh: "",
        remark: ""
      },
      selectedList: [],
      treeData: []
    };
  },
  created() {
    this.fetchData();
  },

  methods: {
    getTreeData() {
      const _this = this;
      getTreeMenus().then(resp=>{
        console.log(resp);
        _this.treeData=resp.data.data;
      })
      
      this.authDialogVisible = true;
    },

    fetchData() {
      let _this = this;
      getAllRoles().then(res => {
        _this.tableData = res.data.roles;
      });
    },
    selectRow(selection, row) {
      const _this = this;
      this.selectedList = [];
      console.log(selection);

      selection.forEach(item => {
        _this.selectedList.push(item.id);
      });
    },

    submit(btnState) {
      const _this = this;
      if (btnState === "新增") {
        addrole(_this.role).then(resp => {
          const success = resp.success;
          if (success) {
            _this.fetchData();
            _this.editDialogVisible = false;
            _this.role = {};
          } else {
            Message.info(resp.msg);
          }
        });
      } else {
        updateRole(_this.role).then(resp => {
          const success = resp.success;
          if (success) {
            _this.fetchData();
            _this.editDialogVisible = false;
            _this.role = {};
          } else {
            Message.info(resp.msg);
          }
        });
      }
      btnState="";
    },
    delete() {
      const _this = this;
      if (this.selectedList.length === 0) {
        Message.error("请选择要删除的角色！");
      } else {
        deleteRole(_this.selectedList).then(res => {
          Message.success("删除成功");
          _this.fetchData();
          _this.selectedList = [];
        });
      }
    },
    add_click() {
      this.btnState = "新增";
      this.role={}
      this.editDialogVisible = true;
    },
    edit_click(row) {
      this.btnState = "修改";
      this.role = row;
      this.editDialogVisible = true;
    }
  }
};
</script>
