export default function createObjectFromKeys<T>(
  object: T,
  keysArray: (keyof T)[]
): Partial<T> {
  const result: Partial<T> = {};
  console.log({ object, keysArray });

  keysArray.forEach((key) => {
    console.log({ key, object: object[key] });
    if (key in object) {
      result[key] = object[key];
    }
  });

  return result;
}
