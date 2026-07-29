import React, { useState } from 'react';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignUp?: () => void; // Optional: to switch to Sign Up modal
}

export function SignInModal({ isOpen, onClose, onSwitchToSignUp }: SignInModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // TODO: Replace this with your actual login API call
      console.log('Signing in with:', { email, password });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // On success
      onClose();
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#181b20] border border-zinc-800 rounded-2xl p-6 md:p-8 shadow-2xl text-white">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors p-1"
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
          <h2 className="text-2xl font-bold tracking-wide">Welcome Back</h2>
          <p className="text-xs text-zinc-400 mt-1">Sign in to continue to The Wager Dynasty</p>
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

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-medium text-zinc-400">Password</label>
              <button 
                type="button"
                className="text-xs text-[#24EE89] hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-[#24EE89] transition-colors"
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 bg-[#24EE89] hover:bg-[#8EDD5B] disabled:opacity-60 disabled:cursor-not-allowed text-black font-bold rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(36,238,137,0.3)]"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-zinc-500 mt-6">
          Don't have an account?{' '}
          <button 
            type="button"
            className="text-[#24EE89] hover:underline font-medium"
            onClick={() => {
              onClose();
              onSwitchToSignUp?.();
            }}
          >
            Create Account
          </button>
        </p>

      </div>
    </div>
  );
}