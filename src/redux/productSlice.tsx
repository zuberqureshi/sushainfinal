import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({

    name:'product',
    initialState:[],
    reducers:{
        addProducts(state,action){
           state.push(action.payload); 
        },
        increaseQty(state,action){
            let cartIndex = -1 ;
            state.map((item,index) => {
             if(item.id == action.payload){
                 cartIndex = index ;
             }
            })
            if(cartIndex == -1){
            
            }else{
             state[cartIndex].qty = state[cartIndex].qty + 1 ;
            }
         },
         decreaseQty(state,action){
            let cartIndex = -1 ;
            state.map((item,index) => {
             if(item.id == action.payload){
                 cartIndex = index ;
             }
            })
            if(cartIndex == -1){
            
            }else{
             state[cartIndex].qty = state[cartIndex].qty - 1 ;
            }
         },
         deleteProductItem(state,action) {
            let cartIndex = -1 ;
            state.map((item,index) => {
             if(item.id == action.payload){
                 cartIndex = index ;
             }
            })
            if(cartIndex == -1){
            
            }else{
             state[cartIndex].qty = 0 ;
            }
         },
        clearProducts(state) {
            state.splice(0, state.length); // Clear the array
        }
    },
})


export const {addProducts,increaseQty,decreaseQty,clearProducts,deleteProductItem} = productSlice.actions;
export default productSlice.reducer;