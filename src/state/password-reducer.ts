import {Dispatch} from "redux";
import {setErrorAC, setStatusAC} from './app-reducer';
import {RestoreAPI} from '../dal/api';

//types
type emailIsSentACType =  ReturnType<typeof emailIsSentAC>
type ActionsType = emailIsSentACType
type InitialStateType = {
    emailIsSent: boolean
}

const initialState = {
    emailIsSent: false
}

//reducer
export const passwordRecoveryReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'APP/EMAIL-IS-SENT':
            return {
                ...state,
                emailIsSent: action.emailIsSent
            }
        default:
            return state
    }
}

//actions
export const emailIsSentAC = (emailIsSent: boolean) => ({type: 'APP/EMAIL-IS-SENT', emailIsSent})
//thunks
export const passwordRecoveryTC = (email: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC(true))
        RestoreAPI.restore(email)
            .then(() => {
                dispatch(emailIsSentAC(true))
                dispatch(setStatusAC(false))
            })
            .catch(res => {
                if(!res.error){
                    dispatch(setErrorAC('Some Error! More details in console.'))
                } else {
                    dispatch(setErrorAC(res.error))
                }
                dispatch(setStatusAC(false))
            })
    }
}

