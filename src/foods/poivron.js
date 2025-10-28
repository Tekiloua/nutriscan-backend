export const poivronNutriments = (poids) => {
  const glucide = Math.round((0.0603 * poids) * 100) / 100;
  const protide = Math.round((0.0099 * poids) * 100) / 100;
  const magnesium = Math.round((0.12 * poids) * 100) / 100;
  const eau = Math.round((0.922 * poids) * 100) / 100;
  const autres = Math.round((0.0078 * poids) * 100) / 100;

  return { glucide, protide, magnesium, eau, autres };
};
