import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type FullInputPropsType = {
   callBack:(title: string) => void
}

export const FullInput = (props: FullInputPropsType) => {
    const [title, setTitle] = useState()
    const onChangeSetTitle = (e:ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyAddTask = (e:KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter" && e.ctrlKey === true){
            onClickAddTask()
        }
    }
    const onClickAddTask = () => {
        props.callBack(title)
        setTitle("")

    }
    return (
        <div>
            <input value = {title}
                   onChange = {onChangeSetTitle}
                   onKeyDown = {onKeyAddTask}/>
            <button onClick={onClickAddTask}>+</button>
        </div>
    );
};
