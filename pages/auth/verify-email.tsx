import { AuthLayout } from '@/components/layouts';
import { SUPPORTED_LANGUAGES } from '@/lib/language';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { ReactElement } from 'react';
import cookie from 'cookie';

const VerifyEmail = () => {
  return <></>;
};

VerifyEmail.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout heading="confirm-email" description="confirm-email-description">
      {page}
    </AuthLayout>
  );
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

export default VerifyEmail;
