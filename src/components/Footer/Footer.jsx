import m from "./Footer.module.scss"

function Footer() {
    return (  
        <footer className={m.container}>
            <div className={m.wrapper}>
                <div className={m.textWrapper}>
                <span className={m.span}>Prod by:</span>
                <h3 className={m.title}>WPPay</h3>
                </div>
            </div>
        </footer>
    );
}

export default Footer;