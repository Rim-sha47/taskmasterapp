import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearch } from '../context/SearchContext';
import PageWrapper from '../components/common/PageWrapper';
import GlowCard from '../components/common/GlowCard';

const initialColumns = {
  todo: {
    title: 'Todo',
    tasks: [
      { id: 'task-1', title: 'Design homepage UI', label: 'Design' },
      { id: 'task-2', title: 'Create brand assets', label: 'Brand' },
    ],
  },
  inProgress: {
    title: 'In Progress',
    tasks: [
      { id: 'task-3', title: 'Develop dashboard grid', label: 'Frontend' },
      { id: 'task-4', title: 'Integrate API endpoints', label: 'Backend' },
    ],
  },
  review: {
    title: 'Review',
    tasks: [
      { id: 'task-5', title: 'QA new feature copy', label: 'QA' },
    ],
  },
  completed: {
    title: 'Completed',
    tasks: [
      { id: 'task-6', title: 'Finalize onboarding flow', label: 'UX' },
    ],
  },
};

export default function Kanban() {
  const [columns, setColumns] = useState(initialColumns);
  const [draggedTask, setDraggedTask] = useState(null);

  const handleDragStart = (task, sourceColumn) => {
    setDraggedTask({ task, sourceColumn });
  };

  const handleDrop = (destinationColumn) => {
    if (!draggedTask || draggedTask.sourceColumn === destinationColumn) {
      setDraggedTask(null);
      return;
    }

    setColumns((current) => {
      const sourceTasks = current[draggedTask.sourceColumn].tasks.filter(
        (item) => item.id !== draggedTask.task.id,
      );
      const destinationTasks = [
        ...current[destinationColumn].tasks,
        draggedTask.task,
      ];

      return {
        ...current,
        [draggedTask.sourceColumn]: {
          ...current[draggedTask.sourceColumn],
          tasks: sourceTasks,
        },
        [destinationColumn]: {
          ...current[destinationColumn],
          tasks: destinationTasks,
        },
      };
    });

    setDraggedTask(null);
  };

  const taskCount = useMemo(
    () => Object.values(columns).reduce((sum, column) => sum + column.tasks.length, 0),
    [columns],
  );

  const { searchQuery } = useSearch();
  const filteredColumns = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return columns;
    return Object.fromEntries(
      Object.entries(columns).map(([key, column]) => [
        key,
        {
          ...column,
          tasks: column.tasks.filter((task) =>
            task.title.toLowerCase().includes(query) ||
            task.label.toLowerCase().includes(query),
          ),
        },
      ]),
    );
  }, [columns, searchQuery]);

  return (
    <PageWrapper title="Kanban Board" subtitle="Organize your work across every stage.">
      {searchQuery.trim() && (
        <div className="mb-4 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-text-secondary">
          Showing tasks matching "{searchQuery}".
        </div>
      )}
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {Object.entries(filteredColumns).map(([key, column]) => (
            <GlowCard key={key} className="p-6 min-h-[280px]" glowColor="cyan">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-text-primary">{column.title}</h3>
                  <p className="text-sm text-text-secondary">{column.tasks.length} tasks</p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-text-secondary">
                  {column.tasks.length}
                </span>
              </div>

              <div
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => handleDrop(key)}
                className="space-y-4 min-h-[220px] rounded-3xl border border-white/10 bg-[#0f172a]/40 p-3"
              >
                {column.tasks.map((task) => (
                  <motion.div
                    key={task.id}
                    layout
                    drag
                    dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
                    onDragStart={() => handleDragStart(task, key)}
                    whileHover={{ y: -2 }}
                    className="glass border border-white/10 p-4 rounded-3xl cursor-grab hover:shadow-glow-purple"
                  >
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <h4 className="text-sm font-semibold text-text-primary">{task.title}</h4>
                      <span className="rounded-full bg-white/5 px-2 py-1 text-[11px] uppercase tracking-[0.2em] text-accent-cyan">
                        {task.label}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary">Drag this task to change its status.</p>
                  </motion.div>
                ))}
                {!column.tasks.length && (
                  <div className="text-center text-sm text-text-secondary py-10">Drop tasks here</div>
                )}
              </div>
            </GlowCard>
          ))}
        </div>

        <GlowCard className="p-6" glowColor="purple">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-text-primary">Quick Summary</h3>
            <p className="text-text-secondary text-sm mt-1">
              Track task flow, prioritize updates, and collaborate faster with polished Kanban management.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-3xl bg-white/5 p-4">
              <div>
                <p className="text-sm text-text-secondary">Total tasks</p>
                <p className="text-2xl font-semibold text-text-primary">{taskCount}</p>
              </div>
              <div className="rounded-2xl bg-accent-purple/10 px-3 py-2 text-accent-purple">Active</div>
            </div>
            <div className="rounded-3xl bg-white/5 p-4">
              <p className="text-sm text-text-secondary">Next milestone</p>
              <p className="mt-2 text-text-primary font-semibold">Sprint review and deployment</p>
            </div>
            <div className="rounded-3xl bg-white/5 p-4">
              <p className="text-sm text-text-secondary">Team focus</p>
              <p className="mt-2 text-text-primary font-semibold">Finish approval pipeline</p>
            </div>
          </div>
        </GlowCard>
      </div>
    </PageWrapper>
  );
}
