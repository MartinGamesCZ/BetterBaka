import { View, YStack } from "tamagui";
import Constants from "expo-constants";

interface IAppContainerProps {
  children: React.ReactNode | React.ReactNode[];
  noSidePadding?: boolean;
}

export default function AppContainer({
  children,
  noSidePadding,
}: IAppContainerProps) {
  return (
    <YStack
      backgroundColor="$background"
      width={"100%"}
      height={"100%"}
      padding={noSidePadding ? 0 : 16}
      paddingTop={Constants.statusBarHeight}
      gap={16}
    >
      {children}
    </YStack>
  );
}
