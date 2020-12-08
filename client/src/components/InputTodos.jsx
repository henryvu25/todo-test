import React, { useState } from 'react'

const InputTodos = () => {
    const [description, setDescription] = useState("");

    const addTodo = async e => {
        e.preventDefault();
        try {
            const response = await fetch("/todos", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({description})
            })
            console.log(response);
            window.location = '/'
        } catch (err) {
            console.error(err.message)
        }
    }
    
    return (
        <div>
            <h1 className="text-center my-5">My To Do List</h1>
            <form className="d-flex container-lg" action="">
                <input className="form-control" type="text" placeholder="Add Todo" value={description} onChange={e => setDescription(e.target.value)}/>
                <button onClick={addTodo} className="btn btn-success ml-2" >Add</button>
            </form>
        </div>
    )
}

export default InputTodos
