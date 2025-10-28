export const aubergineNutriments = (poids) => {
  const glucide = Math.round((5.88 * poids) / 100);     // g
  const protide = Math.round((1.01 * poids) / 100);     // g
  const magnesium = Math.round((14 * poids) / 1000);    // mg → g/1000 pour cohérence
  const water = Math.round((92.3 * poids) / 100);       // g
  const others = Math.round((0.81 * poids) / 100);      // g

  return {
    glucide,
    protide,
    magnesium,
    water,
    others,
  };
}