import React, {useEffect, memo, useState} from "react";
import { Select } from "antd";

const { Option } = Select;

interface CountrySelecetProps {
    value: string
    handleCountry: (value: string) => void
}

const CountrySelect: React.FC<CountrySelecetProps> = memo(function({value, handleCountry}) {
    const [countries, setCountries] = useState([
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
    ])

   useEffect(() => {
        if (value && !countries.includes(value)) {
            setCountries(prevCountries => [...prevCountries, value]);
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChangeValue = (value: string) => {
        handleCountry(value)
    }

    return (
        <Select
        value={value}
        onChange={onChangeValue}
        style={{ width: 420 }}
        size="large"
        placeholder="Select a country"
        optionFilterProp="children">
            {countries.map((country, index) => (
                <Option key={index} value={country}>
                    {country}
                </Option>
            ))}
        </Select>
  );
})

export default CountrySelect