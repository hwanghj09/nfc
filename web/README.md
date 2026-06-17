# NFC Web - Next.js

NFC 태그에 넣을 주소:

```text
https://nfc.zstrit.com/api=hi
```

흐름:

1. NFC 태그가 `https://nfc.zstrit.com/api=hi`를 엽니다.
2. Next.js 페이지가 `hi`를 읽고 `nfcdemo://app?name=hi`를 엽니다.
3. 앱이 설치되어 있으면 Expo 앱이 열리고 `hi님 안녕하세요`가 표시됩니다.
4. 앱이 없으면 웹 화면에 `hi님 안녕하세요`가 표시됩니다.

## 서버 실행

```bash
npm install
npm run build
npm start
```

배포할 때는 `web` 디렉터리 전체를 서버로 가져가고, `web/nginx/nfc.zstrit.com.conf`처럼 nginx에서 Next.js 서버(`127.0.0.1:3000`)로 프록시하면 됩니다.
