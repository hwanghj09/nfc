import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { defaultName, productionOrigin } from '@/lib/nfc-link';

const greeting = `\uC548\uB155\uD558\uC138\uC694 ${defaultName}\uB2D8`;

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>NFC demo</Text>
        <Text style={styles.title}>NFC URL to app</Text>
        <Text style={styles.subtitle}>
          Put this web URL on the NFC card. The web page opens the app when it is installed.
        </Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.label}>NFC card URL</Text>
        <Text selectable style={styles.url}>
          {productionOrigin}/api?name={defaultName}
        </Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.label}>Also supported</Text>
        <Text selectable style={styles.url}>
          {productionOrigin}/api?={defaultName}
        </Text>
      </View>

      <Text style={styles.note}>When the app receives the value, it shows: {greeting}</Text>
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
  note: {
    color: '#6a665f',
    fontSize: 16,
    lineHeight: 23,
  },
});
