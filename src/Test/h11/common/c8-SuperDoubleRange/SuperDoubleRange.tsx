import React, {ChangeEvent} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import {useDispatch, useSelector} from 'react-redux';
import {setPacksListTC} from '../../../../state/table-reducer';
import {AppRootStateType} from '../../../../state/store';
import {UserType} from '../../../../state/login-reducer';

type SuperDoubleRangePropsType = {
    value?: [number, number]
    onChangeRange?: (value: [number, number]) => void
    value1: number
    setValue1: (value: number) => void
    value2: number
    setValue2: (value: number) => void
    max: number
    component: string
    // min, max, step, disable, ...
}

const useStyles = makeStyles({
    root: {
        width: 200,
    },
});

const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = (
    {
        onChangeRange, value, value1, setValue1, value2, setValue2,
        max, component

        // min, max, step, disable
    }
) => {
    const dispatch = useDispatch()
    const classes = useStyles();
    const profile = useSelector<AppRootStateType, UserType>(
        (state) => state.login.user
    )

    const onChangeCallback = (e: ChangeEvent<{}>, value: number | number[]) => {
        if (Array.isArray(value)) {
            setValue1(value[0])
            setValue2(value[1])
        }

        component === 'packList' ? dispatch(setPacksListTC({
            max: value2,
            min: value1
        })) : dispatch(setPacksListTC({max: value2, min: value1, user_id: profile._id}))
    };

    // сделать самому, можно подключать библиотеки

    return (<div className={classes.root}>
            <Slider
                value={[value1, value2]}
                onChangeCommitted={onChangeCallback}
                aria-labelledby="range-slider"
                valueLabelDisplay="on"
                max={max}
            />
        </div>
    );
}

export default SuperDoubleRange;
