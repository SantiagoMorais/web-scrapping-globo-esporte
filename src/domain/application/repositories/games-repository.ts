import { Game } from "@/domain/enterprise/entities/game";

export interface GamesRepository {
  findByLink(link: string): Promise<Game | null>;
  findById(id: string): Promise<Game | null>;
  fetchActiveGames(): Promise<Game[] | null>;
  create(game: Game): Promise<Game>;
  finish(id: string): Promise<void>;
  delete(id: string): Promise<void>;
  save(game: Game): Promise<void>;
}
