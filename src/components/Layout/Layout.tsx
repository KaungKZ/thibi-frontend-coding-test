import React from 'react';
//UI Components
import Meta from '@/components/meta';
import NavBar from '@/components/NavBar';
import Footer from '../Footer';
//Configs
import layoutConfig from '@/config/layoutConfig';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Meta />
      <NavBar
        logo={layoutConfig.logo}
        bgColor={layoutConfig.navBar.bgColor}
        menuItems={layoutConfig.navBar.menuItems}
      />
      <div className="flex-1">{children}</div>
      <Footer logo={layoutConfig.logo} />
    </div>
  );
}
