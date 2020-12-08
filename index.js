const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000

//middleware
app.use(cors()); //for different ports to run together
app.use(express.json()); //to get req.body data

//app.use(express.static(path.join(__dirname, "client/build")))
//app.use(express.static("./client/build"))


if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "client/build")))
}


//ROUTES

//get all
app.get("/todos", async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM todos");
        //console.log(response)
        res.status(200).json({
            status: "success",
            data: {
                todos: response.rows
            }
        })
    } catch (err) {
        console.error(err.message)
    }
})

//get one
app.get("/todos/:id", async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM todos WHERE todo_id = $1", [req.params.id])
        res.status(200).json({
            status: "success",
            data: {
                todo: response.rows[0]
            }
        })
    } catch (err) {
        console.error(err.message)
    }
})


//create
app.post("/todos", async (req, res) => {
    try {
        const response = await pool.query("INSERT INTO todos (description) values ($1) RETURNING *", [req.body.description])
        res.status(201).json({
            status: "success",
            data: {
                todo: response.rows[0]
            }
        })
    } catch (err) {
        console.error(err.message)
    }
})


//update
app.put("/todos/:id", async (req, res) => {
    try {
        const response = await pool.query("UPDATE todos SET description = $1 WHERE todo_id = $2 RETURNING *", [req.body.description, req.params.id])
        res.status(200).json({
            status: "success",
            data: {
                todo: response.rows[0]
            }
        })
    } catch (err) {
        console.error(err.message)
    }
})

//delete
app.delete("/todos/:id", async (req, res) => {
    try {
        const response = await pool.query("DELETE FROM todos WHERE todo_id = $1", [req.params.id])
        res.status(204).json()
    } catch (err) {
        console.error(err.message)
    }
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"))
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})