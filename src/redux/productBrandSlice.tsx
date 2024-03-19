import { createSlice } from "@reduxjs/toolkit";


const productBrandSlice = createSlice({

    name:'productBrand',
    initialState:[],
    reducers:{
        addProductsBrand(state,action){
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
         deleteProductBrandItem(state,action) {
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
         clearProductsBrand(state) {
            state.splice(0, state.length); // Clear the array
        }
        //  clearProducts(state) {
        //     console.log('clearPRRR SLICE');
            
        //     return []; // Return a new empty array to clear the products
        // },
    
    },

})


export const {addProductsBrand,increaseQty,decreaseQty,clearProductsBrand,deleteProductBrandItem} = productBrandSlice.actions;
export default productBrandSlice.reducer;