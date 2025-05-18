import { InMemoryGamesRepository } from "@test/repositories/in-memory-games-repository";
import { CreateGameUseCase } from "./create-game";
import { makeGame } from "@test/factories/make-game";
import { GameAlreadyCreatedError } from "@/core/errors/game-already-created-error";

let inMemoryGamesRepository: InMemoryGamesRepository;
let sut: CreateGameUseCase;

describe("Create Game Use Case", () => {
  beforeEach(() => {
    inMemoryGamesRepository = new InMemoryGamesRepository();
    sut = new CreateGameUseCase(inMemoryGamesRepository);
  });

  it("should be able to create a new game", async () => {
    const game = await sut.execute({
      link: "https://example.com",
      title: "Best game ever",
    });

    expect(inMemoryGamesRepository.games[0]).toEqual(
      game.isRight() && game.value.game
    );
    expect(inMemoryGamesRepository.games[0]).toEqual(
      expect.objectContaining({
        link: "https://example.com",
        title: "Best game ever",
      })
    );
  });

  it("should be able to create a existing game", async () => {
    const sameLink = "https://example.com";
    inMemoryGamesRepository.create(makeGame({ link: sameLink }));

    const game = await sut.execute({
      link: sameLink,
      title: "Best game ever",
    });

    expect(game.value).toBeInstanceOf(GameAlreadyCreatedError);
  });
});
