import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { TGameProps } from "@/core/types/entities/game-props";
import { Optional } from "@/core/types/optional";

export class Game extends Entity<TGameProps> {
  get scoreboard() {
    return this.props.scoreboard;
  }

  get title() {
    return this.props.title;
  }

  get lastEvent() {
    return this.props.lastEvent;
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

  set scoreboard(score: string) {
    this.props.scoreboard = score;
    this.touch();
  }

  set title(title: string) {
    this.props.title = title;
    this.touch();
  }

  set lastEvent(content: string) {
    this.props.lastEvent = content;
    this.touch();
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
