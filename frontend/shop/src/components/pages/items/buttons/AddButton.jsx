import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import Modal from "../../../diff_comps/Modal";
import { useSetItemMutation } from "../../../../store/api/items.api";
import Input from "../../../diff_comps/Input";
import InputNumber from "../../../diff_comps/InputNumber";


export function AddButton() {

    const [open, setOpen] = useState(false);

    const [setItem] = useSetItemMutation();

    const [body, setBody] = useState({
        name: '',
        cost: '',
        count: '',
        countUnit: ''
    })

    const handleClickAdd = () => {
        setOpen(true);
    }
    const handleAdd = () => {
        setItem(body).unwrap().then(() => {
            setOpen(false);
            body.name = '';
            body.cost = '';
            body.count = '';
            body.countUnit = '';
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
                    <Input label="Название" onChange={(e) => setBody({ ...body, name: e })} />
                    <InputNumber min="1" label="Стоимость" allowDecimal onChange={(e) => setBody({ ...body, cost: e })} />
                    <InputNumber min="1" label="Количество (в шт.)" onChange={(e) => setBody({ ...body, count: e })} />
                    <InputNumber min="1" label="Количество (в кг)" allowDecimal onChange={(e) => setBody({ ...body, countUnit: e })} />
                </Modal.Body>
                <Modal.Footer>
                    <button className="action-button" onClick={handleAdd}>Добавить</button>
                    <button className="action-button" onClick={() => setOpen(false)}>Закрыть</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}