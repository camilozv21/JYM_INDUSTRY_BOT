import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>J&M Industry Bot</h1>
        <p className={styles.subtitle}>
          Bienvenido a la nueva generación de automatización y gestión inteligente. 
          <br />
          Optimiza tus procesos y toma el control.
        </p>
        
        <div className={styles.buttonGroup}>
          {/* <Link href="/login" className={styles.buttonPrimary}>
            Acceder
          </Link> */}
          <Link href="/" className={styles.buttonSecondary}>
            Saber más
          </Link>
        </div>

        <footer className={styles.footer}>
          © {new Date().getFullYear()} J&M Industry, LLC
        </footer>
      </div>
    </main>
  );
}
