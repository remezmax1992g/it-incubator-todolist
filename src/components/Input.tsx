import React, {ChangeEvent, KeyboardEvent} from 'react';

type InputPropsType = {
    setTitle: (title: string) => void,
    title: string,
    callBack: () => void
}

export const Input = (props: InputPropsType) => {
    const onChangeSetTitle = (e:ChangeEvent<HTMLInputElement>) => props.setTitle(e.currentTarget.value)
    const onKeyAddTask = (e:KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter" && e.ctrlKey === true){
            props.callBack()
        }
    }
    return (
        <span>
            <input value = {props.title}
                   onChange = {onChangeSetTitle}
                   onKeyDown = {onKeyAddTask}/>
        </span>
    );
};

export default Input;