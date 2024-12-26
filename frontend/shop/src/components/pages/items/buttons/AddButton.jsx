import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import Modal from "../../../diff_comps/Modal";
import { useSetItemMutation } from "../../../../store/api/items.api";
import Input from "../../../diff_comps/Input";
import InputNumber from "../../../diff_comps/InputNumber";
import Select from "../../../diff_comps/Select";


export function AddButton() {

    const [open, setOpen] = useState(false);

    const [setItem] = useSetItemMutation();

    const [quantityType, setQuantityType] = useState(null);

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
        if (!quantityType) {
            alert('Пожалуйста, выберите тип количества');
            return;
        }

        const isValid = body.name !== '' && 
                       body.cost !== '' && 
                       ((quantityType === 'pieces' && body.count !== '') || 
                        (quantityType === 'kg' && body.countUnit !== ''));

        if (isValid) {
            setItem(body).unwrap().then(() => {
                setOpen(false);
                setBody({
                    name: '',
                    cost: '',
                    count: '',
                    countUnit: ''
                });
                setQuantityType(null);
            })
                .catch((error) => {
                    if (error.status === 'FETCH_ERROR') {
                        alert('Проблема с подключением к серверу');
                    }
                    else alert(error.status + ' ' + error.data.message)
                })
        }
        else {
            alert('Одно из полей не было заполнено.');
        }

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
                    <Select 
                        label="Тип количества"
                        data={[
                            { value: 'pieces', label: 'В штуках' },
                            { value: 'kg', label: 'В килограммах' }
                        ]}
                        onChange={(value) => setQuantityType(value)}
                    />
                    {quantityType === 'pieces' && (
                        <InputNumber 
                            min="1" 
                            label="Количество (в шт.)" 
                            onChange={(e) => setBody({ ...body, count: e, countUnit: '' })} 
                        />
                    )}
                    {quantityType === 'kg' && (
                        <InputNumber 
                            min="1" 
                            label="Количество (в кг)" 
                            allowDecimal 
                            onChange={(e) => setBody({ ...body, countUnit: e, count: '' })} 
                        />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <button className="action-button" onClick={handleAdd}>Добавить</button>
                    <button className="action-button" onClick={() => setOpen(false)}>Закрыть</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}