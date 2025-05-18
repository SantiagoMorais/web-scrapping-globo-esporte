export class GameAlreadyCreatedError extends Error {
  constructor(message?: string) {
    super(message ?? "This game was already created before.");
    this.name = "GameAlreadyCreatedError";
  }
}
