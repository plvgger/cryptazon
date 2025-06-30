import axios from 'axios'

const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3'

// Cache for API responses to avoid rate limiting
const cache = new Map()
const CACHE_DURATION = 30000 // 30 seconds

export const cryptoApi = {
  // Get top cryptocurrencies by market cap
  async getTopCryptos(limit = 20) {
    const cacheKey = `top-${limit}`
    const cached = cache.get(cacheKey)
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data
    }

    try {
      const response = await axios.get(`${COINGECKO_API_BASE}/coins/markets`, {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: limit,
          page: 1,
          sparkline: false,
          price_change_percentage: '24h'
        }
      })

      const cryptos = response.data.map(coin => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol.toUpperCase(),
        price: coin.current_price,
        change24h: coin.price_change_percentage_24h,
        marketCap: coin.market_cap / 1e9, // Convert to billions
        volume: coin.total_volume / 1e9, // Convert to billions
        image: coin.image,
        high24h: coin.high_24h,
        low24h: coin.low_24h,
        circulatingSupply: coin.circulating_supply,
        totalSupply: coin.total_supply,
        maxSupply: coin.max_supply
      }))

      cache.set(cacheKey, {
        data: cryptos,
        timestamp: Date.now()
      })

      return cryptos
    } catch (error) {
      console.error('Error fetching crypto data:', error)
      // Return fallback data if API fails
      return getFallbackData()
    }
  },

  // Search cryptocurrencies
  async searchCryptos(query) {
    if (!query.trim()) return []
    
    try {
      const response = await axios.get(`${COINGECKO_API_BASE}/search`, {
        params: { query }
      })

      const coinIds = response.data.coins.slice(0, 10).map(coin => coin.id)
      
      if (coinIds.length === 0) return []

      const pricesResponse = await axios.get(`${COINGECKO_API_BASE}/coins/markets`, {
        params: {
          vs_currency: 'usd',
          ids: coinIds.join(','),
          order: 'market_cap_desc',
          sparkline: false,
          price_change_percentage: '24h'
        }
      })

      return pricesResponse.data.map(coin => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol.toUpperCase(),
        price: coin.current_price,
        change24h: coin.price_change_percentage_24h,
        marketCap: coin.market_cap / 1e9,
        volume: coin.total_volume / 1e9,
        image: coin.image
      }))
    } catch (error) {
      console.error('Error searching cryptos:', error)
      return []
    }
  },

  // Get detailed info for a specific cryptocurrency
  async getCryptoDetails(id) {
    const cacheKey = `details-${id}`
    const cached = cache.get(cacheKey)
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data
    }

    try {
      const response = await axios.get(`${COINGECKO_API_BASE}/coins/${id}`)
      const coin = response.data

      const details = {
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol.toUpperCase(),
        price: coin.market_data.current_price.usd,
        change24h: coin.market_data.price_change_percentage_24h,
        marketCap: coin.market_data.market_cap.usd / 1e9,
        volume: coin.market_data.total_volume.usd / 1e9,
        image: coin.image.large,
        description: coin.description.en,
        high24h: coin.market_data.high_24h.usd,
        low24h: coin.market_data.low_24h.usd,
        circulatingSupply: coin.market_data.circulating_supply,
        totalSupply: coin.market_data.total_supply,
        maxSupply: coin.market_data.max_supply,
        marketCapRank: coin.market_cap_rank,
        genesisDate: coin.genesis_date,
        lastUpdated: coin.last_updated
      }

      cache.set(cacheKey, {
        data: details,
        timestamp: Date.now()
      })

      return details
    } catch (error) {
      console.error('Error fetching crypto details:', error)
      return null
    }
  }
}

// Fallback data in case API is unavailable
function getFallbackData() {
  return [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 43250.67,
      change24h: 2.45,
      marketCap: 847.2,
      volume: 28.5,
      image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png'
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      price: 2650.34,
      change24h: -1.23,
      marketCap: 318.7,
      volume: 15.2,
      image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png'
    },
    {
      id: 'binance-coin',
      name: 'BNB',
      symbol: 'BNB',
      price: 312.45,
      change24h: 0.87,
      marketCap: 48.9,
      volume: 2.1,
      image: 'https://cryptologos.cc/logos/bnb-bnb-logo.png'
    },
    {
      id: 'solana',
      name: 'Solana',
      symbol: 'SOL',
      price: 98.76,
      change24h: 5.67,
      marketCap: 42.3,
      volume: 3.8,
      image: 'https://cryptologos.cc/logos/solana-sol-logo.png'
    },
    {
      id: 'cardano',
      name: 'Cardano',
      symbol: 'ADA',
      price: 0.52,
      change24h: -0.34,
      marketCap: 18.4,
      volume: 1.2,
      image: 'https://cryptologos.cc/logos/cardano-ada-logo.png'
    },
    {
      id: 'polkadot',
      name: 'Polkadot',
      symbol: 'DOT',
      price: 7.23,
      change24h: 1.89,
      marketCap: 9.1,
      volume: 0.8,
      image: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png'
    }
  ]
} 