import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({

    name:'cart',
    initialState:[],
    reducers:{
        addProductsToCart(state,action){
           let cartIndex = -1 ;
           state.map((item,index) => {
            if(item.id == action.payload.id){
                cartIndex = index ;
            }
           })
           if(cartIndex == -1){
            state.push(action.payload);
           }else{
            state[cartIndex].qty = state[cartIndex].qty + 1 ;
           }
        },
        removeCartItem(state,action) {
            let cartIndex = -1 ;
            state.map((item,index) => {
             if(item.id == action.payload.id){
                 cartIndex = index ;
             }
            })
            if(cartIndex == -1){
              
               }else{
                state[cartIndex].qty = state[cartIndex].qty - 1 ;
               }
        },
        deleteCartItem(state,action) {
           return (state = state.filter(item => item.id !== action.payload));
        },
        clearProductsToCart(state) {
            state.splice(0, state.length); // Clear the array
        }
    },
})


export const {addProductsToCart,removeCartItem,deleteCartItem,clearProductsToCart} = cartSlice.actions;
export default cartSlice.reducer;