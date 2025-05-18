import {
  TCreateGameUseCaseRequest,
  TCreateGameUseCaseResponse,
} from "@/core/types/use-cases/create-game-use-case";
import { GamesRepository } from "../repositories/games-repository";
import { left, right } from "@/core/either";
import { GameAlreadyCreatedError } from "@/core/errors/game-already-created-error";
import { Game } from "@/domain/enterprise/entities/game";

export class CreateGameUseCase {
  constructor(private gamesRepository: GamesRepository) {}

  async execute({
    link,
    title,
  }: TCreateGameUseCaseRequest): Promise<TCreateGameUseCaseResponse> {
    const existingGame = await this.gamesRepository.findByLink(link);
    if (existingGame) return left(new GameAlreadyCreatedError());

    const newGame = Game.create({ isOver: false, link, title });
    await this.gamesRepository.create(newGame);

    return right({ game: newGame });
  }
}
