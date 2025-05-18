import { Either } from "@/core/either";
import { GameAlreadyCreatedError } from "@/core/errors/game-already-created-error";
import { Game } from "@/domain/enterprise/entities/game";

export type TCreateGameUseCaseRequest = {
  title: string;
  link: string;
};

export type TCreateGameUseCaseResponse = Either<
  GameAlreadyCreatedError,
  {
    game: Game;
  }
>;
