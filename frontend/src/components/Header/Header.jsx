import React from "react";
import "./Header.css";
import { Link } from "lucide-react";
const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order Your Favourite Food Here</h2>
        <p>
          Craving something irresistible? Discover a world of flavors with
          dishes made fresh, fast, and flawlessly. From comfort food to gourmet
          delights, we serve joy on every plate—because you deserve every bite
          of indulgence.
        </p>
         <a
          href="#explore-menu">
        <button>View Menu</button></a>
      </div>
    </div>
  );
};

export default Header;
