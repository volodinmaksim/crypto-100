import React, { useState, useEffect } from 'react';
import { Menu, Spin } from 'antd';
import axios from "axios";
import CryptocurrencyCard from './components/CryptocurrencyCard';
const getItem = (label, key, icon, children = []) => ({
    label,
    key,
    icon,
    children,
    type: children.length > 0 ? 'group' : undefined
});

const App = () => {

    const [currencies, setCurrencies] = useState([])
    const [currencyId, setCurrencyId] = useState(1)
    const [currencyData, setCurrencyData] = useState(null)

    const fetchCurrencies = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/cryptocurrencies");
            const currenciesResponse = response.data;
            
            if (currenciesResponse && currenciesResponse.length > 0) {
                const menuItems = [
                    getItem('Список криптовалют', 'cryptocurrencies', null,
                        currenciesResponse.map(c => ({
                            label: c.name,
                            key: `crypto_${c.id}`,
                            value: c.id
                        }))
                    )
                ];
                setCurrencies(menuItems);
            } else {
                console.log('No cryptocurrencies found');
                setCurrencies([getItem('Нет данных', 'no-data')]);
            }
        } catch (error) {
            console.error('Error fetching currencies:', error);
            setCurrencies([getItem('Ошибка загрузки', 'error')]);
        }
    };

    const fetchCurrency = () => {
        const id = typeof currencyId === 'string' && currencyId.startsWith('crypto_') 
            ? currencyId.split('_')[1] 
            : currencyId;
            
        axios.get(`http://127.0.0.1:8000/cryptocurrencies/${id}`)
            .then(response => {
                setCurrencyData(response.data);
            })
            .catch(error => {
                console.error('Error fetching currency data:', error);
            });
    };

    useEffect(() => {
        fetchCurrencies()
    }, []);


    useEffect(() => {
        setCurrencyData(null)
        fetchCurrency()
    }, [currencyId]);

    const onClick = e => {
        setCurrencyId(e.key)
    };
    return (
        <div className="flex">
            <Menu
                onClick={onClick}
                style={{ width: 256 }}
                defaultSelectedKeys={[]}
                defaultOpenKeys={['cryptocurrencies']}
                mode="inline"
                items={currencies}
                theme="light"
                className="h-screen overflow-scroll"
            />
            <div className="mx-auto my-auto">
                {currencyData ? <CryptocurrencyCard currency={currencyData}/> : <Spin size="large"/>}
            </div>
        </div>
    );
};

export default App;