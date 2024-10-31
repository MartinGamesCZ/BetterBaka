import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SecureStore from "expo-secure-store";

export default async function API(
  url: string,
  withoutAuth = false,
  forceRefresh = false
) {
  return axios.create({
    baseURL: url,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: withoutAuth
        ? ""
        : `Bearer ${await authenticate(forceRefresh)}`,
    },
  });
}

export async function refreshToken(server: string, refreshToken: string) {
  const api = await API(server, true);

  return api
    .post(`/api/login`, {
      client_id: "ANDR",
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    })
    .catch((e) => ({
      data: e.response.data,
    }));
}

export async function getServerAddress() {
  return (await AsyncStorage.getItem("server")) ?? "";
}

export async function authenticate(forceRefresh = false) {
  const issued = parseInt((await AsyncStorage.getItem("issued")) || "0");
  const expires = parseInt((await AsyncStorage.getItem("expires")) || "0");

  const server = await getServerAddress();

  const refresh_token = (await AsyncStorage.getItem("refresh_token")) ?? "";

  if (Date.now() > issued + expires || forceRefresh) {
    const { data } = await refreshToken(server, refresh_token);

    if ("error" in data) {
      return false;
    }

    await AsyncStorage.setItem("access_token", data.access_token);
    await AsyncStorage.setItem("refresh_token", data.refresh_token);
    await AsyncStorage.setItem("expires", data.expires_in.toString());
    await AsyncStorage.setItem("issued", Date.now().toString());
  }

  const access_token = (await AsyncStorage.getItem("access_token")) ?? "";

  return access_token;
}
