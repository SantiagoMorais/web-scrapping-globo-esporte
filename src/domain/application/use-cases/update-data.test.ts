import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { makeGame } from "@test/factories/make-game";
import { InMemoryGamesRepository } from "@test/repositories/in-memory-games-repository";
import { UpdateDataUseCase } from "./update-data";

let inMemoryGamesRepository: InMemoryGamesRepository;
let sut: UpdateDataUseCase;

describe("Update Game Data Use Case", () => {
  beforeEach(() => {
    inMemoryGamesRepository = new InMemoryGamesRepository();
    sut = new UpdateDataUseCase(inMemoryGamesRepository);
  });

  it("should be able to edit a created game", async () => {
    await inMemoryGamesRepository.create(
      makeGame(
        {
          title: "game",
          scoreboard: "Flamengo 0 x 0 São Paulo",
          lastEvent: "Cartão amarelo",
        },
        new UniqueEntityId("game-1")
      )
    );

    await sut.execute({
      id: "game-1",
      lastEvent: "Gol!",
      scoreboard: "Flamengo 0 x 1 São Paulo",
      title: "great game",
    });

    expect(inMemoryGamesRepository.games[0]).toEqual(
      expect.objectContaining({
        lastEvent: "Gol!",
        scoreboard: "Flamengo 0 x 1 São Paulo",
        title: "great game",
      })
    );
    expect(inMemoryGamesRepository.games[0].updatedAt).toBeTruthy();
  });
});
