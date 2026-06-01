import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Users } from 'lucide-react';
import { useSearch } from '../context/SearchContext';
import PageWrapper from '../components/common/PageWrapper';
import GlowCard from '../components/common/GlowCard';

const members = [
  { id: 1, name: 'Ava Pierce', role: 'Product Manager', status: 'Online', email: 'ava@taskmaster.com' },
  { id: 2, name: 'Kai Moreno', role: 'Lead Designer', status: 'Busy', email: 'kai@taskmaster.com' },
  { id: 3, name: 'Lina Scott', role: 'Frontend Engineer', status: 'Away', email: 'lina@taskmaster.com' },
  { id: 4, name: 'Noah Kim', role: 'Backend Engineer', status: 'Online', email: 'noah@taskmaster.com' },
  { id: 5, name: 'Mia Torres', role: 'QA Specialist', status: 'Offline', email: 'mia@taskmaster.com' },
];

const statusStyles = {
  Online: 'bg-accent-cyan/10 text-accent-cyan',
  Busy: 'bg-accent-purple/10 text-accent-purple',
  Away: 'bg-white/10 text-text-secondary',
  Offline: 'bg-white/5 text-text-secondary',
};

export default function Team() {
  const { searchQuery, setSearchQuery } = useSearch();

  const filteredMembers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return members;
    return members.filter((member) =>
      member.name.toLowerCase().includes(query) ||
      member.role.toLowerCase().includes(query) ||
      member.email.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  return (
    <PageWrapper title="Team Directory" subtitle="Manage your team and view member status.">
      <div className="grid gap-6 xl:grid-cols-[0.75fr_1.1fr]">
        <GlowCard className="p-6" glowColor="purple">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-text-primary">Team Spotlight</h3>
              <p className="text-text-secondary text-sm mt-1">Keep your crew connected and engaged.</p>
            </div>
            <div className="flex items-center gap-2 rounded-3xl border border-white/10 bg-[#0f172a]/60 p-3">
              <Search size={18} className="text-accent-cyan" />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search members"
                className="w-full bg-transparent text-text-primary outline-none placeholder:text-text-secondary"
              />
            </div>
          </div>

          <div className="grid gap-4">
            {filteredMembers.map((member) => (
              <motion.div
                key={member.id}
                whileHover={{ y: -3 }}
                className="glass border border-white/10 rounded-3xl p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-semibold text-text-primary">{member.name}</h4>
                    <p className="text-sm text-text-secondary">{member.role}</p>
                    <p className="text-xs text-text-secondary mt-1">{member.email}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[member.status]}`}>
                    {member.status}
                  </span>
                </div>
              </motion.div>
            ))}
            {!filteredMembers.length && (
              <p className="text-text-secondary">No members found. Try another search term.</p>
            )}
          </div>
        </GlowCard>

        <GlowCard className="p-6" glowColor="cyan">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-accent-purple/10 text-accent-purple">
              <Users size={22} />
            </div>
            <div>
              <p className="text-sm text-text-secondary">Active team</p>
              <h3 className="text-2xl font-semibold text-text-primary">{members.length} members</h3>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-text-secondary">Collaboration score</p>
            <div className="mt-4 grid gap-4">
              <div className="rounded-3xl bg-[#0f172a] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">Top performer</p>
                <p className="mt-2 text-xl font-semibold text-text-primary">Ava Pierce</p>
              </div>
              <div className="rounded-3xl bg-[#0f172a] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">Next available</p>
                <p className="mt-2 text-xl font-semibold text-text-primary">Noah Kim</p>
              </div>
            </div>
          </div>
        </GlowCard>
      </div>
    </PageWrapper>
  );
}
