import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { TGameProps } from "@/core/types/entities/game-props";
import { Game } from "@/domain/enterprise/entities/game";
import { faker } from "@faker-js/faker";

export const makeGame = (
  override: Partial<TGameProps> = {},
  id?: UniqueEntityId
) => {
  const game = Game.create(
    {
      isOver: false,
      link: faker.internet.url(),
      title: faker.lorem.words(5),
      lastEvent: faker.lorem.lines(2),
      scoreboard: faker.lorem.words(5),
      ...override,
    },
    id
  );

  return game;
};
