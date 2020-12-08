import React, { useState } from 'react'

const EditTodos = ({ todo }) => {
    const [description, setDescription] = useState(todo.description)

    const editTodo = async (id) => {
        try {

            //proxy
            const response = await fetch(`/todos/${id}`, {
                method: "PUT",
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
            <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${todo.todo_id}`}>
                Edit
            </button>

            <div className="modal" id={`id${todo.todo_id}`} onClick={() => setDescription(todo.description)}>
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Edit Todo</h4>
                            <button type="button" className="close" data-dismiss="modal" onClick={() => setDescription(todo.description)}>&times;</button>
                        </div>

                        <div className="modal-body">
                            <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)}/>
                        </div>

                        <div className="modal-footer">
                            <button onClick={() => editTodo(todo.todo_id)} type="button" className="btn btn-warning" data-dismiss="modal">Edit</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => setDescription(todo.description)}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditTodos
