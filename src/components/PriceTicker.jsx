import React, { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cryptoApi } from '../services/cryptoApi'
import './PriceTicker.css'

const PriceTicker = () => {
  const [tickerData, setTickerData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchTickerData()
    
    // Update ticker every 10 seconds
    const interval = setInterval(fetchTickerData, 10000)
    
    return () => clearInterval(interval)
  }, [])

  const fetchTickerData = async () => {
    try {
      const data = await cryptoApi.getTopCryptos(10)
      setTickerData(data)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching ticker data:', error)
    }
  }

  const formatPrice = (price) => {
    if (price >= 1) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(price)
    } else {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
      }).format(price)
    }
  }

  if (isLoading) {
    return (
      <div className="price-ticker">
        <div className="ticker-content">
          <div className="loading-ticker">
            <div className="ticker-spinner"></div>
            <span>Loading live prices...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="price-ticker">
      <div className="ticker-content">
        <div className="ticker-label">Live Prices:</div>
        <div className="ticker-items">
          {tickerData.map((crypto, index) => (
            <div key={crypto.id} className="ticker-item" style={{ animationDelay: `${index * 0.5}s` }}>
              <span className="ticker-symbol">{crypto.symbol}</span>
              <span className="ticker-price">{formatPrice(crypto.price)}</span>
              <span className={`ticker-change ${crypto.change24h >= 0 ? 'positive' : 'negative'}`}>
                {crypto.change24h >= 0 ? (
                  <TrendingUp size={12} />
                ) : (
                  <TrendingDown size={12} />
                )}
                {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PriceTicker 