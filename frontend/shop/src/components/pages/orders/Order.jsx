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
                        <ul>
                            {data && data.map((item, index) => (
                                <li key={index}>
                                    <ul>
                                        {item.items && item.items.map(subItem => (
                                            <li key={subItem.id}>{subItem.name}</li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </Table.Cell>
                </Table.Column>
            </Table>
        </div>
    )
}