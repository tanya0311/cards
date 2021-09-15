import React from "react"
import s from "./Pagination.module.css"
import Pagination from "@material-ui/lab/Pagination/Pagination"

type PropsType = {
	page: number | undefined
	onPageChanged: (page: number) => void
	pageCount: number
	totalItemsCount: number
	portionSize?: number
}

export const Paginator = ({
	page,
	onPageChanged,
	pageCount,
	totalItemsCount,
}: PropsType) => {
	let pagesCount = Math.ceil(totalItemsCount / pageCount)
	const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
		onPageChanged && onPageChanged(value)
	}
	return ( 
	<div className={s.pagiator}>
		<Pagination count={pagesCount}
			page={page}
			onChange={handleChange} showFirstButton showLastButton
			variant='outlined'
				color='primary'
			/>
			</div>
	)
}
