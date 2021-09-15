import {useDispatch, useSelector} from 'react-redux'
import React, {ChangeEvent, useCallback, useEffect, useState} from 'react'
import {AppRootStateType} from '../state/store'
import Button from '@material-ui/core/Button'
import {
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow, TextField,
} from '@material-ui/core'
import TableCell from '@material-ui/core/TableCell'
import {
    CreatNewPackListTC,
    DeletePackListTC, InitialStateType,
    setPacksListTC,
    UpdatePackTC,
} from '../state/table-reducer'
import {Redirect, useHistory} from 'react-router-dom'
import s from './PacksList.module.css'
import {Paginator} from '../components/Pagination/Pagination'
import SuperInputText from '../Test/h4/common/c1-SuperInputText/SuperInputText'
import moment from 'moment'
import SuperDoubleRange from '../Test/h11/common/c8-SuperDoubleRange/SuperDoubleRange'
import {SortElement} from '../components/SortElement/SortElement'
import {Modal} from '../Modal/Modal';
import {ToggleButton, ToggleButtonGroup} from '@material-ui/lab';
import {UserType} from '../state/login-reducer';
import SearchIcon from '@material-ui/icons/Search';


export function PacksList() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [filter, setFilter] = useState('all')

    const isStatus = useSelector<AppRootStateType, boolean>(
        (state) => state.app.status
    )

    useEffect(() => {
        dispatch(
            setPacksListTC({
                page,
                pageCount,
                min: value1,
                max: value2,
                sortPacks
            })
        )
    }, [])

    const isLoginIn = useSelector<AppRootStateType, boolean>(
        (state) => state.login.isLoggedIn
    )

    const profile = useSelector<AppRootStateType, UserType>(
        (state) => state.login.user
    )

    let {cardPacks, page, pageCount, cardPacksTotalCount, sortPacks} =
        useSelector<AppRootStateType, InitialStateType>((state: AppRootStateType) => state.table)

    const onPageChanged = useCallback(
        (page: number) => {
            if (filter === 'my') {
                profile._id &&
                dispatch(
                    setPacksListTC({
                        user_id: profile._id,
                        page,
                        pageCount,
                        packName: inputValue,
                        min: value1,
                        max: value2,
                        sortPacks: sortTitle,
                    })
                )
            } else {
                dispatch(
                    setPacksListTC({
                        page,
                        pageCount,
                        packName: inputValue,
                        min: value1,
                        max: value2,
                        sortPacks: sortTitle,
                    })
                )
            } //что бы менялась страница по клику при запросе на сервер
        },
        [page]
    )

    //search
    const [inputValue, setInputValue] = useState<string>('')
    const inputHandler = (e: ChangeEvent<HTMLInputElement>) =>
        setInputValue(e.currentTarget.value)

    const onSearch = () => dispatch(setPacksListTC({packName: inputValue}))

    const CreateNewPackList = () => {
        dispatch(
            CreatNewPackListTC(
                {cardsPack: {name: title, path: profile.name}},
                {pageCount}
            )
        )
        setTitle('')
        setCreate(false)
    }

    const UpdateCardPack = (id: string) => {
        dispatch(
            UpdatePackTC(
                {cardsPack: {_id: id, name: title}},
                {pageCount}
            )
        )
        setTitle('')
        setUpdatingPackId('')
    }

    //filter
    const onClickSetMyFilter = () => {
        setFilter('my')
        profile._id && dispatch(setPacksListTC({user_id: profile._id}))
    }

    const onClickSetAllFilter = () => {
        setFilter('all')
        dispatch(setPacksListTC())
    }

    //sort
    const [sortTitle, setSortTitle] = useState(sortPacks)

    const sortHandler1 = (sortTitle: string) => {
        if (filter === 'my') {
            setSortTitle(sortTitle)
            profile._id &&
            dispatch(
                setPacksListTC({user_id: profile._id, sortPacks: sortTitle})
            )
        } else {
            setSortTitle(sortTitle)
            profile._id && dispatch(setPacksListTC({sortPacks: sortTitle}))
        }
    }
    const sortHandler0 = (sortTitle: string) => {
        if (filter === 'my') {
            setSortTitle(sortTitle)
            profile._id &&
            dispatch(
                setPacksListTC({user_id: profile._id, sortPacks: sortTitle})
            )
        } else {
            setSortTitle(sortTitle)
            profile._id && dispatch(setPacksListTC({sortPacks: sortTitle}))
        }
    }

    //min - max

    const maxCardsCount = useSelector<AppRootStateType, number>(
        (state) => state.table.maxCardsCount
    )
    const minCardsCount = useSelector<AppRootStateType, number>(
        (state) => state.table.minCardsCount
    )

    const [value1, setValue1] = useState<number>(minCardsCount)
    const [value2, setValue2] = useState<number>(maxCardsCount)

    const [isCreate, setCreate] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const createTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const [updatingPackId, setUpdatingPackId] = useState('')
    const onCloseUpdate = () => setUpdatingPackId('')

    const [deletedPackId, setDeletedPackId] = useState('')
    const onCloseDelete = () => setDeletedPackId('')
    const onClose = () => setCreate(false)

    const [alignment, setAlignment] = React.useState<string | null>('right');
    const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
        setAlignment(newAlignment);
    };

    if (!isLoginIn) {
        return <Redirect to={'/login'}/>
    }


    return (
        <div
            className={s.packList}
            style={{
                margin: '0 0px',
                display: 'flex',
                flexFlow: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div className={s.packContainer}>
                <div className={s.mainPacks}>
                    <div>
                        <p>Show packs cards</p>
                        <div className={s.toggleButton}>
                            <ToggleButtonGroup onChange={handleAlignment} value={alignment} exclusive
                                               aria-label="text alignment">
                                <ToggleButton onClick={onClickSetMyFilter} className={s.toggleBnt1} value="left" aria-label="left aligned">
                                    My
                                </ToggleButton>
                                <ToggleButton onClick={onClickSetAllFilter} className={s.toggleBnt2} value="right" aria-label="right aligned">
                                    All
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                    </div>
                    <div className={s.numberOfCards}>
                        <p>Number of cards</p>
                        <SuperDoubleRange
                            value1={value1}
                            setValue1={setValue1}
                            setValue2={setValue2}
                            value2={value2}
                            max={maxCardsCount}
                            component={'packList'}
                        />
                    </div>
                </div>

                <div className={s.packTable}>
                    <h2>Packs list</h2>
                    <div className={s.searchBlock}>
                        <div className={s.search}>
                            <SuperInputText
                                className={s.searchBoxInput}
                                placeholder={'Search...'}
                                onChange={inputHandler}
                                onSearch={onSearch}
                            />
                        </div>
                        {isCreate &&
                        <Modal
                            show={true}
                            title={'Enter title'}
                            content={<TextField id="standard-basic" label="Title"
                                                value={title} onChange={createTitle}/>}
                            footer={<tr>
                                <Button onClick={CreateNewPackList}>add</Button>
                                <Button onClick={onClose}>Close</Button>
                            </tr>}
                            onClose={onClose}
                        />
                        }
                        <Button
                            onClick={() => setCreate(true)}
                            variant="contained"
                            color="primary"
                            className={s.addNewPack}
                            disabled={isStatus}
                        >
                            Add new pack
                        </Button>
                    </div>
                    <div className={s.table}>
                        <TableContainer component={Paper} className={s.tableContainer}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name <SortElement sortHandler1={sortHandler1}
                                                                     sortHandler0={sortHandler0}
                                                                     sortTitle={'name'}/></TableCell>
                                        <TableCell align="center">Cards<SortElement sortHandler1={sortHandler1}
                                                                                    sortHandler0={sortHandler0}
                                                                                    sortTitle={'cardsCount'}/></TableCell>
                                        <TableCell align="center">
                                            Last updated
                                            <SortElement sortHandler1={sortHandler1} sortHandler0={sortHandler0}
                                                         sortTitle={'updated'}/>
                                        </TableCell>
                                        <TableCell align="center">Created by</TableCell>
                                        <TableCell align="center"> Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cardPacks.map((row: any) => {
                                        const getCards = () => {
                                            history.push(`/cards/${row._id}`)
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
                                                    content={<TextField id="standard-basic" label="Title"
                                                                        value={title} onChange={createTitle}/>}
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
                                                            onClick={() => dispatch(DeletePackListTC(row._id, {pageCount}))}>Yes
                                                        </Button>
                                                        <Button onClick={onCloseDelete}>No</Button>
                                                    </tr>}
                                                    onClose={onCloseDelete}
                                                />}
                                                <TableRow key={row._id}>
                                                    <TableCell onClick={getCards} component="th" scope="row">
                                                        {row.name}{' '}
                                                    </TableCell>
                                                    <TableCell align="center">{row.cardsCount}</TableCell>
                                                    <TableCell align="center">
                                                        {moment(row.updated).format('DD.MM.YYYY')}
                                                    </TableCell>
                                                    <TableCell align="center">{row.user_name}</TableCell>
                                                    <TableCell align="center">
                                                        {row.user_id == profile._id ? (
                                                            <div>
                                                                <Button
                                                                    onClick={() => setDeletedPackId(row._id)}
                                                                    variant="contained"
                                                                    color="secondary"
                                                                    disabled={isStatus}
                                                                >
                                                                    Delete
                                                                </Button>
                                                                <Button
                                                                    disabled={isStatus}
                                                                    onClick={() => setUpdatingPackId(row._id)}
                                                                    variant="contained" color="primary">

                                                                    Edit
                                                                </Button>
                                                                <Button
                                                                    disabled={isStatus}
                                                                    onClick={getQuestions}
                                                                    variant="contained"
                                                                    color="primary"
                                                                >
                                                                    Learn
                                                                </Button>
                                                            </div>
                                                        ) : (
                                                            <Button
                                                                disabled={isStatus}
                                                                onClick={getQuestions}
                                                                variant="contained"
                                                                color="primary"
                                                            >
                                                                Learn
                                                            </Button>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            </>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div className={s.pagination}>
                        <Paginator
                            page={page}
                            onPageChanged={onPageChanged}
                            pageCount={pageCount}
                            totalItemsCount={cardPacksTotalCount}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
