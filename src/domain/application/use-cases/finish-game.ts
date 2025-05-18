import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { GamesRepository } from "../repositories/games-repository";
import { left, right } from "@/core/either";
import {
  TFinishGameUseCaseRequest,
  TFinishGameUseCaseResponse,
} from "@/core/types/use-cases/finish-game-use-case";

export class FinishGameUseCase {
  constructor(private gamesRepository: GamesRepository) {}

  async execute({
    id,
  }: TFinishGameUseCaseRequest): Promise<TFinishGameUseCaseResponse> {
    const game = await this.gamesRepository.findById(id);
    if (!game) return left(new ResourceNotFoundError());
    game.markAsOver();

    await this.gamesRepository.finish(game.id.toValue());
    return right({});
  }
}
