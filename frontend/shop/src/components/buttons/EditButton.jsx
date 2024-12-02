import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Input from "../diff_comps/Input";
import InputNumber from "../diff_comps/InputNumber";
import Modal from "../diff_comps/Modal";
import { useSetItemMutation } from "../../store/api/items.api";
import { actions } from "../../store/itemsSlice/itemSlice";


export function EditButton() {

    const item = useSelector(state => state.items.value);
    const [open, setOpen] = useState(false);
    const [setItem] = useSetItemMutation();
    const dispatch = useDispatch();

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
            console.log(body);
            dispatch(actions.setItem(body));
            setOpen(false);
        });
    }

    return (
        <>
            <button className={classButton} onClick={handleClickEdit} disabled={disable}><MdEdit /></button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Modal.Header close={() => setOpen(false)}>
                    <h2>Редактирование</h2>
                </Modal.Header>
                <Modal.Body>
                    <Input label="Название" onChange={(e) => setBody({ ...body, name: e })} value={item.name} />
                    <InputNumber min="1" label="Стоимость" allowDecimal onChange={(e) => setBody({ ...body, cost: e })} value={item.cost} />
                    <InputNumber min="1" label="Количество (в шт.)" onChange={(e) => setBody({ ...body, count: e })} value={item.count} />
                    <InputNumber min="1" label="Количество (в кг)" allowDecimal onChange={(e) => setBody({ ...body, countUnit: e })} value={item.countUnit} />
                </Modal.Body>
                <Modal.Footer>
                    <button className="action-button" onClick={handleEdit}>Изменить</button>
                    <button className="action-button" onClick={() => setOpen(false)}>Закрыть</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}