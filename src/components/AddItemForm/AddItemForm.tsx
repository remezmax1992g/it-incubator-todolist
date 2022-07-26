import React, {useState} from 'react';
import Input from "../Input/Input";
import Button from "../Button/Button";

type AddItemFormTypeProps = {
    //function
    addTask: (titleInput: string) => void
}

const AddItemForm = (props: AddItemFormTypeProps) => {
    //state
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    //function
    const onClickAddTask = () => {
        let newTitle = title.trim()
        if (newTitle) {
            props.addTask(newTitle)
            error && setError(false)
        } else {
            setError(true)
        }
        setTitle("")
    }
    //interface
    return (
        <div>
            <Input className={"inputName"}
                   title={title}
                   callBackAddTitle={onClickAddTask}
                   setTitle={setTitle}/>
            <Button nameButton={"+"}
                    callBackOnClick={onClickAddTask}
                    className={"buttonInputName"}/>
            {error && <div className={"error"}>You need to input task's title</div>}
        </div>
    );
};

export default AddItemForm;