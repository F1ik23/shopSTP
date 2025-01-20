import { useDispatch } from "react-redux";
import { useGetOrdersQuery } from "../../../store/api/api";
import { ActionBar } from "./ActionBar";
import { useState } from "react";
import { actions } from "../../../store/selectedSlice/selectedSlice";
import Table from "../../diff_comps/Table";


export function Order() {
    const { data } = useGetOrdersQuery();

    const dispatch = useDispatch();

    const [selectedItem, setSelected] = useState(null);

    const handleRowClick = (item) => {
        setSelected(item === selectedItem ? null : item);
        dispatch(actions.setSelectedItem(item));
    };


    return (
        <div className="product-content">
            <div className="product-actions">
                <ActionBar />
            </div>
            <Table data={data} nullData="Заказов пока нет..." onRowClick={handleRowClick} numbered>
                <Table.Column>
                    <Table.HeaderCell>Номер заказа</Table.HeaderCell>
                    <Table.Cell dataKey="id" fullText />
                </Table.Column>
                <Table.Column>
                    <Table.HeaderCell>Заказчик</Table.HeaderCell>
                    <Table.Cell dataKey="name" fullText />
                </Table.Column>
                <Table.Column>
                    <Table.HeaderCell>Дата</Table.HeaderCell>
                    <Table.Cell dataKey="date" fullText />
                </Table.Column>
                <Table.Column>
                    <Table.HeaderCell>Состояние</Table.HeaderCell>
                    <Table.Cell dataKey="state" fullText />
                </Table.Column>
                <Table.Column>
                    <Table.HeaderCell>Заказанные товары</Table.HeaderCell>
                    <Table.Cell>
                            {(rowData) => (
                                <ul>
                                    {rowData.items?.map((subItem) => (
                                        <li key={subItem.id}>
                                            <p>{subItem.item.name}:</p> 
                                            <div className="order-list">
                                                {subItem.count > 0 && <span>{subItem.count} шт.</span>}
                                                {subItem.countUnit > 0 && <span>{subItem.countUnit} кг.</span>}
                                                <span>(К оплате: {subItem.item.cost * (subItem.count + subItem.countUnit)})</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                    </Table.Cell>
                </Table.Column>
            </Table>
        </div>
    )
}