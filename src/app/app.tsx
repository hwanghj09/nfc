import * as Linking from 'expo-linking';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { defaultName, getNameFromUrl } from '@/lib/nfc-link';

export default function AppGreetingScreen() {
  const [name, setName] = useState(defaultName);
  const [lastUrl, setLastUrl] = useState<string | null>(null);

  useEffect(() => {
    Linking.getInitialURL().then((initialUrl) => {
      if (initialUrl) {
        setLastUrl(initialUrl);
        setName(getNameFromUrl(initialUrl));
      }
    });

    const subscription = Linking.addEventListener('url', (event) => {
      setLastUrl(event.url);
      setName(getNameFromUrl(event.url));
    });

    return () => subscription.remove();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>App opened</Text>
        <Text style={styles.greeting}>안녕하세요 {name}님</Text>
        <Text style={styles.message}>NFC URL에서 받은 값을 앱 화면에 표시했습니다.</Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.label}>Received deep link</Text>
        <Text selectable style={styles.url}>
          {lastUrl ?? 'Waiting for nfcdemo://app?name=...'}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 18,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#eef6f4',
  },
  card: {
    gap: 12,
    padding: 22,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderColor: '#cbdad6',
    borderWidth: 1,
  },
  eyebrow: {
    color: '#195b6a',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  greeting: {
    color: '#171717',
    fontSize: 34,
    fontWeight: '800',
    lineHeight: 42,
  },
  message: {
    color: '#4d5654',
    fontSize: 16,
    lineHeight: 23,
  },
  panel: {
    gap: 10,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderColor: '#cbdad6',
    borderWidth: 1,
  },
  label: {
    color: '#6b7471',
    fontSize: 13,
    fontWeight: '700',
  },
  url: {
    color: '#0c5160',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 22,
  },
});
