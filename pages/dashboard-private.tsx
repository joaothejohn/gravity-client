import DashboardMain from '@/components/dashboardPrivate/DashboardPrivate';
import { SUPPORTED_LANGUAGES } from '@/lib/language';
import { getSession } from '@/lib/session';
import { getUserBySession } from 'models/user';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { NextPageWithLayout } from 'types';

const Dashboard: NextPageWithLayout = ({ props }) => {
  console.log('props', props)
  return <DashboardMain />;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, res, locale }: GetServerSidePropsContext = context;

  const session = await getSession(req, res);
  const user = await getUserBySession(session);
  
  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ['common'], null, SUPPORTED_LANGUAGES) : {}),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}

export default Dashboard;
