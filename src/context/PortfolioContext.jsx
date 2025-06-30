import React, { createContext, useContext, useState, useEffect } from 'react'

const PortfolioContext = createContext()

export const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState([])
  const [totalValue, setTotalValue] = useState(0)
  const [totalChange, setTotalChange] = useState(0)

  // Load portfolio from localStorage on mount
  useEffect(() => {
    const savedPortfolio = localStorage.getItem('cryptazon-portfolio')
    if (savedPortfolio) {
      try {
        const portfolioData = JSON.parse(savedPortfolio)
        setPortfolio(portfolioData)
      } catch (error) {
        console.error('Error loading portfolio from localStorage:', error)
      }
    }
  }, [])

  // Save portfolio to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cryptazon-portfolio', JSON.stringify(portfolio))
  }, [portfolio])

  // Calculate portfolio value and change
  useEffect(() => {
    const calculatePortfolioMetrics = () => {
      let total = 0
      let totalChange = 0

      portfolio.forEach(holding => {
        const currentValue = holding.quantity * holding.currentPrice
        const purchaseValue = holding.quantity * holding.purchasePrice
        const change = currentValue - purchaseValue
        
        total += currentValue
        totalChange += change
      })

      setTotalValue(total)
      setTotalChange(totalChange)
    }

    calculatePortfolioMetrics()
  }, [portfolio])

  const addToPortfolio = (crypto, quantity, purchasePrice) => {
    const existingHolding = portfolio.find(h => h.id === crypto.id)
    
    if (existingHolding) {
      // Update existing holding
      const newQuantity = existingHolding.quantity + quantity
      const newTotalCost = (existingHolding.quantity * existingHolding.purchasePrice) + (quantity * purchasePrice)
      const newAveragePrice = newTotalCost / newQuantity
      
      setPortfolio(prev => prev.map(h => 
        h.id === crypto.id 
          ? { 
              ...h, 
              quantity: newQuantity, 
              purchasePrice: newAveragePrice,
              currentPrice: crypto.price,
              lastUpdated: new Date().toISOString()
            }
          : h
      ))
    } else {
      // Add new holding
      const newHolding = {
        id: crypto.id,
        name: crypto.name,
        symbol: crypto.symbol,
        quantity: quantity,
        purchasePrice: purchasePrice,
        currentPrice: crypto.price,
        image: crypto.image,
        purchaseDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      }
      
      setPortfolio(prev => [...prev, newHolding])
    }
  }

  const removeFromPortfolio = (cryptoId, quantity) => {
    const holding = portfolio.find(h => h.id === cryptoId)
    
    if (!holding) return false
    
    if (quantity >= holding.quantity) {
      // Remove entire holding
      setPortfolio(prev => prev.filter(h => h.id !== cryptoId))
    } else {
      // Reduce quantity
      setPortfolio(prev => prev.map(h => 
        h.id === cryptoId 
          ? { ...h, quantity: h.quantity - quantity }
          : h
      ))
    }
    
    return true
  }

  const updatePortfolioPrices = (cryptoData) => {
    setPortfolio(prev => prev.map(holding => {
      const crypto = cryptoData.find(c => c.id === holding.id)
      if (crypto) {
        return {
          ...holding,
          currentPrice: crypto.price,
          lastUpdated: new Date().toISOString()
        }
      }
      return holding
    }))
  }

  const getHolding = (cryptoId) => {
    return portfolio.find(h => h.id === cryptoId)
  }

  const getPortfolioStats = () => {
    const stats = {
      totalHoldings: portfolio.length,
      totalValue: totalValue,
      totalChange: totalChange,
      totalChangePercent: totalValue > 0 ? (totalChange / (totalValue - totalChange)) * 100 : 0,
      bestPerformer: null,
      worstPerformer: null
    }

    if (portfolio.length > 0) {
      const performers = portfolio.map(holding => {
        const changePercent = ((holding.currentPrice - holding.purchasePrice) / holding.purchasePrice) * 100
        return { ...holding, changePercent }
      }).sort((a, b) => b.changePercent - a.changePercent)

      stats.bestPerformer = performers[0]
      stats.worstPerformer = performers[performers.length - 1]
    }

    return stats
  }

  const clearPortfolio = () => {
    setPortfolio([])
  }

  const value = {
    portfolio,
    totalValue,
    totalChange,
    addToPortfolio,
    removeFromPortfolio,
    updatePortfolioPrices,
    getHolding,
    getPortfolioStats,
    clearPortfolio
  }

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  )
}

export const usePortfolio = () => {
  const context = useContext(PortfolioContext)
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider')
  }
  return context
} 