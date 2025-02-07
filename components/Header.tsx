'use client';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

const Header = () => {
  const pathname = usePathname();
  const isProjectPage = pathname.includes('/projects/');

  return (
    <header className={`${isProjectPage ? 'fixed left-0 top-0 w-full' : 'sticky top-0'} z-50 bg-white`}>
      <Navbar />
    </header>
  );
};

export default Header;
