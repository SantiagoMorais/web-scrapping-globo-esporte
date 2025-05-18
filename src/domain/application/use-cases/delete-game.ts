import {
  TDeleteGameUseCaseRequest,
  TDeleteGameUseCaseResponse,
} from "@/core/types/use-cases/delete-game-use-case";
import { GamesRepository } from "../repositories/games-repository";
import { left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";

export class DeleteGameUseCase {
  constructor(private gamesRepository: GamesRepository) {}

  async execute({
    id,
  }: TDeleteGameUseCaseRequest): Promise<TDeleteGameUseCaseResponse> {
    const game = await this.gamesRepository.findById(id);

    if (!game) return left(new ResourceNotFoundError("Game not found."));

    await this.gamesRepository.delete(game.id.toValue());
    return right({})
  }
}
