import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
//Internal Components
import LanguageToggle from '@/components/LanguageToggle';

interface IMenu {
  id: string;
  displayName: string;
  link: string;
}

interface ILogo {
  desktop: string;
  mobile: string;
  alt: string;
}

export interface INavBar {
  logo: ILogo;
  menuItems: IMenu[];
  bgColor: string;
  textColor?: string;
}

const NavBar = ({ logo, menuItems, bgColor, textColor = 'white' }: INavBar) => {
  return (
    <Disclosure as="nav" className={`bg-${bgColor}`}>
      {({ open }) => (
        <>
          <div className="container px-4 mx-auto sm:px-6 lg:px-8 smmx:!max-w-full">
            <div className="flex items-center justify-between py-10">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="block w-auto h-8 lg:hidden"
                    src={logo.mobile}
                    alt={logo.alt}
                    loading="lazy"
                  />
                  <img
                    className="hidden w-auto h-8 lg:block"
                    src={logo.desktop}
                    alt={logo.alt}
                    loading="lazy"
                  />
                </div>
                {/* <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {menuItems.map((item) => (
                      <a
                        key={item.id}
                        href={item.link}
                        className={`px-3 py-2 text-sm font-medium text-${textColor} hover:text-gray-300`}
                      >
                        {item.displayName}
                      </a>
                    ))}
                  </div>
                </div> */}
              </div>
              <div className="hidden sm:ml-6 sm:block">
                {/* Right Menuj */}
                <LanguageToggle textColor={textColor} />
              </div>
              <div className="flex -mr-2 sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            {/* <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <a
                  key={item.id}
                  href={item.link}
                  className={`block px-3 py-2 text-base font-medium text-${textColor} hover:text-gray-300`}
                >
                  {item.displayName}
                </a>
              ))}
            </div> */}
            <div className="p-4 border-t border-gray-700">
              {/* Right Menu */}
              <LanguageToggle textColor={textColor} />
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NavBar;
