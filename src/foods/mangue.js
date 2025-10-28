export const mangueNutriments = (poids) => {
  const glucide = Math.round((0.1498 * poids) * 100) / 100;
  const protide = Math.round((0.0082 * poids) * 100) / 100;
  const magnesium = Math.round((0.10 * poids) * 100) / 100;
  const eau = Math.round((0.835 * poids) * 100) / 100;
  const autres = Math.round((0.007 * poids) * 100) / 100;

  return { glucide, protide, magnesium, eau, autres };
};
