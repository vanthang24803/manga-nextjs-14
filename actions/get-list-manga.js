const getManga = async (page = 1) => {
    const URL = `${process.env.API_URL}/v1?page=${page}`;
    const response = await fetch(URL, { cache: "no-cache" });
  
    return response.json();
  };
  
  export default getManga;
  