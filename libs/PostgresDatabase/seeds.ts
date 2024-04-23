import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import * as dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  await prisma.player.deleteMany();
  await prisma.game.deleteMany();
  await prisma.user.deleteMany();

  const user1 = {
    id: uuid(),
    name: 'Erik',
  };
  const user2 = {
    id: uuid(),
    name: 'Duglas',
  };
  await prisma.user.createMany({
    data: [user1, user2],
  });
  const gameId = uuid();
  const game = await prisma.game.create({
    data: {
      id: gameId,
      winner: {},
      host: {
        connect: user1,
      },
      opponent: {
        connect: user2,
      },
    },
  });
  await prisma.player.createMany({
    data: [
      { choice: null, userId: user1.id, gameId: game.id },
      { choice: null, userId: user2.id, gameId: game.id },
    ],
  });
  const foundGame = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: {
      host: {
        include: {
          players: true,
        },
      },
      opponent: {
        include: {
          players: true,
        },
      },
      winner: true,
    },
  });
  console.log(JSON.stringify(foundGame, null, 2));
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
