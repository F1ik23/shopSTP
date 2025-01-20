import React, { useState } from "react";

const Select = ({ data = [], searchable = false, onChange, placeholder = "Выберите", label = null }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedValue, setSelectedValue] = useState(null);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const handleSelect = (value) => {
        setSelectedValue(value);
        setIsOpen(false);
        setSearchTerm("");
        if (onChange) {
            onChange(value);
        }
    };

    const filteredData = data.filter((item) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="custom-select">
            {label && <label className="input-label">{label}</label>}
            <div className="select-header" onClick={toggleDropdown}>
                <span>{selectedValue ? data.find((item) => item.value === selectedValue)?.label : placeholder}</span>
                <div className="arrow">{isOpen ? "▲" : "▼"}</div>
            </div>
            {isOpen && (
                <div className="select-dropdown">
                    {searchable && (
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Поиск..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    )}
                    <ul className="select-options">
                        {filteredData.length > 0 ? (
                            filteredData.map((item) => (
                                <li
                                    key={item.value}
                                    className={`select-option ${selectedValue === item.value ? "selected" : ""
                                        }`}
                                    onClick={() => handleSelect(item.value)}
                                >
                                    {item.label}
                                </li>
                            ))
                        ) : (
                            <li className="no-options">No options found</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Select;