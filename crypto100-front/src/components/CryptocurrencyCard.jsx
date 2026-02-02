import { Card, Tag } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

function CryptocurrencyCard({ currency }) {
    const priceChange = currency.quote.USD.percent_change_24h;
    const isPositiveChange = priceChange >= 0;
    
    // Format market cap and volume
    const formatNumber = (num) => {
        if (num >= 1e9) {
            return `$${(num / 1e9).toFixed(2)}B`;
        }
        if (num >= 1e6) {
            return `$${(num / 1e6).toFixed(2)}M`;
        }
        return `$${num.toFixed(2)}`;
    };

    return (
        <div className="p-4 w-full max-w-md">
            <Card 
                hoverable
                className="shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <img 
                            src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`}
                            className="h-10 w-10 object-contain"
                            alt={currency.name}
                        />
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">{currency.name}</h2>
                            <span className="text-gray-500 text-sm">{currency.symbol}</span>
                        </div>
                    </div>
                    <Tag color={isPositiveChange ? 'green' : 'red'} className="font-medium">
                        {isPositiveChange ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                        {Math.abs(priceChange).toFixed(2)}%
                    </Tag>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Цена:</span>
                        <span className="text-lg font-semibold">
                            ${Number(currency.quote.USD.price).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 6
                            })}
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Рыночная капитализация:</span>
                        <span className="font-medium">{formatNumber(currency.quote.USD.market_cap)}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Объем (24ч):</span>
                        <span className="font-medium">{formatNumber(currency.quote.USD.volume_24h)}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Изменение (24ч):</span>
                        <span className={`font-medium ${isPositiveChange ? 'text-green-500' : 'text-red-500'}`}>
                            {isPositiveChange ? '+' : ''}{priceChange.toFixed(2)}%
                        </span>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default CryptocurrencyCard;
