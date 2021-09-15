import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from "react";
import Slider from '@material-ui/core/Slider';
import {makeStyles} from '@material-ui/core/styles';

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperRangePropsType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    onChangeRange?: (value: number) => void
    value1: number
    setValue1: (value: number) => void
};

const useStyles = makeStyles({
    root: {
        width: 300,
    },
});

const SuperRange: React.FC<SuperRangePropsType> = (
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeRange,
        className, value1, setValue1,

        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    const classes = useStyles()

    const onChangeCallback = (e: ChangeEvent<{}>, value: number | number[]) => {
        if(!Array.isArray(value)){
            setValue1(value)
        }
    }

    // @ts-ignore
    return (
        <div className={classes.root}>
            <Slider
                value={value1}
                onChange={onChangeCallback}
                valueLabelDisplay="auto"
                aria-labelledby="non-linear-slider"
            />
        </div>
    );
}

export default SuperRange;
