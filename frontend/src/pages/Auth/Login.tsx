import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';
import { AuthContext } from './context/AuthContext';

const Login = () => {

    const [viewLogin, setViewLogin] = useState(true);
    const [viewRegister, setViewRegister] = useState(false);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

    const viewRegisterComponent = () => {
        setViewLogin(false);
        setViewRegister(true);
    };

    const viewLoginComponent = () => {
        setViewLogin(true);
        setViewRegister(false);
    };

    return (
        <div className={styles.screen}>

            <div className={styles.login_left}>
                <div className={styles.textContainer}>
                    <h1>Calendar</h1>
                    <p>Manage your life with our productivity app</p>
                </div>
            </div>

            <div className={styles.login_right}> 
                <LoginComponent isOpen={viewLogin} viewRegister={viewRegisterComponent}/>
                <RegisterComponent isOpen={viewRegister} viewLogin={viewLoginComponent}/>
            </div>
        </div>
    );
};

export default Login;