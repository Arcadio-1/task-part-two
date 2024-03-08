export const keywordsStringToKeywordsArray = (keywords: string) => {
  try {
    const keywordsArray = keywords.split(",").map((item) => item.trim());
    return keywordsArray;
  } catch (error) {
    console.log(error);
    return [];
  }
};
