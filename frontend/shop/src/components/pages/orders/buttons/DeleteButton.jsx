import { IoIosRemove } from "react-icons/io";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Modal from "../../../diff_comps/Modal";
import { useDeleteItemMutation } from "../../../../store/api/items.api";


export function DeleteButton() {

    const item = useSelector(state => state.items.value);
    const [open, setOpen] = useState(false);
    const [deleteItem] = useDeleteItemMutation();

    const classButton = item.name === '' ? 'disabled-button' : 'action-button';
    const disable = item.name === '' ? true : false;

    const [body, setBody] = useState(null)

    useEffect(() => {
        setBody(item);
    }, [item]);
    

    const handleClickEdit = () => {
        setOpen(true);
    }

    const handleDelete = () => {
        deleteItem(body).then(() => {
            setOpen(false);
        });
    }

    return (
        <>
            <button className={classButton} onClick={handleClickEdit} disabled={disable}><IoIosRemove /></button>
            {body && <Modal open={open} onClose={() => setOpen(false)}>
                <Modal.Header close={() => setOpen(false)}>
                    <h2>Удаление</h2>
                </Modal.Header>
                    <Modal.Body>
                        <p>Вы действительно хотите удалить товар {item.name} стоимостью {item.cost}?</p>
                    </Modal.Body>
                <Modal.Footer>
                    <button className="action-button" onClick={handleDelete}>Удалить</button>
                    <button className="action-button" onClick={() => setOpen(false)}>Закрыть</button>
                </Modal.Footer>
            </Modal>}
        </>
    )
}