import { Either } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";

export type TUpdateDataUseCaseRequest = {
  id: string;
  scoreboard: string;
  title: string;
  lastEvent: string;
};

export type TUpdateDataUseCaseResponse = Either<ResourceNotFoundError, {}>;
