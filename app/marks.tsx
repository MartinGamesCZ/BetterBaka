import marks from "@/api/marks";
import AppContainer from "@/components/AppContainer/AppContainer";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { ScrollView, Spinner, Text, View, XStack, YStack } from "tamagui";

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
        <View alignItems="center" justifyContent="center" height={"100%"}>
          <Spinner size="large" color="green" />
        </View>
      </AppContainer>
    );
  if ("error" in marks_data || "Message" in marks_data)
    return (
      <AppContainer>
        <Text>Error</Text>
      </AppContainer>
    );

  const grouped_marks = marks_data.Subjects.map((s: any) =>
    s.Marks.map((m: any) => ({
      ...m,
      Subject: s.Subject,
    }))
  )
    .flat()
    .reduce((acc: any, mark: any) => {
      const date = new Date(mark.MarkDate).toISOString().split("T")[0];

      if (!acc[date]) acc[date] = [];

      acc[date].push(mark);

      return acc;
    }, {});

  return (
    <AppContainer noSidePadding>
      <Text fontSize="$5" paddingLeft={16}>
        Známky
      </Text>
      <ScrollView paddingLeft={16}>
        {/*<Text paddingBottom={16}>
          Slovní shrnutí známek / nejnovější známky
        </Text>*/}
        <YStack gap={32} paddingBottom={16}>
          {Object.entries(grouped_marks)
            .sort(
              ([a]: [string, any], [b]: [string, any]) =>
                DateTime.fromFormat(b, "yyyy-MM-dd").toMillis() -
                DateTime.fromFormat(a, "yyyy-MM-dd").toMillis()
            )
            .map(([date, marks]: [string, any], i: number) => (
              <YStack gap={16} key={i}>
                <XStack
                  gap={16}
                  alignItems="center"
                  justifyContent="center"
                  width={Dimensions.get("screen").width - 2 * 16}
                >
                  <View
                    flexGrow={1}
                    height={1}
                    backgroundColor="$borderColor"
                  />
                  <Text textAlign="center" opacity={0.8}>
                    {DateTime.fromFormat(date, "yyyy-MM-dd").toFormat(
                      "dd. MM. yyyy"
                    )}
                  </Text>
                  <View
                    flexGrow={1}
                    height={1}
                    backgroundColor="$borderColor"
                  />
                </XStack>
                {marks
                  .sort(
                    (a: any, b: any) =>
                      DateTime.fromISO(b.MarkDate).toMillis() -
                      DateTime.fromISO(a.MarkDate).toMillis()
                  )
                  .map((mark: any, n: number) => (
                    <View key={n} width="100%" overflow="scroll">
                      <XStack gap={16} width="100%" alignItems="center">
                        <Text fontSize="$6" fontWeight="bold" width={40}>
                          {mark.MarkText}
                        </Text>
                        <YStack
                          width={
                            Dimensions.get("screen").width - 2 * 16 - 16 - 40
                          }
                        >
                          <XStack justifyContent="space-between">
                            <Text fontSize={11}>{mark.Subject?.Name}</Text>
                            <Text fontSize={11}>
                              Váha {mark.Weight.toString()}
                            </Text>
                          </XStack>
                          <Text width="100%">{mark.Caption}</Text>
                        </YStack>
                      </XStack>
                    </View>
                  ))}
              </YStack>
            ))}
        </YStack>
      </ScrollView>
    </AppContainer>
  );
}
