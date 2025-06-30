import React, { useState } from 'react'
import { Search, ShoppingCart, User, MapPin } from 'lucide-react'
import { useCart } from '../context/CartContext'
import CartPage from './CartPage'
import './Header.css'

const Header = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showCart, setShowCart] = useState(false)
  const { getCartCount } = useCart()

  const handleSearch = (e) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(searchQuery)
    }
  }

  const handleSearchChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    
    // Debounced search
    if (onSearch) {
      clearTimeout(window.searchTimeout)
      window.searchTimeout = setTimeout(() => {
        onSearch(query)
      }, 500)
    }
  }

  const handleCartClick = () => {
    setShowCart(true)
  }

  const handleCloseCart = () => {
    setShowCart(false)
  }

  if (showCart) {
    return <CartPage onClose={handleCloseCart} />
  }

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="header-top-content">
            <div className="header-left">
              <div className="logo">
                <span className="logo-text">Cryptazon</span>
              </div>
              <div className="location">
                <MapPin size={16} />
                <span>Deliver to</span>
                <span className="location-text">United States</span>
              </div>
            </div>
            
            <div className="header-center">
              <form className="search-form" onSubmit={handleSearch}>
                <div className="search-container">
                  <select className="search-category">
                    <option>All</option>
                    <option>Bitcoin</option>
                    <option>Ethereum</option>
                    <option>Altcoins</option>
                    <option>DeFi</option>
                  </select>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search cryptocurrencies..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <button type="submit" className="search-button">
                    <Search size={20} />
                  </button>
                </div>
              </form>
            </div>

            <div className="header-right">
              <div className="header-nav">
                <div className="nav-item">
                  <span>Hello, Sign in</span>
                  <span className="nav-label">Account & Lists</span>
                </div>
                <div className="nav-item">
                  <span>Returns</span>
                  <span className="nav-label">& Orders</span>
                </div>
                <div className="nav-item cart" onClick={handleCartClick}>
                  <div className="cart-icon">
                    <ShoppingCart size={24} />
                    <span className="cart-count">{getCartCount()}</span>
                  </div>
                  <span className="nav-label">Cart</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 