interface ILogo {
  desktop: string;
  mobile: string;
  alt: string;
}

export interface IFooter {
  logo: ILogo;
}

const Footer = ({ logo }: IFooter) => {
  return (
    <div className="px-4 text-center text-gray-400 bg-dark-grey flex-end sm:px-6 lg:px-8 py-8">
      <div className="container px-4 mx-auto smmx:!max-w-full ">
        <div>
          <div className="flex-shrink-0">
            <img
              className="block w-auto h-12 lg:hidden"
              src={logo.mobile}
              alt={logo.alt}
              loading="lazy"
            />
            <img
              className="hidden w-auto h-12 lg:block"
              src={logo.desktop}
              alt={logo.alt}
              loading="lazy"
            />
          </div>
          <span className="text-white block mt-6">&#169; 2023, All Rights Reserved.</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
