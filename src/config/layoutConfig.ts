const layoutConfig = {
  logo: {
    desktop: '/thibi-logo.svg',
    mobile: '/thibi-logo.svg',
    alt: 'Thibi Logo',
  },
  locales: ['en', 'mm'], // Get from i18n.json
  defaultLocale: 'en', // Get from i18n.json
  navBar: {
    bgColor: 'dark-grey',
    textColor: 'white',
    menuItems: [
      {
        id: 'home',
        displayName: 'Home',
        link: '/',
      },
      {
        id: 'about',
        displayName: 'About',
        link: '/',
      },
    ],
  },
};

export default layoutConfig;
