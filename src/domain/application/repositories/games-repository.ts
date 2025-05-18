import { Game } from "@/domain/enterprise/entities/game";

export interface GamesRepository {
  create(game: Game): Promise<Game>;
  findByLink(link: string): Promise<Game | null>;
}
