import { createNavigationContainerRef, StackActions } from "@react-navigation/native";
import { RootAuthStackParamList, RootMainStackParamList } from "../types";

// Create navigation reference with typed RootMainStackParamList
export const navigationRef = createNavigationContainerRef<(RootAuthStackParamList & RootMainStackParamList)>();

// Navigate function with correct typing and format
export function navigate<RouteName extends keyof (RootAuthStackParamList & RootMainStackParamList)>( // (RootMainStackParamList & SettingsStackProps)>
  name: RouteName,
  // params?: (RootMainStackParamList & SettingsStackProps)[RouteName]
  params?: (RootAuthStackParamList & RootMainStackParamList)[RouteName],
) {
  if (navigationRef.isReady()) {
    // Remove `{ params }` wrapper to match `navigate` method requirements
    navigationRef.navigate(name as any, params);
  }
}

// Replace function with correct typing and format
export function replace<RouteName extends keyof (RootAuthStackParamList & RootMainStackParamList)>(
  name: RouteName,
  params?: (RootAuthStackParamList & RootMainStackParamList)[RouteName],
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name as any, {params})); // Adjust format
  }
}

// Go back function
export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}

// Reset navigation stack
export function reset(index: number, name: keyof (RootAuthStackParamList & RootMainStackParamList)) {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: index,
      routes: [{name: name as any}], // Use 'as any' if there's a type mismatch
    });
  }
}

// Pop function for going back N screens
export function canGoBack(num: number) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.pop(num));
  }
}
