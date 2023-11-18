import { SUPPORTED_LANGUAGES } from '@/lib/language';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { IRadiusUserResponse, NextPageWithLayout } from 'types';
import cookie from 'cookie';
import RadiusUserCard from '@/components/dashboardPrivate/RadiusUserCard';
import { getUsers as getRadiusUsersByDomain } from "pages/api/services/radius-server/radius-users";
import { getTeamBySlug } from "pages/api/services/radius-server/teams";
import { useEffect, useState } from 'react';
import ModalInput from '@/components/shared/ModalInput';
import { useRouter } from 'next/router';
import { Error } from '@/components/shared';

const Customers: NextPageWithLayout = () => {
  const { query: { slug } } = useRouter();
  const [providerInfo, setProviderInfo] = useState<IRadiusUserResponse[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRadiusInfo = async () => {
      try {
        const team = await getTeamBySlug(slug as string);
        const data = await getRadiusUsersByDomain(team.domainId);
        setProviderInfo(data);
      } catch (error: any) {
        setError(error.message)
      }
    };

    fetchRadiusInfo();
  }, []);

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="flex flex-wrap">
      <ModalInput open={false} />
      {providerInfo.length > 0 ? providerInfo?.map((user) => <RadiusUserCard key={user.userId} user={user} />) : <div>No users created...</div>}
    </div>
  );
};

export async function getServerSideProps({
  req, locale
}: GetServerSidePropsContext) {
  const cookies = cookie.parse(req?.headers?.cookie || '');
  const currentLanguage = cookies['current-language'] || locale;

  return {
    props: {
      ...(currentLanguage ? await serverSideTranslations(currentLanguage, ['common'], null, SUPPORTED_LANGUAGES) : {}),
    },
  };
}

export default Customers;
