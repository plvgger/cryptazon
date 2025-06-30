import React, { useState } from 'react'
import { TrendingUp, TrendingDown, Star, ShoppingCart, Check, Eye } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useNotification } from '../context/NotificationContext'
import './CryptoCard.css'

const CryptoCard = ({ crypto, onViewDetails }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const { addToCart } = useCart()
  const { showSuccess: showNotification, showInfo } = useNotification()

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

  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1) {
      return `$${marketCap.toFixed(1)}B`
    } else {
      return `$${(marketCap * 1000).toFixed(1)}M`
    }
  }

  const handleBuyNow = () => {
    const total = crypto.price * quantity
    const message = `Processing purchase of ${quantity} ${crypto.symbol} for ${formatPrice(total)}...`
    
    // Show success message
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
    
    // Show notification
    showInfo(`Redirecting to checkout for ${formatPrice(total)}`)
  }

  const handleAddToCart = () => {
    addToCart(crypto, quantity)
    
    // Show success message
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
    
    // Show notification
    showNotification(`Added ${quantity} ${crypto.symbol} to cart`)
  }

  const handleQuantityChange = (e) => {
    const value = parseFloat(e.target.value) || 0
    setQuantity(Math.max(0.000001, value))
  }

  const handleViewDetails = (e) => {
    e.stopPropagation()
    if (onViewDetails) {
      onViewDetails(crypto.id)
    }
  }

  return (
    <div 
      className={`crypto-card ${isHovered ? 'hovered' : ''} ${showSuccess ? 'success' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showSuccess && (
        <div className="success-overlay">
          <Check size={24} />
          <span>Added to cart!</span>
        </div>
      )}
      
      <div className="card-header">
        <div className="crypto-info" onClick={handleViewDetails} style={{ cursor: 'pointer' }}>
          <img 
            src={crypto.image} 
            alt={crypto.name}
            className="crypto-icon"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/32x32?text=' + crypto.symbol
            }}
          />
          <div className="crypto-details">
            <h3 className="crypto-name">{crypto.name}</h3>
            <span className="crypto-symbol">{crypto.symbol}</span>
          </div>
        </div>
        <div className="crypto-actions">
          <button 
            className="view-details-btn"
            onClick={handleViewDetails}
            title="View Details"
          >
            <Eye size={16} />
          </button>
          <div className="crypto-rating">
            <Star size={16} fill="#ffd700" color="#ffd700" />
            <span>4.8</span>
          </div>
        </div>
      </div>

      <div className="card-body">
        <div className="price-section">
          <div className="current-price">{formatPrice(crypto.price)}</div>
          <div className={`price-change ${crypto.change24h >= 0 ? 'positive' : 'negative'}`}>
            {crypto.change24h >= 0 ? (
              <TrendingUp size={16} />
            ) : (
              <TrendingDown size={16} />
            )}
            {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
          </div>
        </div>

        <div className="market-info">
          <div className="market-stat">
            <span className="stat-label">Market Cap:</span>
            <span className="stat-value">{formatMarketCap(crypto.marketCap)}</span>
          </div>
          <div className="market-stat">
            <span className="stat-label">Volume:</span>
            <span className="stat-value">${crypto.volume.toFixed(1)}B</span>
          </div>
        </div>

        <div className="quantity-section">
          <label htmlFor={`quantity-${crypto.id}`}>Quantity:</label>
          <input
            id={`quantity-${crypto.id}`}
            type="number"
            min="0.000001"
            step="0.000001"
            value={quantity}
            onChange={handleQuantityChange}
            className="quantity-input"
          />
        </div>

        <div className="total-price">
          Total: {formatPrice(crypto.price * quantity)}
        </div>
      </div>

      <div className="card-actions">
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

      <div className="card-features">
        <div className="feature">
          <span className="feature-icon">⚡</span>
          <span>Instant Buy</span>
        </div>
        <div className="feature">
          <span className="feature-icon">🔒</span>
          <span>Secure</span>
        </div>
        <div className="feature">
          <span className="feature-icon">📈</span>
          <span>Live Price</span>
        </div>
      </div>
    </div>
  )
}

export default CryptoCard 