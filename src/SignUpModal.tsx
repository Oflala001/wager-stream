import React, { useState } from 'react';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignIn?: () => void;
  onSuccess?: () => void;          // ← Add this
}

const countries = [
  { code: '+1', name: 'United States', flag: '🇺🇸' },
  { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: '+234', name: 'Nigeria', flag: '🇳🇬' },
  { code: '+91', name: 'India', flag: '🇮🇳' },
  { code: '+27', name: 'South Africa', flag: '🇿🇦' },
  { code: '+233', name: 'Ghana', flag: '🇬🇭' },
  { code: '+254', name: 'Kenya', flag: '🇰🇪' },
  { code: '+971', name: 'UAE', flag: '🇦🇪' },
  { code: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: '+33', name: 'France', flag: '🇫🇷' },
  { code: '+39', name: 'Italy', flag: '🇮🇹' },
  { code: '+34', name: 'Spain', flag: '🇪🇸' },
  { code: '+55', name: 'Brazil', flag: '🇧🇷' },
  { code: '+81', name: 'Japan', flag: '🇯🇵' },
];

export function SignUpModal({ isOpen, onClose, onSwitchToSignIn, onSuccess }: SignUpModalProps) {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+234');
  const [referralCode, setReferralCode] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); // ← Success state

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!acceptedTerms) {
      setError('Please accept the Terms & Conditions');
      return;
    }

    setIsLoading(true);

    try {
      console.log('Signing up with:', {
        fullName,
        username,
        email,
        password,
        phone: `${countryCode}${phone}`,
        referralCode,
      });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Show success popup instead of closing
      setIsSuccess(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // ─── SUCCESS POPUP ───────────────────────────────────────────────
 // ─── SUCCESS SCREEN ─────────────────────────────────────────────
if (isSuccess) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-sm bg-[#181b20]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl text-white text-center overflow-hidden">
        
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-[#24EE89]/20 rounded-full blur-3xl"></div>

        <div className="relative mx-auto mb-6 w-20 h-20 rounded-full bg-gradient-to-br from-[#24EE89] to-[#8EDD5B] flex items-center justify-center shadow-[0_0_30px_rgba(36,238,137,0.4)]">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold mb-2">Registered Successfully!</h2>
        <p className="text-sm text-zinc-400 mb-8 leading-relaxed">
          Welcome to <span className="text-[#24EE89] font-medium">The Wager Dynasty</span>.  
          Your account has been created successfully.
        </p>

        <button
  onClick={() => {
    onClose();
    setIsSuccess(false);
    
    // Call the onSuccess prop if it exists
    onSuccess?.();

    // Also dispatch the event (keep both for compatibility)
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('go-to-dashboard'));
    }, 100);
  }}
  className="w-full py-3.5 bg-[#24EE89] hover:bg-[#8EDD5B] text-black font-bold rounded-xl text-sm transition-all shadow-[0_0_25px_rgba(36,238,137,0.4)] mb-3"
>
  Recharge Now
</button>

        <button
          onClick={() => {
            onClose();
            setIsSuccess(false);
          }}
          className="text-xs text-zinc-500 hover:text-white transition-colors"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}

  // ─── NORMAL SIGN UP FORM ─────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#181b20] border border-zinc-800 rounded-2xl p-6 md:p-8 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors p-1 z-10"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Modal Header */}
        <div className="mb-6 text-center">
          <div className="inline-flex p-3 rounded-xl bg-[#24EE89]/10 text-[#24EE89] mb-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 16L3 5l5.5 5L12 2l3.5 8L21 5l-2 11H5m14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold tracking-wide">Create Account</h2>
          <p className="text-xs text-zinc-400 mt-1">Join The Wager Dynasty and start playing</p>
        </div>

        {/* Social Logins */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button 
            type="button"
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors text-xs font-medium"
          >
            <svg width="16" height="16" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3A12 12 0 0 1 12 24a12 12 0 0 1 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7A20 20 0 0 0 4 24a20 20 0 0 0 20 20 20 20 0 0 0 20-20c0-1.3-.1-2.7-.4-3.9z"/>
              <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8A12 12 0 0 1 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7A20 20 0 0 0 4 24c0-3.3.8-6.4 2.3-9.3z"/>
              <path fill="#4CAF50" d="M24 44a20 20 0 0 0 13.5-5.3l-6.2-5.3A12 12 0 0 1 24 36a12 12 0 0 1-11.3-7.9L6 32.8A20 20 0 0 0 24 44z"/>
              <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3a12 12 0 0 1-4.1 5.4l6.3 5.4A19.9 19.9 0 0 0 44 24c0-1.3-.1-2.7-.4-3.9z"/>
            </svg>
            Google
          </button>
          <button 
            type="button"
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors text-xs font-medium"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#229ED9">
              <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.94 8.19-2.06 9.7c-.16.7-.57.87-1.15.54l-3.19-2.35-1.54 1.48c-.17.17-.31.31-.64.31l.23-3.21 5.87-5.31c.26-.23-.06-.36-.4-.13l-7 4.41-3.02-.94c-.66-.21-.67-.66.14-.97l11.79-4.55c.55-.2 1.03.13.85.97z"/>
            </svg>
            Telegram
          </button>
        </div>

        <div className="flex items-center gap-4 my-4 text-zinc-500 text-xs">
          <div className="flex-1 h-px bg-zinc-800"></div>
          OR WITH EMAIL
          <div className="flex-1 h-px bg-zinc-800"></div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center">
            {error}
          </div>
        )}

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Full Name */}
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Full Name</label>
            <input 
              type="text" 
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-[#24EE89] transition-colors"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Username</label>
            <input 
              type="text" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-[#24EE89] transition-colors"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-[#24EE89] transition-colors"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Phone Number</label>
            <div className="flex gap-2">
              <div className="relative">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="appearance-none w-[110px] pl-3 pr-8 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-[#24EE89] transition-colors cursor-pointer"
                >
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.code}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-zinc-400">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
                className="flex-1 px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-[#24EE89] transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-[#24EE89] transition-colors"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Confirm Password</label>
            <input 
              type="password" 
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-[#24EE89] transition-colors"
            />
          </div>

          {/* Referral Code */}
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">
              Referral Code <span className="text-zinc-600">(Optional)</span>
            </label>
            <input 
              type="text" 
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              placeholder="Enter referral code"
              className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-[#24EE89] transition-colors"
            />
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-2.5 pt-1">
            <input
              type="checkbox"
              id="terms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-[#24EE89] focus:ring-[#24EE89] focus:ring-offset-0"
            />
            <label htmlFor="terms" className="text-xs text-zinc-400 leading-relaxed">
              I agree to the <span className="text-[#24EE89] hover:underline cursor-pointer">Terms of Service</span> and <span className="text-[#24EE89] hover:underline cursor-pointer">Privacy Policy</span>
            </label>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 bg-[#24EE89] hover:bg-[#8EDD5B] disabled:opacity-60 disabled:cursor-not-allowed text-black font-bold rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(36,238,137,0.3)]"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-zinc-500 mt-6">
          Already have an account?{' '}
          <button 
            type="button"
            className="text-[#24EE89] hover:underline font-medium"
            onClick={() => {
              onClose();
              onSwitchToSignIn?.();
            }}
          >
            Sign In
          </button>
        </p>

      </div>
    </div>
  );
}