import { makeGame } from "@test/factories/make-game";
import { InMemoryGamesRepository } from "@test/repositories/in-memory-games-repository";
import { DeleteGameUseCase } from "./delete-game";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryGamesRepository: InMemoryGamesRepository;
let sut: DeleteGameUseCase;

describe("Finish Game Use Case", () => {
  beforeEach(() => {
    inMemoryGamesRepository = new InMemoryGamesRepository();
    sut = new DeleteGameUseCase(inMemoryGamesRepository);
  });

  it("should be able to create a new game", async () => {
    await inMemoryGamesRepository.create(
      makeGame({ title: "game-1" }, new UniqueEntityId("game-1"))
    );
    await inMemoryGamesRepository.create(
      makeGame({ title: "game-2" }, new UniqueEntityId("game-2"))
    );
    await inMemoryGamesRepository.create(
      makeGame({ title: "game-3" }, new UniqueEntityId("game-3"))
    );

    await sut.execute({ id: "game-2" });

    expect(inMemoryGamesRepository.games).toHaveLength(2);
    expect(inMemoryGamesRepository.games).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: "game-1" }),
        expect.objectContaining({ title: "game-3" }),
      ])
    );
  });
});
