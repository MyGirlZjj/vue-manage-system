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
                'updateCart': 'cart/update_cart',
                'emptyCart': 'cart/empty_cart'
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
            export2excel(){
                let cartProducts = this.cartProducts
                let cartsMoney = this.cartsMoney
                let url = getUrl().getExcelFile
                console.log(cartProducts)
                this.$axios.post(url, {
                    cartProducts: cartProducts,
                    cartsMoney:cartsMoney
                }).then((res) => {
                    this.$message.success(`文档生成成功`);
                    let url = getUrl().downloadExcel + '?filePath=' + encodeURIComponent(res.data)
                    // window.open(url,"_blank")
                    let a = document.createElement('a')
                    a.href =url
                    a.click();
                    this.emptyCart()
                })

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
