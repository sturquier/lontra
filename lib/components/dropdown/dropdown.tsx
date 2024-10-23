'use client';

import { useState, useEffect } from 'react';
import Select, { CSSObjectWithLabel } from 'react-select';
import makeAnimated from 'react-select/animated';

interface IOption {
  value: string;
  label: string;
}

interface IDropdownProps {
  options: IOption[];
  selectedOptions: string[];
  onChangeCallback: (values: string[]) => void;
}

export default function Dropdown ({ options, selectedOptions, onChangeCallback }: IDropdownProps) {
  const [values, setValues] = useState<IOption[]>([]);

  useEffect(() => {
    const selectedValues = options.filter(option => selectedOptions.includes(option.value));
    setValues(selectedValues);
  }, [selectedOptions, options]);

  const animatedComponents = makeAnimated();

  const optionStyle = (): CSSObjectWithLabel => ({
    alignItems: 'center',
    display: 'flex',
  
    '::before': {
      width: 10,
      height: 10,
      background: 'var(--moderate-blue)',
      borderRadius: '50%',
      marginRight: 10,
      content: '""',
    },
  });

  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      placeholder="Select websites"
      options={options}
      getOptionValue={(option: IOption) => option.value}
      getOptionLabel={(option: IOption) => option.label}
      onChange={(options) => onChangeCallback((options as IOption[]).map(option => option.value))}
      value={values}
      isMulti
      styles={{
        clearIndicator: (baseStyles: CSSObjectWithLabel) => ({
          ...baseStyles,
          color: 'var(--moderate-blue)',
          '&:hover': {
            color: 'var(--dark-blue)'
          }
        }),
        indicatorSeparator: (baseStyles: CSSObjectWithLabel) => ({
          ...baseStyles,
          background: 'var(--dark-blue)',
        }),
        dropdownIndicator: (baseStyles: CSSObjectWithLabel) => ({
          ...baseStyles,
          color: 'var(--moderate-blue)',
          '&:hover': {
            color: 'var(--dark-blue)'
          }
        }),
        control: (baseStyles: CSSObjectWithLabel) => ({
          ...baseStyles,
          border: '2px solid var(--moderate-blue)',
          boxShadow: 'none',
          '&:hover': {
            border: '2px solid var(--moderate-blue)'
          },
          'div > div': {
            minWidth: 'fit-content'
          }
        }),
        placeholder: (baseStyles: CSSObjectWithLabel) => ({
          ...baseStyles,
          color: 'var(--dark-blue)',
        }),
        option: (baseStyles: CSSObjectWithLabel) => ({
          ...baseStyles,
          ...optionStyle(),
          background: 'var(--white)',
          '&:hover': {
            color: 'var(--moderate-blue)'
          }
        }),
        multiValue: (baseStyles: CSSObjectWithLabel) => ({
          ...baseStyles,
          color: 'var(--dark-blue)',
        }),
        multiValueLabel: (baseStyles: CSSObjectWithLabel) => ({
          ...baseStyles,
          color: 'var(--dark-blue)',
        }),
        multiValueRemove: (baseStyles: CSSObjectWithLabel) => ({
          ...baseStyles,
          color: 'var(--moderate-blue)',
          '&:hover': {
            background: 'var(--moderate-blue)',
            color: 'var(--dark-blue)',
          }
        }),
      }}
    />
  )
}