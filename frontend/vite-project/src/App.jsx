import { useState } from 'react';
import './App.css';
import Form from './Form';
import axios from "axios";

function App() {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [dept, setDept] = useState('');
  const [date, setDate] = useState('');
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState({});
  const[mes , setMes] = useState("");
  const [empp, setEmpp] = useState([]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newerr = {};

    if(!fname.trim()){
      newerr.fname ="first name is required";
    }
    if(!lname.trim()){
      newerr.lname = "last name is required"
    }
    if(!id.trim()){
      newerr.id = "id is required";
    }
    else if(!/^[a-zA-Z0-9]{1,10}$/.test(id)){
      newerr.id = "it must contain alphanumeric char of max len 10"
    }

    if(!email.trim()){
      newerr.email = "email is required"
    }
    else if(!email.includes("@") || !email.includes(".") || !email.indexOf("@") > email.lastIndexOf(".")){
     newerr.email = "email should be in valid format"; 
    }

    if(!tel.trim()){
      newerr.tel = "tel field is required"
    }
    else if(!/^\d{10}$/.test(tel)){
      newerr.tel = "tel should be in valid format";
    }

    if(!dept.trim()){
      newerr.dept = "dept is required";
    }

    if(!date.trim()){
      newerr.date = "date is required";
    }
    else if(new Date(date) > new Date()){
      newerr.date = "date should not be in future";
    }

    if(!role.trim()){
      newerr.role = "role is required";
    }

    setErrors(newerr);
    if(Object.keys(newerr).length == 0){

      axios.post("http://localhost:5000/send" , {
        fname,
        lname,
        id,
        email,
        tel,
        dept,
        date,
        role
      })

      .then((res) => {
        if(res.status>=200 && res.status<300){
          setMes("User Added SuccessFully")
          setFname("");
          setLname("");
          setId("");
          setEmail("");
          setTel("");
          setDept("");
          setDate("");
          setRole("");
        }
      })
      .catch((err) => {
        console.log(err);
      })
     
    }
  };

  return (
    <>
      <Form
        fname={fname}
        setFname={setFname}
        lname={lname}
        setLname={setLname}
        id={id}
        setId={setId}
        email={email}
        setEmail={setEmail}
        tel={tel}
        setTel={setTel}
        dept={dept}
        setDept={setDept}
        date={date}
        setDate={setDate}
        role={role}
        setRole={setRole}
        errors={errors}
        handleSubmit={handleSubmit}
        mes = {mes}
      />
    </>
  );
}

export default App;
