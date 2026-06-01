import { useState } from 'react';
import PageWrapper from '../components/common/PageWrapper';
import GlowCard from '../components/common/GlowCard';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [activityEmails, setActivityEmails] = useState(false);
  const [themeAccent, setThemeAccent] = useState('purple');

  return (
    <PageWrapper title="Settings & UI" subtitle="Customize your TaskMaster experience.">
      <div className="grid gap-6 xl:grid-cols-2">
        <GlowCard className="p-6" glowColor="purple">
          <h3 className="text-xl font-semibold text-text-primary mb-4">Appearance</h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-4">
              <div>
                <p className="text-text-primary font-medium">Dark Mode</p>
                <p className="text-text-secondary text-sm">Keep the premium dark theme active.</p>
              </div>
              <input
                type="checkbox"
                className="h-5 w-5 rounded-lg accent-accent-cyan"
                checked={darkMode}
                onChange={() => setDarkMode((prev) => !prev)}
              />
            </label>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-text-primary font-medium mb-3">Theme Accent</p>
              <div className="flex flex-wrap gap-3">
                {['purple', 'cyan', 'magenta'].map((accent) => (
                  <button
                    key={accent}
                    type="button"
                    onClick={() => setThemeAccent(accent)}
                    className={`rounded-3xl px-4 py-2 text-sm font-semibold transition-all ${themeAccent === accent ? 'bg-white/10 text-text-primary' : 'bg-white/5 text-text-secondary hover:bg-white/10'}`}
                  >
                    {accent}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </GlowCard>

        <GlowCard className="p-6" glowColor="cyan">
          <h3 className="text-xl font-semibold text-text-primary mb-4">Notifications</h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-4">
              <div>
                <p className="text-text-primary font-medium">App Notifications</p>
                <p className="text-text-secondary text-sm">Receive alerts for key updates.</p>
              </div>
              <input
                type="checkbox"
                className="h-5 w-5 rounded-lg accent-accent-purple"
                checked={notifications}
                onChange={() => setNotifications((prev) => !prev)}
              />
            </label>
            <label className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-4">
              <div>
                <p className="text-text-primary font-medium">Activity Emails</p>
                <p className="text-text-secondary text-sm">Weekly summary and reports.</p>
              </div>
              <input
                type="checkbox"
                className="h-5 w-5 rounded-lg accent-accent-cyan"
                checked={activityEmails}
                onChange={() => setActivityEmails((prev) => !prev)}
              />
            </label>
          </div>
        </GlowCard>

        <GlowCard className="p-6 xl:col-span-2" glowColor="purple">
          <h3 className="text-xl font-semibold text-text-primary mb-4">Account</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-text-secondary">Username</p>
              <p className="mt-2 text-lg font-semibold text-text-primary">admin.taskmaster</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-text-secondary">Account Type</p>
              <p className="mt-2 text-lg font-semibold text-text-primary">Administrator</p>
            </div>
          </div>
        </GlowCard>
      </div>
    </PageWrapper>
  );
}
