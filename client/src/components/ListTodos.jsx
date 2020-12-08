import React, { useEffect, useState } from 'react'
import EditTodos from "./EditTodos"

const ListTodos = () => {

    const [todos, setTodos] = useState([]);

    const getTodos = async () => {
        try {
            const response = await fetch("/todos"); //GET request be default
            const todoArray = await response.json(); //parse response into json format
            //console.log(todoArray.data.todos);
            setTodos(todoArray.data.todos);
        } catch (err) {
            console.error(err.message)
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/todos/${id}`, {
                method: "DELETE"
            })
            console.log(response);
            setTodos(todos.filter(todo => todo.todo_id !==id))
        } catch (err) {
            console.error(err.message)
        }
    }

    //useEffect continues running making multiple requests. when an empty array is in the second parameter, it runs it once until the list is updated
    useEffect(() => {
        getTodos();
    }, [])
    

    return (
        <div>
            <table className="table mt-5">
                <thead>
                    <tr>
                        <th scope="col">Description</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td><EditTodos todo={todo}/></td>
                            <td><button onClick={() => handleDelete(todo.todo_id)} className="btn btn-danger">Delete</button></td>
                        </tr>
                    ))}
                    {/* <tr>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr> */}

                </tbody>
            </table>
        </div>
    )
}

export default ListTodos
