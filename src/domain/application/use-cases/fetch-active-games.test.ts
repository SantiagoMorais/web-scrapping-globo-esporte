import { makeGame } from "@test/factories/make-game";
import { InMemoryGamesRepository } from "@test/repositories/in-memory-games-repository";
import { FetchActiveGamesUseCase } from "./fetch-active-games";

let inMemoryGamesRepository: InMemoryGamesRepository;
let sut: FetchActiveGamesUseCase;

describe("Finish Game Use Case", () => {
  beforeEach(() => {
    inMemoryGamesRepository = new InMemoryGamesRepository();
    sut = new FetchActiveGamesUseCase(inMemoryGamesRepository);
  });

  it("should be able to create a new game", async () => {
    await inMemoryGamesRepository.create(makeGame()); // the isOver property is set to false by default when the game is created
    await inMemoryGamesRepository.create(makeGame({ isOver: true }));
    await inMemoryGamesRepository.create(makeGame());

    const result = await sut.execute();

    expect(result.isRight() && result.value.games).toHaveLength(2);
  });
});
