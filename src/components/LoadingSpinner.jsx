import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll browser window
    window.scrollTo(0, 0);

    // Scroll custom scroll containers
    const scrollContainers = document.querySelectorAll('[class*="overflow-y-scroll"]');
    scrollContainers.forEach((el) => {
      el.scrollTop = 0;
    });
  }, [pathname]);

  return null;
}
