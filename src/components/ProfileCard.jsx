// src/components/ProfileCard.jsx
export default function ProfileCard({ data }) {
  const followers = data?.metrics?.followers ?? 'ERR_NULL';
  const views = data?.metrics?.views ?? 'ERR_NULL';

  return (
    <div className="w-80 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden bg-slate-900/50 backdrop-blur-md">
      {/* Decorative Header */}
      <div className="h-24 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-80" />
      
      <div className="px-6 pb-8 -mt-12 flex flex-col items-center">
        <div className="relative">
          <img 
            src={data?.avatar} 
            alt="Avatar" 
            className="w-24 h-24 rounded-2xl border-4 border-slate-900 shadow-xl bg-slate-800 object-cover"
          />
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full" />
        </div>

        <h2 className="mt-4 text-xl font-bold text-white tracking-tight">{data?.name || "???"}</h2>
        <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">{data?.role || "NO_ROLE"}</p>
        
        <div className="mt-4 p-3 bg-slate-950/50 rounded-lg w-full border border-slate-800">
          <p className="text-slate-400 text-xs leading-relaxed italic">
            "{data?.bio || "No data provided in user_bio_field"}"
          </p>
        </div>

        <div className="flex w-full mt-6 gap-2">
          <div className="flex-1 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
            <span className="block text-[10px] text-slate-500 uppercase font-black">Users</span>
            <span className="text-indigo-300 font-mono font-bold">{followers}</span>
          </div>
          <div className="flex-1 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
            <span className="block text-[10px] text-slate-500 uppercase font-black">Hits</span>
            <span className="text-indigo-300 font-mono font-bold">{views}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
