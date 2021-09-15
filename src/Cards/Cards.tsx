import React, {ChangeEvent, useCallback, useEffect, useState} from 'react'
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow, TextField,
} from '@material-ui/core'
import makeStyles from '@material-ui/core/styles/makeStyles'
import TableCell from '@material-ui/core/TableCell'
import {useDispatch, useSelector} from 'react-redux'
import Button from '@material-ui/core/Button'
import {AppRootStateType} from '../state/store'
import {Redirect, useHistory, useParams} from 'react-router-dom'
import {
    createCardTC,
    getCardsTC,
    initialStateCardsType,
    removeCardTC,
    updateCardTC,
} from '../state/cards-reducer'
import s from './Cards.module.css'
import moment from 'moment'
import {Modal} from '../Modal/Modal'
import {Paginator} from '../components/Pagination/Pagination'
import {SortElement} from '../components/SortElement/SortElement'
import SuperInputText from '../Test/h4/common/c1-SuperInputText/SuperInputText';
import {Rating} from '@material-ui/lab';
import {setPacksListTC} from '../state/table-reducer';

export function Cards() {
    let dispatch = useDispatch()
    const history = useHistory()
    const isStatus = useSelector<AppRootStateType, boolean>(
        (state) => state.app.status
    )
    const isLoginIn = useSelector<AppRootStateType, boolean>(
        (state) => state.login.isLoggedIn
    )
    let {cards, page, pageCount, cardsTotalCount, sortCards, packUserId} = useSelector<AppRootStateType,
        initialStateCardsType>((state) => state.cards)


    const {cardsId} = useParams<{ cardsId: string }>()

    useEffect(() => {
        dispatch(getCardsTC({cardsPack_id: cardsId, pageCount: 6, sortCards}))
        setQuestion('')
        setAnswer('')
        setUpdatingCardId('')
        setCreate(false)
    }, [dispatch, cardsId])

    const userId = useSelector<AppRootStateType, string>(
        (state) => state.login.userId
    )

    const onPageChanged = useCallback(
        (page: number) => {
            dispatch(
                getCardsTC({
                    page,
                    pageCount,
                    cardsPack_id: cardsId,
                    sortCards: sortTitle,
                })
            )
        },
        [page]
    )

    const addCardHandler = () => {
        dispatch(
            createCardTC(
                {
                    card: {
                        cardsPack_id: cardsId,
                        question: question,
                        answer: answer,
                    },
                },
                {cardsPack_id: cardsId}
            )
        )
        setQuestion('')
        setAnswer('')
        setCreate(false)
    }

    const updateCardHandler = (id: string) => {
        dispatch(
            updateCardTC(
                {
                    card: {
                        _id: id,
                        question: question,
                        answer: answer,
                    },
                },
                cardsId
            )
        )
        setQuestion('')
        setAnswer('')
        setUpdatingCardId('')
    }

    const [isCreate, setCreate] = useState<boolean>(false)
    const [question, setQuestion] = useState<string>('')
    const createQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }
    const [answer, setAnswer] = useState<string>('')
    const createAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }

    const [deletedPackId, setDeletedPackId] = useState('')
    const onCloseDelete = () => setDeletedPackId('')
    const onClose = () => setCreate(false)

    const [updatingCardId, setUpdatingCardId] = useState('')
    const onCloseUpdate = () => setUpdatingCardId('')

    //sort
    const [sortTitle, setSortTitle] = useState<string | undefined>(sortCards)

    const sortHandler1 = (sortTitle: string) => {
        setSortTitle(sortTitle)
        cardsId &&
        dispatch(getCardsTC({
            cardsPack_id: cardsId,
            sortCards: sortTitle,
            page,
            pageCount
        }))
    }

    const sortHandler0 = (sortTitle: string) => {
        setSortTitle(sortTitle)
        cardsId &&
        dispatch(getCardsTC({
            cardsPack_id: cardsId,
            sortCards: sortTitle,
            page,
            pageCount
        }))
    }

    const [inputValue, setInputValue] = useState<string>('')
    const inputHandler = (e: ChangeEvent<HTMLInputElement>) =>
        setInputValue(e.currentTarget.value)

    const onSearch = () => dispatch(getCardsTC({
        cardQuestion: inputValue,
        cardsPack_id: cardsId,
        sortCards: sortTitle,
        page,
        pageCount
    }))

    if (!isLoginIn) {
        return <Redirect to={'/login'}/>
    }
    return (
        <div className={s.cards}>
            {isCreate && (
                <Modal
                    show={isCreate}
                    title={'Enter values'}
                    content={
                        <div>
                            <div>
                                <TextField id="standard-basic" label="Question"
                                           value={question} onChange={createQuestion}/>
                            </div>
                            <div>
                                <TextField id="standard-basic" label="Answer"
                                           value={answer} onChange={createAnswer}/>
                            </div>
                        </div>
                    }
                    footer={
                        <tr>
                            <Button onClick={addCardHandler}>add</Button>
                            <Button onClick={onClose}>Close</Button>
                        </tr>
                    }
                    onClose={onClose}
                />
            )}
            <div className={s.cardsContainer}>
                <div className={s.cardsTable}>
                    <div className={s.buttons}>
                        <IconButton onClick={history.goBack} color="primary" size="medium" aria-label="upload picture"
                                    component="span">⇦</IconButton>
                        <div className={s.search}>
                            <SuperInputText
                                className={s.searchBoxInput}
                                placeholder={'Search...'}
                                onChange={inputHandler}
                                onSearch={onSearch}
                            />
                        </div>
                        <div>
                            {packUserId == userId ? (
                                <Button
                                    className={s.addCardButton}
                                    onClick={() => setCreate(true)}
                                    variant="contained"
                                    color="primary"
                                    disabled={isStatus}
                                >
                                    Add card
                                </Button>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Question</TableCell>
                                    <TableCell align="center">Answer</TableCell>
                                    <TableCell align="center">
                                        Last Updated
                                        <SortElement
                                            sortHandler1={sortHandler1}
                                            sortHandler0={sortHandler0}
                                            sortTitle={'updated'}
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        Grade
                                        <SortElement
                                            sortHandler1={sortHandler1}
                                            sortHandler0={sortHandler0}
                                            sortTitle={'grade'}
                                        />
                                    </TableCell>
                                    {packUserId == userId ? (
                                        <TableCell align="center">Actions</TableCell>
                                    ) : (
                                        ''
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cards.map((row: any) => {
                                    return (
                                        <>
                                            {updatingCardId === row._id && (
                                                <Modal
                                                    show={updatingCardId === row._id}
                                                    title={'Enter new values'}
                                                    content={
                                                        <div>
                                                            <div>
                                                                <TextField id="standard-basic" label="Question"
                                                                           value={question} onChange={createQuestion}/>
                                                            </div>
                                                            <div>
                                                                <TextField id="standard-basic" label="Answer"
                                                                           value={answer} onChange={createAnswer}/>
                                                            </div>
                                                        </div>
                                                    }
                                                    footer={
                                                        <div key={row._id}>
                                                            <Button
                                                                onClick={() => updateCardHandler(row._id)}
                                                            >
                                                                update
                                                            </Button>
                                                            <Button onClick={onCloseUpdate}>Close</Button>
                                                        </div>
                                                    }
                                                    onClose={() => setUpdatingCardId('')}
                                                />
                                            )}
                                            {deletedPackId === row._id && (
                                                <Modal
                                                    show={deletedPackId === row._id}
                                                    title={'Do you want delete?'}
                                                    content={`Click "yes" if you want`}
                                                    footer={
                                                        <tr key={row._id}>
                                                            <Button
                                                                onClick={() =>
                                                                    dispatch(
                                                                        removeCardTC(row._id, row.cardsPack_id)
                                                                    )
                                                                }
                                                            >
                                                                Yes
                                                            </Button>
                                                            <Button onClick={onCloseDelete}>No</Button>
                                                        </tr>
                                                    }
                                                    onClose={onCloseDelete}
                                                />
                                            )}
                                            <TableRow key={row._id}>
                                                <TableCell component="th" scope="row">
                                                    {row.question}{' '}
                                                </TableCell>
                                                <TableCell align="center">{row.answer}</TableCell>
                                                <TableCell align="center">
                                                    {moment(row.updated).format('DD.MM.YYYY')}
                                                </TableCell>
                                                <TableCell align="center"><Rating name="read-only" value={row.grade}
                                                                                  readOnly/></TableCell>
                                                {packUserId == userId ? (
                                                    <TableCell align="center">
                                                        <Button
                                                            onClick={() => setDeletedPackId(row._id)}
                                                            variant="contained"
                                                            color="secondary"
                                                            disabled={isStatus}
                                                        >
                                                            Delete
                                                        </Button>
                                                        <Button
                                                            onClick={() => setUpdatingCardId(row._id)}
                                                            variant="contained"
                                                            color="primary"
                                                            disabled={isStatus}
                                                        >
                                                            Edit
                                                        </Button>
                                                    </TableCell>
                                                ) : (
                                                    ''
                                                )}
                                            </TableRow>
                                        </>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Paginator
                        page={page}
                        onPageChanged={onPageChanged}
                        pageCount={pageCount}
                        totalItemsCount={cardsTotalCount}
                    />
                </div>
            </div>
        </div>
    )
}
