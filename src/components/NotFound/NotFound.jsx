import m from './NotFound.module.scss'

function NotFound() {
    return (  
        <div className={m.container}>
            <div className={m.wrapper}>
                <h3 className={m.title}>404</h3>
                <p className={m.text}>Страница не найдена.</p>
            </div>
        </div>
    );
}

export default NotFound;