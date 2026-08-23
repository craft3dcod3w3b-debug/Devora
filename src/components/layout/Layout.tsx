import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { AdUnit } from '../ads/AdUnit';

export default function Layout() {
  const { pathname } = useLocation();

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <div className="container">
        <AdUnit type="leaderboard" />
      </div>
      <Footer />
    </>
  );
}
