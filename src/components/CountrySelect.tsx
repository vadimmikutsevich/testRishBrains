import React, {memo} from "react";
import { Select } from "antd";

import styles from '../styles/components/countrySelect.module.css'

const { Option } = Select;

interface CountrySelecetProps {
    value: string
    handleCountry: (value: string) => void
}

const countries = [
    'United States',
    'Canada',
    'Mexico',
    'United Kingdom',
    'France',
    'Germany',
    'China',
    'Japan',
    'Australia',
    'Russia',
    'Belarus'
]

const CountrySelect: React.FC<CountrySelecetProps> = memo(function({value, handleCountry}) {

    const onChangeValue = (currentValue: string) => {
        handleCountry(currentValue);
    }

    return (
        <Select
        value={value}
        className={styles.select}
        defaultValue={value ?? countries[0]}
        onChange={onChangeValue}
        size="large"
        placeholder="Select a country"
        optionFilterProp="children">
            {countries.map((country) => (
                <Option key={country} value={country}>
                    {country}
                </Option>
            ))}
        </Select>
  );
})

export default CountrySelect