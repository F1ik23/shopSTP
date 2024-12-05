import { useGetClientsQuery } from "../../../store/api/clients.api";
import { useDispatch } from "react-redux";
import { ActionBar } from "./ActionBar";
import { useState } from "react";
import { actions } from "../../../store/itemsSlice/itemSlice";
import Table from "../../diff_comps/Table";

export function Client() {
    const {data} = useGetClientsQuery();

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
            <Table data={data} nullData="Клиентов пока нет..." onRowClick={handleRowClick} numbered>
                <Table.Column>
                    <Table.HeaderCell>Имя</Table.HeaderCell>
                    <Table.Cell dataKey="name" fullText />
                </Table.Column>
                <Table.Column>
                    <Table.HeaderCell>Телефон</Table.HeaderCell>
                    <Table.Cell dataKey="phone" fullText />
                </Table.Column>
                <Table.Column>
                    <Table.HeaderCell>Возраст</Table.HeaderCell>
                    <Table.Cell dataKey="age" fullText />
                </Table.Column>
                <Table.Column>
                    <Table.HeaderCell>Пол</Table.HeaderCell>
                    <Table.Cell dataKey="sex" fullText />
                </Table.Column>
            </Table>
        </div>
    )
}
