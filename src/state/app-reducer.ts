
export type setErrorACType = ReturnType<typeof setErrorAC>
export type setStatusACType = ReturnType<typeof setStatusAC>
type ActionsType = setErrorACType | setStatusACType

type initialStateType = {
    status: boolean
    error?: string | null
    isInitialized: boolean
}

const initialState = {
    status: false,
    error: null,
    isInitialized: false
}

export const appReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'APP/SET-ERROR':
            return {
                ...state,
                error: action.error
            }
        case 'APP/SET-STATUS':
            return {
                ...state,
                status: action.status
            }
        default:
            return state
    }
}

export const setStatusAC = (status: boolean) => ({type: 'APP/SET-STATUS', status} as const)
export const setErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
