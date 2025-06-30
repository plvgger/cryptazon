import React, { useState } from 'react'
import { Plus, CheckCircle } from 'lucide-react'
import './ContractAddressInput.css'

const ContractAddressInput = ({ onAddToken }) => {
  const [contractAddress, setContractAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!contractAddress.trim()) return

    setIsLoading(true)
    
    // Create a simple token object
    const token = {
      id: `custom-${contractAddress}`,
      name: 'My Token',
      symbol: 'MTK',
      price: 0.0001,
      change24h: 0,
      marketCap: 0.1,
      volume: 0.01,
      image: 'https://cryptologos.cc/logos/solana-sol-logo.png',
      contractAddress: contractAddress,
      isCustom: true
    }

    if (onAddToken) {
      onAddToken(token)
    }

    setSuccess(true)
    setContractAddress('')
    
    setTimeout(() => {
      setSuccess(false)
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="contract-address-input">
      <form onSubmit={handleSubmit} className="ca-form">
        <div className="ca-input-group">
          <input
            type="text"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            placeholder="Enter your coin's contract address (CA)..."
            className="ca-input"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="ca-button"
            disabled={isLoading || !contractAddress.trim()}
          >
            {isLoading ? (
              <div className="ca-spinner"></div>
            ) : success ? (
              <CheckCircle size={20} />
            ) : (
              <Plus size={20} />
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ContractAddressInput 