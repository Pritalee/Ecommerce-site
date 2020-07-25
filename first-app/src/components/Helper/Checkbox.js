import React, { Fragment, useState } from 'react';
import { Checkbox, Collapse } from 'antd';

const { Panel } = Collapse;

function CheckBox(props){

    const datas=[
        {
            "_id":1,
            "name":"Iphone"
        },
        {
            "_id":2,
            "name":"OnePlus"
        },
        {
            "_id":3,
            "name":"Samsung"
        },
        {
            "_id":4,
            "name":"Redmi"
        },
        {
            "_id":5,
            "name":"OPPO"
        },
        {
            "_id":6,
            "name":"Vivo"
        },
        {
            "_id":7,
            "name":"Moto"
        },
        {
            "_id":8,
            "name":"Poco"
        },
        {
            "_id":9,
            "name":"Asus"
        },
        {
            "_id":10,
            "name":"Honor"
        },
        {
            "_id":11,
            "name":"Others"
        },
    ];
    const[Checked,setChecked]=useState([]);


    const handleToggle=(value)=>{
        //console.log(event.target);
        //console.log(props);
        var currentIndex=Checked.indexOf(value);
        const newChecked=[...Checked];
        
        if(currentIndex=== -1){
            newChecked.push(value);

        }
        else{
            newChecked.splice(currentIndex,1);
        }
        setChecked(newChecked); 
        props.handlefilters(newChecked);
        //console.log(newChecked);

    }

    const checkBox=datas.map((value,index)=>{
            return(
               <div className="col" key={index}>
                    <Checkbox 
                    type="checkbox" 
                    checked={Checked.indexOf(value.name)=== -1? false : true} 
                    
                    onChange={()=>handleToggle(value.name)}/>
                    <span>{value.name}</span>

               </div> 
            )
            

        })

    return(
        <div>
            <div className="row">
            <Collapse defaultActiveKey={['0']} >
                <Panel header="Select Company" key="1">
                    {checkBox}
                </Panel>
            </Collapse>
                

            </div>
        </div>
    )

};

export default CheckBox