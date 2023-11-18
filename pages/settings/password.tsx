import { UpdatePassword } from '@/components/account';
import { SUPPORTED_LANGUAGES } from '@/lib/language';

import type { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import cookie from 'cookie';

const Password = () => {
  return <UpdatePassword />;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req, locale }: GetServerSidePropsContext = context;
  const cookies = cookie.parse(req?.headers?.cookie || '');
  const currentLanguage = cookies['current-language'] || locale;

  return {
    props: {
      ...(currentLanguage ? await serverSideTranslations(currentLanguage, ['common'], null, SUPPORTED_LANGUAGES) : {}),
    },
  };
};

export default Password;
