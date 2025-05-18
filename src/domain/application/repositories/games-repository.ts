import { Game } from "@/domain/enterprise/entities/game";

export interface GamesRepository {
  create(game: Game): Promise<Game>;
  findByLink(link: string): Promise<Game | null>;
  findById(id: string): Promise<Game | null>;
  finish(id: string): Promise<void>;
}
