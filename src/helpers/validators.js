/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */
import { propEq, allPass, anyPass } from "ramda";

const getFiguresByColor = (figures) => {
  let figuresByColor = {
    blue: 0,
    red: 0,
    green: 0,
    orange: 0,
    white: 0,
  };

  for (let figure in figures) {
    figuresByColor[figures[figure]]++;
  }

  return figuresByColor;
};

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = ({ star, square, triangle, circle }) => {
  if (triangle !== "white" || circle !== "white") {
    return false;
  }

  const validator = allPass([
    propEq("star", "red"),
    propEq("square", "green"),
    propEq("triangle", "white"),
    propEq("circle", "white"),
  ]);

  return validator({ star, square, triangle, circle });
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (figures) => {
  const { green } = getFiguresByColor(figures);

  return green >= 2;
};

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (figures) => {
  const { blue, red } = getFiguresByColor(figures);

  return blue === red;
};

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = (figures) => {
  const validator = allPass([
    propEq("circle", "blue"),
    propEq("star", "red"),
    propEq("square", "orange"),
  ]);

  return validator(figures);
};

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = (figures) => {
  const figuresByColor = getFiguresByColor(figures);

  for (let color in figuresByColor) {
    if (figuresByColor[color] >= 3 && color !== "white") {
      return true;
    }
  }

  return false;
};

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = (figures) => {
  const { green, red } = getFiguresByColor(figures);
  const validator = allPass([
    propEq("triangle", "green"),
    propEq("green", 2),
    propEq("red", 1),
  ]);

  return validator({ triangle: figures.triangle, green, red });
};

// 7. Все фигуры оранжевые.
export const validateFieldN7 = (figures) => {
  const validator = allPass([
    propEq("star", "orange"),
    propEq("triangle", "orange"),
    propEq("square", "orange"),
    propEq("circle", "orange"),
  ]);

  return validator(figures);
};

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = (figures) => {
  const validator = anyPass([propEq("star", "red"), propEq("star", "white")]);

  return !validator(figures);
};

// 9. Все фигуры зеленые.
export const validateFieldN9 = (figures) => {
  const validator = allPass([
    propEq("star", "green"),
    propEq("triangle", "green"),
    propEq("square", "green"),
    propEq("circle", "green"),
  ]);

  return validator(figures);
};

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = (figures) =>
  figures.triangle === figures.square;
