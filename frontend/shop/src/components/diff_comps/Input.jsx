import "../../styles/components/Input.css";

const Input = ({
    type = "text",
    value,
    onChange,
    placeholder = "",
    disabled = false,
    label = null,
    className = "",
    ...props
}) => {

    const handleChange = (e) => {
        if (onChange) {
            onChange(e.target.value); // Возвращаем только значение
        }
    };

    return (
        <div className={`input-wrapper ${className}`}>
                {label && <label className="input-label">{label}</label>}
                <input
                    type={type}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="custom-input"
                    {...props}
                />
        </div>
    );
};

export default Input;
