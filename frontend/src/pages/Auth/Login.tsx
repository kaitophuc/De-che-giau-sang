import { useState } from 'react';
import styles from './Login.module.css';
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';

const Login = () => {

    const [viewLogin, setViewLogin] = useState(true);
    const [viewRegister, setViewRegister] = useState(false);

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