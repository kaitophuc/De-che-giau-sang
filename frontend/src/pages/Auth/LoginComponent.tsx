import styles from './Login.module.css';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

interface LoginComponentProps {
    isOpen: boolean;
    viewRegister: () => void;
}

const LoginComponent: React.FC<LoginComponentProps> = ({isOpen, viewRegister}) => {
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

    if (isOpen === false){
        return null;
    }
    

    return (
        <div className={styles.loginContainer}>
            <h1>Welcome Back!</h1>
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
                <button className={styles.loginButton} type="submit">Login</button>
            </form>
            <div>
                <p onClick={viewRegister}>Don't have an account? Register</p>
                {/* <Link></Link> */}
            </div>
        </div>
    );
}

export default LoginComponent;