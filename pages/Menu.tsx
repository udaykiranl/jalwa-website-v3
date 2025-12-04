
import React, { useState, useRef, useEffect } from 'react';
import Section from '../components/Section';
import { MENU_ITEMS, MENU_CATEGORIES } from '../constants';
import MenuItemCard from '../components/Order/MenuItemCard';
import CartSidebar from '../components/Order/CartSidebar';
import { useCart } from '../context/CartContext';
import { Filter, Leaf, WheatOff, ChevronLeft, ChevronRight, Check, X, Sprout } from 'lucide-react';

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const { toggleCart, items, total } = useCart();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Filter Configuration
  const DIETARY_FILTERS = [
    { label: 'Vegetarian', key: 'isVegetarian', icon: <Leaf size={14} /> },
    { label: 'Vegan', key: 'isVegan', icon: <Sprout size={14} /> },
    { label: 'Gluten-Free', key: 'isGlutenFree', icon: <WheatOff size={14} /> },
  ];

  // Scroll Handling
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5); // 5px tolerance
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  const toggleFilter = (key: string) => {
    setActiveFilters(prev => 
      prev.includes(key) 
        ? prev.filter(f => f !== key) 
        : [...prev, key]
    );
  };

  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    // Item must match ALL selected filters (AND logic)
    const matchesDietary = activeFilters.every(filterKey => (item as any)[filterKey]);
    return matchesCategory && matchesDietary;
  });

  return (
    <>
      <div className="bg-neutral-900 pt-32 pb-16 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Our Menu</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Explore our diverse menu. You can add items directly to your cart from here.
        </p>
      </div>

      <Section>
        <div className="container mx-auto px-4 md:px-6">
          
          {/* Sticky Filter Bar */}
          <div className="sticky top-[72px] z-30 bg-jalwa-black/80 backdrop-blur-xl border-b border-white/10 py-4 mb-8 -mx-4 px-4 md:-mx-6 md:px-6 shadow-2xl transition-all duration-300">
            <div className="container mx-auto max-w-7xl flex flex-col gap-5">
              
              {/* Categories Row */}
              <div className="relative group">
                {/* Left Arrow */}
                <button 
                  onClick={() => scroll('left')}
                  className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-full bg-gradient-to-r from-jalwa-black to-transparent flex items-center justify-start text-white/70 hover:text-jalwa-gold transition-opacity duration-300 ${showLeftArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                  <ChevronLeft size={24} />
                </button>

                {/* Scrollable Container */}
                <div 
                  ref={scrollContainerRef}
                  onScroll={checkScroll}
                  className="flex gap-3 overflow-x-auto pb-1 no-scrollbar scroll-smooth px-2"
                >
                  {MENU_CATEGORIES.map(category => (
                    <button
                      key={category}
                      onClick={() => {
                        setActiveCategory(category);
                        window.scrollTo({ top: 450, behavior: 'smooth' });
                      }}
                      className={`
                        relative px-6 py-2.5 rounded-full text-sm font-bold tracking-wide whitespace-nowrap transition-all duration-300 transform hover:scale-105
                        ${activeCategory === category 
                          ? 'bg-gradient-to-r from-jalwa-gold to-amber-400 text-black shadow-lg shadow-amber-500/20 scale-105' 
                          : 'bg-neutral-800/60 text-gray-400 hover:text-white hover:bg-neutral-700 border border-transparent hover:border-white/10'
                        }
                      `}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Right Arrow */}
                <button 
                  onClick={() => scroll('right')}
                  className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-full bg-gradient-to-l from-jalwa-black to-transparent flex items-center justify-end text-white/70 hover:text-jalwa-gold transition-opacity duration-300 ${showRightArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Dietary Filters Row */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2 border-t border-white/5">
                <span className="text-gray-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2 mr-2">
                  <Filter size={14} className="text-jalwa-gold" /> Filters:
                </span>
                
                {DIETARY_FILTERS.map(filter => {
                  const isActive = activeFilters.includes(filter.key);
                  return (
                    <button
                      key={filter.key}
                      onClick={() => toggleFilter(filter.key)}
                      className={`
                        flex items-center gap-2 px-4 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 border
                        ${isActive 
                          ? 'bg-neutral-800 text-jalwa-gold border-jalwa-gold shadow-[0_0_10px_rgba(212,175,55,0.15)]' 
                          : 'bg-transparent border-neutral-700 text-gray-400 hover:border-neutral-500 hover:text-gray-200'
                        }
                      `}
                    >
                      {filter.icon}
                      {filter.label}
                      {isActive && <Check size={12} className="ml-1" />}
                    </button>
                  );
                })}

                {activeFilters.length > 0 && (
                  <button 
                    onClick={() => setActiveFilters([])}
                    className="ml-2 text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
                  >
                    <X size={12} /> Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 min-h-[400px]">
            {filteredItems.map((item, idx) => (
              <MenuItemCard key={item.id} item={item} index={idx} />
            ))}
          </div>
          
          {filteredItems.length === 0 && (
             <div className="flex flex-col items-center justify-center py-24 text-center">
               <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mb-4">
                 <Filter size={32} className="text-gray-600" />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">No items match your filters</h3>
               <p className="text-gray-400 mb-6 max-w-md">
                 Try removing some dietary filters or selecting a different category.
               </p>
               <button 
                 onClick={() => { setActiveCategory('All'); setActiveFilters([]); }}
                 className="px-6 py-2 bg-neutral-800 hover:bg-neutral-700 text-jalwa-gold rounded-full transition-colors text-sm font-bold"
               >
                 Clear All Filters
               </button>
             </div>
          )}
        </div>
      </Section>

      {/* Floating Cart Button (Visible when items in cart) */}
      {items.length > 0 && (
        <div className="fixed bottom-6 right-6 md:right-24 z-40">
           <button 
            onClick={toggleCart}
            className="bg-jalwa-gold text-black font-bold py-3 px-6 rounded-full shadow-2xl shadow-black/50 flex items-center gap-4 animate-fade-in-up hover:scale-105 transition-transform border-2 border-black/10"
          >
            <div className="flex items-center gap-2">
              <span className="bg-black text-jalwa-gold w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                {items.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
              <span className="hidden sm:inline">View Cart</span>
            </div>
            <span className="border-l border-black/20 pl-4">${total.toFixed(2)}</span>
          </button>
        </div>
      )}

      {/* Cart Drawer */}
      <CartSidebar isMobileDrawer={true} />
    </>
  );
};

export default Menu;
