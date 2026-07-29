import React, { useState } from 'react'

interface DepositProps {
  onBack: () => void
}

const NIGERIAN_BANKS = [
  'Access Bank', 'GTBank', 'Zenith Bank', 'First Bank', 'UBA', 'Fidelity Bank',
  'Union Bank', 'Stanbic IBTC', 'Sterling Bank', 'Wema Bank', 'Polaris Bank',
  'FCMB', 'Keystone Bank', 'Unity Bank', 'Jaiz Bank', 'OPay', 'Kuda Bank'
]

// Custom Vector Logo Components for Modern UI
const BankIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
  </svg>
)

const OpayLogo = () => (
  <div className="flex items-center gap-1.5 font-black tracking-tight select-none">
    <svg width="22" height="22" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 5C25.1472 5 5 25.1472 5 50C5 74.8528 25.1472 95 50 95C74.8528 95 95 74.8528 95 50C95 40.5 92.1 31.7 87.1 24.3" stroke="#00C896" strokeWidth="16" strokeLinecap="round" />
      <rect x="2" y="42" width="28" height="16" rx="4" fill="#1b1464" />
    </svg>
    <span className="text-white text-base font-extrabold tracking-normal">OPay</span>
  </div>
)

const UssdIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </svg>
)

const PagaIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v8M8 12h8" />
  </svg>
)

const CardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10h20" />
  </svg>
)

