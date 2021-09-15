import React, {useState} from "react";
import SuperSelect from "./common/c5-SuperSelect/SuperSelect";
import SuperRadio from "./common/c6-SuperRadio/SuperRadio";
import s from './HW7.module.css'

const arr = ["x", "y", "z"];

function HW7() {
    const [value, onChangeOption] = useState(arr[1]);

    return (
        <div>
            <hr/>
            Super Select and Super Radio

            {/*should work (должно работать)*/}
            <div className={s.superSelect}>
                <SuperSelect
                    options={arr}
                    value={value}
                    onChangeOption={onChangeOption}
                />
            </div>
            <div className={s.superSelect}>
                <SuperRadio
                    name={"radio"}
                    options={arr}
                    value={value}
                    onChangeOption={onChangeOption}
                />
            </div>

            <hr/>
        </div>
    );
}

export default HW7;
