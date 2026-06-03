import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../components/common/Logo';
import { login } from '../services/authService';
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] =
    useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      navigate('/dashboard', {
        replace: true,
      });
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError('');

      const response = await login({
        email,
        password,
      });

      const token = response.data.token;

      localStorage.setItem('token', token);

      localStorage.setItem(
        'user',
        JSON.stringify(response.data.user)
      );

      navigate('/dashboard', {
        replace: true,
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          'Invalid credentials'
      );
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
                  TaskMaster Login
                </h1>

                <p className="text-text-secondary">
                  Access your dashboard.
                </p>
              </div>
            </div>

            <div className="glass glow-border p-6 rounded-3xl border border-white/10 bg-black/20">
              <h2 className="text-xl font-semibold text-text-primary mb-3">
                Welcome Back
              </h2>

              <p className="text-text-secondary text-sm leading-6">
                Login using your registered
                TaskMaster account.
              </p>
            </div>
          </div>

          <div className="glass glow-border p-8 rounded-3xl border border-white/10">
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label
                  className="block text-sm text-text-secondary mb-2"
                  htmlFor="email"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                  className="w-full rounded-2xl border border-white/10 bg-[#0f172a] px-4 py-3 text-text-primary outline-none"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label
                  className="block text-sm text-text-secondary mb-2"
                  htmlFor="password"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
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
                    placeholder="Enter password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (prev) => !prev
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary text-sm"
                  >
                    {showPassword
                      ? 'Hide'
                      : 'Show'}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <label className="inline-flex items-center gap-2 text-sm text-text-secondary">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={() =>
                      setRemember(
                        (prev) => !prev
                      )
                    }
                    className="h-4 w-4"
                  />

                  Remember Me
                </label>
              </div>

              {error && (
                <p className="text-red-400 text-sm">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-accent-purple to-accent-cyan px-5 py-3 text-sm font-semibold text-dark-bg"
              >
                Login
              </button>

              <p className="text-center text-sm text-text-secondary mt-4">
  Don't have an account?{" "}
  <Link
    to="/register"
    className="text-accent-cyan hover:underline"
  >
    Register
  </Link>
</p>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}