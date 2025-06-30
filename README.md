# Cryptazon - Amazon-Style Cryptocurrency Exchange

Cryptazon is a modern web application that combines the familiar Amazon shopping experience with cryptocurrency trading functionality. Built with React and styled to look exactly like Amazon, it provides an intuitive interface for buying, selling, and trading cryptocurrencies.

## Features

- **Amazon-Style Design**: Complete replica of Amazon's visual design and user experience
- **Cryptocurrency Trading**: Buy, sell, and trade popular cryptocurrencies
- **Real-time Pricing**: Live cryptocurrency prices and market data
- **Shopping Cart**: Add cryptocurrencies to cart for batch purchases
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Search & Filter**: Find cryptocurrencies by name, price, or market performance
- **Interactive Cards**: Hover effects and detailed cryptocurrency information

## Technologies Used

- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **Lucide React**: Beautiful and consistent icons
- **CSS3**: Custom styling with Amazon's design system
- **Responsive Design**: Mobile-first approach

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Cryptazon
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx      # Amazon-style header with search
│   ├── Navigation.jsx  # Secondary navigation bar
│   ├── Hero.jsx        # Hero section with stats
│   ├── CryptoGrid.jsx  # Grid layout for crypto cards
│   ├── CryptoCard.jsx  # Individual crypto product card
│   └── Footer.jsx      # Amazon-style footer
├── App.jsx             # Main application component
├── main.jsx           # React entry point
└── index.css          # Global styles and CSS variables
```

## Design System

The application uses Amazon's exact color palette and design patterns:

- **Primary Colors**: Amazon Orange (#ff9900), Amazon Blue (#232f3e)
- **Typography**: Amazon's font stack and sizing
- **Components**: Amazon-style buttons, cards, and navigation
- **Layout**: Amazon's grid system and spacing

## Features in Detail

### Cryptocurrency Cards
- Real-time price display
- 24-hour price change indicators
- Market cap and volume information
- Quantity selector for purchases
- Buy Now and Add to Cart functionality
- Star ratings and security badges

### Search & Filter
- Search cryptocurrencies by name or symbol
- Sort by price, market cap, or 24h change
- Filter by gainers, losers, or all coins
- Category-based filtering

### Responsive Design
- Mobile-optimized layout
- Touch-friendly interface
- Adaptive grid system
- Optimized for all screen sizes

## Future Enhancements

- Real API integration with CoinGecko or CoinMarketCap
- User authentication and account management
- Portfolio tracking and analytics
- Advanced trading features
- Payment processing integration
- Real-time price updates via WebSocket

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This is a demonstration project and does not involve real cryptocurrency trading. All prices and data are simulated for educational purposes only. 