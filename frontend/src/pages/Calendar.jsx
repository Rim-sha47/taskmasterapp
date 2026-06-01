import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearch } from '../context/SearchContext';
import PageWrapper from '../components/common/PageWrapper';
import GlowCard from '../components/common/GlowCard';

const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const events = [
  { time: 'Mar 2', title: 'Sprint planning', status: 'Confirmed' },
  { time: 'Mar 8', title: 'Client review session', status: 'Pending' },
  { time: 'Mar 15', title: 'Release deployment', status: 'Confirmed' },
];

function getCalendarMatrix(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const matrix = [];
  let week = Array(firstDay).fill(null);

  for (let day = 1; day <= daysInMonth; day += 1) {
    week.push(day);
    if (week.length === 7) {
      matrix.push(week);
      week = [];
    }
  }

  if (week.length) {
    matrix.push([...week, ...Array(7 - week.length).fill(null)]);
  }

  return matrix;
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();
  const { searchQuery } = useSearch();

  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  const calendarMatrix = useMemo(() => getCalendarMatrix(year, currentDate.getMonth()), [currentDate, year]);
  const filteredEvents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return events;
    return events.filter((event) => event.title.toLowerCase().includes(query) || event.status.toLowerCase().includes(query));
  }, [searchQuery]);

  const moveMonth = (offset) => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
  };

  return (
    <PageWrapper title="Calendar View" subtitle="Plan your month with precision.">
      <div className="grid gap-6 xl:grid-cols-[0.75fr_0.9fr]">
        <GlowCard className="p-6" glowColor="cyan">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <p className="text-sm text-text-secondary">Current month</p>
              <h3 className="text-3xl font-semibold text-text-primary">{monthName} {year}</h3>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => moveMonth(-1)}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-primary hover:bg-white/10 transition-all"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={() => moveMonth(1)}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-primary hover:bg-white/10 transition-all"
              >
                Next
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs uppercase tracking-[0.2em] text-text-secondary mb-3">
            {weekdayNames.map((day) => (
              <div key={day} className="py-2 rounded-2xl bg-white/5">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {calendarMatrix.map((week, weekIndex) => (
              <div key={weekIndex} className="contents">
                {week.map((date, index) => {
                  const isToday = date === today.getDate() && currentDate.getMonth() === today.getMonth() && year === today.getFullYear();
                  return (
                    <div
                      key={index}
                      className={`min-h-[90px] rounded-3xl border border-white/10 p-3 text-left ${date ? 'bg-white/5' : 'bg-transparent'} ${isToday ? 'border-accent-cyan/70 bg-accent-cyan/10 shadow-glow-cyan' : ''}`}
                    >
                      {date ? (
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-text-primary">
                          {date}
                        </span>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </GlowCard>

        <GlowCard className="p-6" glowColor="purple">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold text-text-primary">Upcoming Events</h3>
              <p className="text-text-secondary text-sm mt-1">Review the important milestones and reminders for the month.</p>
            </div>
            {searchQuery.trim() && (
              <p className="text-sm text-accent-cyan">Filtering events for "{searchQuery}"</p>
            )}
          </div>

          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <div key={event.time} className="glass border border-white/10 rounded-3xl p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-text-secondary">{event.time}</p>
                    <h4 className="text-lg font-semibold text-text-primary">{event.title}</h4>
                  </div>
                  <span className="rounded-full bg-accent-purple/15 px-3 py-1 text-xs text-accent-purple">{event.status}</span>
                </div>
              </div>
            ))}
            {!filteredEvents.length && (
              <div className="glass border border-white/10 rounded-3xl p-6 text-center text-text-secondary">
                No events match "{searchQuery}".
              </div>
            )}
          </div>
        </GlowCard>
      </div>
    </PageWrapper>
  );
}
