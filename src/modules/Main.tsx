import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { Col, Input, Row, Spin, Layout } from 'antd'
import { IoSearchOutline, IoAddOutline } from 'react-icons/io5'
import ClientCard from './ClientCard'
import SortInput from '../components/SortInput'
import { getClients } from '../store/clientsSlice'
import styles from '../styles/modules/main.module.css'
import { useAppDispatch, useAppSelector, useAuth } from '../hooks'
import { Client } from '../models'

const { Content } = Layout

interface MainProps {
  handlePopups: (type: string, isEdit?: boolean) => void
}

const Main: React.FC<MainProps> = ({ handlePopups }) => {
  const dispatch = useAppDispatch()
  const isLogin = useAuth()
  const {clients, status} = useAppSelector(state => state.clientsReducer)

  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSortChange = useCallback((value: string) => {
    setSortField(value);
  }, []);

  const handleSortOrderChange = useCallback((value: string) => {
    setSortOrder(value);
  }, []);

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  const sortedAndFilteredClients = useMemo(() => {
    return clients
      .filter(client => 
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        client.surname.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        let aValue: string = a[sortField as keyof Client];
        let bValue: string = b[sortField as keyof Client];

        if (sortOrder === 'desc') {
          [aValue, bValue] = [bValue, aValue];
        }

        return aValue.localeCompare(bValue);
      });
  }, [clients, search, sortField, sortOrder]);

  return (
    <div className={styles.wrapper}>
        <Content className={styles.content}>
            {isLogin && <div onClick={() => handlePopups('form_user', false)} className={styles.newClientBtn}><IoAddOutline color='white' size={24}/></div>}

            <div className={styles.sortInputs}>
                <Input placeholder="Type to search..." value={search} onChange={handleSearchChange} className={styles.searchInput} prefix={<IoSearchOutline size={22} color='#87898F'/>}/>
                <SortInput handleSortChange={handleSortChange} handleSortOrderChange={handleSortOrderChange}/>
            </div>

            {status === 'loading' ? (
                <Spin size="large" className={styles.loader}/>
            ) : (
                <div className={styles.clientsContainer}>
                    <Row gutter={16}>
                        {sortedAndFilteredClients.map((client: Client) => (
                            <Col xs={24} sm={12} md={8} key={client.id} style={{marginTop: 20}}>
                                <ClientCard client={client} handlePopups={handlePopups}/>
                            </Col>
                        ))}
                    </Row>
                </div>
            )}
        </Content>
    </div>
  );
};

export default Main