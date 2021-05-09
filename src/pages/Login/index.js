import React, { useState} from 'react'
import firebase from '../../config/Firebase'
import {useHistory, NavLink} from 'react-router-dom'

const Login = ({title, angka}) =>{
    const [welcomeText, setWelcomeText] = useState("Welcome!!");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let history = useHistory();

    const handleSubmit = () => {
        setWelcomeText("Selamat Datang");
        const data = {
            email : email, 
            password : password,
        }
        // console.log(data);
        firebase.auth().signInWithEmailAndPassword(email, password).then(res => history.push("/Dashboard")).catch(error => console.log("Error", error));
    }

    return (
        //JSK
        <div className="container mt-5">
            <h3>{welcomeText}</h3>
            <h5>{title}{angka}</h5>
            <h5 className="form-label mt-5">Email</h5>
            <input className="form-control" placeholder="Masukkan Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <br />
            <h5 className="form-label mt-3">Password</h5>
            <input className="form-control" type="password" placeholder="Masukkan Password" value={password} onChange={(e) => setPassword(e.target.value)} /> 
            <br />
            <br />
            <button type="button" onClick={handleSubmit} className="btn btn-primary" >Login</button>
            <br />
            <br />
            <p> Don't have an acoount?
            <NavLink  activeClassName="active" to="/register">
                Register Now!
            </NavLink>
      </p>
        </div>
    )
}

export default Login;