import { useDispatch } from "react-redux";
import { useGetOrdersQuery } from "../../../store/api/api";
import { ActionBar } from "./ActionBar";
import { useEffect, useState } from "react";
import { actions } from "../../../store/itemsSlice/itemSlice";
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
            </Table>
        </div>
    )
}