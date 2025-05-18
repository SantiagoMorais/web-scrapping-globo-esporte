import { Either, left, right } from "./either";

const doSomething = (shouldSuccess: boolean): Either<string, number> => {
  if (shouldSuccess) return right(1);
  return left("error");
};

test("Success Result", () => {
  const result = doSomething(true);

  expect(result.isRight()).toEqual(true);
  expect(result.isLeft()).toEqual(false);
});

test("Error Result", () => {
  const result = doSomething(false);
  expect(result.isLeft()).toEqual(true);
  expect(result.isRight()).toEqual(false);
});
