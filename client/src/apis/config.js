export const API_BASE_URL = "http://blog-api.loc";
export const APP_BASE_URL = "http://localhost:3000";

export const getAxiosConfig = () => {
  const token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";

  return {
    headers: {
      // 'Content-Type' : 'application/json',
      // 'Accept' : 'application/json',
      Authorization: "Bearer " + token,
      // 'Cookie': 'XSRF-TOKEN=' + token
    },
  };
};
