/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import { allPass } from "ramda";
import Api from "../tools/api";

const api = new Api();

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
  try {
    writeLog(value);

    const validator = allPass([
      (value) => value.length < 10,
      (value) => value.length > 2,
      (value) => Number(value) > 0,
      (value) => /[+-]?([0-9]*[.])?[0-9]+/.test(value),
    ]);

    if (!validator(value)) {
      return handleError("ValidationError");
    }

    const normalizedValue = Math.round(Number(value));

    api
      .get("https://api.tech/numbers/base", {
        from: 10,
        to: 2,
        number: normalizedValue,
      })
      .then(({ result: binaryNumber }) => {
        writeLog(binaryNumber.length);
        writeLog(binaryNumber.length * binaryNumber.length);
        writeLog(binaryNumber.length % 3);

        api
          .get(`https://animals.tech/${binaryNumber.length % 3}`)({})
          .then(({ result }) => {
            handleSuccess(result);
          });
      });
  } catch (err) {
    console.log({ err });
    handleError(err);
  }
};

export default processSequence;
