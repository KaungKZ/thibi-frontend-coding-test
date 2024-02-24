import setLanguage from 'next-translate/setLanguage';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import layoutConfig from '@/config/layoutConfig';

interface ILanguageToggle {
  textColor?: string;
}

const LanguageToggle = ({ textColor = 'white' }: ILanguageToggle) => {
  const router = useRouter();
  const locale = typeof router.locale === 'string' ? router.locale : '';
  const { t } = useTranslation('common');

  return (
    <div className={`text-${textColor} flex`}>
      {layoutConfig.locales.map((lng, index) => {
        return (
          <div key={index}>
            <span
              key={lng}
              className={`text-${textColor} hover:font-bold p-1 text-midgrey text-sm cursor-pointer ${
                locale === lng ? 'font-bold' : ''
              }`}
              onClick={() => setLanguage(lng)}
            >
              {t(lng)}
            </span>
            {index + 1 < layoutConfig.locales.length ? '|' : ''}
          </div>
        );
      })}
    </div>
  );
};

export default LanguageToggle;
