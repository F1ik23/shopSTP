import { MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Input from "../../../diff_comps/Input";
import InputNumber from "../../../diff_comps/InputNumber";
import Modal from "../../../diff_comps/Modal";
import { useSetClientMutation } from "../../../../store/api/clients.api";
import MaskedInput from "../../../diff_comps/MaskedInput";
import Select from "../../../diff_comps/Select";


export function EditButton() {

    const selected = useSelector(state => state.selected.value);
    const [open, setOpen] = useState(false);
    const [setClient] = useSetClientMutation();

    const classButton = selected.name === '' ? 'disabled-button' : 'action-button';
    const disable = selected.name === '' ? true : false;

    const sex = [
        { label: 'Мужской', value: 'Мужской' }, 
        { label: 'Женский', value: 'Женский' }
    ]

    const [body, setBody] = useState(null)

    useEffect(() => {
        setBody(selected);
    }, [selected]);
    

    const handleClickEdit = () => {
        setOpen(true);
    }

    const handleEdit = () => {
        setClient(body).unwrap()
        .then(() => {
            setOpen(false);
        })
        .catch((error) => {
            alert(error.data.message);
        })
    }

    return (
        <>
            <button className={classButton} onClick={handleClickEdit} disabled={disable}><MdEdit /></button>
            {body && <Modal open={open} onClose={() => setOpen(false)}>
                <Modal.Header close={() => setOpen(false)}>
                    <h2>Редактирование</h2>
                </Modal.Header>
                <Modal.Body>
                    <Input label="Имя" onChange={(e) => setBody({ ...body, name: e })} value={body.name} />
                    <MaskedInput mask="+0(000)000-00-00" label="Телефон" onChange={(e) => setBody({ ...body, phone: e })} value={body.phone} />
                    <Select label="Пол" data={sex} onChange={(e) => setBody({ ...body, sex: e })} value={body.sex} />
                    <InputNumber min={1} max={150} label="Возраст" onChange={(e) => setBody({ ...body, age: e })} value={body.age} />  
                </Modal.Body>
                <Modal.Footer>
                    <button className="action-button" onClick={handleEdit}>Изменить</button>
                    <button className="action-button" onClick={() => setOpen(false)}>Закрыть</button>
                </Modal.Footer>
            </Modal>}
        </>
    )
}