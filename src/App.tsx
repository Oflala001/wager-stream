import banner from './assets/banner.jpg'
import { useState, useEffect } from 'react'
import { SignUpModal } from './SignUpModal'
import { SignInModal } from './SignInModal'
import Dashboard from './Dashboard'
import Deposit from './Deposit'

// ── Types ─────────────────────────────────────────────────────────────────────

interface Game {
  title: string
  provider: string
  players: string
  grad: string
  badge: string | null
}

interface BigWin {
  winner: string
  game: string
  amount: string
  grad: string
}

// ── Data ──────────────────────────────────────────────────────────────────────

const BIG_WINS: BigWin[] = [
  { winner: 'Alex_K***',    game: 'Gates of Olympus',   amount: '$5,416.11K USDT', grad: 'linear-gradient(155deg,#7c2d8f,#4a1562,#1a0a2e)' },
  { winner: 'DragonFly88',   game: 'Sweet Bonanza',      amount: '$3,201.50K USDT', grad: 'linear-gradient(155deg,#d4306a,#7c1038,#2d0010)' },
  { winner: 'NightHawk_X',   game: 'Book of Dead',       amount: '$2,874.33K USDT', grad: 'linear-gradient(155deg,#c87941,#7a4117,#2d1200)' },
  { winner: 'CryptoKing22', game: 'Aviator',            amount: '$1,920.88K USDT', grad: 'linear-gradient(155deg,#e53e3e,#7b1c1c,#1a0000)' },
  { winner: 'LuckyStr99',   game: 'Crazy Time',         amount: '$4,103.72K USDT', grad: 'linear-gradient(155deg,#f59e0b,#92400e,#3d1500)' },
  { winner: 'MoonShot_J',   game: 'Lightning Roulette', amount: '$987.45K USDT',   grad: 'linear-gradient(155deg,#2563eb,#1e3a8a,#0a1545)' },
  { winner: 'Phantom_777',   game: 'Big Bass Splash',    amount: '$2,455.00K USDT', grad: 'linear-gradient(155deg,#059669,#064e3b,#001a13)' },
  { winner: 'StarDust_M',   game: 'Plinko',             amount: '$756.19K USDT',   grad: 'linear-gradient(155deg,#7c3aed,#4c1d95,#1a0055)' },
  { winner: 'Rico_Suave',   game: 'Wolf Gold',          amount: '$1,344.90K USDT', grad: 'linear-gradient(155deg,#78716c,#44403c,#1c1917)' },
  { winner: 'FlyEagle99',   game: 'Fruit Party',        amount: '$892.77K USDT',   grad: 'linear-gradient(155deg,#ec4899,#831843,#1f0010)' },
  { winner: 'Neon_Rex',     game: 'Wanted Dead or Wild', amount: '$3,670.22K USDT', grad: 'linear-gradient(155deg,#b45309,#78350f,#2d1200)' },
  { winner: 'ColdFusion9',   game: 'Money Train 3',      amount: '$5,100.44K USDT', grad: 'linear-gradient(155deg,#dc2626,#7f1d1d,#250000)' },
]

const HOT_GAMES: Game[] = [
  { title: 'Gates of Olympus',   provider: 'Pragmatic Play', players: '14.2K', grad: 'linear-gradient(155deg,#7c2d8f,#4a1562,#1a0a2e)', badge: 'HOT'  },
  { title: 'Sweet Bonanza',      provider: 'Pragmatic Play', players: '11.8K', grad: 'linear-gradient(155deg,#d4306a,#7c1038,#2d0010)', badge: 'HOT'  },
  { title: 'Aviator',            provider: 'Spribe',         players: '22.1K', grad: 'linear-gradient(155deg,#e53e3e,#7b1c1c,#1a0000)', badge: 'LIVE' },
  { title: 'Crazy Time',         provider: 'Evolution',      players: '18.4K', grad: 'linear-gradient(155deg,#f59e0b,#92400e,#3d1500)', badge: 'LIVE' },
  { title: 'Lightning Roulette', provider: 'Evolution',      players: '9.7K',  grad: 'linear-gradient(155deg,#2563eb,#1e3a8a,#0a1545)', badge: 'LIVE' },
  { title: 'Book of Dead',       provider: "Play'n GO",      players: '7.3K',  grad: 'linear-gradient(155deg,#c87941,#7a4117,#2d1200)', badge: null   },
  { title: 'Big Bass Splash',    provider: 'Pragmatic Play', players: '6.9K',  grad: 'linear-gradient(155deg,#059669,#064e3b,#001a13)', badge: null   },
  { title: 'Plinko',             provider: 'WAGER Originals', players: '15.6K', grad: 'linear-gradient(155deg,#7c3aed,#4c1d95,#1a0055)', badge: 'HOT'  },
  { title: 'Wolf Gold',          provider: 'Pragmatic Play', players: '5.1K',  grad: 'linear-gradient(155deg,#78716c,#44403c,#1c1917)', badge: null   },
  { title: 'Fruit Party',        provider: 'Pragmatic Play', players: '4.8K',  grad: 'linear-gradient(155deg,#ec4899,#831843,#1f0010)', badge: null   },
  { title: 'Money Train 3',      provider: 'Relax Gaming',   players: '8.2K',  grad: 'linear-gradient(155deg,#dc2626,#7f1d1d,#250000)', badge: 'HOT'  },
  { title: 'Dead or Alive 2',    provider: 'NetEnt',         players: '3.5K',  grad: 'linear-gradient(155deg,#92400e,#451a03,#1a0800)', badge: null   },
]

