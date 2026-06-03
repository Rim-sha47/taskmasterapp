import { useMemo, useState, useEffect } from 'react';
import { useSearch } from '../context/SearchContext';
import PageWrapper from '../components/common/PageWrapper';
import GlowCard from '../components/common/GlowCard';
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../services/calendarService';

const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getCalendarMatrix(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const matrix = [];
  let week = Array(firstDay).fill(null);

  for (let day = 1; day <= daysInMonth; day++) {
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
  const [events, setEvents] = useState([]);
const [showCreateForm, setShowCreateForm] = useState(false);

const [showEditForm, setShowEditForm] = useState(false);

const [newEvent, setNewEvent] = useState({
  title: '',
  start_date: '',
});

const [editingEvent, setEditingEvent] = useState({
  id: '',
  title: '',
  start_date: '',
});
  const today = new Date();
  const { searchQuery } = useSearch();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await getEvents();

      const formattedEvents = response.data.data.map((event) => ({
  id: event.id,
  date: new Date(event.start_date),
  time: new Date(event.start_date).toLocaleDateString(),
  title: event.title,
  status: 'Scheduled',
}));

      setEvents(formattedEvents);
    } catch (error) {
      console.error('Calendar API Error:', error);
    }
  };
const handleCreateEvent = async () => {
  try {
    await createEvent(newEvent);

    setNewEvent({
      title: '',
      start_date: '',
    });

    setShowCreateForm(false);

    await fetchEvents();

    alert('Event Created Successfully');
  } catch (error) {
    console.error(error);
  }
};
const handleEditEvent = (event) => {
  setEditingEvent({
    id: event.id,
    title: event.title,
    start_date: event.date
      ? new Date(event.date)
          .toISOString()
          .split('T')[0]
      : '',
  });

  setShowEditForm(true);
};
const handleUpdateEvent = async () => {
  try {
    console.log(editingEvent);
    await updateEvent(
      editingEvent.id,
      {
        title: editingEvent.title,
        start_date:
          editingEvent.start_date,
      }
    );

    setShowEditForm(false);

    await fetchEvents();

    alert('Event Updated');
  } catch (error) {
    console.error(error);
  }
};
const handleDeleteEvent = async (
  id
) => {
  try {
    await deleteEvent(id);

    await fetchEvents();

    alert('Event Deleted');
  } catch (error) {
    console.error(error);
  }
};
  const monthName = currentDate.toLocaleString('default', {
    month: 'long',
  });

  const year = currentDate.getFullYear();

  const calendarMatrix = useMemo(
    () => getCalendarMatrix(year, currentDate.getMonth()),
    [currentDate, year]
  );

  const filteredEvents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return events;

    return events.filter(
      (event) =>
        event.title.toLowerCase().includes(query) ||
        event.status.toLowerCase().includes(query)
    );
  }, [events, searchQuery]);

  const moveMonth = (offset) => {
    setCurrentDate(
      (prev) =>
        new Date(
          prev.getFullYear(),
          prev.getMonth() + offset,
          1
        )
    );
  };
const hasEventOnDate = (day) => {
  return events.some((event) => {
    const eventDate = new Date(event.date);

    return (
      eventDate.getDate() === day &&
      eventDate.getMonth() === currentDate.getMonth() &&
      eventDate.getFullYear() === year
    );
  });
};

