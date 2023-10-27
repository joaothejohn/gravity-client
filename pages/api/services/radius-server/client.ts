import env from '@/lib/env';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

export interface ClientResponse extends AxiosResponse {}

const client: AxiosInstance = axios.create({
  baseURL: env.radiusServer.host,
});

export default client;