const WAGER_ORIGINALS: Game[] = [
  { title: 'Crash',     provider: 'WAGER Originals', players: '21.3K', grad: 'linear-gradient(155deg,#e53e3e,#7b1c1c,#1a0000)', badge: 'HOT' },
  { title: 'Mines',     provider: 'WAGER Originals', players: '12.4K', grad: 'linear-gradient(155deg,#059669,#064e3b,#001a13)', badge: 'HOT' },
  { title: 'Plinko',    provider: 'WAGER Originals', players: '15.6K', grad: 'linear-gradient(155deg,#7c3aed,#4c1d95,#1a0055)', badge: null   },
  { title: 'Dice',      provider: 'WAGER Originals', players: '9.8K',  grad: 'linear-gradient(155deg,#2563eb,#1e3a8a,#0a1545)', badge: null   },
  { title: 'Hash Dice', provider: 'WAGER Originals', players: '6.2K',  grad: 'linear-gradient(155deg,#f59e0b,#92400e,#3d1500)', badge: null   },
  { title: 'Wheel',     provider: 'WAGER Originals', players: '8.7K',  grad: 'linear-gradient(155deg,#ec4899,#831843,#1f0010)', badge: null   },
  { title: 'Limbo',     provider: 'WAGER Originals', players: '4.9K',  grad: 'linear-gradient(155deg,#0891b2,#164e63,#0a2030)', badge: null   },
  { title: 'Keno',      provider: 'WAGER Originals', players: '3.3K',  grad: 'linear-gradient(155deg,#9333ea,#581c87,#1a0040)', badge: null   },
]

const LIVE_CASINO: Game[] = [
  { title: 'Crazy Time',         provider: 'Evolution', players: '18.4K', grad: 'linear-gradient(155deg,#f59e0b,#92400e,#3d1500)', badge: 'LIVE' },
  { title: 'Lightning Roulette', provider: 'Evolution', players: '9.7K',  grad: 'linear-gradient(155deg,#2563eb,#1e3a8a,#0a1545)', badge: 'LIVE' },
  { title: 'Monopoly Live',      provider: 'Evolution', players: '11.2K', grad: 'linear-gradient(155deg,#dc2626,#7f1d1d,#250000)', badge: 'LIVE' },
  { title: 'Baccarat',           provider: 'Evolution', players: '7.1K',  grad: 'linear-gradient(155deg,#16a34a,#14532d,#052010)', badge: 'LIVE' },
  { title: 'Dream Catcher',      provider: 'Evolution', players: '5.8K',  grad: 'linear-gradient(155deg,#9333ea,#581c87,#1a0040)', badge: 'LIVE' },
  { title: 'XXXtreme Lightning', provider: 'Evolution', players: '4.4K',  grad: 'linear-gradient(155deg,#b45309,#78350f,#2d1200)', badge: 'LIVE' },
  { title: 'Infinite Blackjack', provider: 'Evolution', players: '6.6K',  grad: 'linear-gradient(155deg,#0f766e,#134e4a,#052020)', badge: 'LIVE' },
  { title: 'Deal or No Deal',    provider: 'Evolution', players: '3.9K',  grad: 'linear-gradient(155deg,#4f46e5,#312e81,#100a40)', badge: 'LIVE' },
]

const NAV = [
  { key: 'casino',      label: 'Casino',         subs: ['Slots', 'Live Casino', 'Table Games', 'WAGER Originals', 'Game Shows'] },
  { key: 'sports',      label: 'Sports',         subs: ['Football', 'Basketball', 'Tennis', 'Esports', 'Cricket'] },
  { key: 'predictions', label: 'Predictions',    subs: [] },
  { key: 'lottery',     label: 'Lottery',        subs: [] },
  { key: 'crypto',      label: 'Crypto Futures', subs: [] },
  { key: 'promotions',  label: 'Promotions',     subs: [] },
  { key: 'vip',         label: 'VIP Club',       subs: [] },
  { key: 'referral',    label: 'Referral',       subs: [] },
  { key: 'forum',       label: 'Forum',          subs: [] },
]

