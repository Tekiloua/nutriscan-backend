export const courgetteNutriments = (poids) => {
  const glucide = Math.round((0.0311 * poids) * 100) / 100;
  const protide = Math.round((0.0121 * poids) * 100) / 100;
  const magnesium = Math.round((0.18 * poids) * 100) / 100;
  const eau = Math.round((0.948 * poids) * 100) / 100;
  const autres = Math.round((0.0088 * poids) * 100) / 100;

  return { glucide, protide, magnesium, eau, autres };
};
