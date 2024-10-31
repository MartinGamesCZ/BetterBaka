import { Stack } from "expo-router";
import { createTamagui, createTokens, TamaguiProvider, Theme } from "tamagui";
import defaultConfig from "@tamagui/config/v3";
import * as themes from "../themes/main";
import { StatusBar } from "react-native";

const tokens = createTokens({
  ...defaultConfig.tokens,
  color: {
    btn_marks_dark: "#52c24745",
    btn_komens_dark: "#476ac245",
    btn_absence_dark: "#8547c245",
    btn_timetable_dark: "#c27a4745",
    btn_substitution_dark: "#c2474745",
    btn_subjects_dark: "#c3bd4645",
    btn_lessons_dark: "#46c39545",
    btn_homework_dark: "#c047c245",
    btn_gdpr_dark: "#5247c245",
    btn_infochannel_dark: "#c2644745",
    btn_payments_dark: "#c2b64745",
    btn_documents_dark: "#52c24745",
    white: "#ffffff",
  },
});

const config = createTamagui({
  ...defaultConfig,
  themes: {
    ...themes,
    btn_marks: {
      background: tokens.color.btn_marks_dark,
      color: tokens.color.white,
    },
    btn_komens: {
      background: tokens.color.btn_komens_dark,
      color: tokens.color.white,
    },
    btn_absence: {
      background: tokens.color.btn_absence_dark,
      color: tokens.color.white,
    },
    btn_timetable: {
      background: tokens.color.btn_timetable_dark,
      color: tokens.color.white,
    },
    btn_substitution: {
      background: tokens.color.btn_substitution_dark,
      color: tokens.color.white,
    },
    btn_subjects: {
      background: tokens.color.btn_subjects_dark,
      color: tokens.color.white,
    },
    btn_lessons: {
      background: tokens.color.btn_lessons_dark,
      color: tokens.color.white,
    },
    btn_homework: {
      background: tokens.color.btn_homework_dark,
      color: tokens.color.white,
    },
    btn_gdpr: {
      background: tokens.color.btn_gdpr_dark,
      color: tokens.color.white,
    },
    btn_infochannel: {
      background: tokens.color.btn_infochannel_dark,
      color: tokens.color.white,
    },
    btn_payments: {
      background: tokens.color.btn_payments_dark,
      color: tokens.color.white,
    },
    btn_documents: {
      background: tokens.color.btn_documents_dark,
      color: tokens.color.white,
    },
  },
});

export default function RootLayout() {
  return (
    <TamaguiProvider config={config}>
      <StatusBar barStyle="light-content" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
      </Stack>
    </TamaguiProvider>
  );
}
