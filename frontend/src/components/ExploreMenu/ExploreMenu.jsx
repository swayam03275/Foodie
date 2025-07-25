import React, { useRef, useEffect, useState, useCallback } from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/frontend_assets/assets";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ExploreMenu = ({ category, setCategory }) => {
  const scrollRef = useRef(null);
  const intervalRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = useCallback((direction) => {
    if (!scrollRef.current) return;
    
    const scrollAmount = 280;
    const container = scrollRef.current;
    
    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }

    // Pause auto-scroll temporarily
    setPaused(true);
    clearInterval(intervalRef.current);
    
    setTimeout(() => {
      if (!isHovered) {
        setPaused(false);
        startAutoScroll();
      }
    }, 2000);
  }, [isHovered]);

  const startAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      if (!scrollRef.current || paused || isHovered) return;
      
      const container = scrollRef.current;
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      if (container.scrollLeft >= maxScroll - 1) {
        // Reset to beginning smoothly
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollLeft += 0.5;
      }
    }, 30);
  }, [paused, isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setPaused(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTimeout(() => {
      if (!isHovered) {
        setPaused(false);
        startAutoScroll();
      }
    }, 1000);
  };

  const handleCategoryClick = (menuName) => {
    setCategory(category === menuName ? "All" : menuName);
  };

  // Track scroll position for potential indicators
  const handleScroll = () => {
    if (scrollRef.current) {
      setScrollPosition(scrollRef.current.scrollLeft);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!paused && !isHovered) {
        startAutoScroll();
      }
    }, 1000); // Delay initial auto-scroll

    return () => {
      clearTimeout(timer);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [paused, isHovered, startAutoScroll]);

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Our Menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable array of dishes crafted with passion. 
        Our mission is to satisfy your cravings and elevate your dining experience, 
        one delicious meal at a time.
      </p>

      <div 
        className="explore-menu-wrapper"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button 
          className="arrow left" 
          onClick={() => scroll("left")}
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className="explore-menu-list" ref={scrollRef}>
          {/* Duplicate menu items for seamless infinite scroll */}
          {[...menu_list, ...menu_list, ...menu_list].map((item, index) => {
            const isActive = category === item.menu_name;
            const uniqueKey = `${item.menu_name}-${index}`;
            
            return (
              <div
                onClick={() => handleCategoryClick(item.menu_name)}
                key={uniqueKey}
                className="explore-menu-list-item"
                style={{ 
                  animationDelay: `${(index % menu_list.length) * 0.1}s` 
                }}
              >
                <img
                  className={isActive ? "active" : ""}
                  src={item.menu_image}
                  alt={item.menu_name}
                  loading="lazy"
                />
                <p>{item.menu_name}</p>
              </div>
            );
          })}
        </div>
        
        <button 
          className="arrow right" 
          onClick={() => scroll("right")}
          aria-label="Scroll right"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <hr />
    </div>
  );
};

export default ExploreMenu;