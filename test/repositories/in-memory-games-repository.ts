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

  async findById(id: string): Promise<Game | null> {
    const existingGame = this.games.find((g) => g.id.toValue() === id);
    if (!existingGame) return null;
    return existingGame;
  }

  async finish(id: string): Promise<void> {
    const game = this.games.find((g) => g.id.toValue() === id);
    game!.markAsOver();
  }

  async fetchActiveGames(): Promise<Game[] | null> {
    const activeGames = this.games.filter((game) => !game.isOver);
    if (!activeGames) return null;
    return activeGames;
  }

  async delete(id: string): Promise<void> {
    const gameIndex = this.games.findIndex((game) => game.id.toValue() === id);
    this.games.splice(gameIndex, 1);
  }

  async save(game: Game): Promise<void> {
    const gameIndex = this.games.findIndex((g) => g.id === game.id);
    this.games[gameIndex] = game;
  }
}
