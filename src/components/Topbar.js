import SearchBar from './SearchBar';

export default function Topbar({ title='Dashboard', onSearch }){
  return (
    <header className="sticky top-0 z-20 bg-dark-800 shadow-card-dark border-b border-dark-700">
      <div className="px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <div className="hidden md:block w-96"><SearchBar onChange={onSearch} /></div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-semibold text-white">Demo User</div>
              <div className="text-xs text-dark-400">SAI Official</div>
            </div>
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center font-bold text-white border-2 border-brand-400 shadow-lg">DU</div>
          </div>
        </div>
      </div>
    </header>
  );
}
