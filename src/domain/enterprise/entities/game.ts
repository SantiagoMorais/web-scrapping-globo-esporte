import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { TGameProps } from "@/core/types/entities/game-props";
import { Optional } from "@/core/types/optional";

export class Game extends Entity<TGameProps> {
  get title() {
    return this.props.title;
  }

  get link() {
    return this.props.link;
  }

  get isOver() {
    return this.props.isOver;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  markAsOver() {
    if (!this.props.isOver) {
      this.props.isOver = true;
      this.touch();
    }
  }

  static create(props: Optional<TGameProps, "createdAt">, id?: UniqueEntityId) {
    const game = new Game(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );

    return game;
  }
}
