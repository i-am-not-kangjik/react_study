import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
    name: 'user',
    initialState: {name : 'kim', age : 20},
    reducers: {
        changeName(originState) {
            originState.name = 'park';
        },
        increaseAge(state, n){
            state.age += n.payload;
        }
    }
})

export let { changeName, increaseAge } = user.actions

export default user;