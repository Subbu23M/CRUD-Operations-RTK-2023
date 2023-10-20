import {
    createSlice
} from "@reduxjs/toolkit"
import {
    v4 as uuidv4
} from 'uuid'

// 1)Initial State
const initialState = {
    todosArray: []
}

// creating slice 
const todoSlice = createSlice({
    name: 'TODOAPP',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: uuidv4(),
                eachTodo: action.payload
            }
            state.todosArray.push(todo)
        },
        removeTodo: (state, action) => {
            state.todosArray = state.todosArray.filter((todo) => todo.id !== action.payload)
        }
    }
})

export const {
    addTodo,
    removeTodo
} = todoSlice.actions

// exporting reducer
export default todoSlice.reducer