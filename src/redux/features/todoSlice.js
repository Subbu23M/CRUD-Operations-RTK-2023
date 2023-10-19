import {
    createSlice
} from "@reduxjs/toolkit"

// 1)Initial State
const initialState = {
    todosArray: [{
        todoInput: '',
        todosArray: []
    }]
}

// creating slice 
const todoSlice = createSlice({
    name: 'TODOAPP',
    initialState,
    reducers: {

    }
})

// exporting reducer
export default todoSlice.reducer