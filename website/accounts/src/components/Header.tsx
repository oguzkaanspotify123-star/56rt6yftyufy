import { Gamepad2 } from 'lucide-react';

function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 animate-slideDown">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="bg-red-500 p-2 rounded">
              <Gamepad2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">F2G</span>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-red-500 transition-colors">Home</a>
            <a href="#" className="text-gray-700 hover:text-red-500 transition-colors">Accounts</a>
            <a href="#" className="text-gray-700 hover:text-red-500 transition-colors">About</a>
            <a href="#" className="text-gray-700 hover:text-red-500 transition-colors">FAQ</a>
          </nav>

          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition-all transform hover:scale-105">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
