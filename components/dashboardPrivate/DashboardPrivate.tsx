import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { getUsers as getRadiusUsersByDomain } from "pages/api/services/radius-server/radius-users";
import { IRadiusUserResponse } from "types";
import RadiusUserCard from "./RadiusUserCard";

const DashboardMain = () => {
  const domainId = 'b519909d-d4b7-4b2a-a45c-b53505f1eff7';
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
      <p className="text-4xl ml-2 font-black text-gray-900 dark:text-white">Domain ID: {domainId}</p>
      <div className="flex justify-start">
        {providerInfo?.map((user) => <RadiusUserCard key={user.userId} user={user} />)}
      </div>
    </div>
  );
};

export default DashboardMain;
