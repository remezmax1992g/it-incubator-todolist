import React, {ChangeEvent, KeyboardEvent} from 'react';

type InputPropsType = {
    //value
    className: string
    title: string
    //function
    callBackAddTitle: () => void
    setTitle: (title: string) => void


}

const Input: React.FC<InputPropsType> = (props) => {
    //function
    const onChangeInputTitle = (event: ChangeEvent<HTMLInputElement>) => {
        let currentTitle = event.currentTarget.value.trim()
            props.setTitle(currentTitle)
        }
        const onKeyboardAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter" && event.ctrlKey === true) {
                props.callBackAddTitle()
            }
        }
        //Interface
        return (
            <span>
            <input value={props.title} className={props.className} onChange={onChangeInputTitle}
                   onKeyDown={onKeyboardAddTask}/>
        </span>
        );
    };

    export default Input;