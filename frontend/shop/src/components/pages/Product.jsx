import { useDispatch } from "react-redux";
import { useGetItemsQuery } from "../../store/api/api";
import "../../styles/Product.css";
import { ActionBar } from "../additional/ActionBar";
import { useState } from "react";
import { actions } from "../../store/itemsSlice/itemSlice";
import Table from "../diff_comps/Table";


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