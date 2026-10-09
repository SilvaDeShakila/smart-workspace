import { useCallback, useEffect, useMemo, useState } from 'react';
import api from '../services/api';
import {
  FiPlus,
  FiSearch,
  FiFolder,
  FiCalendar,
  FiClock,
  FiEdit2,
  FiTrash2,
  FiX,
  FiRefreshCw,
  FiAlertCircle,
  FiCheckCircle,
  FiMoreHorizontal,
  FiArrowUpRight,
} from 'react-icons/fi';

const EMPTY_FORM = {
  name: '',
  description: '',
  status: 'planning',
  priority: 'medium',
  progress: 0,
  deadline: '',
  budget: 0,
};

const STATUS_OPTIONS = [
  { value: 'planning', label: 'Planning' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
  { value: 'on-hold', label: 'On hold' },
];

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

function unwrap(response) {
  return response?.data?.data ?? response?.data ?? {};
}

function formatDate(date) {
  if (!date) return 'No deadline';

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return 'No deadline';

  return parsed.toLocaleDateString('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function getErrorMessage(error) {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    'Something went wrong. Please try again.'
  );
}

function StatusBadge({ status }) {
  const config = {
    planning: ['Planning', 'bg-slate-100 text-slate-600'],
    active: ['Active', 'bg-blue-50 text-blue-700'],
    completed: ['Completed', 'bg-emerald-50 text-emerald-700'],
    'on-hold': ['On hold', 'bg-amber-50 text-amber-700'],
  };

  const [label, classes] = config[status] || config.planning;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${classes}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

function PriorityBadge({ priority }) {
  const config = {
    high: 'bg-rose-50 text-rose-700',
    medium: 'bg-orange-50 text-orange-700',
    low: 'bg-slate-100 text-slate-600',
  };

  return (
    <span
      className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
        config[priority] || config.medium
      }`}
    >
      {priority ? priority.charAt(0).toUpperCase() + priority.slice(1) : 'Medium'}
    </span>
  );
}

function ProjectModal({ project, onClose, onSave, saving }) {
  const [form, setForm] = useState(() => ({
    ...EMPTY_FORM,
    ...(project || {}),
    deadline: project?.deadline
      ? new Date(project.deadline).toISOString().slice(0, 10)
      : '',
    budget: project?.budget ?? 0,
  }));

  const [formError, setFormError] = useState('');

  function changeField(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]:
        name === 'progress' || name === 'budget'
          ? value === ''
            ? ''
            : Number(value)
          : value,
    }));
  }

  async function submit(event) {
    event.preventDefault();
    setFormError('');

    if (!form.name.trim()) {
      setFormError('Please enter a project name.');
      return;
    }

    if (Number(form.progress) < 0 || Number(form.progress) > 100) {
      setFormError('Progress must be between 0 and 100.');
      return;
    }

    if (Number(form.budget) < 0) {
      setFormError('Budget cannot be negative.');
      return;
    }

    try {
      await onSave({
        ...form,
        name: form.name.trim(),
        description: form.description.trim(),
        progress: Number(form.progress) || 0,
        budget: Number(form.budget) || 0,
        deadline: form.deadline || null,
      });
    } catch (error) {
      setFormError(getErrorMessage(error));
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !saving) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="my-auto w-full max-w-xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5 sm:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
              Workspace / Projects
            </p>
            <h2
              id="project-modal-title"
              className="mt-2 text-2xl font-bold tracking-tight text-slate-900"
            >
              {project ? 'Edit project' : 'Create a project'}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Organize your work and keep your team aligned.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            aria-label="Close modal"
            className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-5 px-6 py-6 sm:px-8">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Project name <span className="text-rose-500">*</span>
            </label>
            <input
              autoFocus
              name="name"
              value={form.name}
              onChange={changeField}
              maxLength={120}
              required
              placeholder="e.g. Website redesign"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={changeField}
              rows={3}
              maxLength={2000}
              placeholder="What is this project about?"
              className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={changeField}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Priority
              </label>
              <select
                name="priority"
                value={form.priority}
                onChange={changeField}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              >
                {PRIORITY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Deadline
              </label>
              <input
                type="date"
                name="deadline"
                value={form.deadline || ''}
                onChange={changeField}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Budget
              </label>
              <input
                type="number"
                name="budget"
                min="0"
                step="0.01"
                value={form.budget}
                onChange={changeField}
                className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-700">
                Project progress
              </label>
              <span className="text-sm font-bold text-blue-700">
                {form.progress || 0}%
              </span>
            </div>
            <input
              type="range"
              name="progress"
              min="0"
              max="100"
              step="5"
              value={form.progress || 0}
              onChange={changeField}
              className="w-full accent-blue-600"
            />
          </div>

          {formError && (
            <div
              role="alert"
              className="flex gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700"
            >
              <FiAlertCircle className="mt-0.5 shrink-0" />
              {formError}
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? 'Saving...' : project ? 'Save changes' : 'Create project'}
              {!saving && <FiArrowUpRight />}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pageError, setPageError] = useState('');
  const [notice, setNotice] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [modalProject, setModalProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setPageError('');

    try {
      const response = await api.get('/projects');
      const data = unwrap(response);

      if (!Array.isArray(data.projects)) {
        throw new Error('The server returned an unexpected projects response.');
      }

      setProjects(data.projects);
    } catch (error) {
      setPageError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch =
        !query ||
        project.name?.toLowerCase().includes(query) ||
        project.description?.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === 'all' || project.status === statusFilter;

      const matchesPriority =
        priorityFilter === 'all' || project.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [projects, search, statusFilter, priorityFilter]);

  const stats = useMemo(
    () => [
      {
        label: 'Total projects',
        value: projects.length,
        color: 'bg-blue-50 text-blue-700',
        icon: FiFolder,
      },
      {
        label: 'In progress',
        value: projects.filter((p) => p.status === 'active').length,
        color: 'bg-indigo-50 text-indigo-700',
        icon: FiClock,
      },
      {
        label: 'Completed',
        value: projects.filter((p) => p.status === 'completed').length,
        color: 'bg-emerald-50 text-emerald-700',
        icon: FiCheckCircle,
      },
      {
        label: 'High priority',
        value: projects.filter((p) => p.priority === 'high').length,
        color: 'bg-rose-50 text-rose-700',
        icon: FiAlertCircle,
      },
    ],
    [projects]
  );

  function openCreate() {
    setModalProject(null);
    setShowModal(true);
  }

  function openEdit(project) {
    setModalProject(project);
    setShowModal(true);
  }

  async function saveProject(form) {
    setSaving(true);

    try {
      if (modalProject?._id) {
        const response = await api.put(`/projects/${modalProject._id}`, form);
        const updated = unwrap(response).project;

        if (!updated) throw new Error('The updated project was not returned.');

        setProjects((current) =>
          current.map((p) => (p._id === updated._id ? updated : p))
        );
        setNotice('Project updated successfully.');
      } else {
        const response = await api.post('/projects', form);
        const created = unwrap(response).project;

        if (!created) throw new Error('The created project was not returned.');

        setProjects((current) => [created, ...current]);
        setNotice('Project created successfully.');
      }

      setShowModal(false);
      setModalProject(null);
    } catch (error) {
      throw error;
    } finally {
      setSaving(false);
    }
  }

  async function deleteProject() {
    if (!deleteTarget?._id) return;

    setSaving(true);
    setPageError('');

    try {
      await api.delete(`/projects/${deleteTarget._id}`);
      setProjects((current) =>
        current.filter((p) => p._id !== deleteTarget._id)
      );
      setNotice('Project deleted successfully.');
      setDeleteTarget(null);
    } catch (error) {
      setPageError(getErrorMessage(error));
      setDeleteTarget(null);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-full space-y-7 bg-slate-50/60 p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            Workspace
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Projects
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Plan, track, and deliver great work. Keep every project organized
            in one place.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 sm:self-auto"
        >
          <FiPlus size={18} />
          New project
        </button>
      </header>

      {notice && (
        <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          <span className="flex items-center gap-2">
            <FiCheckCircle />
            {notice}
          </span>
          <button
            type="button"
            onClick={() => setNotice('')}
            aria-label="Dismiss message"
          >
            <FiX />
          </button>
        </div>
      )}

      {pageError && (
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="flex items-start gap-2">
            <FiAlertCircle className="mt-0.5 shrink-0" />
            {pageError}
          </span>
          <button
            type="button"
            onClick={loadProjects}
            className="inline-flex items-center gap-2 self-start rounded-lg border border-rose-200 bg-white px-3 py-2 font-semibold hover:bg-rose-100"
          >
            <FiRefreshCw /> Try again
          </button>
        </div>
      )}

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.label}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">
                  {stat.label}
                </span>
                <span className={`rounded-xl p-2.5 ${stat.color}`}>
                  <Icon size={19} />
                </span>
              </div>
              <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                {loading ? '—' : stat.value}
              </p>
            </article>
          );
        })}
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                All projects
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {loading
                  ? 'Loading your projects...'
                  : `${filteredProjects.length} ${
                      filteredProjects.length === 1 ? 'project' : 'projects'
                    } found`}
              </p>
            </div>

            <button
              type="button"
              onClick={loadProjects}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 lg:self-auto"
            >
              <FiRefreshCw className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            <div className="relative md:col-span-2 xl:col-span-1">
              <FiSearch
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search projects..."
                aria-label="Search projects"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              aria-label="Filter by status"
              className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            >
              <option value="all">All statuses</option>
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={priorityFilter}
              onChange={(event) => setPriorityFilter(event.target.value)}
              aria-label="Filter by priority"
              className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            >
              <option value="all">All priorities</option>
              {PRIORITY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} priority
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-2xl border border-slate-100 p-5"
              >
                <div className="h-4 w-2/3 rounded bg-slate-100" />
                <div className="mt-4 h-3 w-full rounded bg-slate-100" />
                <div className="mt-2 h-3 w-4/5 rounded bg-slate-100" />
                <div className="mt-8 h-2 rounded-full bg-slate-100" />
              </div>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center px-6 py-16 text-center sm:py-20">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <FiFolder size={30} />
            </div>
            <h3 className="mt-5 text-lg font-bold text-slate-900">
              {projects.length === 0
                ? 'Your workspace starts here'
                : 'No matching projects'}
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              {projects.length === 0
                ? 'Create your first project to start organizing work, tracking progress, and managing priorities.'
                : 'Try another search term or change the filters to find your projects.'}
            </p>
            {projects.length === 0 ? (
              <button
                type="button"
                onClick={openCreate}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <FiPlus /> Create your first project
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setStatusFilter('all');
                  setPriorityFilter('all');
                }}
                className="mt-5 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-4 p-4 sm:p-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <article
                key={project._id}
                className="group flex min-w-0 flex-col rounded-2xl border border-slate-200/90 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/50"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/15">
                      <FiFolder size={20} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate font-bold text-slate-900">
                        {project.name}
                      </h3>
                      <p className="mt-1 text-xs text-slate-400">
                        Created {formatDate(project.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={() => openEdit(project)}
                      title="Edit project"
                      aria-label={`Edit ${project.name}`}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-700"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(project)}
                      title="Delete project"
                      aria-label={`Delete ${project.name}`}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>

                <p className="mt-4 min-h-10 text-sm leading-5 text-slate-500">
                  {project.description || 'No description added yet.'}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <StatusBadge status={project.status} />
                  <PriorityBadge priority={project.priority} />
                </div>

                <div className="mt-6">
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-500">Progress</span>
                    <span className="font-bold text-slate-800">
                      {Math.min(100, Math.max(0, Number(project.progress) || 0))}%
                    </span>
                  </div>
                  <div
                    className="h-2 overflow-hidden rounded-full bg-slate-100"
                    role="progressbar"
                    aria-valuenow={Math.min(
                      100,
                      Math.max(0, Number(project.progress) || 0)
                    )}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-label={`${project.name} progress`}
                  >
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-500"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.max(0, Number(project.progress) || 0)
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                  <span className="flex min-w-0 items-center gap-2 text-xs text-slate-500">
                    <FiCalendar className="shrink-0" />
                    <span className="truncate">{formatDate(project.deadline)}</span>
                  </span>
                  <span className="shrink-0 text-xs font-semibold text-slate-400">
                    {Number(project.budget || 0).toLocaleString()}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {showModal && (
        <ProjectModal
          key={modalProject?._id || 'new-project'}
          project={modalProject}
          onClose={() => {
            setShowModal(false);
            setModalProject(null);
          }}
          onSave={saveProject}
          saving={saving}
        />
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-project-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
              <FiTrash2 size={22} />
            </div>
            <h2
              id="delete-project-title"
              className="mt-4 text-xl font-bold text-slate-900"
            >
              Delete this project?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Are you sure you want to delete{' '}
              <strong className="text-slate-700">{deleteTarget.name}</strong>?
              This action cannot be undone.
            </p>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={saving}
                onClick={() => setDeleteTarget(null)}
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={deleteProject}
                className="rounded-xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:opacity-50"
              >
                {saving ? 'Deleting...' : 'Delete project'}
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
