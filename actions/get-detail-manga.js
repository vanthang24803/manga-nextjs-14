const getDetailManga = async (name) => {
  const URL = `${process.env.API_URL}/v1/truyen-tranh/${name}`;
  const response = await fetch(URL, { cache: "no-cache" });

  return response.json();
};

export default getDetailManga;
