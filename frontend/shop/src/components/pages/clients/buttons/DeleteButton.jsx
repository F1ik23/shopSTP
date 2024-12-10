import { IoIosRemove } from "react-icons/io";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Modal from "../../../diff_comps/Modal";
import { useDeleteClientMutation } from "../../../../store/api/clients.api";


export function DeleteButton() {

    const selected = useSelector(state => state.selected.value);
    const [open, setOpen] = useState(false);
    const [deleteClient] = useDeleteClientMutation();

    const classButton = selected.name === '' ? 'disabled-button' : 'action-button';
    const disable = selected.name === '' ? true : false;

    const [body, setBody] = useState(null)

    useEffect(() => {
        setBody(selected);
    }, [selected]);
    

    const handleClickEdit = () => {
        setOpen(true);
    }

    const handleDelete = () => {
        deleteClient(body).then(() => {
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
                        <p>Вы действительно хотите удалить клиента {selected.name}?</p>
                    </Modal.Body>
                <Modal.Footer>
                    <button className="action-button" onClick={handleDelete}>Удалить</button>
                    <button className="action-button" onClick={() => setOpen(false)}>Закрыть</button>
                </Modal.Footer>
            </Modal>}
        </>
    )
}