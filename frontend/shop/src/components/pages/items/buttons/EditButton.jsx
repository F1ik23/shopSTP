import { MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Input from "../../../diff_comps/Input";
import InputNumber from "../../../diff_comps/InputNumber";
import Modal from "../../../diff_comps/Modal";
import { useSetItemMutation } from "../../../../store/api/items.api";


export function EditButton() {

    const item = useSelector(state => state.items.value);
    const [open, setOpen] = useState(false);
    const [setItem] = useSetItemMutation();

    const classButton = item.name === '' ? 'disabled-button' : 'action-button';
    const disable = item.name === '' ? true : false;

    const [body, setBody] = useState(null)

    useEffect(() => {
        setBody(item);
    }, [item]);
    

    const handleClickEdit = () => {
        setOpen(true);
    }

    const handleEdit = () => {
        setItem(body).then(() => {
            setOpen(false);
        });
    }

    return (
        <>
            <button className={classButton} onClick={handleClickEdit} disabled={disable}><MdEdit /></button>
            {body && <Modal open={open} onClose={() => setOpen(false)}>
                <Modal.Header close={() => setOpen(false)}>
                    <h2>Редактирование</h2>
                </Modal.Header>
                <Modal.Body>
                    <Input label="Название" onChange={(e) => setBody({ ...body, name: e })} value={body.name} />
                    <InputNumber min="1" label="Стоимость" allowDecimal onChange={(e) => setBody({ ...body, cost: e })} value={body.cost} />
                    <InputNumber min="1" label="Количество (в шт.)" onChange={(e) => setBody({ ...body, count: e })} value={body.count} />
                    <InputNumber min="1" label="Количество (в кг)" allowDecimal onChange={(e) => setBody({ ...body, countUnit: e })} value={body.countUnit} />
                </Modal.Body>
                <Modal.Footer>
                    <button className="action-button" onClick={handleEdit}>Изменить</button>
                    <button className="action-button" onClick={() => setOpen(false)}>Закрыть</button>
                </Modal.Footer>
            </Modal>}
        </>
    )
}