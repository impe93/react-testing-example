export type FizzBuzzReturnType = "Fizz" | "Buzz" | "FizzBuzz" | "Unkown";

export const fizzBuzz = (number: number): FizzBuzzReturnType => {
  if (number % 15 === 0) {
    return "FizzBuzz";
  } else if (number % 3 === 0) {
    return "Fizz";
  } else if (number % 5 === 0) {
    return "Buzz";
  } else {
    return "Unkown";
  }
};