const getEventForDate = (day) => {
  return events.find((event) => {
    const eventDate = new Date(event.date);

    return (
      eventDate.getDate() === day &&
      eventDate.getMonth() === currentDate.getMonth() &&
      eventDate.getFullYear() === year
    );
  });
};
  return (
    <PageWrapper
      title="Calendar View"
      subtitle="Plan your month with precision."
    >
      <div className="grid gap-4 md:grid-cols-4 mb-6">
  <GlowCard className="p-4" glowColor="purple">
    <p className="text-text-secondary text-sm">
      Total Events
    </p>
    <h3 className="text-3xl font-bold text-white">
      {events.length}
    </h3>
  </GlowCard>

  <GlowCard className="p-4" glowColor="cyan">
    <p className="text-text-secondary text-sm">
      Upcoming
    </p>
    <h3 className="text-3xl font-bold text-white">
      {events.length}
    </h3>
  </GlowCard>

  <GlowCard className="p-4" glowColor="purple">
    <p className="text-text-secondary text-sm">
      Today
    </p>
    <h3 className="text-3xl font-bold text-white">
      {
        events.filter(
          e =>
            new Date(e.date)
              .toDateString() ===
            new Date()
              .toDateString()
        ).length
      }
    </h3>
  </GlowCard>

  <GlowCard className="p-4" glowColor="cyan">
    <p className="text-text-secondary text-sm">
      This Month
    </p>
    <h3 className="text-3xl font-bold text-white">
      {events.length}
    </h3>
  </GlowCard>
</div>
      <div className="grid gap-6 xl:grid-cols-[0.75fr_0.9fr]">
        <GlowCard className="p-6" glowColor="cyan">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <p className="text-sm text-text-secondary">
                Current month
              </p>

              <h3 className="text-3xl font-semibold text-text-primary">
                {monthName} {year}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => moveMonth(-1)}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-primary hover:bg-white/10 transition-all"
              >
                ←
              </button>

              <button
                type="button"
                onClick={() => moveMonth(1)}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-primary hover:bg-white/10 transition-all"
              >
                →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs uppercase tracking-[0.2em] text-text-secondary mb-3">
            {weekdayNames.map((day) => (
              <div
                key={day}
                className="py-2 rounded-2xl bg-white/5"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {calendarMatrix.map((week, weekIndex) => (
              <div key={weekIndex} className="contents">
                {week.map((date, index) => {
                  const isToday =
                    date === today.getDate() &&
                    currentDate.getMonth() ===
                      today.getMonth() &&
                    year === today.getFullYear();
                  const hasEvent = date
  ? hasEventOnDate(date)
  : false;

const eventInfo = date
  ? getEventForDate(date)
  : null;
                  return (
                    <div
                      key={index}
                      className={`min-h-[75px] rounded-3xl border p-3 text-left ${
  date
    ? hasEvent
      ? 'bg-purple-500/10 border-purple-500/40'
      : 'bg-white/5 border-white/10'
    : 'bg-transparent border-transparent'
} ${
  isToday
    ? 'border-accent-cyan/70 bg-accent-cyan/10 shadow-glow-cyan'
    : ''
}`}
                    >
                      {date && (
  <>
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-text-primary">
      {date}
    </span>

    {hasEvent && (
      <div className="mt-2">
        <div className="flex items-center gap-1">
  <div className="h-2 w-2 rounded-full bg-purple-500" />

  <div className="h-2 w-2 rounded-full bg-cyan-500" />
</div>
        <p className="text-[10px] text-purple-400 truncate">
          {eventInfo?.title}
        </p>
      </div>
    )}
  </>
)}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </GlowCard>

        <GlowCard className="p-6" glowColor="purple">
          <div className="mb-4">
  <button
    onClick={() => setShowCreateForm(!showCreateForm)}
    className="rounded-xl bg-purple-600 px-4 py-2 text-white"
  >
    + Create Event
  </button>
</div>

{showCreateForm && (
  <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4">
    <input
      type="text"
      placeholder="Event Title"
      value={newEvent.title}
      onChange={(e) =>
        setNewEvent({
          ...newEvent,
          title: e.target.value,
        })
      }
      className="w-full rounded-lg p-2 mb-3 bg-black/20"
    />

    <input
      type="date"
      value={newEvent.start_date}
      onChange={(e) =>
        setNewEvent({
          ...newEvent,
          start_date: e.target.value,
        })
      }
      className="w-full rounded-lg p-2 mb-3 bg-black/20"
    />

    <button
      onClick={handleCreateEvent}
      className="rounded-xl bg-green-600 px-4 py-2 text-white"
    >
      Save Event
    </button>
  </div>
)}

<div className="mb-6 flex items-center justify-between gap-3">
            <div>

              <h3 className="text-xl font-semibold text-text-primary">
                Upcoming Events
              </h3>

              <p className="text-text-secondary text-sm mt-1">
                Review important milestones and reminders.
              </p>
            </div>

            {searchQuery.trim() && (
              <p className="text-sm text-accent-cyan">
                Filtering events for "{searchQuery}"
              </p>
            )}
          </div>
{showEditForm && (
  <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4">
    <h3 className="text-lg font-semibold text-white mb-4">
      Edit Event
    </h3>

    <input
      type="text"
      placeholder="Event Title"
      value={editingEvent.title}
      onChange={(e) =>
        setEditingEvent({
          ...editingEvent,
          title: e.target.value,
        })
      }
      className="w-full rounded-lg border border-white/10 bg-black/20 p-3 text-white mb-3"
    />

    <input
      type="date"
      value={editingEvent.start_date}
      onChange={(e) =>
        setEditingEvent({
          ...editingEvent,
          start_date: e.target.value,
        })
      }
      className="w-full rounded-lg border border-white/10 bg-black/20 p-3 text-white mb-3"
    />

    <div className="flex gap-3">
      <button
        onClick={handleUpdateEvent}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white"
      >
        Update Event
      </button>

      <button
        onClick={() => setShowEditForm(false)}
        className="rounded-lg bg-red-600 px-4 py-2 text-white"
      >
        Cancel
      </button>
    </div>
  </div>
)}

<div className="space-y-4"></div>
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="glass border border-white/10 rounded-3xl p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-text-secondary">
                      {event.time}
                    </p>

                    <h4 className="text-lg font-semibold text-text-primary">
                      {event.title}
                    </h4>
                    <div className="flex gap-3 mt-2">
             
  <button
  onClick={() => {
    console.log('Edit clicked');
    handleEditEvent(event);
  }}
  className="text-xs text-blue-500"
>
  Edit
</button>
  <button
    onClick={() =>
      handleDeleteEvent(
        event.id
      )
    }
    className="text-xs text-red-500"
  >
    Delete
  </button>
</div>
                  </div>

                  <span className="rounded-full bg-accent-purple/15 px-3 py-1 text-xs text-accent-purple">
                    {event.status}
                  </span>
                </div>
              </div>
            ))}

            {!filteredEvents.length && (
              <div className="glass border border-white/10 rounded-3xl p-6 text-center text-text-secondary">
                No events found.
              </div>
            )}
          </div>
        </GlowCard>
      </div>
    </PageWrapper>
  );
}