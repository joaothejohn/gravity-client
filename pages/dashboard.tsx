import DashboardMain from '@/components/dashboard/Dashboard';
import { SUPPORTED_LANGUAGES } from '@/lib/language';
import { getSession } from '@/lib/session';
import { getUserBySession } from 'models/user';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { NextPageWithLayout } from 'types';
import cookie from 'cookie';

const Dashboard: NextPageWithLayout = () => {
  return <DashboardMain />;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, res, locale }: GetServerSidePropsContext = context;
  const cookies = cookie.parse(req.headers.cookie || '');
  const currentLanguage = cookies['current-language'] || locale;

  const session = await getSession(req, res);
  const user = await getUserBySession(session);
  
  return {
    props: {
      ...(currentLanguage ? await serverSideTranslations(currentLanguage, ['common'], null, SUPPORTED_LANGUAGES) : {}),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}

export default Dashboard;
