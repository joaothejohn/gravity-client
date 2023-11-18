import { Plans } from '@/components/plan';
import { SUPPORTED_LANGUAGES } from '@/lib/language';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { NextPageWithLayout } from 'types';
import cookie from 'cookie';

const AllPlans: NextPageWithLayout = () => {
  return <Plans />;
};

export async function getStaticProps({ req, locale }: GetServerSidePropsContext) {
  const cookies = cookie.parse(req?.headers?.cookie || '');
  const currentLanguage = cookies['current-language'] || locale;

  return {
    props: {
      ...(currentLanguage ? await serverSideTranslations(currentLanguage, ['common'], null, SUPPORTED_LANGUAGES) : {}),
    },
  };
}

export default AllPlans;
