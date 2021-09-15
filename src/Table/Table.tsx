import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {Paper, TableBody, TableContainer, TableHead, TableRow, Table, IconButton} from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import {DeletePackListTC, InitialStateType, setPacksListTC, UpdatePackTC} from '../state/table-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../state/store';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';
import moment from 'moment';
import s from './Table.module.css'
import {Paginator} from '../components/Pagination/Pagination';
import SuperInputText from '../Test/h4/common/c1-SuperInputText/SuperInputText';
import {Modal} from '../Modal/Modal';
import { SortElement } from '../components/SortElement/SortElement';


export function Tables() {
    const history = useHistory();
    let dispatch = useDispatch()

    const isStatus = useSelector<AppRootStateType, boolean>(
        (state) => state.app.status
    )

    let userId = useSelector<AppRootStateType, string>(state => state.login.user._id)

    useEffect(() => {
        setInputValue('')
        setUpdatingPackId('')
        setDeletedPackId('')
        userId && dispatch(setPacksListTC({user_id: userId, pageCount}))
    }, [userId])

    const cardPacks = useSelector((state: AppRootStateType) => state.table.cardPacks)

    // const Sort = () => {
    //     userId && dispatch(setPacksListTC({sortPacks: '1updated', user_id: userId}))
    // }

    const {sortPacks} = useSelector<AppRootStateType, InitialStateType>(
        (state) => state.table
    )
    const pageCount = useSelector<AppRootStateType, number>(
        (state) => state.table.pageCount
    )
    const cardsTotalCount = useSelector<AppRootStateType, number>(
        (state) => state.table.cardPacksTotalCount
    )
    const page = useSelector<AppRootStateType, number | undefined>(
        (state) => state.table.page
    )
    const onPageChanged = useCallback(
        (page: number) => {
            userId && dispatch(setPacksListTC({user_id: userId, page, pageCount, packName: inputValue, sortPacks: sortTitle}))
        }, [page])

    const [inputValue, setInputValue] = useState<string>('')
    const inputHandler = (e: ChangeEvent<HTMLInputElement>) =>
        setInputValue(e.currentTarget.value)

    const onSearch = () => dispatch(setPacksListTC({user_id: userId, packName: inputValue, page, pageCount}))

    const [deletedPackId, setDeletedPackId] = useState('')
    const onCloseDelete = () => setDeletedPackId('')

    const [updatingPackId, setUpdatingPackId] = useState('')
    const onCloseUpdate = () => setUpdatingPackId('')

    const UpdateCardPack = (id: string) => {
        dispatch(
            UpdatePackTC(
                {cardsPack: {_id: id, name: inputValue}},
                {user_id: userId, pageCount}
            )
        )
        setInputValue('')
        setUpdatingPackId('')
    }

        //sort
        const [sortTitle, setSortTitle] = useState(sortPacks)

        const sortHandler1 = (sortTitle: string) => {
                setSortTitle(sortTitle)
                userId && dispatch(setPacksListTC({ user_id: userId, sortPacks: sortTitle}))
          
        }
        const sortHandler0 = (sortTitle: string) => {
                setSortTitle(sortTitle)
                userId && dispatch(setPacksListTC({ user_id: userId, sortPacks: sortTitle}))
           
        }
    return (
        <div className={s.tableMain}>
            <h2>My packs list</h2>
            <div className={s.search}>
                <SuperInputText
                    className={s.searchBoxInput}
                    placeholder={'Search...'}
                    onChange={inputHandler}
                    onSearch={onSearch}
                />
            </div>
            <TableContainer component={Paper} className={s.tableContainer}>
                <Table aria-label="simple table" className={s.tableContainer}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name  <SortElement sortHandler1={sortHandler1}  sortHandler0={sortHandler0} sortTitle={"name"}/></TableCell>
                            <TableCell align="center">Cards <SortElement sortHandler1={sortHandler1} sortHandler0={sortHandler0}  sortTitle={"cardsCount"}/></TableCell>
                            <TableCell align="center">Last updated <SortElement sortHandler1={sortHandler1} sortHandler0={sortHandler0}  sortTitle={"updated"}/></TableCell>
                            <TableCell align="center">Created by</TableCell>
                            <TableCell align="center"> Actions</TableCell>
                            <TableCell align="center"><span>{''}</span></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cardPacks.map((row) => {
                                const getCards = () => {
                                    history.push(`/cards/${row._id}`, row.name)
                                }
                                const getQuestions = () => {
                                    history.push(`/learnCards/${row._id}`)
                                }
                                return (
                                    <>
                                        {updatingPackId === row._id &&
                                        <Modal
                                            show={updatingPackId === row._id}
                                            title={'Enter new title'}
                                            content={<input value={inputValue} onChange={inputHandler}/>}
                                            footer={<tr key={row._id}>
                                                <Button onClick={() => UpdateCardPack(row._id)}>update</Button>
                                                <Button onClick={onCloseUpdate}>Close</Button>
                                            </tr>}
                                            onClose={() => setUpdatingPackId('')}
                                        />}
                                        {deletedPackId === row._id &&
                                        <Modal
                                            show={deletedPackId === row._id}
                                            title={'Do you want delete?'}
                                            content={`Click "yes" if you want`}
                                            footer={<tr key={row._id}>
                                                <Button
                                                    onClick={() => dispatch(DeletePackListTC(row._id, {
                                                        user_id: userId,
                                                        pageCount
                                                    }))}>Yes
                                                </Button>
                                                <Button onClick={onCloseDelete}>No</Button>
                                            </tr>}
                                            onClose={onCloseDelete}
                                        />}
                                        <TableRow>
                                            <TableCell component="th" onClick={getCards} scope="row">{row.name} </TableCell>
                                            <TableCell align="center">{row.cardsCount}</TableCell>
                                            <TableCell align="center">{moment(row.updated).format('DD.MM.YYYY')}</TableCell>
                                            <TableCell align="center">{row.user_name}</TableCell>
                                            <TableCell align="center">
                                                <Button onClick={() => setDeletedPackId(row._id)}
                                                        variant="contained"
                                                        color="secondary"
                                                        disabled={isStatus}>Delete</Button>
                                                <Button onClick={() => setUpdatingPackId(row._id)}
                                                        variant="contained"
                                                        color="primary"
                                                        disabled={isStatus}>Edit</Button>
                                                <Button
                                                    disabled={isStatus}
                                                    onClick={getQuestions}
                                                    variant="contained"
                                                    color="primary">Learn</Button>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                )
                            }
                        )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <div className={s.pagination}>
                <Paginator
                    page={page}
                    onPageChanged={onPageChanged}
                    pageCount={pageCount}
                    totalItemsCount={cardsTotalCount}
                />
            </div>
        </div>
    );
}