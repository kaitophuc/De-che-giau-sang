import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useAuth } from "../../hooks/useAuth";

function NavBar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const signOut = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await logout();
    if (response.success) {
      console.log('Logged out!');
      navigate('/auth');
    }
    
    console.log(response);
  }

  return (
    <nav className={styles.navbar_background}>
      <ul className={styles.navbar_content}>
        <li className={styles.page}>
          <Link to="/"><div className={styles.appName}>Schedura</div></Link>
        </li>
      </ul>
      <div className={styles.page}>
        <button onClick={signOut}>
          Sign out
        </button>
      </div>
    </nav>
  );
}

export default NavBar;