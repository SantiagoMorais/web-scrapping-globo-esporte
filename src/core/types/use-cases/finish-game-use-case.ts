import { Either } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";

export type TFinishGameUseCaseRequest = {
  id: string;
};

export type TFinishGameUseCaseResponse = Either<ResourceNotFoundError, {}>;
