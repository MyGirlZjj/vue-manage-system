export default {
  /*getters可以帮我们从state中进一步过滤我们需要的一些状态条件*/


  //商品列表
  cartProducts : state=>{
    let cartProducts = []
    let cart = state.cart
    for(let item in cart) {
      const danjia = (cart[item].danjia-0).toFixed(2)
      const total_num = (cart[item].num * danjia -0).toFixed(2)
      cart[item].danjia = danjia
      cart[item].total_num = total_num
      cartProducts.push(cart[item])
    }
    return  cartProducts
  },

  /*判断商品是否已经在购物车内*/
  hasGoods: state => (goods) => {
    return `p${goods.id}` in state.cart
  },
  /*返回购物车的数量*/
  cartNum:state => {
    let cart = state.cart
    return Object.keys(cart).length
  },
  /*计算购物车的金额*/
  cartsMoney: state => {
    let cart = state.cart
    let money = 0
    for(let item in cart) {
      money += cart[item].danjia * cart[item].num
    }
    return Number(money).toFixed(2)
  }
}