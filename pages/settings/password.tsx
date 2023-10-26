import type { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { UpdatePassword } from '@/components/account';
import { SUPPORTED_LANGUAGES } from '@/lib/language';

const Password = () => {
  return <UpdatePassword />;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { locale }: GetServerSidePropsContext = context;

  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ['common'], null, SUPPORTED_LANGUAGES) : {}),
    },
  };
};

export default Password;
