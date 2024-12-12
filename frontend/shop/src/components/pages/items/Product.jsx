import { useDispatch } from "react-redux";
import { useGetItemsQuery } from "../../../store/api/api";
import { ActionBar } from "./ActionBar";
import { useState } from "react";
import { actions } from "../../../store/selectedSlice/selectedSlice";
import Table from "../../diff_comps/Table";


export function Product() {
    const { data } = useGetItemsQuery();

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
            <Table data={data} nullData="Товаров пока нет..." onRowClick={handleRowClick} numbered>
                <Table.Column>
                    <Table.HeaderCell>Название</Table.HeaderCell>
                    <Table.Cell dataKey="name" fullText />
                </Table.Column>
                <Table.Column>
                    <Table.HeaderCell>Стоимость</Table.HeaderCell>
                    <Table.Cell dataKey="cost" fullText />
                </Table.Column>
                <Table.Column>
                    <Table.HeaderCell>Количество (шт.)</Table.HeaderCell>
                    <Table.Cell dataKey="count" fullText />
                </Table.Column>
                <Table.Column>
                    <Table.HeaderCell>Количество (кг)</Table.HeaderCell>
                    <Table.Cell dataKey="countUnit" fullText />
                </Table.Column>
            </Table>
        </div>
    )
}