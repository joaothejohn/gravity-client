import { PendingInvitations } from '@/components/invitation';
import { Error, Loading } from '@/components/shared';
import { Members, TeamTab } from '@/components/team';
import env from '@/lib/env';
import { SUPPORTED_LANGUAGES } from '@/lib/language';
import { getSession } from '@/lib/session';
import useTeam from 'hooks/useTeam';
import { getUserBySession } from 'models/user';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import cookie from 'cookie';

const TeamMembers = ({ teamFeatures, user }) => {
  const { t } = useTranslation('common');
  const { isLoading, isError, team } = useTeam();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error message={isError.message} />;
  }

  if (!team) {
    return <Error message={t('team-not-found')} />;
  }

  return (
    <>
      <TeamTab activeTab="members" team={team} teamFeatures={teamFeatures} />
      <div className="space-y-6">
        <Members team={team} user={user} />
        <PendingInvitations team={team} />
      </div>
    </>
  );
};

export async function getServerSideProps({
  locale,
  req,
  res
}: GetServerSidePropsContext) {
  const session = await getSession(req, res);
  const user = await getUserBySession(session);

  const cookies = cookie.parse(req?.headers?.cookie || '');
  const currentLanguage = cookies['current-language'] || locale;

  return {
    props: {
      ...(currentLanguage ? await serverSideTranslations(currentLanguage, ['common'], null, SUPPORTED_LANGUAGES) : {}),
      teamFeatures: env.teamFeatures,
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}

export default TeamMembers;
