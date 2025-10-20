import styles from './Header.module.css';

function Header() {
    return(
        <header className={styles['header']}>
            <h1>RSVP Event Gate</h1>
        </header>
    )
}

export default Header;