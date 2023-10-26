import { Teams } from '@/components/team';
import { SUPPORTED_LANGUAGES } from '@/lib/language';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { NextPageWithLayout } from 'types';

const AllTeams: NextPageWithLayout = () => {
  return <Teams />;
};

export async function getStaticProps({ locale }: GetServerSidePropsContext) {
  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ['common'], null, SUPPORTED_LANGUAGES) : {}),
    },
  };
}

export default AllTeams;
