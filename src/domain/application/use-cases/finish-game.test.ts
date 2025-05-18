import { InMemoryGamesRepository } from "@test/repositories/in-memory-games-repository";
import { CreateGameUseCase } from "./create-game";
import { makeGame } from "@test/factories/make-game";
import { GameAlreadyCreatedError } from "@/core/errors/game-already-created-error";
import { FinishGameUseCase } from "./finish-game";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryGamesRepository: InMemoryGamesRepository;
let sut: FinishGameUseCase;

describe("Finish Game Use Case", () => {
  beforeEach(() => {
    inMemoryGamesRepository = new InMemoryGamesRepository();
    sut = new FinishGameUseCase(inMemoryGamesRepository);
  });

  it("should be able to create a new game", async () => {
    await inMemoryGamesRepository.create(
      makeGame({}, new UniqueEntityId("game-1"))
    );

    await sut.execute({ id: "game-1" });

    expect(inMemoryGamesRepository.games[0]).toEqual(
      expect.objectContaining({
        isOver: true,
      })
    );
  });
});
