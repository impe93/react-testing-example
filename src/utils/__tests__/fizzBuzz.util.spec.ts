import { fizzBuzz } from "../fizzBuzz.util";

describe("Given fizzBuzz function", () => {
  describe("When the input number is multiple of 5", () => {
    it('Should return the string "Buzz"', () => {
      const fizzBuzzResult = fizzBuzz(20);
      expect(fizzBuzzResult).toBe("Buzz");
    });
  });

  describe("When the input number is multiple of 3", () => {
    it('Should return the string "Fizz"', () => {
      const fizzBuzzResult = fizzBuzz(21);
      expect(fizzBuzzResult).toBe("Fizz");
    });
  });

  describe("When the input number is multiple of 3 and 5", () => {
    it('Should return the string "FizzBuzz"', () => {
      const fizzBuzzResult = fizzBuzz(45);
      expect(fizzBuzzResult).toBe("FizzBuzz");
    });
  });

  describe("When the input number is not a multiple of 3 and 5", () => {
    it('Should return the string "Unkown"', () => {
      const fizzBuzzResult = fizzBuzz(47);
      expect(fizzBuzzResult).toBe("Unkown");
    });
  });
});
