import { IRadiusUser, IRadiusUserResponse } from 'types';
import client, { ClientResponse } from '../client';
import { formatData } from '../helpers';

export const getUsers = async (domainId: string): Promise<IRadiusUserResponse[]> => {
  return [
    {
      "userId": "08db8933-3040-4ecc-86ac-fe037b5b94b0",
      "domainId": "b519909d-d4b7-4b2a-a45c-b53505f1eff7",
      "userName": "user",
      "password": null,
      "ip": "10.11.0.3",
      "planId": "08db8930-fd13-4d58-8ac3-bd96e8c5cd76"
    },
    {
      "userId": "08db893f-03ff-4c2c-86b6-eb09aae2886b",
      "domainId": "b519909d-d4b7-4b2a-a45c-b53505f1eff7",
      "userName": "warleygoes@meteora.academy",
      "password": null,
      "ip": "45.175.136.100",
      "planId": "08db8930-fd13-4d58-8ac3-bd96e8c5cd76"
    },
    {
      "userId": "08db893f-03ff-4c2c-86b6-eb09aae2886b",
      "domainId": "b519909d-d4b7-4b2a-a45c-b53505f1eff7",
      "userName": "joaonetto@meteora.academy",
      "password": null,
      "ip": "45.175.136.100",
      "planId": "08db8930-fd13-4d58-8ac3-bd96e8c5cd76"
    },
    {
      "userId": "08db893f-03ff-4c2c-86b6-eb09aae2886b",
      "domainId": "b519909d-d4b7-4b2a-a45c-b53505f1eff7",
      "userName": "joaonetto@meteora.academy",
      "password": null,
      "ip": "45.175.136.100",
      "planId": "08db8930-fd13-4d58-8ac3-bd96e8c5cd76"
    }
  ].filter((user) => user.domainId === domainId);
  const response: ClientResponse = await client.get(`/radiususers/${domainId}`);
  return formatData<IRadiusUserResponse[]>(response.data);
};

export const getUserById = async (domainId: string, userId: string): Promise<IRadiusUserResponse> => {
  return {
    "userId": "08db8933-3040-4ecc-86ac-fe037b5b94b0",
    "domainId": "b519909d-d4b7-4b2a-a45c-b53505f1eff7",
    "userName": "user",
    "password": null,
    "ip": "10.11.0.3",
    "planId": "08db8930-fd13-4d58-8ac3-bd96e8c5cd76",
    "domain": null,
    "userPlan": null
  }
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
