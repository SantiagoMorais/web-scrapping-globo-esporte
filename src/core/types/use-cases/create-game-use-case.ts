import { Either } from "@/core/either";
import { GameAlreadyCreatedError } from "@/core/errors/game-already-created-error";
import { Game } from "@/domain/enterprise/entities/game";

export type TCreateGameUseCaseRequest = {
  scoreboard: string;
  title: string;
  lastEvent: string;
  link: string;
};

export type TCreateGameUseCaseResponse = Either<
  GameAlreadyCreatedError,
  {
    game: Game;
  }
>;
