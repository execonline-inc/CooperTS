import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>CooperTS</title>
        <meta name="description" content="Documentation for CooperTS by ExecOnline" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="#">CooperTS!</a>
        </h1>

        <div className={styles.grid}>
          <a href="#" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>In-depth information on CooperTS features and API</p>
          </a>

          <a href="#" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about CooperTS in an interactive course</p>
          </a>

          <a href="#" className={styles.card}>
            <h2>Examples &rarr;</h2>
            <p>Discover boilerplate example CooperTS projects</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://www.execonline.com/" target="_blank" rel="noopener noreferrer">
          Created by ExecOnline
        </a>
      </footer>
    </div>
  );
};

export default Home;
