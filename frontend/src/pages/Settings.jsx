import { useState, useEffect } from 'react';
import PageWrapper from '../components/common/PageWrapper';
import GlowCard from '../components/common/GlowCard';
import { useTheme } from '../context/themeContext';
import {
  getSettings,
  updateSettings,
} from '../services/settingsService';

export default function Settings() {
  const [settingId, setSettingId] = useState('');

  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [activityEmails, setActivityEmails] = useState(true);
  const {
  themeAccent,
  setThemeAccent,
} = useTheme();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await getSettings();

      const settings = response.data.data?.[0];

      if (!settings) return;

      setSettingId(settings.id);
      setDarkMode(settings.dark_mode);
      setNotifications(settings.app_notifications);
      setActivityEmails(settings.email_notifications);
      setThemeAccent(settings.accent_color);
    } catch (error) {
      console.error('Settings Fetch Error:', error);
    }
  };

  const saveSettings = async (updatedData) => {
    try {
      if (!settingId) return;

      await updateSettings(settingId, updatedData);
    } catch (error) {
      console.error('Settings Update Error:', error);
    }
  };

  return (
    <PageWrapper
      title="Settings & UI"
      subtitle="Customize your TaskMaster experience."
    >
      <div className="grid gap-6 xl:grid-cols-2">
        <GlowCard className="p-6" glowColor="purple">
          <h3 className="text-xl font-semibold text-text-primary mb-4">
            Appearance
          </h3>

          <div className="space-y-4">
            <label className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-4">
              <div>
                <p className="text-text-primary font-medium">
                  Dark Mode
                </p>

                <p className="text-text-secondary text-sm">
                  Keep the premium dark theme active.
                </p>
              </div>

              <input
                type="checkbox"
                className="h-5 w-5 rounded-lg accent-accent-cyan"
                checked={darkMode}
                onChange={(e) => {
                  const value = e.target.checked;

                  setDarkMode(value);

                  saveSettings({
                    dark_mode: value,
                    accent_color: themeAccent,
                    email_notifications: activityEmails,
                    app_notifications: notifications,
                  });
                }}
              />
            </label>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-text-primary font-medium mb-3">
                Theme Accent
              </p>

              <div className="flex flex-wrap gap-3">
                {['purple', 'cyan', 'magenta'].map(
                  (accent) => (
                    <button
                      key={accent}
                      type="button"
                      onClick={() => {
                        setThemeAccent(accent);

                        saveSettings({
                          dark_mode: darkMode,
                          accent_color: accent,
                          email_notifications:
                            activityEmails,
                          app_notifications:
                            notifications,
                        });
                      }}
                      className={`rounded-3xl px-4 py-2 text-sm font-semibold transition-all ${
                        themeAccent === accent
                          ? 'bg-white/10 text-text-primary'
                          : 'bg-white/5 text-text-secondary hover:bg-white/10'
                      }`}
                    >
                      {accent}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </GlowCard>

        <GlowCard className="p-6" glowColor="cyan">
          <h3 className="text-xl font-semibold text-text-primary mb-4">
            Notifications
          </h3>

          <div className="space-y-4">
            <label className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-4">
              <div>
                <p className="text-text-primary font-medium">
                  App Notifications
                </p>

                <p className="text-text-secondary text-sm">
                  Receive alerts for key updates.
                </p>
              </div>

              <input
                type="checkbox"
                className="h-5 w-5 rounded-lg accent-accent-purple"
                checked={notifications}
                onChange={(e) => {
                  const value = e.target.checked;

                  setNotifications(value);

                  saveSettings({
                    dark_mode: darkMode,
                    accent_color: themeAccent,
                    email_notifications:
                      activityEmails,
                    app_notifications: value,
                  });
                }}
              />
            </label>

            <label className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-4">
              <div>
                <p className="text-text-primary font-medium">
                  Activity Emails
                </p>

                <p className="text-text-secondary text-sm">
                  Weekly summary and reports.
                </p>
              </div>

              <input
                type="checkbox"
                className="h-5 w-5 rounded-lg accent-accent-cyan"
                checked={activityEmails}
                onChange={(e) => {
                  const value = e.target.checked;

                  setActivityEmails(value);

                  saveSettings({
                    dark_mode: darkMode,
                    accent_color: themeAccent,
                    email_notifications: value,
                    app_notifications:
                      notifications,
                  });
                }}
              />
            </label>
          </div>
        </GlowCard>

        <GlowCard
          className="p-6 xl:col-span-2"
          glowColor="purple"
        >
          <h3 className="text-xl font-semibold text-text-primary mb-4">
            Account
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-text-secondary">
                Username
              </p>

              <p className="mt-2 text-lg font-semibold text-text-primary">
                TaskMaster User
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-text-secondary">
                Account Type
              </p>

              <p className="mt-2 text-lg font-semibold text-text-primary">
                Administrator
              </p>
            </div>
          </div>
        </GlowCard>
      </div>
    </PageWrapper>
  );
}