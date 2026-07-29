import { useState, useEffect, useRef } from 'react'

interface Game {
  title: string
  provider: string
  players: string
  grad: string
  badge: string | null
  /** Slotsgateway id_hash / gameid – replace with real values from getGameList */
  gameid?: string
}

const HOT_GAMES: Game[] = [
  { title: 'Gates of Olympus', provider: 'Pragmatic Play', players: '14.2K', grad: 'linear-gradient(155deg,#7c2d8f,#4a1562,#1a0a2e)', badge: 'HOT', gameid: 'pragmatic/gatesofolympus' },
  { title: 'Sweet Bonanza', provider: 'Pragmatic Play', players: '11.8K', grad: 'linear-gradient(155deg,#d4306a,#7c1038,#2d0010)', badge: 'HOT', gameid: 'pragmatic/sweetbonanza' },
  { title: 'Aviator', provider: 'Spribe', players: '22.1K', grad: 'linear-gradient(155deg,#e53e3e,#7b1c1c,#1a0000)', badge: 'LIVE', gameid: 'spribe/aviator' },
  { title: 'Crazy Time', provider: 'Evolution', players: '18.4K', grad: 'linear-gradient(155deg,#f59e0b,#92400e,#3d1500)', badge: 'LIVE', gameid: 'evolution/crazytime' },
  { title: 'Lightning Roulette', provider: 'Evolution', players: '9.7K', grad: 'linear-gradient(155deg,#2563eb,#1e3a8a,#0a1545)', badge: 'LIVE', gameid: 'evolution/lightningroulette' },
  { title: 'Book of Dead', provider: "Play'n GO", players: '7.3K', grad: 'linear-gradient(155deg,#c87941,#7a4117,#2d1200)', badge: null, gameid: 'playngo/bookofdead' },
  { title: 'Big Bass Splash', provider: 'Pragmatic Play', players: '6.9K', grad: 'linear-gradient(155deg,#059669,#064e3b,#001a13)', badge: null, gameid: 'pragmatic/bigbasssplash' },
  { title: 'Plinko', provider: 'WAGER Originals', players: '15.6K', grad: '...', badge: 'HOT', gameid: 'onlyplay/SaintBananas' },
]

const WAGER_ORIGINALS: Game[] = [
  { title: 'Crash', provider: 'WAGER Originals', players: '21.3K', grad: 'linear-gradient(155deg,#e53e3e,#7b1c1c,#1a0000)', badge: 'HOT', gameid: 'wager/crash' },
  { title: 'Mines', provider: 'WAGER Originals', players: '12.4K', grad: 'linear-gradient(155deg,#059669,#064e3b,#001a13)', badge: 'HOT', gameid: 'wager/mines' },
  { title: 'Plinko', provider: 'WAGER Originals', players: '15.6K', grad: 'linear-gradient(155deg,#7c3aed,#4c1d95,#1a0055)', badge: null, gameid: 'onlyplay/SaintBananas' },
  { title: 'Dice', provider: 'WAGER Originals', players: '9.8K', grad: 'linear-gradient(155deg,#2563eb,#1e3a8a,#0a1545)', badge: null, gameid: 'wager/dice' },
  { title: 'Hash Dice', provider: 'WAGER Originals', players: '6.2K', grad: 'linear-gradient(155deg,#f59e0b,#92400e,#3d1500)', badge: null, gameid: 'wager/hashdice' },
  { title: 'Wheel', provider: 'WAGER Originals', players: '8.7K', grad: 'linear-gradient(155deg,#ec4899,#831843,#1f0010)', badge: null, gameid: 'wager/wheel' },
]

interface LiveBet {
  id: string
  game: string
  player: string
  amount: number
  multiplier: number
  profit: number
  currency: 'NGN' | 'USDT'
  iconColor: string
}

interface DashboardProps {
  onDeposit: () => void
  onLogout: () => void
  username?: string
}

interface CoinParticle {
  id: number
  x: number
  y: number
}

interface ChatMessage {
  id: number
  from: 'user' | 'bot'
  text: string
}

const PROMO_CARDS = [
  {
    id: 1,
    tag: 'SPORT',
    tagColor: 'bg-green-500/20 text-green-400',
    title: 'SOCCER PARTY',
    desc: 'WIN UP TO ₦500,000 SOCCER FREEBET',
    btn: 'JOIN NOW',
    gradient: 'from-green-900/60 to-emerald-950/80 border-green-500/30',
  },
  {
    id: 2,
    tag: 'EXCLUSIVE',
    tagColor: 'bg-purple-500/20 text-purple-400',
    title: 'FREE SPINS GIVEAWAY',
    desc: 'BET ₦10,000 · GET 20 FREE SPINS',
    btn: 'PLAY NOW',
    gradient: 'from-purple-900/60 to-violet-950/80 border-purple-500/30',
  },
  {
    id: 3,
    tag: 'CASINO',
    tagColor: 'bg-red-500/20 text-red-400',
    title: 'ROULETTE CHAMPIONSHIP',
    desc: 'SHARE ₦10,000,000 PRIZE POOL',
    btn: 'JOIN NOW',
    gradient: 'from-red-900/60 to-rose-950/80 border-red-500/30',
  },
]

// ===================== FUN CARTOON AVATARS =====================
const AVATAR_SEEDS = [
  'Felix', 'Kai', 'Rex', 'Blaze', 'Neo', 'Titan', 'Bolt', 'Apex',
  'Shadow', 'Viper', 'Storm', 'Cipher', 'Drift', 'Pulse', 'Vortex', 'Ember',
  'Luna', 'Jade', 'Nova', 'Aurora', 'Crystal', 'Echo', 'Pixel', 'Zen',
  'Aneka', 'Midnight', 'Spectre', 'Nexus', 'Frost', 'Orbit', 'Rogue', 'Phantom',
  'Croc', 'Dragon', 'Tiger', 'Panda', 'Fox', 'Wolf', 'Bear', 'Lion'
]

