import React, { useState } from 'react';
import { Radio, Collapse } from 'antd';

const { Panel } = Collapse;

function RadioButton(props){
    const [RadioValue,setRadioValue]=useState('');

    const handleRadio=(e)=>{
        console.log(e.target.value);
        setRadioValue(e.target.value);
        props.handleRadio(e.target.value);
    }


    const radioButton=()=>{
        return(
            <Radio.Group onChange={handleRadio} value={RadioValue}>
        <Radio value={1}>Price: High to Low </Radio>
        <Radio value={2}>Price: Low to High </Radio>
        <Radio value={3}>Rating</Radio>
      </Radio.Group>

        )
        
    }

    return(
        <div>
            <Collapse defaultActiveKey={['0']} >
                <Panel header="Sort By" key="1">
                    {radioButton()}
                </Panel>
            </Collapse>
        </div>
    )

}

export default RadioButton