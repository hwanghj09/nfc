import * as Linking from 'expo-linking';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { DEFAULT_NAME, buildAppLink, buildWebNfcUrl, getNameFromUrl } from './src/nfcLink';

export default function App() {
  const [name, setName] = useState(DEFAULT_NAME);
  const [lastUrl, setLastUrl] = useState(null);

  const appLink = useMemo(() => buildAppLink(name), [name]);
  const webNfcUrl = useMemo(() => buildWebNfcUrl(name), [name]);

  const applyUrl = useCallback((url) => {
    setLastUrl(url);
    setName(getNameFromUrl(url));
  }, []);

  useEffect(() => {
    let mounted = true;

    Linking.getInitialURL().then((initialUrl) => {
      if (mounted && initialUrl) {
        applyUrl(initialUrl);
      }
    });

    const subscription = Linking.addEventListener('url', (event) => {
      applyUrl(event.url);
    });

    return () => {
      mounted = false;
      subscription.remove();
    };
  }, [applyUrl]);

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />

      <View style={styles.hero}>
        <Text style={styles.kicker}>NFC client app</Text>
        <Text style={styles.greeting}>{name}님 안녕하세요</Text>
        <Text style={styles.body}>
          NFC URL이 웹을 거쳐 앱 딥링크로 들어오면, 앱은 전달받은 이름을 화면에 표시합니다.
        </Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.label}>앱이 받은 링크</Text>
        <Text selectable style={styles.value}>
          {lastUrl ?? '아직 앱 딥링크를 받지 않았습니다.'}
        </Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.label}>NFC에 넣을 웹 URL 예시</Text>
        <Text selectable style={styles.value}>{webNfcUrl}</Text>
      </View>

      <Pressable style={styles.button} onPress={() => Linking.openURL(appLink)}>
        <Text style={styles.buttonText}>현재 값으로 앱 링크 테스트</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    gap: 16,
    justifyContent: 'center',
    padding: 22,
    backgroundColor: '#f5f7f6',
  },
  hero: {
    gap: 12,
    paddingBottom: 8,
  },
  kicker: {
    color: '#25635a',
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  greeting: {
    color: '#141716',
    fontSize: 36,
    fontWeight: '900',
    lineHeight: 44,
  },
  body: {
    color: '#4c5552',
    fontSize: 16,
    lineHeight: 24,
  },
  panel: {
    gap: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#d8dfdc',
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  label: {
    color: '#69736f',
    fontSize: 13,
    fontWeight: '800',
  },
  value: {
    color: '#183f39',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 22,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    borderRadius: 8,
    backgroundColor: '#1f6b5e',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '900',
  },
});
