
function Footer() {
    const date: Date = new Date();

    return(
        <footer>
            <ul>
                <li>{date.getFullYear()}</li>
                <li>RSVP Event Gate</li>
            </ul>
        </footer>
    )
}

export default Footer;