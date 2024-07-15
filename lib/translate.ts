"use server";

export const TranslateTest = async (word: string) => {
  const url = "https://text-translator2.p.rapidapi.com/translate";
  const data = new FormData();
  data.append("source_language", "en");
  data.append("target_language", "iw");
  data.append("text", word);

  const apiKey = process.env.RAPIDAPI_KEY;
  const apiHost = process.env.RAPIDAPI_HOST;

  if (!apiKey || !apiHost) {
    console.error(
      "API key or host is undefined. Please check your environment variables."
    );
    return "Translation configuration error.";
  }

  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": apiKey, // Directly using the variable ensured to be defined
      "x-rapidapi-host": apiHost,
    },
    body: data,
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result.data.translatedText;
  } catch (error) {
    console.error(error);
  }
};
