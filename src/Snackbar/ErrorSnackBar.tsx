import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {useDispatch, useSelector} from 'react-redux';
import { AppRootStateType } from '../state/store';
import {setErrorAC} from '../state/app-reducer';

function Alert(props : any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export function ErrorSnackbar() {
    const error = useSelector<AppRootStateType, string | null | undefined>(state => state.app.error)
    const dispatch = useDispatch()

    const SnackClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setErrorAC(null))
    };

    const isOpen = error != null

    return (
        <div>
            <Snackbar open={isOpen} autoHideDuration={3000} onClose={SnackClose}>
                <Alert open={isOpen} onClose={SnackClose} severity="error" autoHideDuration={3000}>
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
}