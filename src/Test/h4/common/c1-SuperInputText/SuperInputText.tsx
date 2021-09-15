import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from 'react'
import s from './SuperInputText.module.css'
import SearchIcon from '@material-ui/icons/Search';
import {Button, IconButton, InputBase, Paper} from '@material-ui/core';

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputTextPropsType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
    onSearch?: () => void
}

const SuperInputText: React.FC<SuperInputTextPropsType> = (
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName, onSearch,

        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange // если есть пропс onChange
        && onChange(e) // то передать ему е (поскольку onChange не обязателен)

        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        onEnter // если есть пропс onEnter
        && e.key === 'Enter' // и если нажата кнопка Enter
        && onEnter() // то вызвать его
    }

    const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ''}`
    const finalInputClassName = `${s.input} ${error ? s.errorInput : s.superInput} ${className}` // need to fix with (?:) and s.superInput

    return (
        // <>
        //     <input
        //         type={'text'}
        //         onChange={onChangeCallback}
        //         onKeyPress={onKeyPressCallback}
        //         className={finalInputClassName}
        //
        //         {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
        //     />
        //     {error && <span className={finalSpanClassName}>{error}</span>}
        // </>
        <Paper component="form" className={s.search}>
            <IconButton aria-label="menu" onClick={onSearch}>
                <SearchIcon />
            </IconButton>
            <InputBase
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                placeholder="Search"
                inputProps={{ 'aria-label': 'search' }}
            />
        </Paper>
    )
}

export default SuperInputText
