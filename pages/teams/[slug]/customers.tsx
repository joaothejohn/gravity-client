import { SUPPORTED_LANGUAGES } from '@/lib/language';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { IPlan, IRadiusUserResponse, NextPageWithLayout } from 'types';
import cookie from 'cookie';
import RadiusUserCard from '@/components/dashboard/RadiusUserCard';
import { getUsers as getRadiusUsersByDomain } from "pages/api/services/radius-server/radius-users";
import { getTeamBySlug } from "pages/api/services/radius-server/teams";
import { getPlanByDomainId } from "pages/api/services/radius-server/plans";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Error } from '@/components/shared';

const Customers: NextPageWithLayout = () => {
  const { query: { slug } } = useRouter();
  const [providerInfo, setProviderInfo] = useState<IRadiusUserResponse[]>([]);
  const [plansInfo, setPlansInfo] = useState<IPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRadiusInfo = async () => {
      setLoading(true);
      try {
        const team = await getTeamBySlug(slug as string);
        const [data, plans] = await Promise.all([
          getRadiusUsersByDomain(team.domainId),
          getPlanByDomainId(team.domainId)
        ]);
  
        setProviderInfo(data);
        setPlansInfo(plans);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchRadiusInfo();
  }, [slug]);

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="flex flex-wrap mt-16">
      <RadiusUserCard providerInfo={providerInfo as any} plansInfo={plansInfo} loading={loading} />
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
