import '../assets/home.css'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage, db } from '../firebase';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {

    const [err, setErr] = useState(false)

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
    
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
        
            const storageRef = ref(storage, 'user_photos/' + email + '_' + file.name);
        
            const uploadTask = uploadBytesResumable(storageRef, file);
        
            uploadTask.on(
                'state_changed',
                (snapshot) => {
    
                },
                (error) => {
                    console.error("Error uploading file:", error);
                    setErr(true);
                },
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        await setDoc(doc(db, "users", res.user.uid), {
                            displayName,
                            uid: res.user.uid,
                            email,
                            photoURL: downloadURL,
                        });

                        await setDoc(doc(db, "userChats", res.user.uid), {});

                        navigate("/")
                    } catch (error) {
                        console.error("Error getting download URL:", error);
                        setErr(true);
                    }
                }
            );
        } catch (error) {
            console.error("Error creating user:", error);
            setErr(true);
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
                        <legend className="Title">Register</legend>
                        <input type="text" placeholder="Display Name" />
                        <input type="email" placeholder="email" />
                        <input type="password" placeholder="password" />
                        <input type="file" />
                        {err && <span>Something Went Wrong</span>}
                        <input type='submit' value="Sign Up" className="button" />
                        <p>Do you have an account? <Link className='links' to="/login">Login</Link></p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register