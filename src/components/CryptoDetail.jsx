import React, { useState, useEffect } from 'react'
import { ArrowLeft, TrendingUp, TrendingDown, Star, ShoppingCart, Check, BarChart3 } from 'lucide-react'
import { cryptoApi } from '../services/cryptoApi'
import { useCart } from '../context/CartContext'
import './CryptoDetail.css'

const CryptoDetail = ({ cryptoId, onClose }) => {
  const [crypto, setCrypto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    fetchCryptoDetails()
  }, [cryptoId])

  const fetchCryptoDetails = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await cryptoApi.getCryptoDetails(cryptoId)
      setCrypto(data)
      setLoading(false)
    } catch (err) {
      console.error('Error fetching crypto details:', err)
      setError('Failed to load cryptocurrency details')
      setLoading(false)
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

  const formatNumber = (num) => {
    if (num >= 1e9) {
      return (num / 1e9).toFixed(2) + 'B'
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(2) + 'M'
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(2) + 'K'
    }
    return num.toLocaleString()
  }

  const handleAddToCart = () => {
    addToCart(crypto, quantity)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  const handleBuyNow = () => {
    const total = crypto.price * quantity
    alert(`Redirecting to checkout for ${formatPrice(total)}`)
  }

  if (loading) {
    return (
      <div className="crypto-detail-overlay">
        <div className="crypto-detail">
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading cryptocurrency details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !crypto) {
    return (
      <div className="crypto-detail-overlay">
        <div className="crypto-detail">
          <div className="error">
            <p>{error || 'Cryptocurrency not found'}</p>
            <button className="btn btn-primary" onClick={onClose}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="crypto-detail-overlay" onClick={onClose}>
      <div className="crypto-detail" onClick={(e) => e.stopPropagation()}>
        <div className="detail-header">
          <button className="back-btn" onClick={onClose}>
            <ArrowLeft size={20} />
            Back to All Cryptocurrencies
          </button>
          <div className="crypto-basic-info">
            <img 
              src={crypto.image} 
              alt={crypto.name}
              className="crypto-icon-large"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/64x64?text=' + crypto.symbol
              }}
            />
            <div className="crypto-title">
              <h1>{crypto.name}</h1>
              <span className="crypto-symbol">{crypto.symbol}</span>
              <div className="crypto-rating">
                <Star size={16} fill="#ffd700" color="#ffd700" />
                <span>4.8</span>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-content">
          <div className="detail-main">
            <div className="price-section">
              <div className="current-price-large">{formatPrice(crypto.price)}</div>
              <div className={`price-change-large ${crypto.change24h >= 0 ? 'positive' : 'negative'}`}>
                {crypto.change24h >= 0 ? (
                  <TrendingUp size={20} />
                ) : (
                  <TrendingDown size={20} />
                )}
                {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
              </div>
            </div>

            <div className="market-stats">
              <div className="stat-card">
                <h3>Market Cap</h3>
                <span className="stat-value">${formatNumber(crypto.marketCap * 1e9)}</span>
                <span className="stat-rank">Rank #{crypto.marketCapRank}</span>
              </div>
              <div className="stat-card">
                <h3>24h Volume</h3>
                <span className="stat-value">${formatNumber(crypto.volume * 1e9)}</span>
              </div>
              <div className="stat-card">
                <h3>Circulating Supply</h3>
                <span className="stat-value">{formatNumber(crypto.circulatingSupply)} {crypto.symbol}</span>
              </div>
              <div className="stat-card">
                <h3>24h High</h3>
                <span className="stat-value">{formatPrice(crypto.high24h)}</span>
              </div>
              <div className="stat-card">
                <h3>24h Low</h3>
                <span className="stat-value">{formatPrice(crypto.low24h)}</span>
              </div>
            </div>

            {crypto.description && (
              <div className="description-section">
                <h3>About {crypto.name}</h3>
                <p>{crypto.description.substring(0, 500)}...</p>
              </div>
            )}
          </div>

          <div className="detail-sidebar">
            <div className="purchase-card">
              <h3>Purchase {crypto.symbol}</h3>
              
              <div className="quantity-section">
                <label htmlFor="detail-quantity">Quantity:</label>
                <input
                  id="detail-quantity"
                  type="number"
                  min="0.000001"
                  step="0.000001"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(0.000001, parseFloat(e.target.value) || 0))}
                  className="quantity-input"
                />
              </div>

              <div className="total-section">
                <span>Total:</span>
                <span className="total-price">{formatPrice(crypto.price * quantity)}</span>
              </div>

              <div className="purchase-actions">
                <button 
                  className="btn btn-primary buy-now-btn"
                  onClick={handleBuyNow}
                  disabled={quantity <= 0}
                >
                  Buy Now
                </button>
                <button 
                  className="btn btn-secondary add-to-cart-btn"
                  onClick={handleAddToCart}
                  disabled={quantity <= 0}
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
              </div>

              {showSuccess && (
                <div className="success-message">
                  <Check size={16} />
                  Added to cart!
                </div>
              )}
            </div>

            <div className="features-card">
              <h3>Features</h3>
              <div className="feature-list">
                <div className="feature-item">
                  <span className="feature-icon">⚡</span>
                  <span>Instant Buy/Sell</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🔒</span>
                  <span>Secure Trading</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📈</span>
                  <span>Real-time Prices</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">💳</span>
                  <span>Multiple Payment Methods</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CryptoDetail 