import styles from './Login.module.css';
import { useState } from 'react';
import { useAuth } from './hooks/useAuth';

const RegisterComponent = ({isOpen, viewLogin}) => {
    if (isOpen === false){
        return null;
    }

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuth();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await register({
            email: email,
            username: username,
            password: password,
        });

        if (response.success) {
            console.log('Registered!');
            viewLogin();
        }
    }


    return (
        <div className={styles.loginContainer}>
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
                <button className={styles.loginButton} type="submit">Register</button>
            </form>
            <div>
                <p onClick={viewLogin}>Already have an account? Log in</p>
            </div>
        </div>
    );
}

export default RegisterComponent;