import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { makeGame } from "@test/factories/make-game";
import { InMemoryGamesRepository } from "@test/repositories/in-memory-games-repository";
import { FinishGameUseCase } from "./finish-game";

let inMemoryGamesRepository: InMemoryGamesRepository;
let sut: FinishGameUseCase;

describe("Finish Game Use Case", () => {
  beforeEach(() => {
    inMemoryGamesRepository = new InMemoryGamesRepository();
    sut = new FinishGameUseCase(inMemoryGamesRepository);
  });

  it("should be able to finish a created game", async () => {
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
