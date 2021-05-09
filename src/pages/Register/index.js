import React, {useState} from 'react'
import firebase from '../../config/Firebase'
import {useHistory} from 'react-router-dom'

const Register  = () => {

    const [email, setEmail] = useState ('');
    const [alamat, setAlamat] = useState ('');
    const [password, setPassword] = useState ('');
    const [fullName, setFullName] = useState ('');
    const [noTelepon, setnoTelepon] = useState ('');
    const [welcomeText, setWelcomeText] = useState("Welcome!!");
    
    let history = useHistory();


    const handleSubmit = () => {
        setWelcomeText("Selamat Datang");
        
        // console.log(data);
        firebase.auth().signInWithEmailAndPassword(email, password).then(res => history.push("/login")).catch(error => console.log("Error", error));
    }

    const onSubmit = () => {

        const data = {
            email: email,
            fullName : fullName,
        };

        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
        // simpan ke realtime database
        const userId = userCredential.user.uid;
        firebase.database().ref('users/' + userId).set(data);
        setFullName('');
        setEmail('');
        setPassword('');
        //redirect ke login 
        history.push("/");
        })
        .catch((error) => {
        console.log(error);
        // tampilkan pesan error
        });
    };
    

    return (
        <div className="container" >
            <br />
            <h4>{welcomeText} To NickPad</h4>
            <br />
            <h4>Register</h4>
            <div className="container mt-4">
            <p className="form-label mt-3  ">Nama Lengkap</p>
            <input className="form-control mt-4" placeholder="Masukkan Nama Lengkap" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <p className="form-label mt-3  ">Alamat</p>
            <input className="form-control mt-4" placeholder="Masukkan Alamat" value={alamat} onChange={(e) => setAlamat(e.target.value)} />
            <p className="form-label mt-3  ">Nomor Telepon</p>
            <input className="form-control mt-4" type="number" placeholder="Masukkan Nomor Telepon" value={noTelepon} onChange={(e) => setnoTelepon(e.target.value)} />
            <p className="form-label mt-3  ">Email</p>
            <input className="form-control mt-4" placeholder="Masukkan email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <p className="form-label mt-3 ">Password</p>
            <input className="form-control mt-4" type="password" placeholder="Masukkan password" value={password} onChange={(e) => setPassword(e.target.value)} /> 
            <br />
            <br />
            <div className="d-grid gap-2 col-4 " >
            <button type="button" onClick={onSubmit} className="btn btn-primary" >Register New User</button>
            
            </div>
        </div>
        </div>
    )
}

export default Register 
