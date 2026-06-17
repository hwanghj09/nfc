# NFC Launch Test

Production domain:

```text
https://nfc.zstrit.com
```

NFC card URL:

```text
https://nfc.zstrit.com/api?name=테스트
```

This shorthand also works:

```text
https://nfc.zstrit.com/api?=테스트
```

Flow:

```text
NFC card -> https://nfc.zstrit.com/api?name=테스트 -> nfcdemo://app?name=테스트 -> 안녕하세요 테스트님
```

## Build Web

```bash
npm install
npx expo export -p web
```

Upload the generated `dist` directory contents to:

```text
/var/www/nfc.zstrit.com
```

## Nginx

Use the config in:

```text
deploy/nginx/nfc.zstrit.com.conf
```

## Checks

```bash
npm run lint
npx tsc --noEmit
```
