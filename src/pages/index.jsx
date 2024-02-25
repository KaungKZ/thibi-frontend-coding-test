import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import Layout from '@/components/Layout';

const alphabets = [...'abcdefghijklmnopqrstuvwxyz'];

export default function Home(props) {
  const { enData, mmData } = props?.data || {};
  const router = useRouter();
  const [activeAlphabet, setActiveAlphabet] = useState(router.query.searchTerm || 'a');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { lang } = useTranslation('common');

  function getLangValues() {
    // detect current language and return correct array
    if (lang === 'en') {
      if (enData.success) {
        return enData.data;
      }
      return null;
    } else {
      if (mmData.success) {
        return mmData.data;
      }
      return null;
    }
  }

  useEffect(() => {
    // detect query and set initial results
    let r = getLangValues()?.filter((d) => {
      return d.attributes.en_term.toLowerCase().startsWith(activeAlphabet);
    });

    if (r && r.length > 0) {
      sortByAlphabet(r);
    }

    setResults(r);

    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, searchTerm: activeAlphabet },
      },
      undefined,
      { scroll: false }
    );
    setLoading(false);
  }, []);

  // handles the animation when scrolling to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  function sortByAlphabet(arr) {
    return arr.sort(function (a, b) {
      var nameA = a.attributes.en_term.toLowerCase(),
        nameB = b.attributes.en_term.toLowerCase();
      if (nameA < nameB)
        //sort string ascending
        return -1;
      if (nameA > nameB) return 1;
      return 0; //default return value (no sorting)
    });
  }

  function filterAlphabets(a) {
    setLoading(true);

    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, searchTerm: a },
      },
      undefined,
      { scroll: false }
    );
    let r = getLangValues().filter((d) => {
      return d.attributes.en_term.toLowerCase().startsWith(a);
    });

    if (r && r.length > 0) {
      sortByAlphabet(r);
    }

    setResults(r);
    setActiveAlphabet(a);
    setLoading(false);
  }

  return (
    <>
      <Layout>
        <div className="h-full">
          <div className="container px-4 mx-auto mt-28 mb-10 xlmx:mt-20  smmx:!max-w-full">
            {/* <p className="mt-4">Implement Glossary data Here</p> */}
            <div className="mt-4  relative max-w-[1120px] mx-auto xlmx:px-16 lgmx:px-12 mdmx:px-8">
              <div className="max-w-[992px] mx-auto">
                <h1 className="text-5xl font-bold text-center">ဝေါဟာရ</h1>
                <span className="text-2xl block mt-16 mb-32 text-center leading-relaxed xlmx:mb-20 mdmx:mb-12 mdmx:mt-12">
                  သတင်းအချက်အလက်တွေကို နည်းပညာအသုံးပြုပြီး သိမ်းဆည်းခြင်း၊ ရယူခြင်း၊
                  အသုံးချခြင်းလို့ အဓိပ္ပာယ် ဖွင့်ဆိုနိုင်ပါတယ်။
                </span>
              </div>
            </div>
            {props.data.enData.success && props.data.mmData.success ? (
              <>
                <div className="mt-4  relative max-w-[1120px] mx-auto xlmx:px-16 lgmx:px-12 mdmx:px-8">
                  <div className="flex justify-between xlmx:overflow-x-auto ">
                    <span className="uppercase text-2xl text-lighter-grey flex items-center">
                      #
                    </span>
                    {alphabets.map((a) => (
                      <button
                        key={a}
                        className={`uppercase text-2xl p-1 px-2 text-lighter-grey ${
                          activeAlphabet === a ? 'text-blue underline-offset-4 underline' : ''
                        } xlmx:px-6`}
                        type="button"
                        onClick={() => filterAlphabets(a)}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-28 rounded-[5px] shadow xlmx:mt-20">
                  <div className="bg-blue py-8 rounded-t-[5px]">
                    <div className="relative max-w-[1120px] mx-auto xlmx:px-16 lgmx:px-12 mdmx:px-8">
                      <h1 className="text-4xl uppercase font-bold text-white">{activeAlphabet}</h1>
                    </div>
                  </div>
                  <div className="bg-white rounded-b-[5px]">
                    <div className="relative max-w-[1120px] py-16 mx-auto xlmx:px-16 lgmx:px-12 mdmx:px-8">
                      {enData && loading ? (
                        <div>
                          <span className="text-xl">Loading ..</span>
                        </div>
                      ) : enData && results.length === 0 ? (
                        <div>
                          <span className="text-xl">There is no result</span>
                        </div>
                      ) : (
                        <div className="flex space-y-16 flex-col">
                          {results.map((r) => {
                            return (
                              <div key={r.id}>
                                <h3 className="text-3xl underline text-black font-semibold">
                                  {r.attributes.en_term}
                                </h3>
                                <p className="text-dark-grey text-2xl mt-6">
                                  {r.attributes.description}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-16 w-full flex">
                  <button
                    type="button"
                    onClick={scrollToTop}
                    className="text-xl text-lighter-grey mx-auto underline"
                  >
                    စာမျက်နှာအပေါ်သို့
                  </button>
                </div>
              </>
            ) : (
              <div>
                <span className="text-xl">Server error, please try again</span>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}

export const getServerSideProps = async () => {
  // Fetch data from external API

  const urls = [
    'https://cms.businessintegritymyanmar.thibi.co/api/glossaries',
    `https://cms.businessintegritymyanmar.thibi.co/api/glossarymms`,
  ];

  const [enData, mmData] = await Promise.all(urls.map((url) => fetch(url).then((r) => r.json())))
    .then((data) => {
      const en = !data[0].data ? { success: false } : { success: true, ...data[0] };
      const mm = !data[1].data ? { success: false } : { success: true, ...data[1] };
      return [en, mm];
    })
    .catch(() => {
      return [{ success: false }, { success: false }];
    });

  // Pass data to the page via props
  return { props: { data: { enData, mmData } } };
};
