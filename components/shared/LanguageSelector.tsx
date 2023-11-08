import React, { useEffect, useState } from "react";
import { useTranslation } from 'next-i18next';
import { setCookie, getCookie } from 'cookies-next';
import {
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { flags } from "@/lib/language";

const LanguageSelector = () => {
  const router = useRouter();
  const [currentLanguage, setCurrentLanguage] = useState<string>('es');
  const { i18n } = useTranslation() as any;

  const handleSetCurrentLanguage = (id: string) => {
    setCurrentLanguage(id);
    setCookie('current-language', id);
  }

  const handleLanguageCookie = () => {
    const language = getCookie('current-language');
    if (!language) return

    setCurrentLanguage(language);
    setCookie('current-language', language);
    i18n.changeLanguage(language);
  }

  useEffect(() => {
    handleLanguageCookie();
  }, [currentLanguage])

  useEffect(() => {
    handleLanguageCookie();
  }, [])

  useEffect(() => {
    if (router.pathname === '/_error') return
    if (router.locale !== currentLanguage) {
      handleSetCurrentLanguage(currentLanguage);
    }
  }, [router.locale])

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
                      className="text-xs text-gray-500 py-1 px-2"
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
