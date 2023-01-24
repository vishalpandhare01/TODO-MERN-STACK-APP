import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import axios from "axios"
import { useNavigate } from "react-router-dom"

const App = () => {
   const navigate = useNavigate();
   const [Title, setTitle] = useState("")
   const [Description, setDescription] = useState("")
   const [status, setStatus] = useState("")
   const [taskList, setTaskList] = useState([])
   const [taskId, setTaskId] = useState("")

   const dragItem = useRef();
   const dragOverItem = useRef();


   const editTask = (event) => {
      event.preventDefault()
      axios.put(`http://localhost:8000/${taskId}`, { Title, Description, status })
         .then((res) => {
            alert(res.data.message)
            navigate("/")
         }).catch((err) => {
            console.log(err)
            alert(err.message)
         })
   }

   const deleteTask = (event) => {
      event.preventDefault()
      axios.delete(`http://localhost:8000/${taskId}`)
         .then((res) => {
            alert(res.data.message)
            navigate("/")
         }).catch((err) => {
            console.log(err)
            alert(err.message)
         })
   }

   useEffect(() => {
      axios.get("http://localhost:8000").then((res) => {
         setTaskList(res.data.data)
      }).catch((err) => {
         alert(err.response.data.message + " Error")
      })
   }, [])

   const addTask = (event) => {
      event.preventDefault()
      axios.post("http://localhost:8000", { Title, Description, status })
         .then((res) => {
            alert(res.data.message)
            navigate("/")
         }).catch((err) => {
            alert(err.message)
         })
   }

   const dragStart = (e, position) => {
      dragItem.current = position;
   };

   const dragEnter = (e, position) => {
      dragOverItem.current = position;
   };

   const drop = (e) => {
      const copyListItems = [...taskList];
      const dragItemContent = copyListItems[dragItem.current];
      copyListItems.splice(dragItem.current, 1);
      copyListItems.splice(dragOverItem.current, 0, dragItemContent);
      dragItem.current = null;
      dragOverItem.current = null;
      setTaskList(copyListItems);
   };
   return (
      <>
         <div className='container'>
            <div>
               <form onSubmit={addTask}>
                  <h1>TODO LIST</h1>
                  <input className='form-control' placeholder='Title' onChange={(e) => setTitle(e.target.value)} required />
                  <input className='form-control' placeholder='Discription' onChange={(e) => setDescription(e.target.value)} required />
                  <select className='form-control' id="inputGroupSelect01" onChange={(e) => setStatus(e.target.value)} defaultValue={status} required>
                     <option selected>...Choose</option>
                     <option value="Open">Open</option>
                     <option value="In-Progress">In-Progress</option>
                     <option value="Completed">Completed</option>
                  </select>
                  <input className='btn btn-dark m-2' type="submit" />
               </form>
            </div>
            <br />
            <table>
               <tbody>
                  <tr>
                     <th>No.</th>
                     <th>Title</th>
                     <th>Description</th>
                     <th>status</th>
                     <th>Edit/Delete</th>
                  </tr>
                  {
                     taskList.map((i, index) => {
                        return (
                           <tr
                              key={index} draggable
                              onDragStart={(e) => dragStart(e, index)}
                              onDragEnter={(e) => dragEnter(e, index)}
                              onDragEnd={drop}
                           >
                              <td>{index + 1}</td>
                              <td>{i.Title}</td>
                              <td> {i.Description}</td>
                              <td>{i.status}</td>

                              <td><button type="button" className="btn btn-outline-success"
                                 onClick={(() => setTaskId(i._id))}
                                 data-toggle="modal" data-target="#exampleModalCenter">Edit</button>

                                 <button
                                    type="button" className="btn btn-outline-dark ml-2" data-toggle="modal" data-target="#exampleModalCenter2"
                                    onClick={((e) => { setTaskId(i._id) })}>Delete</button></td>
                           </tr>
                        )
                     })
                  }
               </tbody>
            </table>

            <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
               <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                     <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalCenterTitle">Edit Your Task</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                           <span aria-hidden="true">&times;</span>
                        </button>
                     </div>
                     <div className="modal-body">
                        <form onSubmit={editTask}>
                           <input className='form-control' placeholder='Title' onChange={(e) => setTitle(e.target.value)} required />
                           <input className='form-control' placeholder='Discription' onChange={(e) => setDescription(e.target.value)} required />
                           <select className='form-control' id="inputGroupSelect01" onChange={(e) => setStatus(e.target.value)} defaultValue={status} required>
                              <option selected>...Choose</option>
                              <option value="Open">Open</option>
                              <option value="In-Progress">In-Progress</option>
                              <option value="Completed">Completed</option>
                           </select>
                           <button type="submit" className="btn btn-dark m-2">Save changes</button>
                        </form>
                     </div>
                     <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                     </div>
                  </div>
               </div>
            </div>

            <div className="modal fade" id="exampleModalCenter2" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
               <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                     <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalCenterTitle">Delete Your Task</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                           <span aria-hidden="true">&times;</span>
                        </button>
                     </div>
                     <div className="modal-body">
                        Do You waant to Delete
                     </div>
                     <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={deleteTask} >Yes</button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
};
export default App;