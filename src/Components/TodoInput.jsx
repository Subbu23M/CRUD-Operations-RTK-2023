import { useState } from "react"
import { useDebounce } from "../hooks/useDebounce"
import { useDispatch, useSelector } from "react-redux"
import { addTodo,removeTodo } from "../redux/features/todoSlice"
import { FaTrash } from 'react-icons/fa'
import swal from "sweetalert"

export const TodoInput = () => {
    const [inputValue, setInputValue] = useState('')

    // Invoke useDebounce custom hook
    const [debouncedValue, handleDebounce] = useDebounce(inputValue, 1000)

    const handleInput = (e) => {
        const inpValue = e.target.value
        setInputValue(inpValue)
        handleDebounce(inpValue)
    }

    const dispatch = useDispatch()

    const reuseCode = () => {
        dispatch(addTodo(debouncedValue))
        setInputValue('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        reuseCode()
        swal('todo added')
    }

    const store = useSelector((state) => {
        return state.TODOAPP?.todosArray 
    })

    const handleRemoveTodo = (id) => {
        dispatch(removeTodo(id))
        swal('todo removed')
    }
    return (
        <>
            <form className="form-inline mx-2" autoComplete="off">
                <div className="form-group mt-2">
                    <label className="sr-only">
                        Enter Todo 
                    </label>
                    <input 
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Todo..."
                        value={inputValue}
                        onChange={handleInput}
                    />
                </div>
                <button 
                    type="submit"
                    className="btn btn-primary ml-2 mt-2"
                    onClick={handleSubmit}
                >
                    Add Todo 
                </button>
            </form>
            {
                store?.length > 0 && <ul className="list-group list-group-flush mx-2 mt-2">
                    {
                        store.map((item) => {
                            const{id,eachTodo} = item
                            return (
                                <li className="list-group-item" key={id}>
                                    {eachTodo} - <span 
                                        className="ml-5 text-danger" 
                                        onClick={() => handleRemoveTodo(id)}
                                    >
                                        <FaTrash/>
                                    </span>
                                </li>
                            )
                        })
                    }
                </ul>
            }
        </>
    )
}