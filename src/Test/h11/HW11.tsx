import React, {useState} from "react";
import SuperRange from "./common/c7-SuperRange/SuperRange";
import SuperDoubleRange from "./common/c8-SuperDoubleRange/SuperDoubleRange";
import s from './HW11.module.css'

function HW11() {
    // const [value1, setValue1] = useState<number>(0);
    // const [value2, setValue2] = useState<number>(100);

    return (
        <div>
            <hr/>
            Super Range and Super Double Range

            {/*should work (должно работать)*/}
            <div className={s.rangeBlock}>
                <div>
                    {/*<span>{value1}</span>*/}
                    {/*<SuperRange value1={value1} setValue1={setValue1}*/}
                    {/*    // сделать так чтоб value1 изменялось*/}
                    {/*/>*/}
                </div>

                <div>
                    {/*<span>{value1}</span>*/}
                    {/*<SuperDoubleRange value1={value1} setValue1={setValue1} value2={value2} setValue2={setValue2}*/}
                        // сделать так чтоб value1 и value2 изменялось
                    {/*/>*/}
                    {/*<span>{value2}</span>*/}
                </div>
            </div>


            <hr/>
        </div>
    );
}

export default HW11;
