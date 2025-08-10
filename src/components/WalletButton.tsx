import React from 'react'
import { Wallet, ExternalLink, AlertCircle } from 'lucide-react'
import { useWallet } from '../hooks/useWallet'

const WalletButton: React.FC = () => {
  const { account, isConnected, isConnecting, connect, disconnect, balance, error } = useWallet()

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const formatBalance = (balance: string) => {
    const num = parseFloat(balance)
    return num.toFixed(4)
  }

  // Show error state
  if (error) {
    return (
      <div className="relative group">
        <button 
          onClick={connect}
          className="flex items-center space-x-2 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-xl px-3 py-2 hover:bg-red-500/30 transition-all"
        >
          <AlertCircle className="h-4 w-4 text-red-600" />
          <span className="text-sm font-medium text-red-700">
            Wallet Error
          </span>
        </button>

        {/* Error Tooltip */}
        <div className="absolute right-0 mt-2 w-64 bg-white/90 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-3 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          <p className="text-sm text-red-600 font-medium mb-2">Connection Error</p>
          <p className="text-xs text-gray-600">{error}</p>
          <button
            onClick={connect}
            className="mt-2 w-full bg-red-500 text-white text-xs py-1 px-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  // Show connected state
  if (isConnected && account) {
    return (
      <div className="relative group">
        <button className="flex items-center space-x-2 bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-xl px-3 py-2 hover:bg-green-500/30 transition-all">
          <Wallet className="h-4 w-4 text-green-600" />
          <span className="text-sm font-medium text-green-700">
            {formatAddress(account)}
          </span>
        </button>

        {/* Wallet Dropdown */}
        <div className="absolute right-0 mt-2 w-64 bg-white/90 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
          <div className="px-4 py-3 border-b border-gray-200/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">MetaMask Connected</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-xs text-gray-600 font-mono break-all">{account}</p>
            {balance && (
              <p className="text-sm font-semibold text-gray-900 mt-2">
                {formatBalance(balance)} ETH
              </p>
            )}
          </div>
          
          <div className="py-2">
            <a
              href={`https://etherscan.io/address/${account}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100/50 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>View on Etherscan</span>
            </a>
            <button
              onClick={disconnect}
              className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50/50 transition-colors w-full text-left"
            >
              <Wallet className="h-4 w-4" />
              <span>Disconnect Wallet</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Show connect button
  return (
    <button
      onClick={connect}
      disabled={isConnecting}
      className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl px-3 py-2 hover:bg-white/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
    >
      <Wallet className="h-4 w-4 text-gray-700" />
      <span className="text-sm font-medium text-gray-700">
        {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
      </span>
    </button>
  )
}

export default WalletButton
