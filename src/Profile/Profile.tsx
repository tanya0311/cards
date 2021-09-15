import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {logoutTC, UpdateUserData, UserType} from '../state/login-reducer';
import {AppRootStateType} from '../state/store';
import s from './Profile.module.css';
import {Tables} from '../Table/Table';
import userAva from '../common/images/UserAvatar.png'
import {Button, TextField} from '@material-ui/core';
import React, {ChangeEvent, useState} from 'react';
import SuperDoubleRange from '../Test/h11/common/c8-SuperDoubleRange/SuperDoubleRange';
import {Modal} from '../Modal/Modal';

export function Profile() {
    const dispatch = useDispatch();

    let user = useSelector<AppRootStateType, UserType>(state => state.login.user)

    const isLoginIn = useSelector<AppRootStateType, boolean>(
        (state) => state.login.isLoggedIn
    );

    const logoutHandler = () => {
        dispatch(logoutTC());
    };

    const maxCardsCount = useSelector<AppRootStateType, number>(
        (state) => state.table.maxCardsCount
    )
    const minCardsCount = useSelector<AppRootStateType, number>(
        (state) => state.table.minCardsCount
    )

    const [value1, setValue1] = useState<number>(minCardsCount)
    const [value2, setValue2] = useState<number>(maxCardsCount)

    const [edit, setEdit] = useState<boolean>(false)
    const onClose = () => setEdit(false)

    const [photo, setPhoto] = useState<string | null | undefined>(user.avatar)
    const createNewPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        setPhoto(e.currentTarget.value)
    }

    const [name, setName] = useState<string>(user.name)
    const createNewName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    const CreateNewUserInfo = () => {
        dispatch(UpdateUserData({name, avatar: photo}))
        setEdit(false)
    }

    if (!isLoginIn) {
        return <Redirect to={'/login'}/>;
    }
    return (
        <div className={s.profile}>
            {edit &&
            <Modal
                show={true}
                title={'Personal information'}
                content={<div>
                    <div>
                        <div className={s.photoProfile}>
                            {!user.avatar ? <img style={{width: '200px'}} src={userAva} alt=""/> :
                                <img style={{width: '200px'}} src={user.avatar} alt=""/>}
                        </div>
                        <TextField id="standard-basic" label="Photo"
                                   value={photo} onChange={createNewPhoto}/>
                    </div>
                    <TextField id="standard-basic" label="Name"
                               value={name} onChange={createNewName}/>
                </div>}
                footer={<tr>
                    <Button onClick={CreateNewUserInfo}>Save</Button>
                    <Button onClick={onClose}>Close</Button>
                </tr>}
                onClose={onClose}
            />}
            <div className={s.profileContainer}>
                <div className={s.profileInfo}>
                    <div className={s.profileMain}>
                        <div className={s.photoProfile}>
                            {!user.avatar ? <img src={userAva} alt=""/> : <img src={user.avatar} alt=""/>}
                        </div>
                        <div>
                            <p>{user.name}</p>
                        </div>
                        <div>
                            <Button onClick={() => setEdit(true)}>
                                Edit profile
                            </Button>
                        </div>
                        <div>
                            <Button onClick={logoutHandler}>Sing out</Button>
                        </div>
                    </div>
                    <div className={s.numberOfCards}>
                        <p>Number of cards</p>
                        <div>
                            <SuperDoubleRange
                                value1={value1}
                                setValue1={setValue1}
                                setValue2={setValue2}
                                value2={value2}
                                max={maxCardsCount}
                                component={'profile'}
                            />
                        </div>
                    </div>
                </div>
                <div className={s.table}>
                    <Tables/>
                </div>

            </div>
        </div>
    );
}
