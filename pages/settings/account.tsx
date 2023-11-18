import type { NextPageWithLayout } from 'types';
import type { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { getSession } from '@/lib/session';
import { getUserBySession } from 'models/user';
import { inferSSRProps } from '@/lib/inferSSRProps';
import { UpdateAccount } from '@/components/account';
import { SUPPORTED_LANGUAGES } from '@/lib/language';
import cookie from 'cookie';

type AccountProps = NextPageWithLayout<
  inferSSRProps<typeof getServerSideProps>
>;

const Account: AccountProps = ({ user }) => {
  return <UpdateAccount user={user} />;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context.req, context.res);
  const user = await getUserBySession(session);
  const { req, locale } = context;

  if (!user) {
    return {
      notFound: true,
    };
  }

  const cookies = cookie.parse(req?.headers?.cookie || '');
  const currentLanguage = cookies['current-language'] || locale;

  return {
    props: {
      ...(currentLanguage ? await serverSideTranslations(currentLanguage, ['common'], null, SUPPORTED_LANGUAGES) : {}),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
};

export default Account;
