import React from 'react';

type ButtonPropsType = {
    //value
    nameButton: string
    //function
    callBackOnClick:() => void
    className: string
}

const Button = (props: ButtonPropsType) => {
    //function
    const onClickHandler = () => {
        props.callBackOnClick()
    }
    //interface
    return (
        <span>
            <button className ={props.className} onClick={onClickHandler}>{props.nameButton}</button>
        </span>
    );
};

export default Button;