const FILTERS = ['Lobby', 'WAGER Originals', 'Hot Games', 'New Releases', 'Slots', 'Live Casino', 'Table Games', 'Crash', 'Sports', 'Jackpots']

// ── Icons ─────────────────────────────────────────────────────────────────────

function NavIcon({ type }: { type: string }) {
  const iconMap: Record<string, { bg: string; icon: string }> = {
    casino: {
      bg: 'bg-[#24EE89]',
      icon: '<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.96.76 1.58V19z" fill="currentColor"/>'
    },
    sports: {
      bg: 'bg-[#24EE89]',
      icon: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93V18h2v1.93c-.33.04-.66.07-1 .07s-.67-.03-1-.07zm4.19-1.69 1.01 1.01A7.94 7.94 0 0 1 15 19.93v-1.44l.19-.25zM12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm6.93 5H17v-1h-2v2h1.73a7.9 7.9 0 0 1-1.1 2.81l1.42 1.41A9.9 9.9 0 0 0 19 12c0-.35-.04-.69-.07-1.03v.03zM7.17 17.42A7.9 7.9 0 0 1 5.27 12H7v-1H5.27C5.1 10.35 5 9.69 5 9a7.9 7.9 0 0 1 2.17-5.42l1.42 1.41A5.93 5.93 0 0 0 7 9c0 1.93.92 3.64 2.34 4.72L7.17 17.42z" fill="currentColor"/>'
    },
    predictions: {
      bg: 'bg-white/10',
      icon: '<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" fill="currentColor"/>'
    },
    lottery: {
      bg: 'bg-white/10',
      icon: '<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'
    },
    crypto: {
      bg: 'bg-white/10',
      icon: '<path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" fill="currentColor"/>'
    },
    promotions: {
      bg: 'bg-white/10',
      icon: '<path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 15H4V8h16v11z" fill="currentColor"/>'
    },
    vip: {
      bg: 'bg-white/10',
      icon: '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
    },
    referral: {
      bg: 'bg-white/10',
      icon: '<path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="currentColor"/>'
    },
    forum: {
      bg: 'bg-white/10',
      icon: '<path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" fill="currentColor"/>'
    }
  }

  const item = iconMap[type] || iconMap.casino

  return (
    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${item.bg} text-black font-bold`}>
      <svg width="16" height="16" viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: item.icon }} />
    </div>
  )
}

// ── Sidebar Content Component ────────────────────────────────────────────────

function SidebarContent() {
  const [open, setOpen] = useState<Set<string>>(new Set(["casino", "sports"]))

  function toggle(key: string) {
    setOpen(prev => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  return (
    <div className="h-full flex flex-col bg-[#1a1d23]/80 backdrop-blur-xl text-white overflow-hidden border-r border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
      {/* Logo */}
      <div className="px-6 pt-7 pb-6 shrink-0 border-b border-white/[0.06]">
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-xl flex items-center justify-center bg-[#24EE89]/90 backdrop-blur-md shadow-[0_0_25px_rgba(36,238,137,.35)] border border-white/20">
            <span className="text-black text-2xl font-black">W</span>
          </div>
          <div>
            <h1 className="text-white font-black tracking-[0.2em] text-xl drop-shadow-md">WAGER</h1>
            <p className="text-[#8892a4] text-[11px] mt-0.5">Premium Betting Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation - Scrollable */}
      <nav className="px-3 py-4 flex-1 overflow-y-auto scrollbar-hide space-y-1">
        {NAV.map(({ key, label, subs }) => {
          const active = open.has(key)
          return (
            <div key={key}>
              <button
                onClick={() => subs.length && toggle(key)}
                className={`
                  group w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-200 border border-transparent
                  ${active && subs.length > 0 
                    ? "bg-white/[0.08] backdrop-blur-md text-white border-white/[0.12] shadow-[0_4px_16px_rgba(0,0,0,0.2)]" 
                    : "hover:bg-white/[0.04] hover:border-white/[0.06] text-[#a7b0bf] hover:text-white"}
                `}
              >
                <NavIcon type={key} />
                <span className="flex-1 text-left text-sm font-medium">
                  {label}
                </span>
                {subs.length > 0 && (
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                    className="text-[#8892a4] transition-transform duration-200"
                    style={{ transform: active ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                )}
              </button>

              {subs.length > 0 && active && (
                <div className="my-1 ml-4 pl-3 border-l border-white/10 space-y-1">
                  {subs.map((sub) => (
                    <button
                      key={sub}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-[#8892a4] transition-all hover:text-[#24EE89] hover:bg-white/[0.04] backdrop-blur-sm"
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Sidebar Footer / App Banner */}
      <div className="p-4 border-t border-white/[0.06] shrink-0 bg-[#16181d]/60 backdrop-blur-md">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/[0.08] shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
          <div className="w-10 h-10 rounded-lg bg-[#24EE89]/15 backdrop-blur-md flex items-center justify-center text-[#24EE89] border border-[#24EE89]/30">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 1.01 7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-3-5H10v-2h4v2zm2-4H10V8h6v2z"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-white truncate">Get WAGER App</h4>
            <p className="text-[10px] text-[#8892a4] truncate">iOS & Android</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Header Component ──────────────────────────────────────────────────────────

function Header({ 
  onOpenMobileMenu, 
  onSignIn, 
  onSignUp 
}: { 
  onOpenMobileMenu: () => void
  onSignIn: () => void
  onSignUp: () => void
}) {
  return (
    <header className="shrink-0 flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-3 bg-[#1a1d23]/80 backdrop-blur-xl border-b border-white/[0.07] z-30">
      <button
        onClick={onOpenMobileMenu}
        className="md:hidden p-2 rounded-xl bg-white/[0.06] backdrop-blur-md border border-white/[0.08] text-white hover:bg-white/10 transition-colors focus:outline-none"
        aria-label="Open Menu"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>

      <div className="relative w-32 sm:w-60 md:w-72">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8892a4] pointer-events-none"
          width="15" height="15" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-white/[0.05] backdrop-blur-md text-white text-xs sm:text-sm rounded-xl pl-9 pr-3 py-2 border border-white/[0.08] focus:outline-none focus:border-[#24EE89]/40 transition-colors placeholder:text-[#8892a4]/50 shadow-inner"
        />
      </div>

      <button className="hidden sm:flex items-center gap-2 bg-white/[0.05] backdrop-blur-md px-3 py-2 rounded-xl border border-white/[0.08] text-xs font-medium text-white hover:border-white/20 transition-colors shadow-sm">
        <span className="text-amber-400 text-sm leading-none">₿</span>
        <span>BTC</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div className="flex-1" />

      <div className="hidden lg:flex items-center gap-2 text-xs text-[#8892a4]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#24EE89] animate-pulse inline-block shadow-[0_0_8px_#24EE89]" />
        37,492 online
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button 
          onClick={onSignIn}
          className="px-3 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-white rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/20 hover:border-white/40 transition-colors shadow-sm whitespace-nowrap"
        >
          Sign In
        </button>
        <button 
          onClick={onSignUp}
          className="px-3 sm:px-5 py-2 text-xs sm:text-sm font-bold text-black bg-[#24EE89] rounded-xl hover:bg-[#8EDD5B] hover:shadow-[0_0_25px_rgba(36,238,137,0.5)] transition-all border border-[#24EE89]/40 whitespace-nowrap"
        >
          Sign Up
        </button>
      </div>
    </header>
  )
}



// ── Hero Section ──────────────────────────────────────────────────────────────

function Hero({ onSignUp }: { onSignUp: () => void }) {
  return (
    <div className="relative w-full overflow-hidden flex flex-col md:flex-row items-center bg-[#181b20]" style={{ minHeight: '300px' }}>
      <img
        src={banner}
        alt="The Wager Dynasty"
        className="absolute inset-0 w-full h-full object-cover object-right md:object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/90 via-black/50 to-transparent" />

      <div className="relative z-10 w-full py-8 px-6 md:px-10 flex flex-col justify-center">
        <div className="max-w-md">
          <div className="mb-3">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#24EE89">
              <path d="M5 16L3 5l5.5 5L12 2l3.5 8L21 5l-2 11H5m14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
            </svg>
          </div>

          <h1 className="hero-heading text-3xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg leading-tight tracking-wide">
            THE WAGER <br className="block sm:hidden" /> DYNASTY
          </h1>

          <button 
            onClick={onSignUp}
            className="px-8 py-2.5 text-sm font-bold text-black bg-[#24EE89] rounded-xl hover:bg-[#8EDD5B] hover:shadow-[0_0_25px_rgba(36,238,137,0.5)] transition-all mb-4 border border-[#24EE89]/50"
          >
            Sign Up
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 text-xs md:text-sm text-white/80">
            <span>Or Register With</span>
            <div className="flex flex-wrap items-center gap-2">
              <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.08] backdrop-blur-md border border-white/10 hover:bg-white/[0.15] transition-colors shadow-sm">
                <svg width="14" height="14" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3A12 12 0 0 1 12 24a12 12 0 0 1 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7A20 20 0 0 0 4 24a20 20 0 0 0 20 20 20 20 0 0 0 20-20c0-1.3-.1-2.7-.4-3.9z"/>
                  <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8A12 12 0 0 1 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7A20 20 0 0 0 4 24c0-3.3.8-6.4 2.3-9.3z"/>
                  <path fill="#4CAF50" d="M24 44a20 20 0 0 0 13.5-5.3l-6.2-5.3A12 12 0 0 1 24 36a12 12 0 0 1-11.3-7.9L6 32.8A20 20 0 0 0 24 44z"/>
                  <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3a12 12 0 0 1-4.1 5.4l6.3 5.4A19.9 19.9 0 0 0 44 24c0-1.3-.1-2.7-.4-3.9z"/>
                </svg>
                Google
              </button>
              <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.08] backdrop-blur-md border border-white/10 hover:bg-white/[0.15] transition-colors shadow-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#229ED9">
                  <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.94 8.19-2.06 9.7c-.16.7-.57.87-1.15.54l-3.19-2.35-1.54 1.48c-.17.17-.31.31-.64.31l.23-3.21 5.87-5.31c.26-.23-.06-.36-.4-.13l-7 4.41-3.02-.94c-.66-.21-.67-.66.14-.97l11.79-4.55c.55-.2 1.03.13.85.97z"/>
                </svg>
                Telegram
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Big Wins Marquee ──────────────────────────────────────────────────────────

function BigWinsMarquee() {
  const doubled = [...BIG_WINS, ...BIG_WINS]

  return (
    <div className="border-y border-white/[0.06] py-4 bg-[#1a1a1d]/80 backdrop-blur-md">
      <div className="flex items-center gap-3 px-6 mb-3">
        <span className="w-2 h-2 rounded-full bg-[#24EE89] animate-pulse inline-block shadow-[0_0_8px_#24EE89]" />
        <span className="text-xs font-bold text-white uppercase tracking-widest">Recent Big Wins</span>
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md"
          style={{ color: '#33ee7b', backgroundColor: 'rgba(23, 243, 122, 0.15)', border: '1px solid rgba(0,231,1,0.3)' }}
        >
          Live
        </span>
      </div>

      <div className="overflow-hidden">
        <div className="flex w-max animate-ticker">
          {doubled.map((win, i) => (
            <div
              key={i}
              className="inline-flex flex-col items-center mx-2 shrink-0 cursor-pointer"
              style={{ width: '82px' }}
            >
              <div
                className="w-[82px] h-[104px] rounded-xl relative overflow-hidden transition-all duration-300 hover:scale-105 border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                style={{ background: win.grad }}
              >
                <div
                  className="absolute top-1.5 right-1.5 w-5 h-5 rounded-lg flex items-center justify-center backdrop-blur-md border border-white/20"
                  style={{ backgroundColor: 'rgba(12, 250, 139, 0.8)' }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="black">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <div
                  className="absolute inset-x-0 bottom-0 px-1.5 pb-1.5 pt-4 backdrop-blur-[2px]"
                  style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.85),transparent)' }}
                >
                  <p className="text-white text-[8px] font-semibold leading-tight">{win.game}</p>
                </div>
              </div>
              <p className="text-[9px] mt-1.5 text-[#8892a4] text-center truncate w-full px-0.5">{win.winner}</p>
              <p className="text-[9px] font-bold text-[#24EE89] text-center leading-none drop-shadow-[0_0_6px_rgba(36,238,137,0.4)]">{win.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Filter Bar ────────────────────────────────────────────────────────────────

function FilterBar({ active, onChange }: { active: string; onChange: (s: string) => void }) {
  return (
    <div className="flex items-center gap-2 px-6 py-3 bg-[#1a1d23]/80 backdrop-blur-xl border-b border-white/[0.06] overflow-x-auto scrollbar-hide">
      {FILTERS.map(tab => {
        const isActive = active === tab
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`shrink-0 px-4 py-1.5 rounded-xl text-xs font-semibold transition-all backdrop-blur-md border ${
              isActive
                ? 'bg-[#24EE89] text-black border-[#24EE89]/50 shadow-[0_0_15px_rgba(36,238,137,0.4)]'
                : 'bg-white/[0.04] text-[#8892a4] border-white/[0.08] hover:bg-white/[0.08] hover:text-white'
            }`}
          >
            {tab}
          </button>
        )
      })}
    </div>
  )
}

// ── Game Card & Section ───────────────────────────────────────────────────────

function GameCard({ game }: { game: Game }) {
  return (
    <div className="group cursor-pointer select-none">
      <div
        className="relative rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] border border-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.3)]"
        style={{ aspectRatio: '3/4', background: game.grad }}
      >
        {game.badge && (
          <div
            className="absolute top-2 left-2 px-2 py-0.5 rounded-lg text-[9px] font-bold z-10 backdrop-blur-md border border-white/20 shadow-sm"
            style={
              game.badge === 'LIVE'
                ? { backgroundColor: 'rgba(220, 38, 38, 0.85)', color: '#fff' }
                : { backgroundColor: 'rgba(36, 238, 137, 0.85)', color: '#000' }
            }
          >
            {game.badge}
          </div>
        )}

        <div
          className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-lg text-[9px] text-white/90 z-10 backdrop-blur-md border border-white/10"
          style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#24EE89] inline-block shadow-[0_0_6px_#24EE89]" />
          {game.players}
        </div>

        <div
          className="absolute inset-x-0 bottom-0 p-2.5 pt-7 backdrop-blur-[2px]"
          style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.9),transparent)' }}
        >
          <p className="text-white text-[11px] font-semibold leading-tight drop-shadow-md">{game.title}</p>
          <p className="text-[9px] mt-0.5 text-white/55">{game.provider}</p>
        </div>
      </div>
    </div>
  )
}

function GameSection({ title, badge, games }: { title: string; badge?: string; games: Game[] }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h2 className="font-bold text-base text-white">{title}</h2>
          {badge && (
            <span
              className="text-[10px] font-bold px-2.5 py-0.5 rounded-xl backdrop-blur-md"
              style={{ color: '#24EE89', backgroundColor: 'rgba(36,238,137,0.1)', border: '1px solid rgba(36,238,137,0.25)' }}
            >
              {badge}
            </span>
          )}
        </div>
        <button className="text-xs text-[#8892a4] transition-colors hover:text-[#24EE89]">
          View all →
        </button>
      </div>
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(115px,1fr))' }}
      >
        {games.map(g => <GameCard key={g.title} game={g} />)}
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="mt-16 border-t border-white/5 pt-10 pb-8">
      {/* Top logos / badges */}
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-10 text-zinc-500 text-xs font-medium">
        <span>SiGMA</span>
        <span>Responsible Gambling</span>
        <span>GamCare</span>
        <span>betblocker</span>
        <span className="px-2 py-1 border border-white/20 rounded text-[11px]">18+</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 text-sm text-zinc-400 max-w-7xl mx-auto">
        {/* CASINO */}
        <div className="space-y-3">
          <p className="font-bold text-white uppercase text-xs tracking-wider">Casino</p>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition-colors">Casino Home</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Slots</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Live Casino</a></li>
            <li><a href="#" className="hover:text-white transition-colors">New Releases</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Recommended</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Table Game</a></li>
            <li><a href="#" className="hover:text-white transition-colors">BlackJack</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Roulette</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Baccarat</a></li>
          </ul>
        </div>

        {/* WAGER SUPPORT */}
        <div className="space-y-3">
          <p className="font-bold text-white uppercase text-xs tracking-wider">Wager Support</p>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition-colors">Sports Home</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Live</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Rules</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Sport Betting Insights</a></li>
          </ul>
        </div>

        {/* PROMO */}
        <div className="space-y-3">
          <p className="font-bold text-white uppercase text-xs tracking-wider">Promo</p>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition-colors">VIP Club</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Referral</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Promotions</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Profile</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Refer a friend</a></li>
          </ul>
        </div>

        {/* SUPPORT/LEGAL */}
        <div className="space-y-3">
          <p className="font-bold text-white uppercase text-xs tracking-wider">Support/Legal</p>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition-colors">Licenses</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Gamble Aware</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Fairness</a></li>
            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms Of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Law Enforcement</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Responsible Gambling</a></li>
          </ul>
        </div>

        {/* ABOUT US */}
        <div className="space-y-3">
          <p className="font-bold text-white uppercase text-xs tracking-wider">About Us</p>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition-colors">News</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Business Contacts</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Help Desk</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Verify Representative</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Verify This Site</a></li>
          </ul>
        </div>

        {/* COMMUNITY */}
        <div className="space-y-4">
          <p className="font-bold text-white uppercase text-xs tracking-wider">Join Our Global Community</p>
          <div className="grid grid-cols-4 gap-2">
            <a href="#" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#24EE89]/20 hover:text-[#24EE89] flex items-center justify-center transition-all border border-white/5 group" title="Telegram">
              <svg className="w-4 h-4 fill-current text-zinc-400 group-hover:text-[#24EE89]" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.228-.461-1.901-.903-1.056-.693-1.653-1.124-2.678-1.8-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.324-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.12.098.153.228.166.331.012.095.024.312.008.483z"/></svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#24EE89]/20 hover:text-[#24EE89] flex items-center justify-center transition-all border border-white/5 group" title="Discord">
              <svg className="w-4 h-4 fill-current text-zinc-400 group-hover:text-[#24EE89]" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#24EE89]/20 hover:text-[#24EE89] flex items-center justify-center transition-all border border-white/5 group" title="X (Twitter)">
              <svg className="w-4 h-4 fill-current text-zinc-400 group-hover:text-[#24EE89]" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#24EE89]/20 hover:text-[#24EE89] flex items-center justify-center transition-all border border-white/5 group" title="Instagram">
              <svg className="w-4 h-4 fill-current text-zinc-400 group-hover:text-[#24EE89]" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#24EE89]/20 hover:text-[#24EE89] flex items-center justify-center transition-all border border-white/5 group" title="Reddit">
              <svg className="w-4 h-4 fill-current text-zinc-400 group-hover:text-[#24EE89]" viewBox="0 0 24 24"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.221.73-.207 1.02.046.315.275.335.753.045 1.05-.724.745-1.785 1.207-2.962 1.342.062.339.096.69.096 1.045 0 3.765-4.413 6.822-9.854 6.822S2.146 19.345 2.146 15.58c0-.36.035-.71.098-1.05-1.18-.135-2.245-.597-2.97-1.342-.29-.297-.27-.775.045-1.05.29-.253.712-.267 1.02-.046 1.193.856 2.85 1.418 4.674 1.488l.8-3.747 2.598.547a1.25 1.25 0 0 1 2.45-.532l2.84 5.968c1.396.112 2.628.536 3.593 1.186.326.222.756.179.99-.102.234-.282.196-.702-.086-.944-.816-.544-1.895-.91-3.08-1.042l-2.61-5.485c-.17-.358-.59-.51-.948-.34z"/></svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#24EE89]/20 hover:text-[#24EE89] flex items-center justify-center transition-all border border-white/5 group" title="WhatsApp">
              <svg className="w-4 h-4 fill-current text-zinc-400 group-hover:text-[#24EE89]" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#24EE89]/20 hover:text-[#24EE89] flex items-center justify-center transition-all border border-white/5 group" title="TikTok">
              <svg className="w-4 h-4 fill-current text-zinc-400 group-hover:text-[#24EE89]" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#24EE89]/20 hover:text-[#24EE89] flex items-center justify-center transition-all border border-white/5 group" title="Basketball Community">
              <svg className="w-4 h-4 fill-current text-zinc-400 group-hover:text-[#24EE89]" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 0 1-6.93-4h3.86a14.28 14.28 0 0 0 1.57 3.32A8.13 8.13 0 0 1 12 20zm0-16a8 8 0 0 1 6.93 4h-3.86a14.28 14.28 0 0 0-1.57-3.32A8.13 8.13 0 0 1 12 4zM4.07 10h3.86a14.28 14.28 0 0 0 0 4H4.07a8.13 8.13 0 0 1 0-4zm15.86 4h-3.86a14.28 14.28 0 0 0 0-4h3.86a8.13 8.13 0 0 1 0 4zm-7.93-2a12.28 12.28 0 0 1-1.39-3h2.78a12.28 12.28 0 0 1-1.39 3zm0 2a12.28 12.28 0 0 1 1.39 3h-2.78a12.28 12.28 0 0 1 1.39-3z"/></svg>
            </a>
          </div>

          <p className="font-bold text-white uppercase text-xs tracking-wider pt-2">Join Our Local Community</p>
          <button className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-sm border border-white/5">
            🌍
          </button>
        </div>
      </div>

      <div className="pt-8 mt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-zinc-500 text-[11px] max-w-7xl mx-auto">
        <p>© 2026 WAGER. All rights reserved.</p>
        <p className="mt-2 sm:mt-0">Secure SSL Encrypted Gaming Platform</p>
      </div>
    </footer>
  )
}

// ── Mobile Bottom Navigation Bar (Glassmorphic) ───────────────────────────────

function MobileBottomNav({ onOpenMenu }: { onOpenMenu: () => void }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-[#1a1d23]/75 backdrop-blur-2xl border-t border-white/10 flex items-center justify-around z-40 md:hidden px-2 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      <button onClick={onOpenMenu} className="group flex flex-col items-center justify-center text-[#8892a4] hover:text-[#24EE89] transition-colors py-1">
        <div className="w-8 h-8 rounded-xl bg-white/[0.04] group-hover:bg-[#24EE89]/15 backdrop-blur-md border border-white/[0.08] flex items-center justify-center transition-colors shadow-sm">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </div>
        <span className="text-[10px] mt-1 font-medium">Menu</span>
      </button>

      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="group flex flex-col items-center justify-center text-[#8892a4] hover:text-[#24EE89] transition-colors py-1">
        <div className="w-8 h-8 rounded-xl bg-white/[0.04] group-hover:bg-[#24EE89]/15 backdrop-blur-md border border-white/[0.08] flex items-center justify-center transition-colors shadow-sm">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <span className="text-[10px] mt-1 font-medium">Explore</span>
      </button>

      <button onClick={() => window.scrollTo({ top: 350, behavior: 'smooth' })} className="group flex flex-col items-center justify-center text-[#8892a4] hover:text-[#24EE89] transition-colors py-1">
        <div className="w-8 h-8 rounded-xl bg-white/[0.04] group-hover:bg-[#24EE89]/15 backdrop-blur-md border border-white/[0.08] flex items-center justify-center transition-colors shadow-sm">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="18" rx="2" ry="2"></rect>
            <circle cx="8" cy="8" r="1.5" fill="currentColor"></circle>
            <circle cx="16" cy="16" r="1.5" fill="currentColor"></circle>
            <circle cx="12" cy="12" r="1.5" fill="currentColor"></circle>
          </svg>
        </div>
        <span className="text-[10px] mt-1 font-medium">Casino</span>
      </button>

      <button onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })} className="group flex flex-col items-center justify-center text-[#8892a4] hover:text-[#24EE89] transition-colors py-1">
        <div className="w-8 h-8 rounded-xl bg-white/[0.04] group-hover:bg-[#24EE89]/15 backdrop-blur-md border border-white/[0.08] flex items-center justify-center transition-colors shadow-sm">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M4.93 4.93l14.14 14.14"></path>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            <path d="M2 12h20"></path>
          </svg>
        </div>
        <span className="text-[10px] mt-1 font-medium">Sports</span>
      </button>
    </div>
  )
}

// ── Main App Container ────────────────────────────────────────────────────────

export default function App() {
  const [activeFilter, setActiveFilter] = useState('Lobby')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState<'home' | 'dashboard' | 'deposit'>('home')

  // Listen for success registration → go to dashboard
  useEffect(() => {
  const handler = () => {
    console.log('Going to dashboard...'); // for testing
    setCurrentPage('dashboard');
  };

  window.addEventListener('go-to-dashboard', handler);
  return () => window.removeEventListener('go-to-dashboard', handler);
}, []);

  // ─── DASHBOARD PAGE ─────────────────────────────────────────────
  if (currentPage === 'dashboard') {
    return (
      <Dashboard
        onDeposit={() => setCurrentPage('deposit')}
        onLogout={() => setCurrentPage('home')}
      />
    )
  }

  // ─── DEPOSIT PAGE ───────────────────────────────────────────────
  if (currentPage === 'deposit') {
    return (
      <Deposit onBack={() => setCurrentPage('dashboard')} />
    )
  }

  // ─── HOME PAGE ──────────────────────────────────────────────────
  return (
    <div className="flex h-screen overflow-hidden bg-[#0f1115] text-white font-sans relative">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-72 shrink-0 h-full bg-transparent">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-72 max-w-[85%] h-full bg-transparent z-10 shadow-2xl flex flex-col">
            <div className="absolute top-4 right-4 z-20">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-white/[0.08] text-white hover:bg-white/20 transition-colors"
                aria-label="Close Menu"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header 
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onSignIn={() => setIsSignInOpen(true)}
          onSignUp={() => setIsSignUpOpen(true)}
        />

        <main className="flex-1 overflow-y-auto pb-20 md:pb-6 scrollbar-hide">
          <Hero onSignUp={() => setIsSignUpOpen(true)} />
          <BigWinsMarquee />
          <FilterBar active={activeFilter} onChange={setActiveFilter} />

          <div className="px-6 py-6 space-y-8 max-w-7xl mx-auto w-full">
            <GameSection title="Hot Games" badge="POPULAR" games={HOT_GAMES} />
            <GameSection title="WAGER Originals" badge="EXCLUSIVE" games={WAGER_ORIGINALS} />
            <GameSection title="Live Casino" badge="LIVE" games={LIVE_CASINO} />
            
            {/* FOOTER IS HERE */}
            <Footer />
          </div>
        </main>
      </div>

      <MobileBottomNav onOpenMenu={() => setMobileMenuOpen(true)} />

      {/* Modals */}
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        onSwitchToSignIn={() => {
          setIsSignUpOpen(false)
          setIsSignInOpen(true)
        }}
        onSuccess={() => setCurrentPage('dashboard')}
      />

      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onSwitchToSignUp={() => {
          setIsSignInOpen(false)
          setIsSignUpOpen(true)
        }}
      />
    </div>
  )
}