export const pommeDeTerreNutriments = (poids) => {
    const glucide = Math.round((17.49 * poids) / 100);
    const magnesium = Math.round((23 * poids) / 1000);
    const water = Math.round((79.25 * poids) / 100);
    const protide = Math.round((1.09 * poids) / 100);
    const others = Math.round(
      poids - (glucide + magnesium + water)
    );
  
    return {
      glucide,
      protide,
      magnesium,
      water,
      others,
    };
}