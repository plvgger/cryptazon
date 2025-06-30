import React from 'react'
import { ArrowUp } from 'lucide-react'
import './Footer.css'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="footer-content">
        <button className="back-to-top" onClick={scrollToTop}>
          <ArrowUp size={20} />
          Back to top
        </button>
        
        <div className="footer-main">
          <div className="footer-section">
            <h3>Get to Know Us</h3>
            <ul>
              <li><a href="#">About Cryptazon</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press Releases</a></li>
              <li><a href="#">Cryptazon Science</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Make Money with Us</h3>
            <ul>
              <li><a href="#">Sell cryptocurrencies</a></li>
              <li><a href="#">Become an Affiliate</a></li>
              <li><a href="#">Advertise Your Products</a></li>
              <li><a href="#">Self-Publish with Us</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Cryptazon Payment Products</h3>
            <ul>
              <li><a href="#">Cryptazon Business Card</a></li>
              <li><a href="#">Shop with Points</a></li>
              <li><a href="#">Reload Your Balance</a></li>
              <li><a href="#">Cryptazon Currency Converter</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Let Us Help You</h3>
            <ul>
              <li><a href="#">Cryptazon and COVID-19</a></li>
              <li><a href="#">Your Account</a></li>
              <li><a href="#">Your Orders</a></li>
              <li><a href="#">Shipping Rates & Policies</a></li>
              <li><a href="#">Returns & Replacements</a></li>
              <li><a href="#">Help</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-links">
            <a href="#">Conditions of Use</a>
            <a href="#">Privacy Notice</a>
            <a href="#">Interest-Based Ads</a>
            <a href="#">© 1996-2024, Cryptazon.com, Inc. or its affiliates</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 