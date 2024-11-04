import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { useAuth } from './hooks/useAuth';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await login({
            username: username,
            password: password,
        });
        
        if (response.success) {
            console.log('Logged in!');
            navigate("/");
        }

        console.log(response);
    }

    return (
        <div className={styles.screen}>
          <div className={styles.container}>
            <h1>Login</h1>
            <form className={styles.form} onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            <div>
                Don't have an account? <Link to="/register">Register</Link>
            </div>
          </div>
        </div>
    );
};

export default Login;