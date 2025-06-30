import React, { useEffect } from 'react'
import { Check, X, AlertCircle, Info } from 'lucide-react'
import './Notification.css'

const Notification = ({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <Check size={20} />
      case 'error':
        return <X size={20} />
      case 'warning':
        return <AlertCircle size={20} />
      default:
        return <Info size={20} />
    }
  }

  const getTitle = () => {
    switch (type) {
      case 'success':
        return 'Success!'
      case 'error':
        return 'Error!'
      case 'warning':
        return 'Warning!'
      default:
        return 'Info'
    }
  }

  return (
    <div className={`notification notification-${type}`}>
      <div className="notification-icon">
        {getIcon()}
      </div>
      <div className="notification-content">
        <div className="notification-title">{getTitle()}</div>
        <div className="notification-message">{message}</div>
      </div>
      <button className="notification-close" onClick={onClose}>
        <X size={16} />
      </button>
    </div>
  )
}

export default Notification 