import API from "./_api";

export default async function login(
  server: string,
  username: string,
  password: string
) {
  const api = await API(server, true);

  return api
    .post(`/api/login`, {
      client_id: "ANDR",
      grant_type: "password",
      username,
      password,
    })
    .catch((e) => ({
      data: e.response.data,
    }));
}
