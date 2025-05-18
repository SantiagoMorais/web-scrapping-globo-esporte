import { Game } from "@/domain/enterprise/entities/game";
import { GamesRepository } from "../games-repository";
import { db } from "@/db";

export class PrismaRepository implements GamesRepository {
  async create(game: Game): Promise<Game> {
    await db.game.create({
      data: {
        scoreboard: game.scoreboard,
        title: game.title,
        lastEvent: game.lastEvent,
        link: game.link,
        isOver: game.isOver,
        id: game.id.toValue(),
        createdAt: game.createdAt,
      },
    });

    return game;
  }

  async delete(id: string): Promise<void> {
    await db.game.delete({
      where: { id },
    });
  }

  async finish(id: string): Promise<void> {
    await db.game.update({
      where: { id },
      data: { isOver: true },
    });
  }

  async fetchActiveGames(): Promise<Game[] | null> {
    const gamesRecord = await db.game.findMany({
      where: {
        isOver: false,
      },
    });

    if (gamesRecord.length === 0) return null;

    const games = gamesRecord.map((game) => Game.create(game));
    return games;
  }

  async findById(id: string): Promise<Game | null> {
    const gameRecord = await db.game.findUnique({
      where: { id },
    });
    if (!gameRecord) return null;

    const game = Game.create(gameRecord);
    return game;
  }

  async findByLink(link: string): Promise<Game | null> {
    const gameRecord = await db.game.findUnique({
      where: { link },
    });
    if (!gameRecord) return null;

    const game = Game.create(gameRecord);
    return game;
  }

  async save(game: Game): Promise<void> {
    await db.game.update({
      where: { id: game.id.toValue() },
      data: {
        scoreboard: game.scoreboard,
        lastEvent: game.lastEvent,
        title: game.title,
      },
    });
  }
}
