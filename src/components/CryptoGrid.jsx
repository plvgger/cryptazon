import React, { useState } from 'react'
import { X } from 'lucide-react'
import CryptoCard from './CryptoCard'
import './CryptoGrid.css'

const CryptoGrid = ({ cryptos, isSearching, searchResults, onClearSearch, onViewDetails }) => {
  const [sortBy, setSortBy] = useState('name')
  const [filterBy, setFilterBy] = useState('all')

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'price', label: 'Price' },
    { value: 'change24h', label: '24h Change' },
    { value: 'marketCap', label: 'Market Cap' }
  ]

  const filterOptions = [
    { value: 'all', label: 'All Coins' },
    { value: 'positive', label: 'Gainers' },
    { value: 'negative', label: 'Losers' }
  ]

  const sortedCryptos = [...cryptos].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return b.price - a.price
      case 'change24h':
        return b.change24h - a.change24h
      case 'marketCap':
        return b.marketCap - a.marketCap
      default:
        return a.name.localeCompare(b.name)
    }
  })

  const filteredCryptos = sortedCryptos.filter(crypto => {
    if (filterBy === 'positive') return crypto.change24h > 0
    if (filterBy === 'negative') return crypto.change24h < 0
    return true
  })

  const isSearchActive = searchResults && searchResults.length > 0

  return (
    <div className="crypto-grid-container">
      {/* Search Results Header */}
      {isSearchActive && (
        <div className="search-results-header">
          <div className="search-info">
            <h2>Search Results</h2>
            <span className="results-count">{searchResults.length} cryptocurrencies found</span>
          </div>
          <button 
            className="btn btn-secondary clear-search-btn"
            onClick={onClearSearch}
          >
            <X size={16} />
            Clear Search
          </button>
        </div>
      )}

      {/* Controls */}
      <div className="crypto-controls">
        <div className="control-group">
          <label htmlFor="sort-select">Sort by:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="control-select"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="control-group">
          <label htmlFor="filter-select">Filter:</label>
          <select
            id="filter-select"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="control-select"
          >
            {filterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="results-count">
          {isSearching ? (
            <span className="searching-indicator">Searching...</span>
          ) : (
            `${filteredCryptos.length} cryptocurrencies found`
          )}
        </div>
      </div>

      {/* Loading State */}
      {isSearching && (
        <div className="search-loading">
          <div className="loading-spinner"></div>
          <p>Searching cryptocurrencies...</p>
        </div>
      )}

      {/* Crypto Grid */}
      {!isSearching && (
        <div className="crypto-grid">
          {filteredCryptos.length > 0 ? (
            filteredCryptos.map(crypto => (
              <CryptoCard 
                key={crypto.id} 
                crypto={crypto} 
                onViewDetails={onViewDetails}
              />
            ))
          ) : (
            <div className="no-results">
              <p>No cryptocurrencies found matching your criteria.</p>
              {isSearchActive && (
                <button 
                  className="btn btn-primary"
                  onClick={onClearSearch}
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CryptoGrid


