import React from 'react'
import './Hero.css'
import { Lock, DollarSign, Zap, Star } from 'lucide-react'

const Hero = () => {
  return (
    <div className="hero hero-amazon-banner">
      <div className="hero-amazon-content">
        <h1 className="hero-amazon-title">
          Welcome to <span className="brand">Cryptazon</span>
        </h1>
        <p className="hero-amazon-subtitle">
          Buy, sell, and trade crypto with the world's most trusted exchange.
        </p>
        <button className="btn btn-primary hero-amazon-cta">Start Trading Now</button>
        <div className="hero-amazon-trustbar">
          <div className="trustbar-item"><Lock size={20} /> Secure</div>
          <div className="trustbar-item"><DollarSign size={20} /> Low Fees</div>
          <div className="trustbar-item"><Zap size={20} /> Fast</div>
          <div className="trustbar-item"><Star size={20} fill="#ffd700" color="#ffd700" /> 4.9/5 Trustpilot</div>
        </div>
      </div>
    </div>
  )
}

export default Hero 