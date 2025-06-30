import React, { useState } from 'react'
import { Menu, ChevronDown } from 'lucide-react'
import './Navigation.css'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const categories = [
    'All',
    'Bitcoin',
    'Ethereum', 
    'Altcoins',
    'DeFi Tokens',
    'NFTs',
    'Staking',
    'Trading Pairs',
    'Portfolio',
    'Learn'
  ]

  return (
    <nav className="navigation">
      <div className="container">
        <div className="nav-content">
          <div className="nav-left">
            <button 
              className="menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={20} />
              <span>All</span>
            </button>
            
            <div className="nav-categories">
              {categories.map((category, index) => (
                <a key={index} href="#" className="nav-category">
                  {category}
                </a>
              ))}
            </div>
          </div>
          
          <div className="nav-right">
            <a href="#" className="nav-link">Today's Deals</a>
            <a href="#" className="nav-link">Customer Service</a>
            <a href="#" className="nav-link">Registry</a>
            <a href="#" className="nav-link">Gift Cards</a>
            <a href="#" className="nav-link">Sell</a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation 