const getManga = async () => {
    const URL = `${process.env.API_URL}/v1?limit=9`;
    const response = await fetch(URL, { cache: "no-cache" });
  
    return response.json();
  };
  
  export default getManga;
  