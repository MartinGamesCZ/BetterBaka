import marks from "@/api/marks";
import AppContainer from "@/components/AppContainer/AppContainer";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { ScrollView, Text, View, XStack, YStack } from "tamagui";

export default function Page() {
  const [marks_data, setMarksData] = useState<any>(null);

  useEffect(() => {
    marks().then((data) => {
      setMarksData(data.data);

      if ("error" in data || "Message" in data)
        marks(true).then((data) => setMarksData(data.data));
    });
  }, []);

  if (marks_data === null)
    return (
      <AppContainer>
        <Text>Loading...</Text>
      </AppContainer>
    );
  if ("error" in marks_data || "Message" in marks_data)
    return (
      <AppContainer>
        <Text>Error</Text>
      </AppContainer>
    );

  const all_marks = marks_data.Subjects.map((s: any) =>
    s.Marks.map((m: any) => ({
      ...m,
      Subject: s.Subject,
    }))
  )
    .flat()
    .sort(
      (a: any, b: any) =>
        new Date(b.MarkDate).getTime() - new Date(a.MarkDate).getTime()
    );

  return (
    <AppContainer noSidePadding>
      <Text fontSize="$5" paddingLeft={16}>
        Známky
      </Text>
      <ScrollView paddingLeft={16}>
        <YStack gap={16} paddingBottom={16}>
          {all_marks.map((subject: any, i: number) => (
            <View key={i} width="100%" overflow="scroll">
              <XStack gap={16} width="100%" alignItems="center">
                <Text fontSize="$6" fontWeight="bold" width={40}>
                  {subject.MarkText}
                </Text>
                <YStack
                  width={Dimensions.get("screen").width - 2 * 16 - 16 - 40}
                >
                  <XStack justifyContent="space-between">
                    <Text fontSize={11}>{subject.Subject.Name}</Text>
                    <Text>
                      {DateTime.fromISO(subject.MarkDate)
                        .setLocale("cs")
                        .toFormat("dd. MM. yyyy")}
                    </Text>
                  </XStack>
                  <Text width="100%">{subject.Caption}</Text>
                </YStack>
              </XStack>
            </View>
          ))}
        </YStack>
      </ScrollView>
    </AppContainer>
  );
}
