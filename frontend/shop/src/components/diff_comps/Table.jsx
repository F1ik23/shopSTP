// import React from "react";
// import "../../styles/components/Table.css";

// // Основной компонент Table
// const Table = ({ data = [], nullData = 'Нет данных для отображения', children }) => {
//     return (
//         <div className="table-prod">
//             <table>
//                 {/* Заголовки колонок */}
//                 <thead>
//                     {React.Children.map(children, (child) =>
//                         React.isValidElement(child) && child.type === Column ? (
//                             <th>{child.props.header}</th>
//                         ) : null
//                     )}
//                 </thead>
//                 {/* Тело таблицы */}
//                 <tbody>
//                     {data.length > 0 ? (
//                         data.map((item, rowIndex) => (
//                             <tr key={rowIndex}>
//                                 {React.Children.map(children, (child) =>
//                                     React.isValidElement(child) && child.type === Column ? (
//                                         <td>{item[child.props.cell]}</td>
//                                     ) : null
//                                 )}
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan={React.Children.count(children)} style={{ textAlign: "center" }}>
//                                 {nullData}
//                             </td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// // Подкомпонент Column
// const Column = () => null; // Column используется только для конфигурации, ничего не рендерит

// // Экспорт компонентов
// Table.Column = Column;

// export default Table;

import React, { useState } from "react";
import "../../styles/components/Table.css";

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
        if (selectedRow === index) setSelectedRow(null);
        else {
            setSelectedRow(index);
        }
        onRowClick(item, index)
    }

    return (
        <div
            className={`table-prod ${bordered ? "table-bordered" : ""}`}
            style={{ height: height || "auto", overflow: virtualized ? "auto" : "visible" }}
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
                                            <span>{sortType === "asc" ? " ▲" : " ▼"}</span>
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
                            data.map((item, index) => (
                                <tr
                                    key={index}
                                    className={selectedRow === index ? "selected" : ""}
                                    onClick={() => handleRowClick(item, index)}
                                >
                                    {numbered && <td style={{ width: "50px" }}>{index + 1}</td>}
                                    {React.Children.map(children, (child) => {
                                        if (React.isValidElement(child) && child.type === Column) {
                                            const CellComponent = child.props.children[1]?.type || DefaultCell;
                                            const dataKey = child.props.children[1]?.props.dataKey;
                                            return (
                                                <td style={{ textAlign: child.props.align }}>
                                                    <CellComponent dataKey={dataKey} data={item} />
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

// Подкомпонент Cell (по умолчанию отображает данные по ключу dataKey)
const Cell = ({ dataKey, data, children = null }) => {
    if (dataKey) {
        const value = data[dataKey];

        // Безопасное обрезание текста, если это строка
        if (typeof value === "string" || Array.isArray(value)) {
            return <span>{value}</span>;
        }

        // Если это число, просто отображаем его
        if (typeof value === "number") {
            return <span>{value}</span>;
        }

        // Обработка других типов данных
        return <span>{value || ""}</span>;
    }
    else {
        return <>{children}</>
    }
};

// DefaultCell для fallback (если не указан тип ячейки)
const DefaultCell = ({ dataKey, data }) => {
    return <span>{data[dataKey]}</span>;
};

// Экспорт компонентов
Table.Column = Column;
Table.HeaderCell = HeaderCell;
Table.Cell = Cell;

export default Table;