<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>制单信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table stripe :data="cartProducts"  border class="table" ref="multipleTable">
                <el-table-column prop="bianma" label="编码" width="120"></el-table-column>
                <el-table-column prop="pinming" label="品名" width="120"></el-table-column>
                <el-table-column prop="guige" label="规格" width="80"></el-table-column>
                <el-table-column prop="pihao" label="批号" width="120"></el-table-column>
                <el-table-column prop="danwei" label="单位" width="50"></el-table-column>
                <el-table-column label="数量" width="180">
                    <template slot-scope="scope">
                        <el-input-number size="mini" :min="1" :value="scope.row.num" v-on:input="handleBlur" @change="handleChange( scope.row )"></el-input-number>
                    </template>
		        </el-table-column>
                <el-table-column prop="danjia" label="单价" width="80"></el-table-column>
                <el-table-column prop="total_num" label="总价" width="180"></el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button type="danger" plain icon="el-icon-delete" size="mini" @click="dialogVisibleTrue( scope.row )">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-row :gutter="20">
                <!-- <el-col :span="6">总数：{{totalNum}}</el-col> -->
                <el-col :span="6">合计价格：{{cartsMoney}}元整</el-col>
                <el-col :span="6"></el-col>
                <el-col :span="6"></el-col>

                <el-col :span="6">
                    <el-button type="danger" size="medium" icon="el-icon-delete" @click="export2excel">生成Excel</el-button>
                </el-col>
		  	<el-col :span="6"></el-col>
		</el-row>
        </div>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="dialogVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteYpxxToCart">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { getUrl } from '../../api/ypxx'
    import { mapGetters,mapActions,mapState } from 'vuex'
    export default {
        name: 'zhidanxinxi',
        data() {
            return {
                input_number_value:1,
                dialogVisible : false,
                delData : null,

            }
        },
        computed: {
            ...mapGetters({
			    cartProducts:'cart/cartProducts',
                cartsMoney:'cart/cartsMoney'
		    })
        },
        methods: {
            ...mapActions({
                 'addGoodsFromCart': 'cart/add_goods_from_cart',
                'reduceGoodsFromCart': 'cart/reduce_goods_from_cart',
                'deleteGoodsFromCart': 'cart/delete_goods_from_cart',
                'modifyGoodsFromCart': 'cart/modify_goods_num_from_cart',
            }),
            deleteYpxxToCart(){
                this.deleteGoodsFromCart(this.delData)
                this.delData = null
                this.dialogVisible = false
            },
            dialogVisibleTrue( data ){
                this.dialogVisible = true;
                this.delData = data;
            },
            handleChange( data ) {
                data.num = this.input_number_value;
                this.modifyGoodsFromCart( data );
            },
            handleBlur(value){
                this.input_number_value = value
            },           
            export2excel11(){
                let cartProducts = this.cartProducts
                let cartsMoney = this.cartsMoney
                let url = getUrl().downloadExcel
                console.log(cartProducts)
                this.$axios.post(url, {
                    cartProducts: cartProducts,
                    cartsMoney:cartsMoney
                }).then((res) => {
                    this.$message.success(`删除成功`);
                })

            },
            export2excel() {
                import('@/vendor/Export2Excel').then(excel => {
                const multiHeader = [['时间', '河北神威大药房配送清单', '', '', '','','','','','','',''],['','','客户','','','','','','','发货区域','','',]]
                const header = ['日期', '编码', '品名', '规格', '批号','有效期','单位','数量','单价','金额','生产厂家','批准文号']
                const filterVal = ['日期', 'bianma', 'pinming', 'guige', 'pihao','youxiaoqi','danwei','num','danjia','jine','shengchanchangjia','pizhunwenhao']
                const list = this.cartProducts
                const data = this.formatJson(filterVal, list)
                const merges = ['A1:A2', 'B1:K1', 'D1:J1','K1:L1']
                excel.export_json_to_excel({
                    multiHeader,
                    header,
                    merges,
                    data
                    })
                })
            },
            formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => {
                if (j === 'timestamp') {
                return parseTime(v[j])
                } else {
                return v[j]
                }
            }))
            }


        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
    }

	.el-col-6{padding: 20px; text-align: center;}
</style>
