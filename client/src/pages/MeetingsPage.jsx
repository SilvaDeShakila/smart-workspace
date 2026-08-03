export default function MeetingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Meetings</h1>
        <p className="mt-2 text-slate-600">Schedule meetings, share agenda, and capture notes.</p>
      </div>
      <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Upcoming sessions</h2>
        <ul className="mt-4 space-y-3 text-sm text-slate-600">
          <li className="rounded-2xl bg-slate-50 px-4 py-3">Weekly planning • 10:00 AM</li>
          <li className="rounded-2xl bg-slate-50 px-4 py-3">Design review • 2:00 PM</li>
        </ul>
      </div>
    </div>
  );
}
