import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (email.length === 0 || password.length === 0) {
            setError('Email and password are mandatory fields');
            return;
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })

        const json = await response.json();

        if(!json.success) {
            setError(json.message)
        } else {
            localStorage.setItem('token', json.data);
            navigate('/')
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    required
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br/><br/>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    required 
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br/><br/>
                <button>Login</button>
                <br/>
                {error.length > 0 && <span>{error}</span>}
            </form>
        </div>
    )
}

export default Login;