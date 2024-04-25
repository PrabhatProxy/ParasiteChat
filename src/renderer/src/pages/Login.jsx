import '../assets/home.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [err, setErr] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        console.log(email);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (error) {
            console.error("Error signing in:", error);
            setErr(true);
            setErrorMessage(error.message); // Store the error message in state
        }
    };

    return (
        <>
            <div className="formContainer">
                <div className="formWrapper">
                    <div className='ttle'>
                        <span className="logo">Parasite</span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <legend className="Title">Login</legend>
                        <input type="email" placeholder="email" />
                        <input type="password" placeholder="password" />
                        {err && <span>{errorMessage}</span>}
                        <input type='submit' value="Login" className="button" />
                        <p>Don't have an account? <Link className='links' to="/register">Register</Link></p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
