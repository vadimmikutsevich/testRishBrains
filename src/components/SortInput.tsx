import React, {FC, useState} from "react";
import { Radio, Dropdown, Button, Divider } from "antd";
import { IoSwapVerticalOutline, IoChevronDownOutline } from 'react-icons/io5'
import OrderInput from "./OrderInput";
import styles from '../styles/components/sortInput.module.css'
import { rightIconMargin } from "../styles/inLineStyles";

interface SortInputProps {
    handleSortChange: (value: string) => void
    handleSortOrderChange: (value: string) => void
}

interface MenuItem {
    key: string
    radioValue: string
}

const menuItems = [
  { key: 'name', radioValue: 'Name' },
  { key: 'age', radioValue: 'Age' },
  { key: 'country', radioValue: 'Country' },
];

const SortInput: FC<SortInputProps> = ({handleSortChange, handleSortOrderChange}) => {
    const [selected, setSelected] = useState(menuItems[0]);
    const [visible, setVisible] = useState(false);

    const handleRadioClick = (menuItem: MenuItem) => {
        handleSortChange(menuItem.key)

        setSelected(menuItem)
    }

    const menu = {
        items: menuItems.map(item => {
            return {
                key: item.key,
                label: (
                    <div key={item.key} onClick={() => handleRadioClick(item)}>
                        <Radio value={item.radioValue} onClick={() => handleRadioClick(item)} checked={selected.key === item.key}/>
                        {item.radioValue}
                    </div>
                )
            }
        }),
    };

    return (
        <Dropdown
            open={visible}
            menu={menu}
            trigger={['click']}
            className={styles.dropDown}
            dropdownRender={(menu) => (
                <div className={styles.wrapper}>
                    {React.cloneElement(menu as React.ReactElement, { style: {boxShadow: 'none'}})}

                    <Divider style={{margin: 0}} />
                    <div className={styles.dropDownFooter}>
                        <OrderInput handleSortOrderChange={handleSortOrderChange}/>
                    </div>
                </div>
            )}>
            <Button onClick={() => setVisible(!visible)}>
                <IoSwapVerticalOutline size={18} color="#87898F" style={rightIconMargin}/>
                <span className={styles.dropDownLabel}>
                    Sort by: <span className={styles.dropDownSelectedValue}>{selected.radioValue}</span>
                </span>
                <IoChevronDownOutline size={14} color="#87898F"/>
            </Button>
        </Dropdown>
    )
}

export default SortInput