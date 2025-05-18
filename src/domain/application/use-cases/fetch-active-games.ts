import { FetchActiveGamesUseCaseResponse } from "@/core/types/use-cases/fetch-active-games-use-case";
import { GamesRepository } from "../repositories/games-repository";
import { left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";

export class FetchActiveGamesUseCase {
  constructor(private gamesRepository: GamesRepository) {}

  async execute(): Promise<FetchActiveGamesUseCaseResponse> {
    const games = await this.gamesRepository.fetchActiveGames();

    if (!games)
      return left(new ResourceNotFoundError("There is no active game."));

    return right({ games });
  }
}
 