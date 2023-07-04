export const API_BASE_URL = "http://blog-api.loc"
export const APP_BASE_URL = "http://localhost:3000"

export const getAxiosConfig = () => {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";

  return {
    headers: { Authorization: "Bearer " + token },
  };
};
