import { IRadiusUser, IRadiusUserResponse } from 'types';
import client, { ClientResponse } from '../client';
import { formatData } from '../helpers';

export const getUsers = async (domainId: string): Promise<IRadiusUserResponse[]> => {
  const response: ClientResponse = await client.get(`/radiususers/${domainId}`);
  return formatData<IRadiusUserResponse[]>(response.data);
};

export const getUserById = async (domainId: string, userId: string): Promise<IRadiusUserResponse> => {
  const response: ClientResponse = await client.get(`/radiususers/${domainId}/${userId}`);
  return formatData<IRadiusUserResponse>(response.data);
};

export const addUser = async (domainId: string, payload: IRadiusUser): Promise<IRadiusUserResponse> => {
  const response: ClientResponse = await client.post(`/radiususers/${domainId}`, payload);
  return formatData<IRadiusUserResponse>(response.data);
};

export const deleteUser = async (domainId: string, userId: string): Promise<IRadiusUserResponse> => {
  const response: ClientResponse = await client.delete(`/radiususers/${domainId}/${userId}`);
  return formatData<IRadiusUserResponse>(response.data);
};
