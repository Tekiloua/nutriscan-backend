export const betteraveNutriments = (poids) => {
  const glucide = Math.round((0.0956 * poids) * 100) / 100;
  const protide = Math.round((0.0161 * poids) * 100) / 100;
  const magnesium = Math.round((0.23 * poids) * 100) / 100;
  const eau = Math.round((0.876 * poids) * 100) / 100;
  const autres = Math.round((0.0125 * poids) * 100) / 100;

  return { glucide, protide, magnesium, eau, autres };
};
