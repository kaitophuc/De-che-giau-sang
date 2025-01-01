import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

function NavBar() {
  const signOut = async () => {
    
  }

  return (
    <nav className={styles.navbar_background}>
      <ul className={styles.navbar_content}>
        <li className={styles.page}>
          <Link to="/about">About us</Link>
        </li>
        <li className={styles.page}>
          <Link to="/contact">Contacts</Link>
        </li>
      </ul>
      <div className={styles.page}>
        {/* <Link to="/profile:id">Profile</Link> */}
        <button onClick={signOut}>
          Sign out
        </button>
      </div>
    </nav>
  );
}

export default NavBar;