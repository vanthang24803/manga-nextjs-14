const getChapter = async (name, chapter, id) => {
  const URL = `${process.env.API_URL}/v1/truyen-tranh/${name}/${chapter}/${id}`;
  const response = await fetch(URL, { cache: "no-cache" });

  return response.json();
};

export default getChapter;
