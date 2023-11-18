import { AuthLayout } from '@/components/layouts';
import { SUPPORTED_LANGUAGES } from '@/lib/language';
import { getSession } from '@/lib/session';
import { deleteCookie } from 'cookies-next';
import { getTeams } from 'models/team';
import { getUserBySession } from 'models/user';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { type ReactElement, useEffect } from 'react';
import toast from 'react-hot-toast';
import type { NextPageWithLayout } from 'types';
import cookie from 'cookie';

const Organizations: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ teams, ...props }) => {
  console.log('props', props)
  const router = useRouter();
  const { t } = useTranslation('common');
  const { status } = useSession();

  if (status === 'unauthenticated') {
    router.push('/auth/login');
  }

  useEffect(() => {
    if (teams === null) {
      toast.error(t('no-active-team'));
      return;
    }

    router.push('/dashboard');
  });

  return (
    <>
      <div className="mb-6 flex w-1/2 flex-col items-center gap-4 p-3">
        <h3>{t('choose-team')}</h3>
        <div className="w-3/5 rounded bg-white dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0"></div>
      </div>
    </>
  );
};

Organizations.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req, res, locale }: GetServerSidePropsContext = context;

  const cookies = cookie.parse(req?.headers?.cookie || '');
  const currentLanguage = cookies['current-language'] || locale;

  const session = await getSession(req, res);
  const user = await getUserBySession(session);

  deleteCookie('pending-invite', { req, res });

  const teams = await getTeams(session?.user.id as string);

  return {
    props: {
      ...(currentLanguage ? await serverSideTranslations(currentLanguage, ['common'], null, SUPPORTED_LANGUAGES) : {}),
      teams: JSON.parse(JSON.stringify(teams)),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
};

export default Organizations;
