import React, { useState } from 'react'
import { Plus, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react'
import './PumpFunInput.css'

const PumpFunInput = ({ onAddToken }) => {
  const [contractAddress, setContractAddress] = useState('')
  const [tokenName, setTokenName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const validateContractAddress = (address) => {
    // Basic Solana address validation (base58, 32-44 characters)
    const solanaAddressRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/
    return solanaAddressRegex.test(address)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!contractAddress.trim()) {
      setError('Please enter a contract address')
      return
    }

    if (!validateContractAddress(contractAddress)) {
      setError('Please enter a valid Solana contract address')
      return
    }

    if (!tokenName.trim()) {
      setError('Please enter a token name')
      return
    }

    if (!tokenSymbol.trim()) {
      setError('Please enter a token symbol')
      return
    }

    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      // Create a mock token object for the pump.fun token
      const pumpFunToken = {
        id: `pump-${contractAddress}`,
        name: tokenName,
        symbol: tokenSymbol.toUpperCase(),
        price: 0.0001, // Default price for new tokens
        change24h: 0,
        marketCap: 0.1,
        volume: 0.01,
        image: 'https://cryptologos.cc/logos/solana-sol-logo.png', // Default Solana logo
        contractAddress: contractAddress,
        isPumpFun: true,
        description: `Custom pump.fun token: ${tokenName} (${tokenSymbol.toUpperCase()})`
      }

      // Call the parent component's callback
      if (onAddToken) {
        onAddToken(pumpFunToken)
      }

      setSuccess(`Successfully added ${tokenName} (${tokenSymbol.toUpperCase()})`)
      
      // Reset form
      setContractAddress('')
      setTokenName('')
      setTokenSymbol('')
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000)
      
    } catch (err) {
      setError('Failed to add token. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleContractAddressChange = (e) => {
    const address = e.target.value
    setContractAddress(address)
    
    // Clear error when user starts typing
    if (error) {
      setError('')
    }
  }

  return (
    <div className="pump-fun-input">
      <div className="pump-fun-header">
        <h3>Add Pump.fun Token</h3>
        <p>Enter the contract address of a pump.fun token to add it to your portfolio</p>
      </div>

      <form onSubmit={handleSubmit} className="pump-fun-form">
        <div className="form-group">
          <label htmlFor="contract-address">Contract Address (CA)</label>
          <input
            id="contract-address"
            type="text"
            value={contractAddress}
            onChange={handleContractAddressChange}
            placeholder="Enter Solana contract address..."
            className="form-input"
            disabled={isLoading}
          />
          <small className="form-help">
            Enter the full Solana contract address from pump.fun
          </small>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="token-name">Token Name</label>
            <input
              id="token-name"
              type="text"
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
              placeholder="e.g., My Token"
              className="form-input"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="token-symbol">Token Symbol</label>
            <input
              id="token-symbol"
              type="text"
              value={tokenSymbol}
              onChange={(e) => setTokenSymbol(e.target.value)}
              placeholder="e.g., MTK"
              className="form-input"
              disabled={isLoading}
              maxLength={10}
            />
          </div>
        </div>

        {error && (
          <div className="error-message">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="success-message">
            <CheckCircle size={16} />
            <span>{success}</span>
          </div>
        )}

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary add-token-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="loading-spinner"></div>
                Adding Token...
              </>
            ) : (
              <>
                <Plus size={16} />
                Add Token
              </>
            )}
          </button>
        </div>
      </form>

      <div className="pump-fun-info">
        <h4>How to find your contract address:</h4>
        <ol>
          <li>Go to <a href="https://pump.fun" target="_blank" rel="noopener noreferrer">
            pump.fun <ExternalLink size={12} />
          </a></li>
          <li>Find your token on the platform</li>
          <li>Copy the contract address (CA) from the token details</li>
          <li>Paste it above and add a name/symbol</li>
        </ol>
        
        <div className="info-note">
          <strong>Note:</strong> This feature adds tokens to your local portfolio. 
          Prices and data may be limited for custom tokens.
        </div>
      </div>
    </div>
  )
}

export default PumpFunInput 