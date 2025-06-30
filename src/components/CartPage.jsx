import React from 'react'
import { Trash2, ShoppingCart, ArrowLeft } from 'lucide-react'
import { useCart } from '../context/CartContext'
import './CartPage.css'

const CartPage = ({ onClose }) => {
  const { items, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart()

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price)
  }

  const handleCheckout = () => {
    const total = getCartTotal()
    alert(`Proceeding to checkout for ${formatPrice(total)}`)
  }

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-header">
          <button className="back-btn" onClick={onClose}>
            <ArrowLeft size={20} />
            Continue Shopping
          </button>
          <h1>Your Cart</h1>
        </div>
        <div className="empty-cart">
          <ShoppingCart size={64} color="#ccc" />
          <h2>Your cart is empty</h2>
          <p>Add some cryptocurrencies to get started!</p>
          <button className="btn btn-primary" onClick={onClose}>
            Start Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <button className="back-btn" onClick={onClose}>
          <ArrowLeft size={20} />
          Continue Shopping
        </button>
        <h1>Your Cart ({items.length} items)</h1>
        <button className="clear-cart-btn" onClick={clearCart}>
          <Trash2 size={16} />
          Clear Cart
        </button>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <img 
                src={item.image} 
                alt={item.name}
                className="item-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/48x48?text=' + item.symbol
                }}
              />
              <div className="item-details">
                <h3>{item.name}</h3>
                <span className="item-symbol">{item.symbol}</span>
                <div className="item-price">{formatPrice(item.price)}</div>
              </div>
              <div className="item-quantity">
                <label>Quantity:</label>
                <input
                  type="number"
                  min="0.000001"
                  step="0.000001"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, e.target.value)}
                  className="quantity-input"
                />
              </div>
              <div className="item-total">
                {formatPrice(item.price * item.quantity)}
              </div>
              <button 
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>{formatPrice(getCartTotal())}</span>
          </div>
          <div className="summary-row">
            <span>Fees:</span>
            <span>{formatPrice(getCartTotal() * 0.01)}</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>{formatPrice(getCartTotal() * 1.01)}</span>
          </div>
          <button 
            className="btn btn-primary checkout-btn"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartPage 