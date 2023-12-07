import client, { ClientResponse } from '../client';
import { formatData } from '../helpers';

export const getPlanByDomainId = async (domainId: string): Promise<any> => {
  const response: ClientResponse = await client.get(`/plans/${domainId}`);
  return formatData(response.data);
};
