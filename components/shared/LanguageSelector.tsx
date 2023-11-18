import React, { useEffect, useState } from "react";
import { useTranslation } from 'next-i18next';
import cookie from 'cookie';

import { setCookie, getCookie } from 'cookies-next';
import {
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { flags } from "@/lib/language";

const LanguageSelector = () => {
  const router = useRouter();
  const { i18n } = useTranslation() as any;

  const getInitialLanguage = () => {
    const cookieLanguage = getCookie('current-language');
    if (cookieLanguage !== 'es') return 'es'
    return cookieLanguage;
  }

  const [currentLanguage, setCurrentLanguage] = useState<string>(getInitialLanguage);
  
  useEffect(() => {
    const cookies = cookie.parse(document.cookie);
    const currentLanguage = cookies['current-language'];
    setCurrentLanguage(currentLanguage)
  }, []);

  const handleSetCurrentLanguage = (id: string) => {
    setCurrentLanguage(id);
    setCookie('current-language', id);

    if (i18n.isInitialized) {
      i18n.changeLanguage(id);
    }
  }

  useEffect(() => {
    if (router.pathname === '/_error') return
    if (router.locale !== currentLanguage) {
      handleSetCurrentLanguage(currentLanguage as string);
    }
  }, [router.locale]);



  return (
    <div className="px-4 py-2">
      <div className="flex">
        <div className="dropdown w-20">
          <div
            tabIndex={0}
            className="border border-gray-300 dark:border-gray-600 flex h-8 items-center px-4 justify-between cursor-pointer rounded text-sm font-bold"
          >
            {flags.find(m => m.id === currentLanguage)?.icon}
            <ChevronUpDownIcon className="w-5 h-5" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content dark:border-gray-600 p-2 shadow-md bg-base-100 w-full rounded border px-2"
          >
            {flags.map(({ id, icon }) => {
              return (
                <React.Fragment key={id}>
                  {icon && (
                    <li
                      onClick={() => handleSetCurrentLanguage(id)}
                      className="text-xs text-gray-500 py-1 px-2 hover:cursor-pointer"
                      key={icon}
                    >
                      {icon} {"  "} {currentLanguage === id ? <strong>{id}</strong> : id}
                    </li>
                  )}
                </React.Fragment>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
