import fetcher from '@/lib/fetcher';
import useSWR, { mutate } from 'swr';
import type { ApiResponse } from 'types';

const useRadius = () => {
  const url = `/api/services/radius-server`;

  const { data, error, isLoading } = useSWR<ApiResponse<any[]>>(
    url,
    fetcher
  );

  const mutatePlanUsers = async () => {
    mutate(`${url}/plan-users`);
  };
  
  const mutateRadiusUsers = async () => {
    mutate(`${url}/radius-users`);
  };

  return {
    isLoading,
    isError: error,
    teams: data?.data,
    mutatePlanUsers,
    mutateRadiusUsers
  };
};

export default useRadius;
