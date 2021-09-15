import React, {ReactElement, useEffect} from "react";
import style from "./Modal.module.css"

interface ModalProps {
    title: string
    content: ReactElement | string
    footer: ReactElement | string
    onClose: () => void
    show: boolean
}

export const Modal = ({
                          title = '',
                          content = '',
                          footer = '',
                          onClose,
    show
                      }: ModalProps) => {

    if (!show) return null;

    return (
        <React.Fragment>
            <div className={style.modal} onClick={onClose}>
                <div className={style.modalDialog} onClick={e => e.stopPropagation()}>
                    <div className={style.modalHeader}>
                        <h3 className={style.modalTitle}>{title}</h3>
                    </div>
                    <div className={style.modalBody}>
                        <div className={style.modalContent}>{content}</div>
                    </div>
                    {footer && <div className={style.modalFooter}>{footer}</div>}
                </div>
            </div>
        </React.Fragment>
    )
}