const getAvatarUrl = (seed: string) =>
  `https://api.dicebear.com/9.x/bottts/svg?seed=${encodeURIComponent(seed)}&backgroundColor=1a1d23,7c3aed,e53e3e,059669,2563eb,f59e0b&radius=50`

// ===================== ICONS =====================
const IconCopy = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
)

const IconAccount = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)
const IconBets = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)
const IconReports = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)
const IconWithdraw = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
)
const IconInvite = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
  </svg>
)
const IconData = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
  </svg>
)
const IconSecurity = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
)

const IconApplication = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>)
const IconToken = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>)
const IconCasino = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>)
const IconSupport = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>)
const IconPredictions = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>)
const IconProfile = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>)
const IconFutures = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>)
const IconPromotions = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>)
const IconVIP = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>)
const IconBonus = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>)
const IconQuest = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>)
const IconGift = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>)
const IconChat = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>)
const IconBell = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>)

const GameIcon = ({ color }: { color: string }) => (
  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 relative overflow-hidden" style={{ background: color }}>
    <div className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent"></div>
    <div className="w-2.5 h-2.5 rounded-full bg-white/50"></div>
  </div>
)

export default function Dashboard({ onDeposit, onLogout, username = 'Player' }: DashboardProps) {
  const [balanceUSDT, setBalanceUSDT] = useState(0)
  const [balanceNGN, setBalanceNGN] = useState(0)
  const [activeCurrency, setActiveCurrency] = useState<'USDT' | 'NGN'>('NGN')

  const [totalBets, setTotalBets] = useState(0)
  const [totalWins, setTotalWins] = useState(0)
  const [winRate, setWinRate] = useState(0)
  const [referralBonus] = useState(0)

  const [depositModalOpen, setDepositModalOpen] = useState(false)
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false)
  const [depositMethod, setDepositMethod] = useState<'crypto' | 'bank'>('crypto')
  const [selectedCrypto, setSelectedCrypto] = useState('USDT')
  const [selectedBank, setSelectedBank] = useState('')
  const [depositAmount, setDepositAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [withdrawAddress, setWithdrawAddress] = useState('')
  const [notification, setNotification] = useState<string | null>(null)
  const [balanceDropdownOpen, setBalanceDropdownOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [liveBets, setLiveBets] = useState<LiveBet[]>([])
  const [liveTab, setLiveTab] = useState<'latest' | 'highroller' | 'contest'>('latest')
  const [activeView, setActiveView] = useState<'dashboard' | 'profile'>('dashboard')

  // ===== AVATAR STATE =====
  const [avatarSeed, setAvatarSeed] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('wager_avatar') || username
    }
    return username
  })
  const [avatarModalOpen, setAvatarModalOpen] = useState(false)
  const [avatarSearch, setAvatarSearch] = useState('')

  // ===== SUPPORT CHAT =====
  const [supportOpen, setSupportOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 1, from: 'bot', text: "Hey! 👋 Welcome to WAGER Support. How can we help you today?" }
  ])
  const [chatInput, setChatInput] = useState('')
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Gift Box State
  const [giftOpened, setGiftOpened] = useState(false)
  const [giftCoins, setGiftCoins] = useState<CoinParticle[]>([])

  // ===== GAME LAUNCHER STATE (Slotsgateway getGameDemo) =====
  const [gameModalOpen, setGameModalOpen] = useState(false)
  const [gameLaunchUrl, setGameLaunchUrl] = useState<string | null>(null)
  const [gameLoading, setGameLoading] = useState(false)
  const [gameError, setGameError] = useState<string | null>(null)
  const [currentGameTitle, setCurrentGameTitle] = useState('')

  const handleOpenGiftBox = () => {
    if (giftOpened) return
    setGiftOpened(true)

    const rewardCoins: CoinParticle[] = Array.from({ length: 14 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 140,
      y: -90 - Math.random() * 50,
    }))
    setGiftCoins(rewardCoins)

    const rewardVal = Math.floor(Math.random() * 5000) + 1000
    if (activeCurrency === 'USDT') {
      setBalanceUSDT(p => p + +(rewardVal / 1500).toFixed(2))
    } else {
      setBalanceNGN(p => p + rewardVal)
    }
    showNotification(`🎉 Gift box opened! Claimed ${currencySymbol}${rewardVal.toLocaleString()}!`)

    setTimeout(() => {
      setGiftCoins([])
    }, 1800)
  }

  useEffect(() => {
    const games = [
      { name: 'Aviator', color: '#e53e3e' },
      { name: 'Gates of Olympus', color: '#7c2d8f' },
      { name: 'Sweet Bonanza', color: '#d4306a' },
      { name: 'Crazy Time', color: '#f59e0b' },
      { name: 'Crash', color: '#ef4444' },
      { name: 'Mines', color: '#059669' },
      { name: 'Plinko', color: '#7c3aed' },
      { name: 'Dice', color: '#2563eb' },
      { name: 'Lightning Roulette', color: '#3b82f6' },
      { name: 'Big Bass Splash', color: '#10b981' },
    ]
    const names = ['Ptbpfdqfcsac', 'userdkp_jpp', 'niseorus19', 'Hidden', 'Sinnnedvv', 'Ukagiifohvcc', 'Jimmi_bhai', 'Tinotino25', 'LuckyTemple', 'Rex111111111']

    const generateBet = (): LiveBet => {
      const g = games[Math.floor(Math.random() * games.length)]
      const isWin = Math.random() > 0.48
      const amount = Math.floor(Math.random() * 80000) + 800
      const multiplier = isWin ? +(Math.random() * 9 + 1.1).toFixed(2) : 0
      const profit = isWin ? Math.floor(amount * multiplier - amount) : -amount
      return {
        id: Math.random().toString(36).slice(2),
        game: g.name,
        player: names[Math.floor(Math.random() * names.length)],
        amount,
        multiplier,
        profit,
        currency: Math.random() > 0.25 ? 'NGN' : 'USDT',
        iconColor: g.color
      }
    }

    setLiveBets(Array.from({ length: 14 }, generateBet))
    const interval = setInterval(() => {
      setLiveBets(prev => [generateBet(), ...prev.slice(0, 16)])
    }, 2600)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (supportOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [chatMessages, supportOpen])

  const showNotification = (msg: string) => {
    setNotification(msg)
    setTimeout(() => setNotification(null), 3500)
  }

  const currentBalance = activeCurrency === 'USDT' ? balanceUSDT : balanceNGN
  const currencySymbol = activeCurrency === 'USDT' ? '$' : '₦'

  const handleDepositSubmit = () => {
    const val = parseFloat(depositAmount)
    if (isNaN(val) || val <= 0) {
      showNotification('Enter a valid amount')
      return
    }

    setDepositAmount('')
    setDepositModalOpen(false)
    showNotification(`Deposit of ${currencySymbol}${val.toLocaleString()} submitted`)

    setTimeout(() => {
      if (activeCurrency === 'USDT') setBalanceUSDT(p => p + val)
      else setBalanceNGN(p => p + val)
      showNotification(`Deposit confirmed!`)
    }, 6500)
  }

  /**
   * Launch a demo game via your backend → Slotsgateway getGameDemo
   *
   * IMPORTANT:
   * - Do NOT put api_login / api_password in the frontend.
   * - Create a backend route (e.g. /api/slots/demo) that:
   *   1. Receives { gameid, currency, lang }
   *   2. POSTs to Slotsgateway with your secret credentials
   *   3. Returns { url: "https://..." } or { error: "..." }
   *
   * Example body your backend should send to Slotsgateway:
   * {
   *   "api_login": "YOUR_API_LOGIN",
   *   "api_password": "YOUR_API_PASSWORD",
   *   "method": "getGameDemo",
   *   "lang": "en",
   *   "gameid": "onlyplay/SaintBananas",   // from getGameList id_hash
   *   "homeurl": "https://your-site.com",
   *   "cashierurl": "https://your-site.com/deposit",
   *   "currency": "USD"
   * }
   */
  const handlePlayGame = async (game: Game) => {
    setCurrentGameTitle(game.title)
    setGameError(null)
    setGameLaunchUrl(null)
    setGameModalOpen(true)
    setGameLoading(true)
    setTotalBets(p => p + 1)

    try {
      // ── Replace this URL with your real backend endpoint ──
      const res = await fetch('https://wager-stream-geiq.vercel.app/api/slots/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gameid: game.gameid || game.title,
          currency: activeCurrency === 'USDT' ? 'USD' : 'NGN',
          lang: 'en',
          homeurl: typeof window !== 'undefined' ? window.location.origin : 'https://your-site.com',
          cashierurl: typeof window !== 'undefined' ? `${window.location.origin}/deposit` : 'https://your-site.com/deposit',
        }),
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        throw new Error(data.message || data.error || 'Failed to launch game')
      }

      // Slotsgateway returns the launch URL in "response"
      const url = data.url || data.response
      if (!url) throw new Error('No launch URL returned')

      setGameLaunchUrl(url)
      showNotification(`Launching ${game.title}...`)
    } catch (err: any) {
      console.error('Game launch error:', err)
      setGameError(err.message || 'Could not start the game. Please try again.')
      showNotification(`Could not launch ${game.title}`)
    } finally {
      setGameLoading(false)
    }
  }

  const closeGameModal = () => {
    setGameModalOpen(false)
    setGameLaunchUrl(null)
    setGameError(null)
    setCurrentGameTitle('')
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    showNotification('Copied to clipboard!')
  }

  const handleSelectAvatar = (seed: string) => {
    setAvatarSeed(seed)
    if (typeof window !== 'undefined') {
      localStorage.setItem('wager_avatar', seed)
    }
    setAvatarModalOpen(false)
    showNotification('Profile avatar updated!')
  }

  const filteredAvatars = AVATAR_SEEDS.filter(seed =>
    seed.toLowerCase().includes(avatarSearch.toLowerCase())
  )

  const handleSendChat = () => {
    if (!chatInput.trim()) return
    const userMsg: ChatMessage = { id: Date.now(), from: 'user', text: chatInput.trim() }
    setChatMessages(prev => [...prev, userMsg])
    setChatInput('')

    setTimeout(() => {
      const replies = [
        "Thanks for reaching out! Our team is looking into this right now.",
        "I can help with deposits, withdrawals, bonuses or account issues. What do you need?",
        "Got it! Please allow a few minutes while I check your account.",
        "For faster help you can also email support@wager.com",
        "I'm here 24/7. Feel free to ask anything about the platform!",
        "Understood. A support agent will join if needed. Hang tight 😊"
      ]
      const botMsg: ChatMessage = {
        id: Date.now() + 1,
        from: 'bot',
        text: replies[Math.floor(Math.random() * replies.length)]
      }
      setChatMessages(prev => [...prev, botMsg])
    }, 900)
  }

  const sidebarItems = [
    { icon: <IconApplication />, label: 'Application', sub: 'Unlock Exclusive App Rewards' },
    { icon: <IconToken />, label: 'WAGER Token', sub: '$0.02206  ↑ 1.34%' },
    { icon: <IconCasino />, label: 'Casino' },
    { icon: <IconSupport />, label: 'Support' },
    { icon: <IconPredictions />, label: 'Predictions' },
    { icon: <IconProfile />, label: 'Profile', isProfile: true },
    { icon: <IconFutures />, label: 'Crypto Futures' },
    { icon: <IconPromotions />, label: 'Promotions' },
    { icon: <IconVIP />, label: 'VIP Club' },
    { icon: <IconBonus />, label: 'Bonus' },
    { icon: <IconQuest />, label: 'Quest Hub' },
  ]

  const scrollingPromos = [...PROMO_CARDS, ...PROMO_CARDS, ...PROMO_CARDS]

  // ===================== GAME LAUNCHER MODAL =====================
  const GameLauncherModal = () => {
    if (!gameModalOpen) return null

    return (
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-2 sm:p-4">
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={closeGameModal}
        />

        <div className="relative w-full max-w-6xl h-[85vh] sm:h-[90vh] bg-[#0f1115] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#161920] shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#24EE89] flex items-center justify-center shrink-0">
                <span className="text-black font-black text-sm">W</span>
              </div>
              <div className="min-w-0">
                <p className="font-bold text-sm truncate">{currentGameTitle || 'Game'}</p>
                <p className="text-[11px] text-zinc-500">Demo Mode · No real money</p>
              </div>
            </div>
            <button
              onClick={closeGameModal}
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
              title="Close game"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 relative bg-black">
            {gameLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10 bg-[#0f1115]">
                <div className="w-12 h-12 border-4 border-[#24EE89]/30 border-t-[#24EE89] rounded-full animate-spin" />
                <p className="text-sm text-zinc-400">Loading {currentGameTitle}...</p>
              </div>
            )}

            {gameError && !gameLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10 bg-[#0f1115] p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-3xl">⚠️</div>
                <p className="text-red-400 font-medium max-w-md">{gameError}</p>
                <p className="text-xs text-zinc-500 max-w-sm">
                  Make sure your backend `/api/slots/demo` is set up and the gameid exists in Slotsgateway getGameList.
                </p>
                <button
                  onClick={closeGameModal}
                  className="mt-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-sm font-medium"
                >
                  Close
                </button>
              </div>
            )}

            {gameLaunchUrl && !gameLoading && !gameError && (
              <iframe
                src={gameLaunchUrl}
                title={currentGameTitle}
                className="w-full h-full border-0"
                allow="autoplay; fullscreen; payment"
                allowFullScreen
              />
            )}
          </div>
        </div>
      </div>
    )
  }

  // ===================== AVATAR PICKER MODAL =====================
  const AvatarPickerModal = () => (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={() => setAvatarModalOpen(false)}
      />

      <div className="relative w-full sm:max-w-lg bg-[#161920] border border-white/10 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden">
        <div className="px-5 pt-5 pb-4 border-b border-white/5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Choose Avatar</h2>
              <p className="text-xs text-zinc-400 mt-0.5">Click any avatar to set it as your profile</p>
            </div>
            <button
              onClick={() => setAvatarModalOpen(false)}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              value={avatarSearch}
              onChange={(e) => setAvatarSearch(e.target.value)}
              placeholder="Search avatars..."
              className="w-full bg-white/5 border border-white/10 focus:border-[#24EE89]/50 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-zinc-500"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">⌕</span>
          </div>
        </div>

        <div className="p-5 max-h-[55vh] overflow-y-auto">
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
            {filteredAvatars.map((seed) => {
              const isSelected = avatarSeed === seed
              return (
                <button
                  key={seed}
                  onClick={() => handleSelectAvatar(seed)}
                  className={`
                    relative aspect-square rounded-2xl overflow-hidden transition-all duration-200
                    ${isSelected
                      ? 'ring-2 ring-[#24EE89] ring-offset-2 ring-offset-[#161920] scale-105'
                      : 'hover:scale-105 hover:ring-2 hover:ring-white/20'
                    }
                  `}
                >
                  <img
                    src={getAvatarUrl(seed)}
                    alt={seed}
                    className="w-full h-full object-cover bg-[#1a1d23]"
                    loading="lazy"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-[#24EE89]/20 flex items-center justify-center">
                      <div className="w-7 h-7 rounded-full bg-[#24EE89] flex items-center justify-center">
                        <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {filteredAvatars.length === 0 && (
            <div className="text-center py-10 text-zinc-500 text-sm">
              No avatars found
            </div>
          )}
        </div>

        <div className="px-5 py-4 border-t border-white/5 flex gap-3">
          <button
            onClick={() => {
              const random = AVATAR_SEEDS[Math.floor(Math.random() * AVATAR_SEEDS.length)]
              handleSelectAvatar(random)
            }}
            className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors"
          >
            🎲 Random
          </button>
          <button
            onClick={() => setAvatarModalOpen(false)}
            className="flex-1 py-3 rounded-xl bg-[#24EE89] hover:bg-[#8EDD5B] text-black text-sm font-bold transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )

  // ===================== SUPPORT CHAT =====================
  function SupportChat() {
    const [supportOpen, setSupportOpen] = useState(false)
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
      { id: 1, from: 'bot', text: "Hey! 👋 Welcome to WAGER Support. How can we help you today?" }
    ])
    const [chatInput, setChatInput] = useState('')
    const chatEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
      if (supportOpen) {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
        setTimeout(() => {
          inputRef.current?.focus()
        }, 50)
      }
    }, [chatMessages, supportOpen])

    const handleSendChat = () => {
      if (!chatInput.trim()) return

      const userMsg: ChatMessage = { id: Date.now(), from: 'user', text: chatInput.trim() }
      setChatMessages(prev => [...prev, userMsg])
      setChatInput('')

      setTimeout(() => {
        inputRef.current?.focus()
      }, 10)

      setTimeout(() => {
        const replies = [
          "Thanks for reaching out! Our team is looking into this right now.",
          "I can help with deposits, withdrawals, bonuses or account issues. What do you need?",
          "Got it! Please allow a few minutes while I check your account.",
          "For faster help you can also email support@wager.com",
          "I'm here 24/7. Feel free to ask anything about the platform!",
          "Understood. A support agent will join if needed. Hang tight 😊"
        ]
        const botMsg: ChatMessage = {
          id: Date.now() + 1,
          from: 'bot',
          text: replies[Math.floor(Math.random() * replies.length)]
        }
        setChatMessages(prev => [...prev, botMsg])
      }, 900)
    }

    return (
      <>
        <button
          onClick={() => setSupportOpen(!supportOpen)}
          className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#24EE89] text-black shadow-2xl shadow-[#24EE89]/30 flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${
            supportOpen ? '' : 'animate-bounce'
          }`}
        >
          {supportOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
        </button>

        {supportOpen && (
          <div className="fixed bottom-24 right-6 z-50 w-[340px] sm:w-[380px] bg-[#161920] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[520px]">
            <div className="px-4 py-3 bg-gradient-to-r from-[#24EE89]/20 to-[#1a1d23] border-b border-white/5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#24EE89] flex items-center justify-center">
                <span className="text-black font-black text-sm">W</span>
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm">WAGER Support</p>
                <p className="text-[11px] text-[#24EE89] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#24EE89] animate-pulse"></span>
                  Online
                </p>
              </div>
              <button
                onClick={() => setSupportOpen(false)}
                className="text-zinc-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[280px] max-h-[340px]">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm ${
                      msg.from === 'user'
                        ? 'bg-[#24EE89] text-black rounded-br-md'
                        : 'bg-white/5 text-white rounded-bl-md'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <div className="p-3 border-t border-white/5 flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                placeholder="Type your message..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#24EE89]/50 placeholder:text-zinc-500"
                autoComplete="off"
              />
              <button
                onClick={handleSendChat}
                className="w-11 h-11 rounded-xl bg-[#24EE89] text-black flex items-center justify-center hover:bg-[#8EDD5B] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </>
    )
  }

  // ===================== PROFILE PAGE =====================
  if (activeView === 'profile') {
    return (
      <div className="min-h-screen bg-[#0f1115] text-white flex">
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50
          ${sidebarCollapsed ? 'w-16' : 'w-64'} 
          bg-[#161920] border-r border-white/5 flex flex-col transition-all duration-300 shrink-0
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="h-16 flex items-center justify-between px-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#24EE89] flex items-center justify-center shrink-0">
                <span className="text-black font-black text-lg">W</span>
              </div>
              {!sidebarCollapsed && (
                <div>
                  <h1 className="font-bold text-lg leading-tight">WAGER</h1>
                  <p className="text-[10px] text-zinc-500">Dashboard</p>
                </div>
              )}
            </div>
            <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden text-zinc-400 hover:text-white p-1">✕</button>
          </div>
          <nav className="flex-1 overflow-y-auto py-3 space-y-0.5 px-2">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  if (item.isProfile) {
                    setActiveView('profile')
                  } else {
                    setActiveView('dashboard')
                  }
                  setMobileMenuOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group ${
                  item.isProfile ? 'bg-[#24EE89]/15 text-[#24EE89]' : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className={`shrink-0 ${item.isProfile ? 'text-[#24EE89]' : 'opacity-70 group-hover:opacity-100 group-hover:text-[#24EE89]'}`}>
                  {item.icon}
                </span>
                {!sidebarCollapsed && (
                  <div className="text-left overflow-hidden">
                    <p className="font-medium truncate">{item.label}</p>
                    {item.sub && <p className="text-[10px] text-zinc-500 truncate">{item.sub}</p>}
                  </div>
                )}
              </button>
            ))}
          </nav>
        </aside>

        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 bg-[#161920]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-zinc-300">☰</button>
              <button
                onClick={() => setActiveView('dashboard')}
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
              >
                <span>←</span>
                <span className="text-sm font-medium">Back to Dashboard</span>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAvatarModalOpen(true)}
                className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-[#24EE89]/40 hover:ring-[#24EE89] transition-all"
              >
                <img src={getAvatarUrl(avatarSeed)} alt="avatar" className="w-full h-full object-cover" />
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4 sm:p-8">
            <div className="max-w-3xl mx-auto space-y-6">

              <div className="rounded-3xl bg-gradient-to-br from-[#1a1d23] to-[#161920] border border-white/10 p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#24EE89]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                <div className="relative flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative group">
                    <button
                      onClick={() => setAvatarModalOpen(true)}
                      className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-[#24EE89]/30 shadow-xl shadow-[#24EE89]/10 transition-all group-hover:ring-[#24EE89]/60"
                    >
                      <img
                        src={getAvatarUrl(avatarSeed)}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </button>
                    <button
                      onClick={() => setAvatarModalOpen(true)}
                      className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-[#24EE89] text-black flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                      title="Change avatar"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </div>

                  <div className="text-center sm:text-left flex-1">
                    <div className="flex items-center justify-center sm:justify-start gap-3 mb-1">
                      <h1 className="text-2xl sm:text-3xl font-bold">{username}</h1>
                      <span className="px-2.5 py-1 rounded-full bg-[#24EE89]/15 text-[#24EE89] text-xs font-bold">VIP 0</span>
                    </div>
                    <p className="text-zinc-400 text-sm">Member since 2025</p>
                    <button
                      onClick={() => setAvatarModalOpen(true)}
                      className="mt-3 text-xs text-[#24EE89] hover:text-[#8EDD5B] font-medium flex items-center gap-1.5 mx-auto sm:mx-0"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Change profile picture
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-[#161920] border border-white/5 p-5">
                  <p className="text-xs text-zinc-500 mb-1">Phone Number</p>
                  <p className="font-semibold text-lg">08143476248</p>
                </div>
                <div className="rounded-2xl bg-[#161920] border border-white/5 p-5">
                  <p className="text-xs text-zinc-500 mb-1">User ID</p>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-lg">99548708</p>
                    <button
                      onClick={() => copyToClipboard('99548708')}
                      className="text-[#24EE89] hover:text-white transition-colors p-1"
                      title="Copy User ID"
                    >
                      <IconCopy />
                    </button>
                  </div>
                </div>
                <div className="rounded-2xl bg-[#161920] border border-white/5 p-5">
                  <p className="text-xs text-zinc-500 mb-1">Balance</p>
                  <p className="font-bold text-lg text-[#24EE89]">
                    {currencySymbol}{currentBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setWithdrawModalOpen(true)}
                  className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-semibold"
                >
                  <span className="text-xl">💸</span>
                  Withdraw
                </button>
                <button
                  onClick={() => { onDeposit(); setDepositModalOpen(true) }}
                  className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-[#24EE89] hover:bg-[#8EDD5B] text-black font-bold transition-all"
                >
                  <span className="text-xl">💰</span>
                  Deposit
                </button>
              </div>

              <div className="rounded-2xl bg-[#161920] border border-white/5 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-zinc-400">VIP Progress</p>
                    <p className="font-bold text-lg">VIP 0 → VIP 1</p>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border border-yellow-500/30 flex items-center justify-center">
                    <span className="text-2xl font-bold text-yellow-500">0</span>
                  </div>
                </div>

                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-zinc-400">Remaining bet amount</span>
                  <span className="font-medium">5,000.00</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[2%] bg-gradient-to-r from-[#24EE89] to-[#8EDD5B] rounded-full"></div>
                </div>
                <p className="text-xs text-zinc-500 mt-2">Bet for promotion · 0.00%</p>
              </div>

              <div className="rounded-2xl bg-[#161920] border border-white/5 overflow-hidden">
                {[
                  { label: 'Account', icon: <IconAccount />, desc: 'Personal information & settings' },
                  { label: 'Bets', icon: <IconBets />, desc: 'Betting history & statistics' },
                  { label: 'Reports', icon: <IconReports />, desc: 'Transaction & activity reports' },
                  { label: 'Withdrawal management', icon: <IconWithdraw />, desc: 'Manage withdrawal methods' },
                  { label: 'To invite', icon: <IconInvite />, desc: 'Invite friends & earn rewards' },
                  { label: 'Data', icon: <IconData />, desc: 'Download your data' },
                  { label: 'Security', icon: <IconSecurity />, desc: 'Password & 2FA settings' },
                ].map((item, index) => (
                  <button
                    key={item.label}
                    onClick={() => showNotification(`${item.label} coming soon`)}
                    className={`w-full flex items-center gap-4 px-5 py-4 hover:bg-white/5 transition-colors text-left ${
                      index !== 6 ? 'border-b border-white/5' : ''
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-300">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{item.label}</p>
                      <p className="text-xs text-zinc-500 truncate">{item.desc}</p>
                    </div>
                    <span className="text-zinc-600 text-xl">›</span>
                  </button>
                ))}
              </div>

              <button
                onClick={onLogout}
                className="w-full py-4 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold transition-colors border border-red-500/20"
              >
                Logout
              </button>

            </div>
          </main>
        </div>

        {avatarModalOpen && <AvatarPickerModal />}
        <SupportChat />
        <GameLauncherModal />
      </div>
    )
  }

  // ===================== MAIN DASHBOARD =====================
  return (
    <div className="min-h-screen bg-[#0f1115] text-white flex relative overflow-x-hidden">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee { animation: marquee 28s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
      `}</style>

      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/70 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        ${sidebarCollapsed ? 'w-16' : 'w-64'} 
        bg-[#161920] border-r border-white/5 flex flex-col transition-all duration-300 shrink-0
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#24EE89] flex items-center justify-center shrink-0">
              <span className="text-black font-black text-lg">W</span>
            </div>
            {!sidebarCollapsed && (
              <div>
                <h1 className="font-bold text-lg leading-tight">WAGER</h1>
                <p className="text-[10px] text-zinc-500">Dashboard</p>
              </div>
            )}
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden text-zinc-400 hover:text-white p-1">✕</button>
        </div>
        <nav className="flex-1 overflow-y-auto py-3 space-y-0.5 px-2">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                if (item.isProfile) {
                  setActiveView('profile')
                }
                setMobileMenuOpen(false)
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-400 hover:bg-white/5 hover:text-white transition-all group"
            >
              <span className="shrink-0 opacity-70 group-hover:opacity-100 group-hover:text-[#24EE89]">{item.icon}</span>
              {!sidebarCollapsed && (
                <div className="text-left overflow-hidden">
                  <p className="font-medium truncate">{item.label}</p>
                  {item.sub && <p className="text-[10px] text-zinc-500 truncate">{item.sub}</p>}
                </div>
              )}
            </button>
          ))}
        </nav>
        <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="hidden lg:block m-3 py-2 text-xs text-zinc-500 hover:text-white border border-white/5 rounded-xl">
          {sidebarCollapsed ? '→' : '← Collapse'}
        </button>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-[#161920]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-zinc-300">☰</button>
            <input type="text" placeholder="Search games..." className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm w-56 focus:outline-none focus:border-[#24EE89] hidden sm:block" />
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setBalanceDropdownOpen(!balanceDropdownOpen)} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-3 py-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-[#24EE89]"></span>
                <span className="font-bold">{currencySymbol}{currentBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                <span className="text-zinc-400 text-xs">{activeCurrency}</span>
                <span className="text-zinc-500">▾</span>
              </button>
              {balanceDropdownOpen && (
                <div className="absolute right-0 top-12 w-64 bg-[#1a1d23] border border-white/10 rounded-2xl shadow-2xl p-3 z-50 space-y-1">
                  <p className="text-xs text-zinc-500 px-2 mb-2">Cash</p>
                  <button onClick={() => { setActiveCurrency('USDT'); setBalanceDropdownOpen(false) }} className={`w-full flex justify-between px-3 py-2 rounded-xl text-sm ${activeCurrency === 'USDT' ? 'bg-[#24EE89]/15 text-[#24EE89]' : 'hover:bg-white/5'}`}>
                    <span>USDT</span><span className="font-bold">${balanceUSDT.toFixed(2)}</span>
                  </button>
                  <button onClick={() => { setActiveCurrency('NGN'); setBalanceDropdownOpen(false) }} className={`w-full flex justify-between px-3 py-2 rounded-xl text-sm ${activeCurrency === 'NGN' ? 'bg-[#24EE89]/15 text-[#24EE89]' : 'hover:bg-white/5'}`}>
                    <span>NGN (Naira)</span><span className="font-bold">₦{balanceNGN.toLocaleString()}</span>
                  </button>
                </div>
              )}
            </div>

            <button onClick={() => { onDeposit(); setDepositModalOpen(true) }} className="px-4 py-2 bg-[#24EE89] hover:bg-[#8EDD5B] text-black text-sm font-bold rounded-xl">
              Deposit
            </button>
            <button className="p-2.5 rounded-xl hover:bg-white/5 text-zinc-400 hidden sm:block"><IconGift /></button>
            <button className="p-2.5 rounded-xl hover:bg-white/5 text-zinc-400 hidden sm:block"><IconChat /></button>
            <button className="p-2.5 rounded-xl hover:bg-white/5 text-zinc-400 relative hidden sm:block">
              <IconBell /><span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-white/10">
              <button
                onClick={() => setAvatarModalOpen(true)}
                className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#24EE89]/30 hover:ring-[#24EE89] transition-all"
              >
                <img src={getAvatarUrl(avatarSeed)} alt="avatar" className="w-full h-full object-cover" />
              </button>
              <button onClick={onLogout} className="text-xs text-zinc-400 hover:text-white hidden sm:block">Logout</button>
            </div>
          </div>
        </header>

        {notification && (
          <div className="fixed top-20 right-6 z-50 bg-[#24EE89] text-black px-5 py-3 rounded-xl font-bold shadow-2xl animate-bounce">
            {notification}
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 rounded-2xl bg-gradient-to-r from-[#1a1d23] to-[#161920] border border-white/5 p-6">
              <p className="text-sm text-zinc-400">Welcome back,</p>
              <h2 className="text-2xl font-bold text-[#24EE89] mb-1">{username} 👋</h2>
              <p className="text-zinc-500 text-sm">Ready to play? Your balance is ready.</p>
            </div>

            <div className="w-full lg:w-72 rounded-2xl bg-gradient-to-br from-[#1c222d] to-[#161920] border border-white/10 p-5 flex flex-col items-center justify-center relative overflow-hidden shadow-xl shrink-0">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">Daily Mystery Reward</p>

              <div className="relative my-2 flex items-center justify-center h-20 w-full">
                {giftCoins.map((coin) => (
                  <span
                    key={coin.id}
                    className="absolute text-[#24EE89] font-bold text-sm pointer-events-none animate-ping"
                    style={{
                      transform: `translate(${coin.x}px, ${coin.y}px)`,
                      transition: 'transform 1s ease-out, opacity 1s ease-out',
                    }}
                  >
                    🪙
                  </span>
                ))}

                <button
                  onClick={handleOpenGiftBox}
                  disabled={giftOpened}
                  className={`relative p-4 rounded-2xl bg-white/5 border border-white/10 text-[#24EE89] transition-all duration-300 ${
                    giftOpened ? 'scale-105 bg-[#24EE89]/10 border-[#24EE89]/40 opacity-75' : 'hover:scale-110 hover:border-[#24EE89]/50 active:scale-95 animate-bounce cursor-pointer'
                  }`}
                >
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                </button>
              </div>

              <p className="text-xs text-center font-medium text-zinc-300 mt-2">
                {giftOpened ? '🎁 Reward Claimed!' : 'Click box to unlock goodies!'}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1">
              {[
                { label: 'Total Bets', value: totalBets },
                { label: 'Total Wins', value: `${currencySymbol}${totalWins}` },
                { label: 'Win Rate', value: `${winRate}%` },
                { label: 'Referral', value: `${currencySymbol}${referralBonus}` },
              ].map(s => (
                <div key={s.label} className="rounded-2xl bg-white/5 border border-white/5 p-4 text-center flex flex-col justify-center">
                  <p className="text-[11px] text-zinc-500 mb-1">{s.label}</p>
                  <p className="text-lg font-bold">{s.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl">
            <div className="flex gap-5 animate-marquee w-max">
              {scrollingPromos.map((promo, idx) => (
                <div key={`${promo.id}-${idx}`} className={`rounded-2xl bg-gradient-to-br ${promo.gradient} border p-5 flex flex-col justify-between min-h-[160px] w-[300px] shrink-0`}>
                  <div>
                    <span className={`text-[10px] font-bold ${promo.tagColor} px-2.5 py-1 rounded-full`}>{promo.tag}</span>
                    <h3 className="text-lg font-bold mt-3">{promo.title}</h3>
                    <p className="text-xs text-zinc-300 mt-1 opacity-80">{promo.desc}</p>
                  </div>
                  <button className="mt-4 self-start px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold">{promo.btn}</button>
                </div>
              ))}
            </div>
          </div>

          <section>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold">Hot Games</h3>
              <span className="text-xs text-[#24EE89] bg-[#24EE89]/10 px-3 py-1 rounded-full">Popular</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {HOT_GAMES.map((game) => (
                <div key={game.title} onClick={() => handlePlayGame(game)} className="group cursor-pointer">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 group-hover:scale-[1.03] group-hover:border-[#24EE89]/40 transition-all" style={{ background: game.grad }}>
                    {game.badge && (
                      <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-lg text-[10px] font-bold ${game.badge === 'LIVE' ? 'bg-red-500' : 'bg-[#24EE89] text-black'}`}>
                        {game.badge}
                      </div>
                    )}
                    <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] bg-black/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#24EE89]"></span>{game.players}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                      <p className="text-sm font-semibold">{game.title}</p>
                      <p className="text-[11px] text-white/60">{game.provider}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold">WAGER Originals</h3>
              <span className="text-xs text-[#24EE89] bg-[#24EE89]/10 px-3 py-1 rounded-full">Exclusive</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {WAGER_ORIGINALS.map((game) => (
                <div key={game.title} onClick={() => handlePlayGame(game)} className="group cursor-pointer">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 group-hover:scale-[1.03] group-hover:border-[#24EE89]/40 transition-all" style={{ background: game.grad }}>
                    {game.badge && (
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-lg text-[10px] font-bold bg-[#24EE89] text-black">
                        {game.badge}
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                      <p className="text-sm font-semibold">{game.title}</p>
                      <p className="text-[11px] text-white/60">{game.provider}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Latest Bets */}
          <section>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h3 className="text-lg font-bold">Latest Bets & Race</h3>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {(['latest', 'highroller', 'contest'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setLiveTab(tab)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                      liveTab === tab ? 'bg-[#24EE89] text-black' : 'bg-white/5 text-zinc-400 hover:bg-white/10'
                    }`}
                  >
                    {tab === 'latest' ? 'Latest Bet' : tab === 'highroller' ? 'High Roller' : 'Wager Contest'}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-[#161920] border border-white/5 overflow-hidden">
              <div className="hidden sm:grid grid-cols-12 gap-2 px-4 py-3 text-[11px] text-zinc-500 border-b border-white/5 uppercase tracking-wider items-center">
                <div className="col-span-4">Game</div>
                <div className="col-span-3">Player</div>
                <div className="col-span-2 text-right">Bet Amount</div>
                <div className="col-span-1 text-right">Multiplier</div>
                <div className="col-span-2 text-right">Profit / Return</div>
              </div>

              <div className="divide-y divide-white/5 max-h-[460px] overflow-y-auto">
                {liveBets.map((bet) => (
                  <div key={bet.id}>
                    <div className="sm:hidden px-4 py-3 space-y-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <GameIcon color={bet.iconColor} />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm truncate">{bet.game}</p>
                          <p className="text-xs text-zinc-400 truncate">{bet.player}</p>
                        </div>
                        <div className={`text-sm font-bold ${bet.profit >= 0 ? 'text-[#24EE89]' : 'text-red-400'}`}>
                          {bet.profit >= 0
                            ? `+${bet.currency === 'NGN' ? '₦' : '$'}${bet.profit.toLocaleString()}`
                            : `-${bet.currency === 'NGN' ? '₦' : '$'}${Math.abs(bet.profit).toLocaleString()}`}
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-zinc-400 pl-10">
                        <span>Bet: {bet.currency === 'NGN' ? '₦' : '$'}{bet.amount.toLocaleString()}</span>
                        <span>{bet.multiplier > 0 ? `${bet.multiplier}x` : '0.00x'}</span>
                      </div>
                    </div>

                    <div className="hidden sm:grid grid-cols-12 gap-2 px-4 py-3 text-sm items-center hover:bg-white/[0.03] transition-colors">
                      <div className="col-span-4 flex items-center gap-2.5 min-w-0">
                        <GameIcon color={bet.iconColor} />
                        <span className="truncate font-medium">{bet.game}</span>
                      </div>
                      <div className="col-span-3 text-zinc-400 truncate">{bet.player}</div>
                      <div className="col-span-2 text-right font-medium">
                        {bet.currency === 'NGN' ? '₦' : '$'}{bet.amount.toLocaleString()}
                      </div>
                      <div className="col-span-1 text-right text-zinc-400">
                        {bet.multiplier > 0 ? `${bet.multiplier}x` : '0.00x'}
                      </div>
                      <div className={`col-span-2 text-right font-bold ${bet.profit >= 0 ? 'text-[#24EE89]' : 'text-red-400'}`}>
                        {bet.profit >= 0
                          ? `+${bet.currency === 'NGN' ? '₦' : '$'}${bet.profit.toLocaleString()}`
                          : `-${bet.currency === 'NGN' ? '₦' : '$'}${Math.abs(bet.profit).toLocaleString()}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <footer className="mt-16 pt-12 border-t border-white/10 text-zinc-400 text-xs space-y-10">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              <div className="space-y-3">
                <h4 className="text-white font-bold uppercase tracking-wider text-sm">Casino</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-[#24EE89] transition-colors">Slots</a></li>
                  <li><a href="#" className="hover:text-[#24EE89] transition-colors">Live Casino</a></li>
                  <li><a href="#" className="hover:text-[#24EE89] transition-colors">WAGER Originals</a></li>
                  <li><a href="#" className="hover:text-[#24EE89] transition-colors">Table Games</a></li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-white font-bold uppercase tracking-wider text-sm">Wager Support</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-[#24EE89] transition-colors">Betting Rules</a></li>
                  <li><a href="#" className="hover:text-[#24EE89] transition-colors">Live Ticker Info</a></li>
                  <li><a href="#" className="hover:text-[#24EE89] transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-[#24EE89] transition-colors">Fairness Policy</a></li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-white font-bold uppercase tracking-wider text-sm">Promo</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-[#24EE89] transition-colors">VIP Club</a></li>
                  <li><a href="#" className="hover:text-[#24EE89] transition-colors">Promotions</a></li>
                  <li><a href="#" className="hover:text-[#24EE89] transition-colors">Referral Program</a></li>
                  <li><a href="#" className="hover:text-[#24EE89] transition-colors">Profile Rewards</a></li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-white font-bold uppercase tracking-wider text-sm">Support / Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-[#24EE89] transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-[#24EE89] transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-[#24EE89] transition-colors">Responsible Gambling</a></li>
                  <li><a href="#" className="hover:text-[#24EE89] transition-colors">Licensing Info</a></li>
                </ul>
              </div>
              <div className="space-y-3 col-span-2 md:col-span-1">
                <h4 className="text-white font-bold uppercase tracking-wider text-sm">About Us</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-[#24EE89] transition-colors">Company Info</a></li>
                  <li><a href="#" className="hover:text-[#24EE89] transition-colors">Affiliates</a></li>
                  <li><a href="#" className="hover:text-[#24EE89] transition-colors">Press & Media</a></li>
                  <li><a href="#" className="hover:text-[#24EE89] transition-colors">Contact Us</a></li>
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-around gap-6 pt-6 border-t border-white/5 opacity-75 grayscale hover:grayscale-0 transition-all">
              <span className="font-black tracking-widest text-white text-base">SiGMA</span>
              <span className="font-semibold text-zinc-300">Responsible Gambling</span>
              <span className="font-bold text-white tracking-wider">GamCare</span>
              <span className="font-semibold tracking-wide text-zinc-300">betblocker</span>
              <span className="px-3 py-1 rounded border border-white/20 text-white font-mono font-bold">18+</span>
            </div>
          </footer>
        </main>
      </div>

      {avatarModalOpen && <AvatarPickerModal />}
      <SupportChat />
      <GameLauncherModal />
    </div>
  )
}