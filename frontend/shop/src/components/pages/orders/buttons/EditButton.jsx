import { MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Modal from "../../../diff_comps/Modal";
import Select from "../../../diff_comps/Select";
import { useSetOrderMutation } from "../../../../store/api/orders.api";
import { parseDateString } from "../../../../services";


export function EditButton() {

    const selected = useSelector(state => state.selected.value);
    const [open, setOpen] = useState(false);
    const [setOrder] = useSetOrderMutation();

    const classButton = selected.id === '' ? 'disabled-button' : 'action-button';
    const disable = selected.id === '' ? true : false;

    const [body, setBody] = useState(null)

    useEffect(() => {
        setBody(selected);
    }, [selected]);

    const states = [
            {value: 'COMPLETED', label: "Завершено"},
            {value: 'NOT_COMPLETED', label: "Не завершено"},
            {value: 'WAITING', label: "Ожидает оплаты"},
            {value: 'PAID', label: "Оплачено"},
            {value: 'AWAITING_DEPARTURE', label: "Ожидает отправки"},
            {value: 'SENT', label: "Отправлено"},
            {value: 'HANDED', label: "Вручено"}
    ]
    

    const handleClickEdit = () => {
        setOpen(true);
    }

    const handleEdit = () => {
        body.date = parseDateString(body.date);
        setOrder(body).then(() => {
            setOpen(false);
        });
        setBody(selected);
    }

    return (
        <>
            <button className={classButton} onClick={handleClickEdit} disabled={disable}><MdEdit /></button>
            {body && <Modal open={open} onClose={() => setOpen(false)}>
                <Modal.Header close={() => setOpen(false)}>
                    <h2>Редактирование</h2>
                </Modal.Header>
                <Modal.Body>
                    <div className="order-edit">
                    <span className="order-text">Номер заказа: {body.id}</span>
                    <span className="order-text">Заказчик: {body.name}</span>
                    <span className="order-text">Дата заказа: {body.date}</span>
                    <Select label="Состояние" data={states} onChange={(e) => setBody({ ...body, state: e })} style={{width: '100%'}} />
                    <span className="order-text">Заказанные товары:</span>
                    <ul>
                    {body.items?.map(item => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                    </ul>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="action-button" onClick={handleEdit}>Изменить</button>
                    <button className="action-button" onClick={() => setOpen(false)}>Закрыть</button>
                </Modal.Footer>
            </Modal>}
        </>
    )
}