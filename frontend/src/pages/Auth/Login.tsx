import { useState, useEffect } from 'react';
import styles from './Login.module.css';
import { useAuth } from './hooks/useAuth';

const Login = () => {
    const [username, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth(); 

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = login({
            username,
            password
        });
        console.log(response);
    }

    return (
        <div className={styles.screen}>
          <div className={styles.container}>
            <h1>Login</h1>
            <form className={styles.form} onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username Or Email"
                    value={username}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
          </div>
        </div>
    );
};

export default Login;