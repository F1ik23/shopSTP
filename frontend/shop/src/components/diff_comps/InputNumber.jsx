import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../styles/components/Input.css";

const InputNumber = ({
  value,
  onChange,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  allowDecimal = false,
  label = "",
  className = "",
  placeholder = "",
  id,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(value || "");

  const handleBlur = () => {
    if (internalValue === "") return;

    // Преобразуем в число и проверяем диапазон
    const numValue = Number(internalValue);
    if (numValue < min) {
      setInternalValue(min);
      onChange && onChange(min);
    } else if (numValue > max) {
      setInternalValue(max);
      onChange && onChange(max);
    }
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;

    // Выбор правильного регулярного выражения
    const regex = allowDecimal
      ? /^-?\d*\.?\d*$/ // Разрешает дробные числа (например, 10.5, -4.2)
      : /^-?\d*$/;      // Только целые числа (например, 10, -4)

    // Разрешаем пустое значение или числа
    if (inputValue === "" || regex.test(inputValue)) {
      setInternalValue(inputValue);
      const numValue = Number(inputValue);

      // Уведомляем родителя, только если значение корректно
      if (inputValue !== "" && !isNaN(numValue)) {
        onChange && onChange(numValue);
      }
    }
  };

  return (
    <div className={`input-wrapper ${className}`}>
      {label && (
        <label className="input-label">
          {label}
        </label>
      )}
      <input
        type="text"
        value={internalValue}
        onChange={handleChange}
        onBlur={handleBlur}
        step={step}
        placeholder={placeholder}
        className="custom-input"
        {...props}
      />
    </div>
  );
};

InputNumber.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  allowDecimal: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.string,
};

export default InputNumber;
