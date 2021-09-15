import s from './PasswordRecovery.module.css'
import React from "react";
import mailSent from '../common/images/mainSent.png'



export function PasswordRecoveryConfirmation() {

    return (
        <div className={s.recovery}>
            <div className={s.recoveryBlock}>
                <h1>It-incubator</h1>
                <img src={mailSent} alt=""/>
                <h2>Check your Email</h2>
                <div>We've sent you an email with further instructions</div>
            </div>
        </div>
    )
}