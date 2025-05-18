export class ResourceNotFoundError extends Error {
  constructor(message?: string) {
    super(message ?? "Resource not found!");
    this.name = "ResourceNotFoundError";
  }
}
