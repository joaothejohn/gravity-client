import { User } from '@prisma/client';
import { NextPage } from 'next';
import { Session } from 'next-auth';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';

export interface IPageProps {
  session?: Session;
  user?: User;
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  pageProps: IPageProps;
};

export type NextPageWithLayout<P = Record<string, unknown>> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
