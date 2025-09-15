import SearchBar from './SearchBar';

export default function Topbar({ title='Dashboard', right=null, onSearch }){
  return (
    <header className="sticky top-0 z-10 bg-white border-b">
      <div className="px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-semibold">{title}</h1>
          <div className="hidden md:block w-[420px]"><SearchBar onChange={onSearch} /></div>
        </div>

        <div className="flex items-center gap-4">
          {right}
          <div className="flex items-center gap-3">
            <div className="text-right mr-2">
              <div className="text-sm font-medium">Admin</div>
              <div className="text-xs text-slate-500">SAI Official</div>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center">A</div>
          </div>
        </div>
      </div>
    </header>
  );
}
