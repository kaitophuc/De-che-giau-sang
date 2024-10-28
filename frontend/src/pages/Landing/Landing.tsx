import styles from './Landing.module.css';
import NavBar from '../NavBar/NavBar';

const Landing = () => {
  return (
    <div className={styles.screen}>
      <NavBar />
    </div>
  )
}

export default Landing;