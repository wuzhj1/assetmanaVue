<template>
  <div class="app-container">
    <el-button type="primary" @click="this.new_click">
      新增
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
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column label="名称" prop="name"></el-table-column>
      
      <el-table-column label="路径" prop="path"></el-table-column>
      <el-table-column label="组件" prop="component"></el-table-column>
      <el-table-column label="图标" prop="icon"></el-table-column>
      <el-table-column label="是否缓存" prop="noCache"></el-table-column>
      <el-table-column label="面包屑" prop="breadcrumb"></el-table-column>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="是否跟菜单" prop="isRoot"></el-table-column>
      <el-table-column label="是否隐藏" prop="hidden"></el-table-column>
      <el-table-column label="父级菜单" prop="parentId"></el-table-column>
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
      title="菜单新增"
    >
      <el-form ref="form" :model="newMenu" label-width="80px">
        <el-form-item label="名 称">
          <el-input v-model="newMenu.name"></el-input>
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="newMenu.path"></el-input>
        </el-form-item>
        <el-form-item label="组件">
          <el-input v-model="newMenu.component"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="newMenu.icon"></el-input>
        </el-form-item>
        <el-form-item label="是否隐藏">
          <el-input v-model="newMenu.hidden"></el-input>
        </el-form-item>
        <el-form-item label="是否缓存">
          <el-input v-model="newMenu.noCache"></el-input>
        </el-form-item>
        <el-form-item label="面包屑">
          <el-input v-model="newMenu.breadcrumb"></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="newMenu.title"></el-input>
        </el-form-item>
        <el-form-item label="根目录">
          <el-input v-model="newMenu.isRoot"></el-input>
        </el-form-item>
        <el-form-item label="父菜单">
          <el-input v-model="newMenu.parentId"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="newDialogVisable = false">取 消</el-button>
        <el-button type="primary" @click="new_submit">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="editDialogVisable"
      width="35%"
      show-close="flase"
      title="菜单编辑"
    >
      <el-form ref="form" :model="editMenu" label-width="80px">
        <el-form-item label="名 称">
          <el-input v-model="editMenu.name"></el-input>
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="editMenu.path"></el-input>
        </el-form-item>
        <el-form-item label="组件">
          <el-input v-model="editMenu.comconent"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="editMenu.icon"></el-input>
        </el-form-item>
        <el-form-item label="是否隐藏">
          <el-input v-model="editMenu.hidden"></el-input>
        </el-form-item>
        <el-form-item label="是否缓存">
          <el-input v-model="editMenu.noCache"></el-input>
        </el-form-item>
        <el-form-item label="面包屑">
          <el-input v-model="editMenu.breadcrumb"></el-input>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="editMenu.title"></el-input>
        </el-form-item>
        <el-form-item label="根目录">
          <el-input v-model="editMenu.isRoot"></el-input>
        </el-form-item>
        <el-form-item label="父菜单">
          <el-input v-model="editMenu.parentId"></el-input>
        </el-form-item>
      </el-form>
       <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editDialogVisable = false">取 消</el-button>
        <el-button type="primary" @click="edit_submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {getAllMenus,updateMenu,addMenu,deleteMenus}from '@/api/menu';
import { Message } from 'element-ui';

export default {
  data(){
    return{
      tableData:[],
      selectList:[],

      currentPage: 1,
      pageSize: 15,

      newMenu:{
        name:"",
        path:"",
        component:"",
        icon:"",
        noCache:"",
        breadcrumb:"",
        title:"",
        isRoot:"",
        hidden:"",
        parentId:""
      },
      editMenu:{
        name:"",
        path:"",
        component:"",
        icon:"",
        noCache:"",
        breadcrumb:"",
        title:"",
        isRoot:"",
        hidden:"",
        parentId:""
      },

      newDialogVisable:false,
      editDialogVisable:false
    }
  },
  created() {
     this.fetchData();
  },
  computed: {  

    currentPageData: function() {
      return this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    }
  },
  methods:{
    fetchData(){
      const _this=this;
      getAllMenus().then(res=>{
        _this.tableData=res.data.menus;
      })
    },
    selectRow(selection, row) {
      const _this = this;
      this.selectList = [];
      selection.forEach(item => {
        _this.selectList.push(item.id);
      });
    },

    new_click(){
      this.newDialogVisable=true;

    },
    new_submit(){
      const _this=this;
      console.log(this.newMenu);
      addMenu(_this.newMenu).then(res=>{
        if (res.success) {
          Message.success("添加成功");
          this.newDialogVisable = false;
          this.fetchData();
        } else {
          Message.error("添加失败");
        }
      })
    },
    edit_click(row){
      this.editDialogVisable=true;
      this.editMenu=row;
    },
    edit_submit(){
      const _this=this;
      updateMenu(_this.editMenu).then(res=>{
        if(res.success){
          Message.success("修改成功");
          _this.editDialogVisable=true;
          _this.fetchData();
        }else{
          Message.error("修改失败！");
        }
      })
    },
    delete_submit(){
      if(this.selectList.length==0){
        Message.warning("请选择需要删除的菜单!");
      }else{
        const _this=this;
        deleteMenus(_this.selectList).then(res=>{
          if(res.success){
            Message.success("删除成功！");
            _this.fetchData();
          }else{
            Message.warning("删除失败！");
          }
        })
      }
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
