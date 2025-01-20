import { useState } from 'react';

const MaskedInput = ({ mask, value, onChange, placeholder, className = '', 
    label = null, }) => {
  const [inputValue, setInputValue] = useState(value || "");

  // Обработчик ввода
  const handleInputChange = (e) => {
    let value = e.target.value;

    // Проверяем, что вводятся только цифры или буквы в соответствии с маской
    value = value.replace(/[^0-9A-Za-z]/g, ""); // Убираем все символы, кроме букв и цифр

    let formattedValue = "";
    let maskIndex = 0;
    let valueIndex = 0;

    // Применяем маску и форматируем введенное значение
    while (maskIndex < mask.length && valueIndex < value.length) {
      if (mask[maskIndex] === "0") {
        // Разрешаем только цифры для символа "0"
        if (/\d/.test(value[valueIndex])) {
          formattedValue += value[valueIndex];
          valueIndex++;
        }
      } else if (mask[maskIndex] === "L") {
        // Разрешаем только буквы для символа "L"
        if (/[a-zA-Z]/.test(value[valueIndex])) {
          formattedValue += value[valueIndex];
          valueIndex++;
        }
      } else if (mask[maskIndex] === "A") {
        // Разрешаем цифры или буквы для символа "A"
        if (/[a-zA-Z0-9]/.test(value[valueIndex])) {
          formattedValue += value[valueIndex];
          valueIndex++;
        }
      } else {
        // Вставляем маскирующие символы (например, пробелы или дефисы)
        formattedValue += mask[maskIndex];
      }
      maskIndex++;
    }

    setInputValue(formattedValue);
    if (onChange) {
      onChange(formattedValue);
    }
  };

  return (
    <div className={`input-wrapper ${className}`}>
        {label && <label className="input-label">{label}</label>}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder || "Введите данные"}
        maxLength={mask.length}
        className="custom-input"
      />
    </div>
  );
};

export default MaskedInput;

