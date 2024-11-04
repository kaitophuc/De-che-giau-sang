import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import styles from './Login.module.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await register({
            email: email,
            username: username,
            password: password,
        });

        if (response.success) {
            console.log('Registered!');
            navigate("/login");
        }
    }

    return (
        <div className={styles.screen}>
          <div className={styles.container}>
            <h1>Register</h1>
            <form className={styles.form} onSubmit={handleRegister}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
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
                <button type="submit">Register</button>
            </form>
            <div>
                Already have an account? <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
    );
};

export default Register;