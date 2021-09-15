import React, {useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import {Login} from './Login/Login';
import {Register} from './Register/Register';
import {Profile} from './Profile/Profile';
import {PasswordRecovery} from './PasswordRecovery/PasswordRecovery';
import {CreateNewPassword} from './TypeNewPassword/CreateNewPassword';
import {Nav} from './Nav/Nav';
import {TestPage} from './Test/Test';
import {Error} from './Error/Error';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {LinearProgress, Table} from '@material-ui/core';
import {PasswordRecoveryConfirmation} from './PasswordRecovery/PasswordRecoveryConfirmation';
import {getMeTC} from './state/login-reducer';
import {PacksList} from './PacksList/PacksList';
import {Cards} from './Cards/Cards';
import { LearnCards } from './LearnCards/LearnCards';

function App() {
    let userId = useSelector<AppRootStateType, any>(state => state.login.user._id)
    let status = useSelector<AppRootStateType, boolean>(state => state.app.status)
    let isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    let dispatch = useDispatch()

    useEffect(() => {
        !userId && dispatch(getMeTC())
    }, []);


    return (
        <div className="App">
            <div className={'nav'}>
                {isLoggedIn ? <Nav/> : ''}
            </div>
            {status && <LinearProgress color="secondary"/>}
            <Switch>
                <Route path="/login"
                       render={() => <Login/>}/>
                <Route path="/register"
                       render={() => <Register/>}/>
                <Route path="/profile"
                       render={() => <Profile/>}/>
                <Route path="/recovery"
                       render={() => <PasswordRecovery/>}/>
                <Route path="/recoveryconfirmation"
                       render={() => <PasswordRecoveryConfirmation/>}/>
                <Route path="/newpassword/:token"
                       render={() => <CreateNewPassword/>}/>
                <Route path="/testpage"
                       render={() => <TestPage/>}/>
                <Route path="/packslist"
                       render={() => <PacksList/>}/>
                <Route path="/cards/:cardsId"
                       render={() => <Cards/>}/>
                <Route path="/learnCards/:id"
                       render={() => <LearnCards/>}/>
                {/*<Route path="/404"*/}
                {/*       render={() => <Error/>}/>*/}
                {/*<Redirect from={ '*' } to={'/404'}/>*/}
                <Redirect from={ '/' } to={'/profile'}/>
            </Switch>
        </div>
    );
}

export default App;
