import React from 'react'

const RemindersForm = ({user, setUser}) => {
  return (
    <div className="col">
      <div className="col bg-light p-5 m-5 rounded">
        <h2 className="row-1">Add New Pet:</h2>
        <form action="" className="row" onSubmit={submitHandler}>

        {errors.map((err, index) => <p className="text-white" key={index}>{err}</p>)}

            <div className="form-group">
            <label htmlFor="reminders">Name:</label>
            <input type="text" name="name" id="name" className="form-control" onChange={changeHandler}/>
            </div>

            <div className="form-group">
            <label htmlFor="birthday">Birthday:</label>
            <input type="date" name="birthday" id="birthday" className="form-control" onChange={changeHandler}/>
            </div>

            <button className="btn btn-secondary mt-3">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default RemindersForm