export default function Deposit({ onBack }: DepositProps) {
  const [activeTab, setActiveTab] = useState<'crypto' | 'fiat'>('fiat')
  const [selectedMethod, setSelectedMethod] = useState('bank')
  const [selectedBank, setSelectedBank] = useState('')
  const [amount, setAmount] = useState('')
  const [selectedCrypto, setSelectedCrypto] = useState('USDT-TRC20')

  const handleContinue = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount')
      return
    }
    if (activeTab === 'fiat' && selectedMethod === 'bank' && !selectedBank) {
      alert('Please select a bank')
      return
    }
    alert(`Deposit of ₦${parseFloat(amount).toLocaleString()} submitted via ${activeTab === 'fiat' ? selectedMethod : selectedCrypto}. Awaiting Admin confirmation.`)
  }

  return (
    <div className="min-h-screen bg-[#0f1115] text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#1a1d23]/85 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-bold">Deposit</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        <div className="rounded-2xl bg-[#161920] border border-white/10 overflow-hidden shadow-2xl">
          
          {/* Tabs - Crypto / Fiat */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setActiveTab('crypto')}
              className={`flex-1 py-3.5 text-sm font-semibold transition-all ${
                activeTab === 'crypto' 
                  ? 'text-[#24EE89] border-b-2 border-[#24EE89] bg-[#24EE89]/5' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Crypto
            </button>
            <button
              onClick={() => setActiveTab('fiat')}
              className={`flex-1 py-3.5 text-sm font-semibold transition-all ${
                activeTab === 'fiat' 
                  ? 'text-[#24EE89] border-b-2 border-[#24EE89] bg-[#24EE89]/5' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Fiat (NGN)
            </button>
          </div>

          <div className="p-5 space-y-5">

            {/* ========== FIAT TAB ========== */}
            {activeTab === 'fiat' && (
              <>
                {/* Currency */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-400">Currency</span>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                    <span className="text-lg">🇳🇬</span>
                    <span className="font-medium text-sm">NGN</span>
                  </div>
                </div>

                {/* Deposit Method Grid */}
                <div>
                  <p className="text-sm text-zinc-400 mb-3">Select Payment Method</p>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'bank', label: 'Bank Transfer', icon: <BankIcon /> },
                      { id: 'opay', label: 'Opay', icon: <OpayLogo /> },
                      { id: 'ussd', label: 'USSD', icon: <UssdIcon /> },
                      { id: 'paga', label: 'Paga', icon: <PagaIcon /> },
                      { id: 'card', label: 'Credit Card', icon: <CardIcon /> },
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setSelectedMethod(m.id)}
                        className={`flex flex-col items-center justify-center gap-2 p-3.5 rounded-xl border transition-all relative ${
                          selectedMethod === m.id
                            ? 'border-[#24EE89] bg-[#24EE89]/10 shadow-[0_0_15px_rgba(36,238,137,0.15)] text-[#24EE89]'
                            : 'border-white/10 bg-white/[0.03] hover:bg-white/5 text-zinc-300'
                        }`}
                      >
                        <div className="h-8 flex items-center justify-center">{m.icon}</div>
                        <span className="text-[11px] font-medium text-center leading-tight">{m.label}</span>
                        {selectedMethod === m.id && (
                          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#24EE89]"></span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bank Dropdown */}
                {selectedMethod === 'bank' && (
                  <div>
                    <label className="text-sm text-zinc-400 mb-2 block">Select Nigerian Bank</label>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-[#24EE89] appearance-none"
                    >
                      <option value="">Choose your bank...</option>
                      {NIGERIAN_BANKS.map(bank => (
                        <option key={bank} value={bank}>{bank}</option>
                      ))}
                    </select>

                    {selectedBank && (
                      <div className="mt-3 bg-[#24EE89]/5 border border-[#24EE89]/20 rounded-xl p-4 text-sm space-y-1">
                        <p className="text-zinc-400 text-xs">Account Name</p>
                        <p className="font-medium text-white">WAGER PAYMENTS LTD</p>
                        <p className="text-zinc-400 text-xs pt-2">Account Number</p>
                        <p className="font-mono text-[#24EE89] text-lg font-bold">2093847561</p>
                        <p className="text-zinc-500 text-xs pt-1">Transfer exact amount. Requires admin verification.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Opay Details View */}
                {selectedMethod === 'opay' && (
                  <div className="bg-[#00C896]/5 border border-[#00C896]/20 rounded-xl p-4 text-sm space-y-1">
                    <p className="text-zinc-400 text-xs">Opay Account Name</p>
                    <p className="font-medium text-white">WAGER GLOBAL OPAY</p>
                    <p className="text-zinc-400 text-xs pt-2">Opay Account Number</p>
                    <p className="font-mono text-[#00C896] text-lg font-bold">9012345678</p>
                    <p className="text-zinc-500 text-xs pt-1">Instant crediting after verification.</p>
                  </div>
                )}

                {/* Amount Input */}
                <div>
                  <label className="text-sm text-zinc-400 mb-2 block">Deposit Amount (₦1,000 - ₦5,000,000)</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white text-lg focus:outline-none focus:border-[#24EE89]"
                  />
                </div>

                {/* Quick Amounts */}
                <div className="grid grid-cols-3 gap-2">
                  {[2000, 5000, 10000, 25000, 50000, 100000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setAmount(String(amt))}
                      className="py-2.5 rounded-xl bg-white/5 hover:bg-[#24EE89]/15 border border-white/10 hover:border-[#24EE89]/40 text-sm font-medium transition-all"
                    >
                      ₦{amt.toLocaleString()}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleContinue}
                  className="w-full py-4 bg-[#24EE89] hover:bg-[#8EDD5B] text-black font-bold rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(36,238,137,0.3)]"
                >
                  Proceed to Deposit
                </button>

                <div className="text-xs text-zinc-500 space-y-1.5 pt-2">
                  <p>1. Transfer amount must match your submission precisely.</p>
                  <p>2. Payments are manually reviewed and confirmed by admins.</p>
                </div>
              </>
            )}

            {/* ========== CRYPTO TAB ========== */}
            {activeTab === 'crypto' && (
              <>
                <div className="space-y-3">
                  {[
                    { id: 'USDT-TRC20', name: 'USDT (TRC20)', network: 'Tron Network', icon: '₮' },
                    { id: 'USDT-ERC20', name: 'USDT (ERC20)', network: 'Ethereum Network', icon: '₮' },
                    { id: 'BTC', name: 'Bitcoin', network: 'BTC Network', icon: '₿' },
                    { id: 'ETH', name: 'Ethereum', network: 'ETH Network', icon: 'Ξ' },
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCrypto(c.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                        selectedCrypto === c.id
                          ? 'border-[#24EE89] bg-[#24EE89]/10 shadow-[0_0_15px_rgba(36,238,137,0.15)]'
                          : 'border-white/10 bg-white/[0.03] hover:bg-white/5'
                      }`}
                    >
                      <div className="w-11 h-11 rounded-full bg-[#24EE89]/15 flex items-center justify-center text-[#24EE89] text-xl font-bold">
                        {c.icon}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{c.name}</p>
                        <p className="text-xs text-zinc-400">{c.network}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div>
                  <label className="text-sm text-zinc-400 mb-2 block">Amount (USDT)</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white text-lg focus:outline-none focus:border-[#24EE89]"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {[50, 100, 250, 500, 1000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setAmount(String(amt))}
                      className="px-4 py-2 rounded-xl bg-white/5 hover:bg-[#24EE89]/15 border border-white/10 text-sm transition-all"
                    >
                      ${amt}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleContinue}
                  className="w-full py-4 bg-[#24EE89] hover:bg-[#8EDD5B] text-black font-bold rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(36,238,137,0.3)]"
                >
                  Generate Deposit Address
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}