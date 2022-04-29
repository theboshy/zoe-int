import { useState } from 'react';
import './markable.box.css';

export function MarkableBox (props: any) { 

    function boxClicked() {
        props.onClick(props.index);
    }

    
    return (
        <div id="box" className='markable-box' onClick={boxClicked}>
            <label className='markable-box-item'>{props.value}</label>
        </div>
    );
}