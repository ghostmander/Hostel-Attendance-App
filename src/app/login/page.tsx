"use client"
import {useState} from 'react';
import Cookies from 'js-cookie';
import "./login.scss"
// import {redirect} from "next/navigation";
// import {useRouter} from 'next/navigation'

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password}),
        });
        const {token, message, success, status} = await response.json();
        if (response.ok) {
            if (success) {
                Cookies.set('user', token, {SameSite: 'Strict'});
                window.location.href = "/"
            } else {
                if (status === 401) alert(message)
                else alert('Something went wrong');
            }
        } else {
            alert('Invalid username or password');
        }
    }
    return (
        <div id={"form"}>
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} placeholder="Username"
                       onChange={e => setUsername(e.target.value)}/>
                <input type="password" value={password} placeholder="Password"
                       onChange={e => setPassword(e.target.value)}/>
                <input type="submit" value="Login"/>
            </form>
        </div>
    );
}
