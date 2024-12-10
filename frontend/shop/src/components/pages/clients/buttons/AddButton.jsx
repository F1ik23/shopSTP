import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import Modal from "../../../diff_comps/Modal";
import Input from "../../../diff_comps/Input";
import InputNumber from "../../../diff_comps/InputNumber";
import { useSetClientMutation } from "../../../../store/api/clients.api";
import MaskedInput from "../../../diff_comps/MaskedInput";
import Select from "../../../diff_comps/Select";


export function AddButton() {

    const [open, setOpen] = useState(false);

    const [setClient] = useSetClientMutation();

    const sex = [
        { label: 'Мужской', value: 'Мужской' }, 
        { label: 'Женский', value: 'Женский' }
    ]

    const [body, setBody] = useState({
        name: '',
        phone: '',
        age: '',
        sex: ''
    })

    const handleClickAdd = () => {
        setOpen(true);
    }
    const handleAdd = () => {
        setClient(body).unwrap()
        .then(() => {
            setOpen(false);
            body.name = '';
            body.phone = '';
            body.age = '';
            body.sex = '';
        })
        .catch((error) => alert(error.status + ' ' + error.data.message))
    }

    return (
        <>
            <button className="action-button" onClick={handleClickAdd}><IoMdAdd /></button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Modal.Header close={() => setOpen(false)}>
                    <h2>Добавление</h2>
                </Modal.Header>
                <Modal.Body>
                    <Input label="Имя" onChange={(e) => setBody({ ...body, name: e })} />
                    <MaskedInput value="+7" mask="+0(000)000-00-00" label="Телефон" onChange={(e) => setBody({ ...body, phone: e })} />
                    <Select label="Пол" data={sex} onChange={(e) => setBody({ ...body, sex: e })} />
                    <InputNumber min="1" max="150" label="Возраст" onChange={(e) => setBody({ ...body, age: e })} />                    
                </Modal.Body>
                <Modal.Footer>
                    <button className="action-button" onClick={handleAdd}>Добавить</button>
                    <button className="action-button" onClick={() => setOpen(false)}>Закрыть</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}