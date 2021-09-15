import {Link} from 'react-router-dom';
import s from './Error.module.css'

export function Error() {
    return (
        <div className={s.errorBlock}>
            <div className={s.container}>
                <div className={s.errorText}>
                    404
                </div>
                <div className={s.pageNotFound}>
                    Page not found
                </div>
                <Link className={s.link} to="/login">
                    Go to Login
                </Link>
            </div>
        </div>
    )
}