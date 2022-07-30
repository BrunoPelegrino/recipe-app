import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const Footer = () => (
  <div
    className="fixed bottom-0 w-full px-3 bg-red-800 pt-3
  "
  >
    <footer data-testid="footer" className="flex justify-center gap-40 ">

      <Link to="/drinks">
        <button type="button">
          <img
            src={ drinkIcon }
            alt="drinkIcon"
            data-testid="drinks-bottom-btn"
          />
        </button>
      </Link>

      <Link to="/foods">
        <button type="button">
          <img
            src={ mealIcon }
            alt="mealIcon"
            data-testid="food-bottom-btn"
          />
        </button>
      </Link>

    </footer>
  </div>
);

export default Footer;
