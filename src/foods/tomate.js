export const tomateNutriments = (poids) => {
  const glucide = Math.round((0.0389 * poids) * 100) / 100;
  const protide = Math.round((0.0088 * poids) * 100) / 100;
  const magnesium = Math.round((0.11 * poids) * 100) / 100;
  const eau = Math.round((0.945 * poids) * 100) / 100;
  const autres = Math.round((0.007 * poids) * 100) / 100;

  return { glucide, protide, magnesium, eau, autres };
};
