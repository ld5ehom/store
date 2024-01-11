// Redux Toolkit 
import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './userSlice'


//Cart.js details 
let cart = createSlice({
    name : 'cart',
    initialState : [
        {id : 100, name : 'Please Internship!', count : 1, price : 1},
        // {id : 1, name : 'Grey Yordan', count : 1}
    ],
    reducers : {

        quantityPlus(state, action){
            let findItem = state.findIndex((a)=>{ return a.id === action.payload })
            state[findItem].count++
            // state[action.payload].count++
        },
        quantityMinus(state, action){
            let findItem = state.findIndex((a)=>{ return a.id === action.payload })
            if(state[findItem].count === 1 ){
                state.splice(findItem,1)
            } else {
                state[findItem].count--;
            }
            
        },
        
        addItem(state, action){  
            let findItem = state.findIndex((a) => action.payload.id === a.id);
            if (findItem !== -1) {
                // 이미 존재하는 아이템인 경우
                state[findItem].count++;
            } else {
                // 존재하지 않는 아이템인 경우
                state.push(action.payload);
            }
        },

        deleteItem(state,action){
            let findItem = state.findIndex((a)=>{ return a.id === action.payload })
            state.splice(findItem,1)
        }
    }
})

export let {quantityPlus, quantityMinus , addItem, deleteItem} = cart.actions

export default configureStore({
    reducer: { 
        user : user.reducer,
        cart : cart.reducer
    }
}) 

