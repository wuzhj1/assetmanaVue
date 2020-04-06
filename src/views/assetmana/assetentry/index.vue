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
      <el-table-column label="资产编码" prop="code"></el-table-column>
      <el-table-column label="资产名称" prop="name"></el-table-column>
      <el-table-column label="资产类别" prop="category.name"></el-table-column>
      <el-table-column label="使用人" prop="user.name"></el-table-column>
      <el-table-column label="金额" prop="money"></el-table-column>
      <el-table-column label="规格型号" prop="model"></el-table-column>
      <el-table-column label="原值" prop="originalValue"></el-table-column>
      <el-table-column label="累计折旧" prop="depSum"></el-table-column>
      <el-table-column label="使用月限" prop="useMonth"></el-table-column>
      <el-table-column label="剩余月限" prop="lastMonth"></el-table-column>
      <el-table-column label="净残值率" prop="resiRate"></el-table-column>
      <!-- <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" @click="this.edit_click(scope.row)"
            >编辑</el-button
          >
        </template> -->
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
      width="50%"
      show-close="flase"
      title="资产新增"
    >
      <el-form ref="form" :model="newAsset" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="资产编码">
              <el-input v-model="newAsset.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="资产名称">
              <el-input v-model="newAsset.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="资产类别">
              <el-select v-model="newAsset.category" filterable placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="分摊部门">
              <el-input v-model="newAsset.dept"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="使用人">
              <el-select v-model="newAsset.user" filterable placeholder="请选择">
                <el-option
                  v-for="item in users"
                  :key="item.id"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="金额">
              <el-input v-model="newAsset.money"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="原值">
              <el-input v-model="newAsset.originalvalue"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="累计折旧">
              <el-input v-model="newAsset.depSum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="使用月限">
              <el-input v-model="newAsset.userMonth"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="剩余月限">
              <el-input v-model="newAsset.lastMonth"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="净值">
              <el-input v-model="newAsset.netValue"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="残值率">
              <el-input v-model="newAsset.resiRate"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="newDialogVisable = false"
          >取 消</el-button
        >
        <el-button type="primary" @click="new_submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import {getAllAsset} from "@/api/asset";
import { getAllMenus } from '../../../api/menu';

export default {
  data() {
    return {
      tableData: [],
      newDialogVisable: false,
      editDialogVisable: false,

      categories:[],

      users:[],

      newAsset:{
        code:"",
        name:"",
        dept:"",
        category:"",
        user:"",
        modal:"",
        money:0,
        originalvalue:0,
        depSum:0,
        useMonth:0,
        lastMonth:0,
        netValue:0,
        resiRate:0
      },

      currentPage:1,
      pageSize:15

    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    currentPageData: function () {
      return this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
  },
  methods: {
    fetchData() {
      const _this = this;
      getAllAsset().then(res=>{
        
        _this.tableData=res.data.assets;
        console.log(_this.tableData);
      })
    },

    new_click() {
      this.newDialogVisable = true;
    },
    edit_click(row) {},
    delete_submit() {},

    selectRow(selection, row) {
      const _this = this;
      this.selectList = [];
      selection.forEach((item) => {
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
    },
  },
};
</script>

<style></style>
