import React, { useState, useEffect } from 'react';
import { BookOpen, GraduationCap, Users, LogIn } from 'lucide-react';

interface AnnouncementScreenProps {
  onFinish: () => void;
}

export const AnnouncementScreen: React.FC<AnnouncementScreenProps> = ({ onFinish }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 100);
  }, []);

  const announcements = [
    {
      icon: <BookOpen className="w-16 h-16 sm:w-20 sm:h-20 text-white" />,
      title: "100% Gratis",
      description: "Semua konten dan materi pembelajaran dapat diakses secara gratis tanpa biaya"
    },
    {
      icon: <GraduationCap className="w-16 h-16 sm:w-20 sm:h-20 text-white" />,
      title: "Kurikulum Sekolah",
      description: "Materi pembelajaran sesuai dengan kurikulum yang diajarkan di sekolah formal"
    },
    {
      icon: <Users className="w-16 h-16 sm:w-20 sm:h-20 text-white" />,
      title: "Mudah Diakses",
      description: "Hubungi developer untuk mendapatkan kode akses dan mulai belajar"
    }
  ];

  const handleSkip = () => {
    if (currentPage < announcements.length - 1) {
      setCurrentPage(prev => prev + 1);
    } else {
      onFinish();
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-emerald-500 flex items-center justify-center p-4">
      <div 
        className={`w-full max-w-md aspect-[9/16] bg-gradient-to-br from-gray-900/50 to-emerald-500/50 backdrop-blur-sm rounded-3xl relative overflow-hidden transform transition-all duration-500 ${
          showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        {/* Skip button */}
        <button
          onClick={handleSkip}
          className="absolute top-4 sm:top-6 right-4 sm:right-6 text-white text-xs sm:text-sm font-medium z-10 hover:text-emerald-200 transition-colors px-3 py-1.5 bg-white/10 rounded-full"
        >
          {currentPage === announcements.length - 1 ? 'Mulai' : 'Lanjut'}
        </button>

        {/* Content */}
        <div className="h-full flex flex-col items-center justify-center px-6 sm:px-8 text-center">
          <div className="mb-6 sm:mb-8">
            {announcements[currentPage].icon}
          </div>
          
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
            {announcements[currentPage].title}
          </h2>
          
          <p className="text-sm sm:text-base text-white/90">
            {announcements[currentPage].description}
          </p>
        </div>

        {/* Progress indicators and login button */}
        <div className="absolute bottom-8 sm:bottom-12 inset-x-0 px-6 sm:px-8">
          <div className="flex justify-center space-x-2 mb-4">
            {announcements.map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentPage 
                    ? 'w-6 sm:w-8 bg-white' 
                    : 'w-1.5 sm:w-2 bg-white/50'
                }`}
              />
            ))}
          </div>

          {currentPage === announcements.length - 1 && (
            <button
              onClick={onFinish}
              className="w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg flex items-center justify-center mx-auto transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label="Login"
            >
              <LogIn className="w-6 h-6 text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};