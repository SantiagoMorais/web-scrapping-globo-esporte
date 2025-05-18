import { Either } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { Game } from "@/domain/enterprise/entities/game";

export type FetchActiveGamesUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    games: Game[];
  }
>;
