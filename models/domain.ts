import { prisma } from '@/lib/prisma';

export const createDomain = async (param: {
  name: string;
}) => {
  const { name } = param;

  const domain = await prisma.domain.create({
    data: {
      name,
    },
  });

  return domain;
};


export const deleteDomain = async (key: { id: string }) => {
  const domain = await prisma.domain.delete({
    where: key,
  });

  return domain;
};
