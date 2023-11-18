import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { getUsers as getRadiusUsersByDomain } from "pages/api/services/radius-server/radius-users";
import { IRadiusUserResponse } from "types";
import RadiusUserCard from "./RadiusUserCard";

const DashboardMain = () => {
  const domainId = 'a9e8835d-340c-465a-ad41-e1993e7c6350';
  const [providerInfo, setProviderInfo] = useState<IRadiusUserResponse[]>([]);

  useEffect(() => {
    const fetchRadiusInfo = async () => {
      try {
        const data = await getRadiusUsersByDomain(domainId);
        setProviderInfo(data);
      } catch (error: any) {
        toast.error(`Error fetching user info: ${error.message}`);
      }
    };

    fetchRadiusInfo();
  }, []);


  return (
    <div className="py-6">
      <div className="flex flex-wrap">
        {providerInfo?.map((user) => <RadiusUserCard key={user.userId} user={user} />)}
      </div>
    </div>
  );
};

export default DashboardMain;
