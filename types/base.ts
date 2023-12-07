import { SVGProps } from "react";
import type { Prisma } from '@prisma/client';

export type ApiError = {
  code?: string;
  message: string;
  values: { [key: string]: string };
};

export type ApiResponse<T = unknown> =
  | {
    data: T;
    error: never;
  }
  | {
    data: never;
    error: ApiError;
  };

export type Role = 'owner' | 'member';

export type TeamWithMemberCount = Prisma.TeamGetPayload<{
  include: {
    _count: {
      select: { members: true };
    };
  };
}>;

export type WebookFormSchema = {
  name: string;
  url: string;
  eventTypes: string[];
};

export type AppEvent =
  | 'invitation.created'
  | 'invitation.removed'
  | 'invitation.fetched'
  | 'invitation.failed'
  | 'invitation.email.failed'
  | 'member.created'
  | 'member.removed'
  | 'member.left'
  | 'member.fetched'
  | 'member.role.updated'
  | 'user.password.updated'
  | 'user.password.request'
  | 'user.updated'
  | 'user.signup'
  | 'user.password.reset'
  | 'team.fetched'
  | 'team.created'
  | 'team.updated'
  | 'team.removed'
  | 'apikey.created'
  | 'apikey.removed'
  | 'apikey.fetched'
  | 'apikey.removed'
  | 'webhook.created'
  | 'webhook.removed'
  | 'webhook.fetched'
  | 'webhook.updated'
  | 'domain.removed';

export type AUTH_PROVIDER =
  | 'github'
  | 'google'
  | 'saml'
  | 'email'
  | 'credentials';

export interface TeamFeature {
  sso: boolean;
  dsync: boolean;
  auditLog: boolean;
  webhook: boolean;
  apiKey: boolean;
}

export interface IRadiusUser {
  userName: string
  password: string
  ip: string
  planId: string
}

export interface IPlanUser {
  name: string
  maxLimit: string
  limitAt: string
  priority: string
  burstLimit: string
  burstThreshold: string
  burstTime: string
}

export interface IPlan {
  id: string
  name: string
  maxLimit: string
  limitAt: string
  priority: string
  burstLimit: string
  burstThreshold: string
  burstTime: string
}

export interface IRadiusUserResponse {
  userId: string
  isActive: boolean
  domain?: string | null
  domainId?: string | null
  username: string
  password: null
  ip: string
  plan: IPlan
  planId: string
}

export interface IPlanUserResponse {
  planId: string
  name: string
  maxLimit: string
  limitAt: string
  priority: string
  burstLimit: string
  burstThreshold: string
  burstTime: string
}

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};