import { Either } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";

export type TDeleteGameUseCaseRequest = {
  id: string;
};

export type TDeleteGameUseCaseResponse = Either<ResourceNotFoundError, {}>;
