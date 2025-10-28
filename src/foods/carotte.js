export const carotteNutriments = (poids) => {
  const glucide = Math.round((0.0958 * poids) * 100) / 100;
  const protide = Math.round((0.0093 * poids) * 100) / 100;
  const magnesium = Math.round((0.12 * poids) * 100) / 100;
  const eau = Math.round((0.883 * poids) * 100) / 100;
  const autres = Math.round((0.009 * poids) * 100) / 100;

  return { glucide, protide, magnesium, eau, autres };
};
