import client, { ClientResponse } from '../client';
import { formatData } from '../helpers';

export const getTeamBySlug = async (slug: string): Promise<any> => {
  const response: ClientResponse = await client.get(`/teams/slug/${slug}`);
  return formatData(response.data);
};
