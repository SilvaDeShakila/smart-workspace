export default function ChatPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Chat</h1>
        <p className="mt-2 text-slate-600">Real-time conversations, group channels, and shared updates.</p>
      </div>
      <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">Team channel • Olivia: “Launch review is ready.”</div>
      </div>
    </div>
  );
}
