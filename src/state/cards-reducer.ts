import { Dispatch } from "redux"
import {
	cardsAPI,
	CardType,
	CreateCardParamsType,
	GetCardsParams,
	LearnAPI,
	UpdatedCardDataParamsType,
} from "../dal/api"
import { setStatusAC } from "./app-reducer"

//types
export type initialStateCardsType = typeof initialState
export type GetCardsActionType = ReturnType<typeof getCardsAC>
export type CreateCardActionType = ReturnType<typeof addCardAC>
export type SendUpdatedGradeACType = ReturnType<typeof sendUpdatedGradeAC>
export type SetCardsPageACT = ReturnType<typeof setCardsPageAC>
export type setCardsTotalCountACT = ReturnType<typeof setCardsTotalCountAC>
export type setSortACT = ReturnType<typeof setSortCardsAC>
export type ActionsCardsType =
	| GetCardsActionType
	| CreateCardActionType
	| SendUpdatedGradeACType
	| SetCardsPageACT
	| setCardsTotalCountACT
	| setSortACT

const initialState = {
	cards: [] as CardType[],
	cardsTotalCount: 0,
	maxGrade: 5,
	minGrade: 0,
	page: 1 as number | undefined,
	pageCount: 9,
	packUserId: "",
	sortCards: "" as string | undefined,
}

//reducer
export const cardsReducer = (
	state: initialStateCardsType = initialState,
	action: ActionsCardsType
): initialStateCardsType => {
	switch (action.type) {
		case "GET_CARDS": {
			return { ...action.cards }
		}
		case "CREATE_NEW_CARD": {
			let newState = state
			newState.cards.push(action.card)
			return { ...newState }
		}
		case "SEND_UPDATE_GRADE": {
			return { ...state }
		}
		case "SET_CARDS_PAGE": {
			return { ...state, page: action.page }
		}
		case "SET_SORT_CARDS":
			return { ...state, sortCards: action.sortCards }
		case "SET_CARDS_TOTAL_COUNT":
			return { ...state, cardsTotalCount: action.count }
		default:
			return state
	}
}

//actions
const getCardsAC = (cards: initialStateCardsType) =>
	({ type: "GET_CARDS", cards } as const)
const addCardAC = (card: CardType) =>
	({ type: "CREATE_NEW_CARD", card } as const)
const sendUpdatedGradeAC = (grade: number, card_id: string) =>
	({ type: "SEND_UPDATE_GRADE", grade, card_id } as const)
export const setCardsPageAC = (page: number | undefined) =>
    ({type: "SET_CARDS_PAGE", page} as const)
export const setCardsTotalCountAC = (count: number) =>
	({ type: "SET_CARDS_TOTAL_COUNT", count } as const)
export const setSortCardsAC = (sortCards: string | undefined) =>
	({
		type: "SET_SORT_CARDS",
		sortCards,
	} as const)

//thunks
export const getCardsTC =
	(getParams: GetCardsParams) => (dispatch: Dispatch) => {
		dispatch(setStatusAC(true))
		dispatch(setCardsPageAC(getParams.page))
		dispatch(setSortCardsAC(getParams.sortCards))
		cardsAPI.getCardsCard(getParams).then((res) => {
			dispatch(getCardsAC(res.data))
			debugger
			dispatch(setCardsTotalCountAC(res.data.cardsTotalCount))
			dispatch(setStatusAC(false))
		})
	}

export const createCardTC =
	(createData: CreateCardParamsType, getParams: GetCardsParams) =>
	(dispatch: Dispatch) => {
		dispatch(setStatusAC(true))
		cardsAPI
			.createNewCardsCard(createData)
			.then((res) => {
				dispatch(addCardAC(res.data))
				dispatch(setStatusAC(false))
			})
			.then(() =>
				cardsAPI.getCardsCard(getParams).then((res) => {
					dispatch(getCardsAC(res.data))
				})
			)
	}

export const removeCardTC =
	(id: string, cardsPack_id: string) => (dispatch: Dispatch) => {
		dispatch(setStatusAC(true))
		cardsAPI.deleteCardsCard(id).then(() =>
			cardsAPI.getCardsCard({ cardsPack_id }).then((res) => {
				dispatch(getCardsAC(res.data))
				dispatch(setStatusAC(false))
			})
		)
	}

export const updateCardTC =
	(updatedData: UpdatedCardDataParamsType, cardsPack_id: string) =>
	(dispatch: Dispatch) => {
		dispatch(setStatusAC(true))
		cardsAPI.updateCardsCard(updatedData).then(() =>
			cardsAPI.getCardsCard({ cardsPack_id }).then((res) => {
				dispatch(getCardsAC(res.data))
				dispatch(setStatusAC(false))
			})
		)
	}

export const sendUpdatedGradeTC =
	(grade: number, card_id: string) => (dispatch: Dispatch) => {
		LearnAPI.sendUpdatedGrade(grade, card_id).then((res) => {})
	}
