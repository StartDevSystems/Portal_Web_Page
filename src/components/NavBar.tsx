
    import React, { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      alert(`Búsqueda: ${searchTerm}`);
      setSearchTerm('');
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navigationItems = [
    { label: 'Inicio', href: '#', active: true },
    { 
      label: 'Investigación', 
      href: '#',
      dropdown: [
        { label: 'Proyectos Activos', href: '#' },
        { label: 'Publicaciones', href: '#' },
        { label: 'Laboratorios', href: '#' },
        { label: 'Colaboraciones', href: '#' },
      ]
    },
    { 
      label: 'Académico', 
      href: '#',
      dropdown: [
        { label: 'Programas', href: '#' },
        { label: 'Maestrías', href: '#' },
        { label: 'Doctorados', href: '#' },
        { label: 'Certificaciones', href: '#' },
      ]
    },
    { label: 'Facultad', href: '#' },
    { label: 'Noticias', href: '#' },
    { label: 'Contacto', href: '#' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/98 backdrop-blur-md shadow-xl' 
          : 'bg-white/95 backdrop-blur-md shadow-lg'
      }`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <a 
              href="#" 
              className="flex items-center text-2xl font-bold text-slate-800 hover:text-blue-600 transition-all duration-300 hover:scale-105"
            >
              <span className="text-3xl mr-3 animate-bounce">🎓</span>
              INTEC Research
            </a>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item, index) => (
                <li 
                  key={index}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.dropdown ? index : null)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={item.href}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 relative overflow-hidden group ${
                      item.active 
                        ? 'text-blue-600 bg-blue-50 font-semibold' 
                        : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50 hover:-translate-y-0.5'
                    }`}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
                    {item.label}
                  </a>

                  {/* Dropdown Menu */}
                  {item.dropdown && (
                    <div className={`absolute top-full left-0 mt-2 w-52 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/30 transition-all duration-300 ${
                      activeDropdown === index 
                        ? 'opacity-100 visible translate-y-0' 
                        : 'opacity-0 invisible -translate-y-2'
                    }`}>
                      {item.dropdown.map((dropdownItem, dropdownIndex) => (
                        <a
                          key={dropdownIndex}
                          href={dropdownItem.href}
                          className="block px-5 py-3 text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 transition-all duration-300 rounded-lg mx-2 my-1 hover:translate-x-1"
                        >
                          {dropdownItem.label}
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Search Box - Desktop */}
            <div className="hidden md:flex items-center bg-white/80 rounded-full px-4 py-2 border border-blue-200/50 focus-within:bg-white focus-within:border-blue-400 focus-within:shadow-lg transition-all duration-300">
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                className="bg-transparent outline-none px-3 py-1 text-slate-700 placeholder-slate-500 w-40 focus:w-52 transition-all duration-300"
              />
              <button 
                onClick={handleSearch}
                className="text-blue-500 hover:text-blue-600 hover:scale-110 transition-all duration-300 p-1"
              >
                <Search size={18} />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-slate-700 hover:text-blue-600 transition-all duration-300 hover:rotate-90 p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white/95 backdrop-blur-md border-t border-white/30 px-6 py-4">
            {/* Mobile Search */}
            <div className="mb-4">
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                  className="bg-transparent outline-none flex-1 text-slate-700"
                />
                <button onClick={handleSearch} className="text-blue-500 p-1">
                  <Search size={18} />
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <ul className="space-y-2">
              {navigationItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                      item.active 
                        ? 'text-blue-600 bg-blue-50 font-semibold' 
                        : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    {item.label}
                  </a>
                  
                  {/* Mobile Dropdown */}
                  {item.dropdown && (
                    <ul className="ml-4 mt-2 space-y-1">
                      {item.dropdown.map((dropdownItem, dropdownIndex) => (
                        <li key={dropdownIndex}>
                          <a
                            href={dropdownItem.href}
                            onClick={closeMobileMenu}
                            className="block px-4 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                          >
                            {dropdownItem.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Demo Content */}
      <div className="pt-28 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-16 shadow-2xl border border-white/20">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Centro de Investigación
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Innovación académica y excelencia en investigación. Descubre nuestros proyectos, 
              publicaciones y oportunidades de colaboración en un entorno de vanguardia tecnológica.
            </p>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-4">🔬</div>
                <h3 className="font-semibold text-slate-800 mb-2">Investigación</h3>
                <p className="text-slate-600 text-sm">Proyectos innovadores y colaboraciones internacionales</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-4">📚</div>
                <h3 className="font-semibold text-slate-800 mb-2">Académico</h3>
                <p className="text-slate-600 text-sm">Programas de excelencia y formación avanzada</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-4">🌟</div>
                <h3 className="font-semibold text-slate-800 mb-2">Innovación</h3>
                <p className="text-slate-600 text-sm">Tecnología de vanguardia y soluciones creativas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar
