import React, { useState } from "react";

// Основной компонент Table
const Table = ({
    data = [],
    virtualized,
    loading,
    onSortColumn,
    sortColumn,
    sortType,
    height,
    bordered,
    nullData = 'Нет данных для отображения',
    onRowClick,
    numbered,
    children,
}) => {
    const handleSort = (column) => {
        if (onSortColumn) {
            const newSortType = sortColumn === column && sortType === "asc" ? "desc" : "asc";
            onSortColumn(column, newSortType);
        }
    };

    const [selectedRow, setSelectedRow] = useState(null);

    const hasData = data && data.length > 0;

    const handleRowClick = (item, index) => {
        if (onRowClick) {
            if (selectedRow === index) setSelectedRow(null);
            else setSelectedRow(index);

            // Вызовем onRowClick, если он передан
            onRowClick(item, index);
        }
    }

    return (
        <div
            className={`table-prod ${bordered ? "table-bordered" : ""}`}
            style={{ maxHeight: height || "auto", overflow: virtualized ? "auto" : "visible" }}
        >
            {loading ? (
                <div className="table-loading">Загрузка...</div>
            ) : (
                <table>
                    {/* Заголовок таблицы */}
                    <thead>
                        {numbered && <th style={{ width: "50px" }}>№</th>}
                        {React.Children.map(children, (child) => {
                            if (React.isValidElement(child) && child.type === Column) {
                                const { sortable, align, flexGrow } = child.props;
                                return (
                                    <th
                                        style={{ textAlign: align, flexGrow }}
                                        onClick={() => sortable && handleSort(child.props.dataKey)}
                                        className={sortable ? "sortable" : ""}
                                    >
                                        {child.props.children[0]}
                                        {sortable && sortColumn === child.props.dataKey ? (
                                            <>{sortType === "asc" ? <span> &and;</span> : <span> &or;</span>}</>
                                        ) : null}
                                    </th>
                                );
                            }
                            return null;
                        })}
                    </thead>
                    {/* Тело таблицы */}
                    <tbody>
                        {hasData ? (
                            data.map((rowData, index) => (
                                <tr
                                    key={index}
                                    className={selectedRow === index ? "selected" : ""}
                                    onClick={() => handleRowClick(rowData, index)}
                                >
                                    {numbered && <td style={{ width: "50px" }}>{index + 1}</td>}
                                    {React.Children.map(children, (child) => {
                                        if (React.isValidElement(child) && child.type === Column) {
                                            const { dataKey, children: cellChildren } = child.props.children[1]?.props || {};

                                            return (
                                                <td style={{ textAlign: child.props.align }}>
                                                    {/* Проверка: если есть dataKey, используем его */}
                                                    {dataKey ? (
                                                        <span>{rowData[dataKey]}</span>
                                                    ) : (
                                                        /* Если children является функцией, вызываем её с rowData */
                                                        typeof cellChildren === "function"
                                                            ? cellChildren(rowData) // Передаём текущую строку
                                                            : cellChildren // Просто рендерим содержимое
                                                    )}
                                                </td>
                                            );
                                        }
                                        return null;
                                    })}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={numbered ? React.Children.count(children) + 1 : React.Children.count(children)} style={{ textAlign: "center" }}>
                                    {nullData}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

// Подкомпонент Column
const Column = ({ children }) => {
    return <>{children}</>;
};

// Подкомпонент HeaderCell
const HeaderCell = ({ children }) => {
    return <span>{children}</span>;
};

// Подкомпонент Cell (обновленный)
const Cell = ({ dataKey, children }) => {
    return children || null;
};


// Экспорт компонентов
Table.Column = Column;
Table.HeaderCell = HeaderCell;
Table.Cell = Cell;

export default Table;