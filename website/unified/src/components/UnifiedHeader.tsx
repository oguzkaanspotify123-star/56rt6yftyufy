import { Gamepad2, Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface UnifiedHeaderProps {
  isAuthenticated?: boolean;
}

export default function UnifiedHeader({ isAuthenticated = false }: UnifiedHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/accounts', label: 'Accounts' },
  ];

  if (isAuthenticated) {
    navLinks.push({ path: '/dashboard', label: 'Dashboard' });
  }

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-2 rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-red-500/50">
              <Gamepad2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              F2G
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors duration-300 relative group ${
                  isActive(link.path) ? 'text-red-500' : 'text-gray-700 hover:text-red-500'
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 transition-all duration-300 ${
                    isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="hidden md:flex items-center gap-2 text-gray-700 hover:text-red-500 transition-colors font-medium"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                to="/dashboard"
                className="hidden md:block bg-gradient-to-r from-red-500 to-red-600 hover:shadow-lg hover:shadow-red-500/50 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
              >
                Sign Up
              </Link>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 space-y-3 animate-fadeInUp">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block font-medium transition-colors ${
                  isActive(link.path) ? 'text-red-500' : 'text-gray-700 hover:text-red-500'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2 text-gray-700 hover:text-red-500 transition-colors font-medium"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Sign Up
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
