import * as Linking from 'expo-linking';
import { useEffect, useMemo, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { buildAppLink, defaultName, getNameFromSearch } from '@/lib/nfc-link';

function getNameFromBrowserUrl() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return defaultName;
  }

  return getNameFromSearch(window.location.search);
}

export default function ApiBridgeScreen() {
  const [name] = useState(() => getNameFromBrowserUrl());
  const appLink = useMemo(() => buildAppLink(name), [name]);

  async function openApp() {
    await Linking.openURL(appLink);
  }

  useEffect(() => {
    if (Platform.OS === 'web') {
      const timer = window.setTimeout(() => {
        void Linking.openURL(appLink);
      }, 400);

      return () => window.clearTimeout(timer);
    }

    void Linking.openURL(appLink);
  }, [appLink]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Web bridge</Text>
        <Text style={styles.title}>앱으로 이동 중...</Text>
        <Text style={styles.subtitle}>
          앱이 설치되어 있으면 곧 앱에서 안녕하세요 {name}님 화면이 열립니다.
        </Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.label}>Opening</Text>
        <Text selectable style={styles.url}>
          {appLink}
        </Text>
      </View>

      <Pressable style={styles.button} onPress={openApp}>
        <Text style={styles.buttonText}>앱 열기</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 18,
    padding: 24,
    backgroundColor: '#f7f4ee',
  },
  header: {
    gap: 10,
    paddingTop: 28,
    paddingBottom: 10,
  },
  eyebrow: {
    color: '#186a5b',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  title: {
    color: '#171717',
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 38,
  },
  subtitle: {
    color: '#53514b',
    fontSize: 16,
    lineHeight: 23,
  },
  panel: {
    gap: 10,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderColor: '#ded7ca',
    borderWidth: 1,
  },
  label: {
    color: '#777065',
    fontSize: 13,
    fontWeight: '700',
  },
  url: {
    color: '#0f4f45',
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 24,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    borderRadius: 8,
    backgroundColor: '#186a5b',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
});
