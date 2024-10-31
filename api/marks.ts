import API, { getServerAddress } from "./_api";

export default async function marks(force_refresh = false) {
  const api = await API(await getServerAddress(), false, force_refresh);

  return api.get("/api/3/marks").catch((e) => ({
    data: e.response.data,
  }));
}
