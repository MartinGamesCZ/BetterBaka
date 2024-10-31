import API, { getServerAddress } from "./_api";

export default async function user() {
  const server = await getServerAddress();
  const api = await API(server);

  return api.get("/api/3/user").catch((e) => ({
    data: e.response.data,
  }));
}
