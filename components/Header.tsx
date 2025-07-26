
'use client';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="md:hidden">
            <h1 className="text-xl font-bold text-red-600">Ryde</h1>
          </div>
          <div className="hidden md:block">
            <h2 className="text-xl font-semibold text-gray-900">Dashboard</h2>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          <button className="p-2 text-gray-400 hover:text-red-600 transition-colors cursor-pointer">
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-notification-line text-lg"></i>
            </div>
          </button>
          
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="w-8 h-8 md:w-9 md:h-9 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-medium">JD</span>
            </div>
            <span className="text-sm md:text-base font-medium text-gray-700 hidden sm:block">John D.</span>
          </div>
        </div>
      </div>
    </header>
  );
}
