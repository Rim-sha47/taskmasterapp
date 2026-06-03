import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../components/common/Logo';
import { register } from '../services/authService';

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] =
    useState('');

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);

      await register({
        name,
        email,
        password,
      });

      alert('Registration successful');

      navigate('/login');
    } catch (error) {
      setError(
        error.response?.data?.message ||
          'Registration failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl glass glow-border p-8 rounded-[32px] border border-white/10 shadow-glow-purple"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <Logo className="h-14 w-14 rounded-3xl bg-[#0f172a] p-2" />

              <div>
                <h1 className="text-3xl font-bold text-text-primary">
                  Create Account
                </h1>

                <p className="text-text-secondary">
                  Join TaskMaster today.
                </p>
              </div>
            </div>

            <div className="glass glow-border p-6 rounded-3xl border border-white/10 bg-black/20">
              <h2 className="text-xl font-semibold text-text-primary mb-3">
                Get Started
              </h2>

              <p className="text-text-secondary text-sm leading-6">
                Create your account and start managing
                tasks, teams and projects efficiently.
              </p>
            </div>
          </div>

          <div className="glass glow-border p-8 rounded-3xl border border-white/10">
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm text-text-secondary mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  required
                  className="w-full rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-3 text-text-primary outline-none"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm text-text-secondary mb-2">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                  className="w-full rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-3 text-text-primary outline-none"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm text-text-secondary mb-2">
                  Password
                </label>

                <input
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                  className="w-full rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-3 text-text-primary outline-none"
                  placeholder="Create password"
                />
              </div>

              <div>
                <label className="block text-sm text-text-secondary mb-2">
                  Confirm Password
                </label>

                <input
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  required
                  className="w-full rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-3 text-text-primary outline-none"
                  placeholder="Confirm password"
                />
              </div>

              <label className="inline-flex items-center gap-2 text-sm text-text-secondary">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() =>
                    setShowPassword(
                      (prev) => !prev
                    )
                  }
                />
                Show Password
              </label>

              {error && (
                <p className="text-red-400 text-sm">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-gradient-to-r from-accent-purple to-accent-cyan px-5 py-3 text-sm font-semibold text-dark-bg"
              >
                {loading
                  ? 'Creating Account...'
                  : 'Register'}
              </button>

              <p className="text-center text-sm text-text-secondary">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-accent-cyan"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}