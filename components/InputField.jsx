import React from 'react';

const InputField = ({
  type,
  name,
  placeholder,
  value = '',
  onFocus = undefined,
  onBlur = undefined,
  onChange = undefined,
  ...props
}) => {
  const inputProps = type === 'file' ? { multiple: true, ...props } : props;
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onFocus={onFocus ? onFocus : null}
      onBlur={onBlur ? onBlur : null}
      onChange={onChange}
      {...inputProps}
    />
  );
};

export default InputField;
