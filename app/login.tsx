import login from "@/api/login";
import AppContainer from "@/components/AppContainer/AppContainer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useState } from "react";
import { Button, Input, Text, YStack } from "tamagui";
import * as SecureStore from "expo-secure-store";
import user from "@/api/user";
import { router } from "expo-router";

export default function Page() {
  const [server, setServer] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = useCallback(async () => {
    const { data } = await login(server, username, password);

    await AsyncStorage.setItem("server", server);
    await AsyncStorage.setItem("issued", Date.now().toString());
    await AsyncStorage.setItem("expires", data.expires_in.toString());
    await AsyncStorage.setItem("refresh_token", data.refresh_token);
    await AsyncStorage.setItem("access_token", data.access_token);

    const { data: user_data } = await user();

    if ("error" in user_data || "Message" in user_data) return; // TODO: handle error

    router.replace("/");
  }, [server, username, password]);

  return (
    <AppContainer>
      <YStack
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="100%"
        gap={8}
      >
        <Text fontSize="$8" marginBottom="$5" textAlign="center">
          BetterBaka
        </Text>
        <Input
          placeholder="Adresa školního serveru"
          width={"100%"}
          value={server}
          onChangeText={(t) => setServer(t)}
        />
        <Input
          placeholder="Uživatelské jméno"
          width={"100%"}
          value={username}
          onChangeText={(t) => setUsername(t)}
        />
        <Input
          placeholder="Heslo"
          secureTextEntry
          width={"100%"}
          value={password}
          onChangeText={(t) => setPassword(t)}
        />
        <Button width="100%" onPress={handleSubmit}>
          Pokračovat
        </Button>
      </YStack>
    </AppContainer>
  );
}
