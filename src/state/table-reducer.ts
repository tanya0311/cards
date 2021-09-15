import {CardPackType, CardType, CreateParamsType, GetPackParams, tableAPI, UpdateParamsType} from '../dal/api'
import { AppRootStateType } from "./store"
import { Dispatch } from "redux"
import { setStatusAC } from "./app-reducer"

const InitialState = {
	cardPacks: [] as CardPackType[],
	cardPacksTotalCount: 14,
	maxCardsCount: 103,
	minCardsCount: 0,
	page: 1 as number | undefined,
	pageCount: 6,
	token: "",
	tokenDeathTime: 0,
	sortPacks: "" as string | undefined,
	packName: "" as string | undefined,
	minParam: 0,
	maxParam: 103,
	user_id: undefined,
	// user_id: ''
}


export type InitialStateType = typeof InitialState

export const tableReducer = (
	state: InitialStateType = InitialState,
	action: ActionsTableType
): InitialStateType => {
	switch (action.type) {
		case "SET_PACKS": {
			return { ...action.data }
		}
		case "SET_PAGE": {
			return { ...state, page: action.page }
		}
		case "SET_PACKS_TOTAL_COUNT": {
			return { ...state, cardPacksTotalCount: action.count }
		}
		case "SET_PACK_NAME":
			return { ...state, packName: action.packName }
		case "SET_SORT":
			return { ...state, sortPacks: action.sortPacks }

		default:
			return state
	}
}

//action
const setPacksListAC = (data: InitialStateType) =>
	({ type: "SET_PACKS", data } as const)

//pagination action
export const setPageAC = (page: number | undefined) =>
	({ type: "SET_PAGE", page } as const)
export const setPacksTotalCountAC = (count: number) =>
	({ type: "SET_PACKS_TOTAL_COUNT", count } as const)
export const setSearch = (packName: string | undefined) =>
	({
		type: "SET_PACK_NAME",
		packName,
	} as const)

export const setSortAC = (sortPacks: string | undefined) =>
	({
		type: "SET_SORT",
		sortPacks,
	} as const)

// type action
export type SetPacksListAT = ReturnType<typeof setPacksListAC>
export type SetPageACT = ReturnType<typeof setPageAC>
export type setPacksTotalCountACT = ReturnType<typeof setPacksTotalCountAC>
export type setSearchACT = ReturnType<typeof setSearch>
export type setSortACT = ReturnType<typeof setSortAC>

export type ActionsTableType =
	| SetPacksListAT
	| SetPageACT
	| setPacksTotalCountACT
	| setSearchACT
	| setSortACT

// thunk

export const setPacksListTC =
	(params: GetPackParams = {}) =>
	(dispatch: Dispatch, getState: () => AppRootStateType) => {
		const tablesReducer = getState().table
		const cardsParamsModel: GetPackParams = {
			packName: tablesReducer.packName,
			min: tablesReducer.minParam,
			max: tablesReducer.maxParam,
			sortPacks: tablesReducer.sortPacks,
			page: tablesReducer.page,
			pageCount: tablesReducer.pageCount,
			user_id: tablesReducer.user_id,
			...params,
		}

		dispatch(setPageAC(params.page))
		dispatch(setSearch(params.packName))
		dispatch(setSortAC(params.sortPacks))
		tableAPI.getCardsPack(cardsParamsModel).then((res) => {
			dispatch(setPacksListAC(res.data))
			dispatch(setPacksTotalCountAC(res.data.cardPacksTotalCount))
			dispatch(setStatusAC(false))
		})
	}

export const DeletePackListTC =
	(id: string, getPackParams: GetPackParams = {}) =>
	(dispatch: Dispatch) => {
		dispatch(setStatusAC(true))
		tableAPI.deleteCardsPack(id).then(() =>
			tableAPI.getCardsPack(getPackParams).then((res) => {
				dispatch(setPacksListAC(res.data))
				dispatch(setStatusAC(false))
			})
		)
	}

export const UpdatePackTC =
	(updatedData: UpdateParamsType, getPackParams: GetPackParams = {}) =>
		(dispatch: Dispatch) => {
			dispatch(setStatusAC(true))
			tableAPI.updateCardPack(updatedData).then(() =>
				tableAPI.getCardsPack(getPackParams).then((res) => {
					dispatch(setPacksListAC(res.data))
					dispatch(setStatusAC(false))
				})
			)
		}

export const CreatNewPackListTC =
	(newPackData: CreateParamsType, getPackParams: GetPackParams) =>
	(dispatch: Dispatch) => {
		dispatch(setStatusAC(true))
		tableAPI.createNewCardsPack(newPackData).then(() =>
			tableAPI.getCardsPack(getPackParams).then((res) => {
				dispatch(setPacksListAC(res.data))
				dispatch(setStatusAC(false))
			})
		)
	}
