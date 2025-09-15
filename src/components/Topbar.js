import SearchBar from './SearchBar';

export default function Topbar({ title='Dashboard', onSearch }){
  return (
    <header className="sticky top-0 z-20 bg-white shadow-sm">
      <div className="px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <div className="hidden md:block w-96"><SearchBar onChange={onSearch} /></div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-800">Demo User</div>
              <div className="text-xs text-gray-500">SAI Official</div>
            </div>
            <div className="w-11 h-11 rounded-full bg-brand-100 flex items-center justify-center font-bold text-brand-600 border-2 border-brand-200">DU</div>
          </div>
        </div>
      </div>
    </header>
  );
}
