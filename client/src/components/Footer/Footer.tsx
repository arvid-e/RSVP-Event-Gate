import styles from './Footer.module.css';

function Footer() {
    const date: Date = new Date();

    return(
        <footer className={styles['footer']}>
            <ul className={styles["info"]}>
                <li>{date.getFullYear()}</li>
                <li>RSVP Event Gate</li>
            </ul>
        </footer>
    )
}

export default Footer;