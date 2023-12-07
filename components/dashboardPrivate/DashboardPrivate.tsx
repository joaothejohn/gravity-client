import { useEffect, useState } from "react";
import { getUsers as getRadiusUsersByDomain } from "pages/api/services/radius-server/radius-users";
import { IPlan, IRadiusUserResponse } from "types";
import RadiusUserCard from "../dashboard/RadiusUserCard";
import { getPlanByDomainId } from "pages/api/services/radius-server/plans";
import { useRouter } from "next/router";
import { Error } from '@/components/shared';

const DashboardMain = () => {
  const { query: { slug } } = useRouter();
  const domainId = 'a9e8835d-340c-465a-ad41-e1993e7c6350';
  const [providerInfo, setProviderInfo] = useState<IRadiusUserResponse[]>([]);
  const [plansInfo, setPlansInfo] = useState<IPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchRadiusInfo = async () => {
      setLoading(true);
      try {
        const [data, plans] = await Promise.all([
          getRadiusUsersByDomain(domainId),
          getPlanByDomainId(domainId)
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
    <div className="py-6">
      <div className="flex flex-wrap">
        <RadiusUserCard providerInfo={providerInfo as any} loading={loading} plansInfo={plansInfo} />
      </div>
    </div>
  );
};

export default DashboardMain;
