import { IPlanUser } from 'types';
import client, { ClientResponse } from '../client';
import { formatData } from '../helpers';

export const getUsers = async (domainId: string): Promise<any> => {
  const response: ClientResponse = await client.get(`/planusers/${domainId}`);
  return formatData(response.data);
};

export const getUserById = async (domainId: string, userId: string): Promise<any> => {
  const response: ClientResponse = await client.get(`/planusers/${domainId}/${userId}`);
  return formatData(response.data);
};

export const addUser = async (domainId: string, payload: IPlanUser): Promise<any> => {
  const response: ClientResponse = await client.post(`/planusers/${domainId}`, payload);
  return formatData(response.data);
};

export const deleteUser = async (domainId: string, userId: string): Promise<any> => {
  const response: ClientResponse = await client.delete(`/planusers/${domainId}/${userId}`);
  return formatData(response.data);
};
