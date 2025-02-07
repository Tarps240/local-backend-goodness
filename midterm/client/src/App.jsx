import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {

  const [data, setData] = useState()
  const [flag, setFlag] = useState(false)
  const [edit, setEdit] = useState({
    todo: ""
  })
  const [render, setRender] = useState(false)
  const [editItemId, setEditItemId] = useState(null);


  const [newToDo, setNewToDo] = useState(
    {
      todo: "",
      created: Date.now()
    }
  )



  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3000/gettodos"
    })
      .then(res => {
        setData(res.data)

      })
      .catch(err => console.log("err", err))

  }, [flag, render])

  const handleNewToDo = (e) => {


    setNewToDo((prev) => ({
      ...prev,
      todo: e.target.value
    }))


  }
  const handleSubmit = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: "http://localhost:3000/create",
      data: newToDo

    })
      .then(res => {
        console.log("res", res)
        setNewToDo((prev) => ({
          ...prev,
          todo: ""
        }))
        setFlag(!flag)
      })
      .catch(err => console.log(err))

  }

  const handleDelete = (e) => {


    axios({
      method: "delete",
      url: `http://localhost:3000/delete/${e.target.id}`
    })
      .then(res => {
        setData((prev) => prev.filter((item) => item._id != res.data._id))
      })
      .catch(err => console.log(err))
  }

  const handleEdit = (e) => {
    setRender(!render)
    setEditItemId(e.target.id);
  }

  const handleEditSubmit = (e) => {
    axios({
      method: "put",
      url: `http://localhost:3000/edit/${e.target.id}`,
      data: edit
    })
      .then(res => {
        console.log("$$$$$$$$", res)
        setData((prev) => {
          return prev.map((item) => {
            if (item._id == res.data._id) {
              item.todo = res.data.todo
            }
            return item 
      })
    })
    setRender(!render)
  })
  .catch(err => console.log(err))
}

  const handleEditChange = (e) => {
    setEdit({ todo: e.target.value })
  }

  return (
    <div className="app-container">
      <header>
      <h1>midterm madness</h1>
      </header>
      <section className="new-todo">
        <form onSubmit={handleSubmit}>
          <input
            className="todo-input"
            type="text"
            placeholder="Enter a new todo"
            value={newToDo.todo}
            onChange={handleNewToDo}
          />
          <button className="btn primary" type="submit">
            Add Todo
          </button>
        </form>
      </section>

      <section className="todo-list">
        {data &&
          data
            .sort((a, b) => b.created - a.created)
            .map((item) => (
              <div key={item._id} className="todo-item">
                <div className="todo-content">
                  {render && editItemId === item._id ? (
                    <div className="edit-section">
                      <input
                        className="todo-input"
                        defaultValue={item.todo || ""}
                        id={item._id}
                        onChange={handleEditChange}
                      />
                      <button
                        id={item._id}
                        className="btn secondary"
                        onClick={handleEditSubmit}
                      >
                        Save
                      </button>
                      </div>
                  ) : (
                    <p className="todo-text">{item.todo}</p>
                  )}
                </div>
                <div className="todo-actions">
                  <button
                    id={item._id}
                    className="btn danger"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                  <button
                    id={item._id}
                    className="btn edit"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
            </section>
            </div> 
  );
}

export default App;