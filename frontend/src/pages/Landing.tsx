import styles from './Landing.module.css';
import NavBar from '../../components/NavBar/NavBar';

const Landing = () => {
  return (
    <div className={styles.screen}>
      <NavBar />
    </div>
  )
}

export default Landing;