import { GamesRepository } from "@/domain/application/repositories/games-repository";
import { Game } from "@/domain/enterprise/entities/game";

export class InMemoryGamesRepository implements GamesRepository {
  public games: Game[] = [];

  async create(game: Game): Promise<Game> {
    this.games.push(game);
    return game;
  }

  async findByLink(link: string): Promise<Game | null> {
    const existingGame = this.games.find((g) => g.link === link);
    if (!existingGame) return null;
    return existingGame;
  }
}
