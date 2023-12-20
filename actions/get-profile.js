const getProfile = async () => {
  const URL = `/api/profile`;
  const response = await fetch(URL, { cache: "no-cache" });

  return response.json();
};

export default getProfile;
