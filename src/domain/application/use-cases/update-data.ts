import {
  TUpdateDataUseCaseRequest,
  TUpdateDataUseCaseResponse,
} from "@/core/types/use-cases/update-data-use-case";
import { GamesRepository } from "../repositories/games-repository";
import { left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";

export class UpdateDataUseCase {
  constructor(private gamesRepository: GamesRepository) {}

  async execute({
    id,
    scoreboard,
    title,
    lastEvent,
  }: TUpdateDataUseCaseRequest): Promise<TUpdateDataUseCaseResponse> {
    const game = await this.gamesRepository.findById(id);
    if (!game) return left(new ResourceNotFoundError("Game not found"));

    game.scoreboard = scoreboard;
    game.title = title;
    game.lastEvent = lastEvent;

    await this.gamesRepository.save(game);
    return right({});
  }
}
