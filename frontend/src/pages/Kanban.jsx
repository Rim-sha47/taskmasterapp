import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearch } from '../context/SearchContext';
import PageWrapper from '../components/common/PageWrapper';
import GlowCard from '../components/common/GlowCard';
import {
  getTasks,
  createTask,
  deleteTask,
  updateTaskStatus,
  updateTask,
} from '../services/taskService';

export default function Kanban() {
  const { searchQuery } = useSearch();

  const [columns, setColumns] = useState({
    todo: {
      title: 'Todo',
      tasks: [],
    },
    in_progress: {
      title: 'In Progress',
      tasks: [],
    },
    review: {
      title: 'Review',
      tasks: [],
    },
    completed: {
      title: 'Completed',
      tasks: [],
    },
  });

  const [draggedTask, setDraggedTask] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
const [showEditForm, setShowEditForm] = useState(false);

const [editingTask, setEditingTask] = useState({
  id: '',
  title: '',
  description: '',
  dueDate: '',
  priority: 'medium',
  status: 'todo',
});
 const [newTask, setNewTask] = useState({
  title: '',
  description: '',
  dueDate: '',
  priority: 'medium',
  status: 'todo',
});

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();

const tasks = response.data.data || response.data.tasks || [];

      const newColumns = {
        todo: {
          title: 'Todo',
          tasks: [],
        },
        in_progress: {
          title: 'In Progress',
          tasks: [],
        },
        review: {
          title: 'Review',
          tasks: [],
        },
        completed: {
          title: 'Completed',
          tasks: [],
        },
      };

      tasks.forEach((task) => {
        const formattedTask = {
          id: task.id,
          title: task.title,
          label: task.priority || 'Task',
        };

        switch (task.status) {
          case 'todo':
            newColumns.todo.tasks.push(formattedTask);
            break;

          case 'in_progress':
            newColumns.in_progress.tasks.push(formattedTask);
            break;

          case 'review':
            newColumns.review.tasks.push(formattedTask);
            break;

          case 'completed':
            newColumns.completed.tasks.push(formattedTask);
            break;

          default:
            newColumns.todo.tasks.push(formattedTask);
        }
      });

      setColumns(newColumns);
    } catch (error) {
      console.error('Task Fetch Error:', error);
    }
  };

  const handleCreateTask = async () => {
  try {
    if (!newTask.title.trim()) {
  alert('Task Title Required');
  return;
}
if (!newTask.dueDate) {
  alert('Due Date Required');
  return;
}


    await createTask({
  title: newTask.title,
  description: newTask.description,
  dueDate: newTask.dueDate,
  status: newTask.status,
  priority: newTask.priority,
});

   setNewTask({
  title: '',
  description: '',
  dueDate: '',
  priority: 'medium',
  status: 'todo',
});

    
    setShowCreateForm(false);

    fetchTasks();
  } 
  catch (error) {
    console.error(error);
  }
};

  const handleDragStart = (task, sourceColumn) => {
  console.log('Dragging:', task.title);

  setDraggedTask({
    task,
    sourceColumn,
  });
};

  const handleDrop = async (destinationColumn) => {
  if (
    !draggedTask ||
    draggedTask.sourceColumn === destinationColumn
  ) {
    setDraggedTask(null);
    return;
  }

  try {
    await updateTaskStatus(
      draggedTask.task.id,
      destinationColumn
    );

    await fetchTasks();
  } catch (error) {
    console.error(error);
  }

  setDraggedTask(null);
};

  const taskCount = useMemo(
    () =>
      Object.values(columns).reduce(
        (sum, column) => sum + column.tasks.length,
        0
      ),
    [columns]
  );

  const handleDeleteTask = async (id) => {
  try {
    await deleteTask(id);

    fetchTasks();
  } catch (error) {
    console.error(error);
  }
};
const handleEditTask = (task) => {
  setEditingTask({
    id: task.id,
    title: task.title,
    description: task.description || '',
    dueDate: task.dueDate || '',
    priority: task.label || 'medium',
    status: task.status || 'todo',
  });

  setShowEditForm(true);
};
const handleUpdateTask = async () => {
  try {
    await updateTask(editingTask.id, {
  title: editingTask.title,
  description: editingTask.description,
  dueDate: editingTask.dueDate,
  priority: editingTask.priority,
  status: editingTask.status,
});

    setShowEditForm(false);

    await fetchTasks();

    alert('Task Updated Successfully');
  } catch (error) {
    console.error(error);
  }
};
  const filteredColumns = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return columns;

    return Object.fromEntries(
      Object.entries(columns).map(([key, column]) => [
        key,
        {
          ...column,
          tasks: column.tasks.filter(
            (task) =>
              task.title.toLowerCase().includes(query) ||
              task.label.toLowerCase().includes(query)
          ),
        },
      ])
    );
  }, [columns, searchQuery]);

  return (
    <PageWrapper
      title="Kanban Board"
      subtitle="Organize your work across every stage."
    >
      {searchQuery.trim() && (
        <div className="mb-4 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-text-secondary">
          Showing tasks matching "{searchQuery}".
        </div>
      )}

<div className="mb-6 flex justify-end">
  <button
    onClick={() =>
      setShowCreateForm(!showCreateForm)
    }
    className="rounded-xl bg-purple-600 px-4 py-2 text-white"
  >
    + Create Task
  </button>
</div>
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {Object.entries(filteredColumns).map(([key, column]) => (
            <GlowCard
              key={key}
              className="p-6 min-h-[280px]"
              glowColor="cyan"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-text-primary">
                    {column.title}
                  </h3>

                  <p className="text-sm text-text-secondary">
                    {column.tasks.length} tasks
                  </p>
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
  draggable={true}
  onDragStart={() =>
    handleDragStart(task, key)
  }
  whileHover={{ y: -2 }}
  className="glass border border-white/10 p-4 rounded-3xl cursor-grab hover:shadow-glow-purple"
>
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <h4 className="text-sm font-semibold text-text-primary">
                        {task.title}
                      </h4>

                      <span className="rounded-full bg-white/5 px-2 py-1 text-[11px] uppercase tracking-[0.2em] text-accent-cyan">
                        {task.label}
                      </span>
                    </div>

                    <p className="text-xs text-text-secondary">
                      Drag this task to change its status.
                    </p>
                    <div className="flex gap-3 mt-3">
  <button
    onClick={() =>
      handleEditTask(task)
    }
    className="text-xs text-blue-500"
  >
    Edit
  </button>

  <button
    onClick={() =>
      handleDeleteTask(task.id)
    }
    className="text-xs text-red-500"
  >
    Delete
  </button>
</div>
                  </motion.div>
                ))}

                {!column.tasks.length && (
                  <div className="text-center text-sm text-text-secondary py-10">
                    Drop tasks here
                  </div>
                )}
              </div>
            </GlowCard>
          ))}
        </div>
          {showCreateForm && (
  <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4">
    <input
      type="text"
      placeholder="Task Title"
      value={newTask.title}
      onChange={(e) =>
        setNewTask({
          ...newTask,
          title: e.target.value,
        })
      }
      className="w-full rounded-lg p-2 mb-3 bg-black/20"
    />

  <textarea
  placeholder="Task Description"
  value={newTask.description}
  onChange={(e) =>
    setNewTask({
      ...newTask,
      description: e.target.value,
    })
  }
  className="w-full rounded-lg p-2 mb-3 bg-black/20"
  rows="3"
/>
<input
  type="date"
  value={newTask.dueDate}
  onChange={(e) =>
    setNewTask({
      ...newTask,
      dueDate: e.target.value,
    })
  }
  className="w-full rounded-lg p-2 mb-3 bg-black/20"
/>
<select
  value={newTask.status}
  onChange={(e) =>
    setNewTask({
      ...newTask,
      status: e.target.value,
    })
  }
  className="w-full rounded-lg p-2 mb-3 bg-black/20"
>
  <option value="todo">Todo</option>
  <option value="in_progress">In Progress</option>
  <option value="review">Review</option>
  <option value="completed">Completed</option>
</select>
    <select
      value={newTask.priority}
      onChange={(e) =>
        setNewTask({
          ...newTask,
          priority: e.target.value,
        })
      }
      className="w-full rounded-lg p-2 mb-3 bg-black/20"
    >
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>

    <button
      onClick={handleCreateTask}
      className="rounded-xl bg-green-600 px-4 py-2 text-white"
    >
      Save Task
    </button>
  </div>
)}
{showEditForm && (
  <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4">
    <h3 className="text-white mb-4 text-lg">
      Edit Task
    </h3>

    <input
      type="text"
      value={editingTask.title}
      onChange={(e) =>
        setEditingTask({
          ...editingTask,
          title: e.target.value,
        })
      }
      className="w-full rounded-lg p-2 mb-3 bg-black/20"
    />

    <textarea
      value={editingTask.description}
      onChange={(e) =>
        setEditingTask({
          ...editingTask,
          description: e.target.value,
        })
      }
      className="w-full rounded-lg p-2 mb-3 bg-black/20"
      rows="3"
    />
<input
  type="date"
  value={editingTask.dueDate}
  onChange={(e) =>
    setEditingTask({
      ...editingTask,
      dueDate: e.target.value,
    })
  }
  className="w-full rounded-lg p-2 mb-3 bg-black/20"
/>
    <select
      value={editingTask.priority}
      onChange={(e) =>
        setEditingTask({
          ...editingTask,
          priority: e.target.value,
        })
      }
      className="w-full rounded-lg p-2 mb-3 bg-black/20"
    >
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>

    <button
      onClick={handleUpdateTask}
      className="rounded-xl bg-blue-600 px-4 py-2 text-white"
    >
      Update Task
    </button>
  </div>
)}
        <GlowCard className="p-6" glowColor="purple">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-text-primary">
              Quick Summary
            </h3>

            <p className="text-text-secondary text-sm mt-1">
              Track task flow, prioritize updates, and collaborate faster
              with polished Kanban management.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-3xl bg-white/5 p-4">
              <div>
                <p className="text-sm text-text-secondary">
                  Total tasks
                </p>

                <p className="text-2xl font-semibold text-text-primary">
                  {taskCount}
                </p>
              </div>

              <div className="rounded-2xl bg-accent-purple/10 px-3 py-2 text-accent-purple">
                Active
              </div>
            </div>

            <div className="rounded-3xl bg-white/5 p-4">
              <p className="text-sm text-text-secondary">
                Next milestone
              </p>

              <p className="mt-2 text-text-primary font-semibold">
                Sprint review and deployment
              </p>
            </div>

            <div className="rounded-3xl bg-white/5 p-4">
              <p className="text-sm text-text-secondary">
                Team focus
              </p>

              <p className="mt-2 text-text-primary font-semibold">
                Finish approval pipeline
              </p>
            </div>
          </div>
        </GlowCard>
      </div>
    </PageWrapper>
  );
}