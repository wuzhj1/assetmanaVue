<template>
  <div class="app-container">
    <el-button type="primary" @click="this.new_click">
      导出
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

    
  </div>
</template>

<script>

import {getAllAsset} from "@/api/asset";
import { getAllMenus } from '../../../api/menu';

export default {
  data() {
    return {
      tableData: [],
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
