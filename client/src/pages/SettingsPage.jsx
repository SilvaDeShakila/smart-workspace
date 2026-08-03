export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Settings</h1>
        <p className="mt-2 text-slate-600">Configure profile, notifications, theme, privacy, and security.</p>
      </div>
      <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Preferences</h2>
        <div className="mt-4 space-y-3 text-sm text-slate-600">
          <div className="rounded-2xl bg-slate-50 px-4 py-3">Dark mode ready</div>
          <div className="rounded-2xl bg-slate-50 px-4 py-3">2FA ready</div>
          <div className="rounded-2xl bg-slate-50 px-4 py-3">Role-based permissions</div>
        </div>
      </div>
    </div>
  );
}
