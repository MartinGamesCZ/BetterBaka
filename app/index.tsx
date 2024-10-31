import AppContainer from "@/components/AppContainer/AppContainer";
import { Dimensions, StatusBar } from "react-native";
import { Button, Spinner, Text, Theme, View, XStack, YStack } from "tamagui";
import Constants from "expo-constants";
import IconNumber1 from "tabler-icons-react-native/icons-js/IconNumber1";
import IconMessage from "tabler-icons-react-native/icons-js/IconMessage";
import IconMoodSick from "tabler-icons-react-native/icons-js/IconMoodSick";
import IconTable from "tabler-icons-react-native/icons-js/IconTable";
import IconUser from "tabler-icons-react-native/icons-js/IconUser";
import IconUsers from "tabler-icons-react-native/icons-js/IconUsers";
import IconMath from "tabler-icons-react-native/icons-js/IconMath";
import IconBook from "tabler-icons-react-native/icons-js/IconBook";
import IconHome from "tabler-icons-react-native/icons-js/IconHome";
import IconSectionSign from "tabler-icons-react-native/icons-js/IconSectionSign";
import IconBell from "tabler-icons-react-native/icons-js/IconBell";
import IconCoins from "tabler-icons-react-native/icons-js/IconCoins";
import IconFiles from "tabler-icons-react-native/icons-js/IconFiles";
import { Link, Redirect, router } from "expo-router";
import { Suspense, useEffect, useState } from "react";
import user from "@/api/user";

const numberOfButtons = 3;
const buttonSpacing = 16;

export default function Index() {
  const btn_width =
    (Dimensions.get("screen").width -
      16 * 2 -
      buttonSpacing * (numberOfButtons - 1)) /
    numberOfButtons;

  const [user_data, setUserData] = useState<any>(null);

  useEffect(() => {
    user().then((res) => setUserData(res.data));
  }, []);

  if (user_data === null)
    return (
      <AppContainer>
        <View alignItems="center" justifyContent="center" height={"100%"}>
          <Spinner size="large" color="green" />
        </View>
      </AppContainer>
    );
  if ("error" in user_data || "Message" in user_data)
    return <Redirect href="/login" />;

  return (
    <AppContainer>
      <Text fontSize="$6">BetterBaka</Text>
      <XStack
        gap={16}
        justifyContent="center"
        alignContent="center"
        paddingTop={25}
        paddingBottom={25}
      >
        <IconUser size={25} stroke={1} color={"#ffffff"} />
        <Text fontSize={"$4"}>{user_data.FullName}</Text>
      </XStack>
      <XStack gap={16}>
        <Theme name="btn_marks">
          <Button
            width={btn_width}
            height={btn_width}
            onPress={() => router.push("/marks")}
            opacity={0.8}
          >
            <YStack justifyContent="center" alignItems="center" gap={8}>
              <IconNumber1 color={"#fff"} size={40} stroke={1} />
              <Text fontSize={11}>Známky</Text>
            </YStack>
          </Button>
        </Theme>
        <Theme name="btn_komens">
          <Button width={btn_width} height={btn_width}>
            <YStack justifyContent="center" alignItems="center" gap={8}>
              <IconMessage color={"#fff"} size={40} stroke={1} />
              <Text fontSize={11}>Komens</Text>
            </YStack>
          </Button>
        </Theme>
        <Theme name="btn_timetable">
          <Button width={btn_width} height={btn_width}>
            <YStack justifyContent="center" alignItems="center" gap={8}>
              <IconTable color={"#fff"} size={40} stroke={1} />
              <Text fontSize={11}>Rozvrh</Text>
            </YStack>
          </Button>
        </Theme>
      </XStack>
      <XStack gap={16}>
        <Theme name="btn_absence">
          <Button width={btn_width} height={btn_width}>
            <YStack justifyContent="center" alignItems="center" gap={8}>
              <IconMoodSick color={"#fff"} size={40} stroke={1} />
              <Text fontSize={11}>Absence</Text>
            </YStack>
          </Button>
        </Theme>
        <Theme name="btn_substitution">
          <Button width={btn_width} height={btn_width}>
            <YStack justifyContent="center" alignItems="center" gap={8}>
              <IconUsers color={"#fff"} size={40} stroke={1} />
              <Text fontSize={11}>Suplování</Text>
            </YStack>
          </Button>
        </Theme>
        <Theme name="btn_subjects">
          <Button width={btn_width} height={btn_width}>
            <YStack justifyContent="center" alignItems="center" gap={8}>
              <IconMath color={"#fff"} size={40} stroke={1} />
              <Text fontSize={11}>Předměty</Text>
            </YStack>
          </Button>
        </Theme>
      </XStack>
      <XStack gap={16}>
        <Theme name="btn_lessons">
          <Button width={btn_width} height={btn_width}>
            <YStack justifyContent="center" alignItems="center" gap={8}>
              <IconBook color={"#fff"} size={40} stroke={1} />
              <Text fontSize={11}>Výuka</Text>
            </YStack>
          </Button>
        </Theme>
        <Theme name="btn_homework">
          <Button width={btn_width} height={btn_width}>
            <YStack justifyContent="center" alignItems="center" gap={8}>
              <IconHome color={"#fff"} size={40} stroke={1} />
              <Text fontSize={11}>Domácí úkoly</Text>
            </YStack>
          </Button>
        </Theme>
        <Theme name="btn_gdpr">
          <Button width={btn_width} height={btn_width}>
            <YStack justifyContent="center" alignItems="center" gap={8}>
              <IconSectionSign color={"#fff"} size={40} stroke={1} />
              <Text fontSize={11}>GDPR</Text>
            </YStack>
          </Button>
        </Theme>
      </XStack>
      <XStack gap={16}>
        <Theme name="btn_payments">
          <Button width={btn_width} height={btn_width}>
            <YStack justifyContent="center" alignItems="center" gap={8}>
              <IconCoins color={"#fff"} size={40} stroke={1} />
              <Text fontSize={11}>Platby</Text>
            </YStack>
          </Button>
        </Theme>
        <Theme name="btn_documents">
          <Button width={btn_width} height={btn_width}>
            <YStack justifyContent="center" alignItems="center" gap={8}>
              <IconFiles color={"#fff"} size={40} stroke={1} />
              <Text fontSize={11}>Dokumenty</Text>
            </YStack>
          </Button>
        </Theme>
        <Theme name="btn_infochannel">
          <Button width={btn_width} height={btn_width}>
            <YStack justifyContent="center" alignItems="center" gap={8}>
              <IconBell color={"#fff"} size={40} stroke={1} />
              <Text fontSize={11}>Infokanál</Text>
            </YStack>
          </Button>
        </Theme>
      </XStack>
    </AppContainer>
  );
}
