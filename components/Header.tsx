'use client';
import Navbar from './Navbar';

const Header = () => {

  return (
    <header className="sticky top-0 left-0 right-0 w-full z-[9999] bg-white/95 backdrop-blur-sm">
      <Navbar />
    </header>
  );
};

export default Header;
