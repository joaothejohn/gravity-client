import { IPlanUser, IPlanUserResponse } from 'types';
import client, { ClientResponse } from '../client';
import { formatData } from '../helpers';

export const getUsers = async (domainId: string): Promise<any> => {
  const response: ClientResponse = await client.get(`/plans/${domainId}`);
  return formatData(response.data);
};

export const getUserById = async (domainId: string, userId: string): Promise<any> => {
  return {
    "planId": "08db8930-fd13-4d58-8ac3-bd96e8c5cd76",
    "domainId": "b519909d-d4b7-4b2a-a45c-b53505f1eff7",
    "name": "100M",
    "maxLimit": "100M/100M",
    "limitAt": "10M/10M",
    "priority": "7/7",
    "burstLimit": "200M/200M",
    "burstThreshold": "50M/50M",
    "burstTime": "120/120"
  };
  const response: ClientResponse = await client.get(`/planusers/${domainId}/${userId}`);
  return formatData(response.data);
};

export const addUser = async (domainId: string, payload: IPlanUser): Promise<Omit<IPlanUserResponse, 'planId'>> => {
  return {
    "name": "TEST JOAO",
    "maxLimit": "100M/100M",
    "limitAt": "10M/10M",
    "priority": "7/7",
    "burstLimit": "200M/200M",
    "burstThreshold": "50M/50M",
    "burstTime": "120/120"
  };
  const response: ClientResponse = await client.post(`/planusers/${domainId}`, payload);
  return formatData<IPlanUserResponse>(response.data);
};

export const deleteUser = async (domainId: string, userId: string): Promise<any> => {
  return [
    {
      "planId": "08db8930-fd13-4d58-8ac3-bd96e8c5cd76",
      "domainId": "b519909d-d4b7-4b2a-a45c-b53505f1eff7",
      "name": "100M",
      "maxLimit": "100M/100M",
      "limitAt": "10M/10M",
      "priority": "7/7",
      "burstLimit": "200M/200M",
      "burstThreshold": "50M/50M",
      "burstTime": "120/120"
    }
  ].filter((plan) => (plan.domainId === domainId) && []);
  const response: ClientResponse = await client.delete(`/planusers/${domainId}/${userId}`);
  return formatData(response.data);
};
