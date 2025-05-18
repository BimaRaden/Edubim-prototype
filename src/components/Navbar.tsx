import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, FileText, User, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { 
      title: 'Beranda', 
      path: '/', 
      icon: <BookOpen className="w-5 h-5" /> 
    },
    { 
      title: 'Soal', 
      path: '/questions', 
      icon: <FileText className="w-5 h-5" /> 
    },
    { 
      title: 'Akun', 
      path: '/account', 
      icon: <User className="w-5 h-5" /> 
    }
  ];

  if (!isAuthenticated) return null;

  return (
    <nav className="bg-gray-800 border-b border-emerald-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center text-emerald-500 font-bold text-xl"
            >
              <BookOpen className="mr-2" />
              <span>LearnHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ease-in-out
                      ${isActive 
                        ? 'bg-emerald-700 text-white' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                  >
                    {link.icon}
                    <span className="ml-2">{link.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 pb-3 px-4">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ease-in-out
                    ${isActive 
                      ? 'bg-emerald-700 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.icon}
                  <span className="ml-2">{link.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};