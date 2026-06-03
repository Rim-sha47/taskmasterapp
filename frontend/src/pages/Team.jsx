import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Users } from 'lucide-react';
import { useSearch } from '../context/SearchContext';
import PageWrapper from '../components/common/PageWrapper';
import GlowCard from '../components/common/GlowCard';
import {
  getMembers,
  createMember,
  updateMember,
  deleteMember,
} from '../services/teamService';

const statusStyles = {
  online: 'bg-accent-cyan/10 text-accent-cyan',
  busy: 'bg-accent-purple/10 text-accent-purple',
  away: 'bg-white/10 text-text-secondary',
  offline: 'bg-white/5 text-text-secondary',
};

export default function Team() {
  const { searchQuery, setSearchQuery } = useSearch();

  const [members, setMembers] = useState([]);
const [showCreateForm, setShowCreateForm] = useState(false);

const [newMember, setNewMember] = useState({
  name: '',
  email: '',
  designation: '',
  status: 'online',
});

const [showEditForm, setShowEditForm] = useState(false);

const [editingMember, setEditingMember] = useState(null);
  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await getMembers();

      setMembers(response.data.data || []);
    } catch (error) {
      console.error('Team API Error:', error);
    }
  };

  const filteredMembers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return members;

    return members.filter(
      (member) =>
        member.name?.toLowerCase().includes(query) ||
        member.designation?.toLowerCase().includes(query) ||
        member.email?.toLowerCase().includes(query)
    );
  }, [members, searchQuery]);
const handleCreateMember = async () => {
  try {
    await createMember(newMember);

    setNewMember({
      name: '',
      email: '',
      designation: '',
      status: 'online',
    });

    setShowCreateForm(false);

    fetchMembers();
  } catch (error) {
    console.error(error);
  }
};

const handleEditMember = (member) => {
  setEditingMember(member);
  setShowEditForm(true);
};

const handleUpdateMember = async () => {
  try {
    await updateMember(
      editingMember.id,
      editingMember
    );

    setShowEditForm(false);

    fetchMembers();
  } catch (error) {
    console.error(error);
  }
};

const handleDeleteMember = async (id) => {
  const confirmed = window.confirm(
    'Delete this member?'
  );

  if (!confirmed) return;

  try {
    await deleteMember(id);

    fetchMembers();
  } catch (error) {
    console.error(error);
  }
};
  return (
    <PageWrapper
      title="Team Directory"
      subtitle="Manage your team and view member status."
    >
      <div className="grid gap-6 xl:grid-cols-[0.75fr_1.1fr]">
        <GlowCard className="p-6" glowColor="purple">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-text-primary">
                Team Spotlight
              </h3>

              <p className="text-text-secondary text-sm mt-1">
                Keep your crew connected and engaged.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-3xl border border-white/10 bg-[#0f172a]/60 p-3">
              <Search
                size={18}
                className="text-accent-cyan"
              />

              <input
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                placeholder="Search members"
                className="w-full bg-transparent text-text-primary outline-none placeholder:text-text-secondary"
              />
            </div>
          </div>
<button
  onClick={() => setShowCreateForm(!showCreateForm)}
  className="rounded-xl bg-purple-600 px-4 py-2 text-white"
>
  + Add Member
</button>

{showCreateForm && (
  <div className="space-y-3 mb-4">
    <input
      value={newMember.name}
      onChange={(e) =>
        setNewMember({
          ...newMember,
          name: e.target.value,
        })
      }
      placeholder="Name"
      className="w-full rounded-xl p-3 bg-white/5"
    />

    <input
      value={newMember.email}
      onChange={(e) =>
        setNewMember({
          ...newMember,
          email: e.target.value,
        })
      }
      placeholder="Email"
      className="w-full rounded-xl p-3 bg-white/5"
    />

    <input
      value={newMember.designation}
      onChange={(e) =>
        setNewMember({
          ...newMember,
          designation: e.target.value,
        })
      }
      placeholder="Designation"
      className="w-full rounded-xl p-3 bg-white/5"
    />

    <select
      value={newMember.status}
      onChange={(e) =>
        setNewMember({
          ...newMember,
          status: e.target.value,
        })
      }
      className="w-full rounded-xl p-3 bg-white/5"
    >
      <option value="online">Online</option>
      <option value="busy">Busy</option>
      <option value="away">Away</option>
      <option value="offline">Offline</option>
    </select>

    <button
      onClick={handleCreateMember}
      className="rounded-xl bg-green-600 px-4 py-2 text-white"
    >
      Save Member
    </button>
  </div>
)}

{showEditForm && editingMember && (
  <div className="space-y-3 mb-6 p-4 border border-white/10 rounded-2xl">
    <input
      value={editingMember.name}
      onChange={(e) =>
        setEditingMember({
          ...editingMember,
          name: e.target.value,
        })
      }
      className="w-full rounded-xl p-3 bg-white/5"
    />

    <input
      value={editingMember.email}
      onChange={(e) =>
        setEditingMember({
          ...editingMember,
          email: e.target.value,
        })
      }
      className="w-full rounded-xl p-3 bg-white/5"
    />

    <input
      value={editingMember.designation}
      onChange={(e) =>
        setEditingMember({
          ...editingMember,
          designation: e.target.value,
        })
      }
      className="w-full rounded-xl p-3 bg-white/5"
    />

    <button
      onClick={handleUpdateMember}
      className="rounded-xl bg-blue-600 px-4 py-2 text-white"
    >
      Update Member
    </button>
  </div>
)}
          <div className="grid gap-4">
            {filteredMembers.map((member) => (
              <motion.div
                key={member.id}
                whileHover={{ y: -3 }}
                className="glass border border-white/10 rounded-3xl p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-semibold text-text-primary">
                      {member.name}
                    </h4>

                    <p className="text-sm text-text-secondary">
                      {member.designation}
                    </p>

                    <p className="text-xs text-text-secondary mt-1">
                      {member.email}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      statusStyles[
                        member.status?.toLowerCase()
                      ] || 'bg-white/5 text-text-secondary'
                    }`}
                  >
                    {member.status}
                  </span>
                </div>
                <div className="mt-3 flex gap-3">
  <button
    onClick={() =>
      handleEditMember(member)
    }
    className="text-blue-500 text-sm"
  >
    Edit
  </button>

  <button
    onClick={() =>
      handleDeleteMember(member.id)
    }
    className="text-red-500 text-sm"
  >
    Delete
  </button>
</div>
              </motion.div>
            ))}

            {!filteredMembers.length && (
              <p className="text-text-secondary">
                No members found.
              </p>
            )}
          </div>
        </GlowCard>

        <GlowCard className="p-6" glowColor="cyan">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-accent-purple/10 text-accent-purple">
              <Users size={22} />
            </div>

            <div>
              <p className="text-sm text-text-secondary">
                Active team
              </p>

              <h3 className="text-2xl font-semibold text-text-primary">
                {members.length} members
              </h3>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-text-secondary">
              Team Overview
            </p>

            <div className="mt-4 grid gap-4">
              <div className="rounded-3xl bg-[#0f172a] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">
                  Online Members
                </p>

                <p className="mt-2 text-xl font-semibold text-text-primary">
                  {
                    members.filter(
                      (m) =>
                        m.status?.toLowerCase() ===
                        'online'
                    ).length
                  }
                </p>
              </div>

              <div className="rounded-3xl bg-[#0f172a] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">
                  Total Members
                </p>

                <p className="mt-2 text-xl font-semibold text-text-primary">
                  {members.length}
                </p>
              </div>
            </div>
          </div>
        </GlowCard>
      </div>
    </PageWrapper>
  );
}