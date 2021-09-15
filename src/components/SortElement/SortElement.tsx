import Button from '@material-ui/core/Button';
import s from './SortElement.module.css'
import React from 'react';
import {IconButton} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../state/store';

type SortPacksPropsType = {
    sortTitle: string
    sortHandler1: (sortTitle: string) => void
    sortHandler0: (sortTitle: string) => void
}

export const SortElement = (props: SortPacksPropsType) => {
    const isStatus = useSelector<AppRootStateType, boolean>(
        (state) => state.app.status
    )

    const onSortHandler1 = () => {
        props.sortHandler1(`1${props.sortTitle}`)
    }
    const onSortHandler0 = () => {
        props.sortHandler0(`0${props.sortTitle}`)

    }
    return (
        <div className={s.sort}>
            <div>
                <IconButton disabled={isStatus} onClick={onSortHandler0} color="primary" size="small" aria-label="upload picture"
                            component="span">ᐃ</IconButton>
            </div>
            <div>
                <IconButton disabled={isStatus} onClick={onSortHandler1} color="primary" size="small" aria-label="upload picture"
                            component="span">ᐁ</IconButton>
            </div>
        </div>
    )
}