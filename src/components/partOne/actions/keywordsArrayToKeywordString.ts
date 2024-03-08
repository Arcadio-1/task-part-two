export const keywordsArrayToKeywordString = (keywords: string[]) => {
  try {
    const stringKeywords = keywords.join(",");
    return stringKeywords;
  } catch (error) {
    console.log(error);
    return "";
  }
};
