import { v4 as uuidv4 } from "uuid";
import prisma from "../../utils/prismaClient"

export async function seedDatabase() {
  let seedsGenerated = false;
  const domainId = uuidv4();
  const planId = uuidv4();
  const routerId = uuidv4();

  const domains = await prisma.domain.findMany();

  if (domains.length === 0) {
    await prisma.domain.create({
      data: {
        id: domainId,
        name: 'testdomain',
      },
    })

    await prisma.domainRouter.create({
      data: {
        id: routerId,
        domainId,
        name: 'testrouter',
        ip: '192.168.1.2',
      },
    })

    await prisma.plan.create({
      data: {
        id: planId,
        domainId,
        name: 'Premium',
        maxLimit: '50M/50M',
        limitAt: '40M/50M',
        burstLimit: '40M/50M',
        burstThreshold: '40M/50M',
        burstTime: '40M/50M',
        priority: '1',
      },
    })

    seedsGenerated = true
  }

  if (seedsGenerated) {
    console.log('Seeds generated')
  }
}