import { useDispatch } from "react-redux";
import { useGetItemsQuery } from "../../store/api/api";
import "../../styles/Product.css";
import { ActionBar } from "../additional/ActionBar";
import { useState } from "react";
import { actions } from "../../store/itemsSlice/itemSlice";

export function Product() {
    const { data } = useGetItemsQuery();

    const dispatch = useDispatch();

    const [selectedItem, setSelectedItem] = useState(null);

    const handleRowClick = (item) => {
        setSelectedItem(item === selectedItem ? null : item);
        dispatch(actions.setItem(item));
    };

    return (
        <div className="product-content">
            <div className="product-actions">
                <ActionBar />
            </div>
            <div className="table-prod">
                <table>
                    <thead>
                        <td>№</td>
                        <td>Название</td>
                        <td>Стоимость</td>
                        <td>Количество (шт.)</td>
                        <td>Количество (кг)</td>
                    </thead>
                    {data && data.map((item, index) => (
                        <tr
                            key={index}
                            onClick={() => handleRowClick(item)}
                            className={item === selectedItem ? "selected" : ""}
                        >
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.cost}</td>
                            <td>{item.count === null ? '-' : item.count}</td>
                            <td>{item.countUnit === null ? '-' : item.countUnit}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    )
}