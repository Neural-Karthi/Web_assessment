import React from 'react'
import { useState } from 'react';
import axios from "axios";
function Curd_operation() {
    const [username,setusername]=useState('')
    const [emailid,setemail]=useState('')
    const [option,setoption]=useState('')
    const [result,setresult]=useState('')
    const backend_url="http://localhost:3001"
    const [users, setUsers] = useState([]);
    //Function for clearing the pervious data
    const funcancel=()=>{
      setusername('')
      setemail('')
      setoption('')
      setresult('')
      setUsers([])
    }
    //Fuction for curd oprations Insert,Delete,Update and Display
    const submitdata=async(e)=>{
      try {
        //Insert
        if (option === 'insert') {
            //Regular expression for Email format check
            const reg = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
            if (username.length > 0 && emailid.length > 0) {
              if (reg.test(emailid)) {
                try {
                  const response = await axios.post(backend_url + "/insert", {
                    userDetails: username,
                    userEmailID: emailid
                  });
                  setresult(response.data);
                } catch (error) {
                    setresult("An error occurred while inserting data");
                }
              } else {
                setresult("Please enter a valid Email ID");
              }
            } else {
                setresult("Please enter the Username and Email ID");
            }
          }
          
        //Delete
        else if(option==='Delete'){
           const response = await axios.post(backend_url+"/Delete", {
             userEmailID:emailid
          });
          setresult(response.data)
        }
        //Update
        else if(option==='Update'){
          const response = await axios.put(backend_url+"/update", {
             userDetails:username,
             userEmailID:emailid
          });
          setresult(response.data)
        }
        //Display
        else if(option==='Display'){
          const response = await axios.get(backend_url+"/Display", {});
          setUsers(response.data);
        }
        else{
          setresult("Please select option")
        }
      } catch (error) { 
        console.error("Error submitting form:", error);
      }
    }
   
    return (
      <div className="App">
        <div className="max-w-2xl h-96 border rounded-3xl mx-auto mt-48">
            <h1 className='text-2xl font-bold text-center p-4 mt-10 mb-4'>REGISTRATION FORM</h1>
          <table className='mx-auto'>
            {/* Input for UserName */}
            <tr>
              <td className='w-36 py-2'><label className='text-lg font-semibold '>USERNAME</label></td>
              <td><input type='text' name='username' onChange={e=>{setusername(e.target.value)}} value={username} className="border-solid bg-gray-200 rounded-lg h-10 w-72 mx-4" /></td>
            </tr>
            {/* Input for Email ID */}
            <tr>
              <td  className='w-36 py-2'> <label className='text-lg font-semibold '>EMAIL ID</label></td>
              <td> <input type='text' name='emailID' onChange={e=>{setemail(e.target.value)}} value={emailid} className="border-solid bg-gray-200 rounded-lg h-10 w-72 mx-4" /></td>
            </tr>
            {/* Input as Radio option for select type of CURD operation */}
            <tr>
              <td  className='w-36 py-2'> <label className='text-lg font-semibold '>SELECT OPTION </label></td>
              <td><div className="items-center text-center space-x-4 flex ml-4">
                  <input type='radio' name='option' onChange={e=>setoption(e.target.value)}   checked={option === "insert"}  value="insert"/>&nbsp;Insert
                  <input type='radio' name='option' onChange={e=>setoption(e.target.value)}   checked={option === "Delete"} value="Delete"/>&nbsp;Delete 
                  <input type='radio' name='option' onChange={e=>setoption(e.target.value)}   checked={option === "Update"} value="Update"/>&nbsp;Update 
                  <input type='radio' name='option' onChange={e=>setoption(e.target.value)}   checked={option === "Display"} value="Display"/>&nbsp;Display 
                </div></td>
            </tr>
            <tr>
              <td  className='w-36 py-2'><button className="bg-red-500 w-24 p-1 font-semibold rounded-md text-white hover:text-black cursor-pointer" onClick={funcancel}>Cancel</button></td> 
              <td className="text-right"><button className="bg-green-500 w-24 p-1 font-semibold rounded-md text-white hover:text-black cursor-pointer mx-4" onClick={submitdata}>Submit</button></td>
            </tr>
          </table>
          <div className="mx-auto text-center mt-4">
            <p className='text-green-600 font-semibold'>{result}</p>
          </div>
        </div>
       {/* Mapper fuction for displaying the All the details from database when user select the radio option as Display and Submit */}
       <div className='text-center mt-6'>
        {
          users.length>0 && (
            <table class="border w-3/6 mx-auto" >
                <thead>
                  <tr>
                     <th className='w-72 h-14 bg-gray-400 text-white font-sans'>Username</th>
                     <th className='w-72 h-14 bg-gray-400 text-white font-sans'>Email ID</th>
                     <th className='w-72 h-14 bg-gray-400 text-white font-sans'>Registraion Date</th>
                  </tr>
               </thead>
               <tbody>
                 {users.map((user, index) => (
                     <tr key={user._id}>
                        <td className='w-72 h-14 font-medium' >{user.username ? user.username : "N/A"}</td>
                        <td className='w-72 h-14 font-medium'>{user.EmailID ? user.EmailID : "N/A"}</td>
                        <td className='w-72 h-14 font-medium'>{user.RegDate ? user.RegDate : "N/A"}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
          )
        }
       </div>
      </div>
    );
}

export default Curd_operation
