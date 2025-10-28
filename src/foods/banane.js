export const bananeNutriments = (poids) => {
    const glucide = Math.round((22.84 * poids) / 100);
    const magnesium = Math.round((27 * poids) / 1000);
    const protide = Math.round((1.09 * poids) / 100);
    const water = Math.round((73.91 * poids) / 100);
    const others = Math.round((1.2 * poids) / 100);
  
    return {
      glucide,
      protide,
      magnesium,
      water,
      others,
    };
}