import React, { useState, useEffect } from 'react'
import { CartProvider } from './context/CartContext'
import { NotificationProvider, useNotification } from './context/NotificationContext'
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext'
import { cryptoApi } from './services/cryptoApi'
import PriceTicker from './components/PriceTicker'
import Header from './components/Header'
import Navigation from './components/Navigation'
import ContractAddressDisplay from './components/ContractAddressDisplay'
import Hero from './components/Hero'
import CryptoGrid from './components/CryptoGrid'
import CryptoDetail from './components/CryptoDetail'
import Footer from './components/Footer'
import './App.css'

function AppContent() {
  const [cryptos, setCryptos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedCrypto, setSelectedCrypto] = useState(null)
  const [customTokens, setCustomTokens] = useState([])
  const { showError, showSuccess, showInfo } = useNotification()
  const { updatePortfolioPrices } = usePortfolio()

  useEffect(() => {
    fetchCryptos()
    
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(fetchCryptos, 30000)
    
    return () => clearInterval(interval)
  }, [])

  const fetchCryptos = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const data = await cryptoApi.getTopCryptos(20)
      setCryptos(data)
      
      // Update portfolio prices with new data
      updatePortfolioPrices(data)
      
      setLoading(false)
    } catch (err) {
      console.error('Error fetching cryptos:', err)
      const errorMessage = 'Failed to load cryptocurrency data. Please try again later.'
      setError(errorMessage)
      showError(errorMessage)
      setLoading(false)
    }
  }

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    try {
      setIsSearching(true)
      const results = await cryptoApi.searchCryptos(query)
      setSearchResults(results)
      setIsSearching(false)
      
      if (results.length === 0) {
        showInfo(`No cryptocurrencies found for "${query}"`)
      } else {
        showSuccess(`Found ${results.length} cryptocurrencies matching "${query}"`)
      }
    } catch (err) {
      console.error('Error searching cryptos:', err)
      setSearchResults([])
      setIsSearching(false)
      showError('Search failed. Please try again.')
    }
  }

  const handleViewCryptoDetails = (cryptoId) => {
    setSelectedCrypto(cryptoId)
  }

  const handleCloseCryptoDetails = () => {
    setSelectedCrypto(null)
  }

  const handleAddCustomToken = (token) => {
    setCustomTokens(prev => [...prev, token])
    showSuccess(`Added your coin to the marketplace!`)
  }

  const displayCryptos = searchResults.length > 0 ? searchResults : [...cryptos, ...customTokens]

  return (
    <div className="app">
      <PriceTicker />
      <Header onSearch={handleSearch} />
      <Navigation />
      <main className="main-content">
        <ContractAddressDisplay />
        <Hero />
        <div className="container">
          {loading ? (
            <div className="loading">
              <div className="loading-spinner"></div>
              <p>Loading live cryptocurrency data...</p>
            </div>
          ) : error ? (
            <div className="error">
              <p>{error}</p>
              <button className="btn btn-primary" onClick={fetchCryptos}>
                Try Again
              </button>
            </div>
          ) : (
            <CryptoGrid 
              cryptos={displayCryptos} 
              isSearching={isSearching}
              searchResults={searchResults}
              onClearSearch={() => setSearchResults([])}
              onViewDetails={handleViewCryptoDetails}
            />
          )}
        </div>
      </main>
      <Footer />
      
      {selectedCrypto && (
        <CryptoDetail 
          cryptoId={selectedCrypto}
          onClose={handleCloseCryptoDetails}
        />
      )}
    </div>
  )
}

function App() {
  return (
    <NotificationProvider>
      <PortfolioProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </PortfolioProvider>
    </NotificationProvider>
  )
}

export default App 