import React, {FC, useState} from "react"
import { Button } from 'antd'
import { IoArrowUpOutline, IoArrowDownOutline } from 'react-icons/io5'
import styles from '../styles/components/orderInput.module.css'
import { rightIconMargin } from "../styles/inLineStyles"

interface OrderInputProps {
    handleSortOrderChange: (value: string) => void
}

const OrderInput: FC<OrderInputProps> = ({handleSortOrderChange}) => {
    const [activeButton, setActiveButton] = useState('asc');

      const handleButtonClick = (value: string) => {
        handleSortOrderChange(value)

        setActiveButton(value)
    };

    return (
        <div className={styles.wrapper}>
            <Button
                className={styles.btn}
                type={activeButton === 'asc' ? 'primary' : 'ghost'} 
                onClick={() => handleButtonClick('asc')}>
                <IoArrowUpOutline size={18} style={rightIconMargin}/>
                Asc.
            </Button>

            <Button 
                className={styles.btn}
                type={activeButton === 'desc' ? 'primary' : 'ghost'} 
                onClick={() => handleButtonClick('desc')}>
                <IoArrowDownOutline size={18} style={rightIconMargin}/>
                Desc.
            </Button>
        </div>
    )
}

export default OrderInput