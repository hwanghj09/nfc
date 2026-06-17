import BridgeClient from '../bridge-client';
import { buildAppLink, getNameFromRequest } from '../../lib/nfc-link';

export const dynamic = 'force-dynamic';

export default async function NfcBridgePage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const name = getNameFromRequest({
    slug: resolvedParams?.slug,
    searchParams: resolvedSearchParams,
  });
  const appLink = buildAppLink(name);

  return (
    <main className="screen">
      <section className="hero">
        <div className="visual" aria-hidden="true">
          <div className="visualMark" />
        </div>
        <div>
          <p className="eyebrow">NFC web bridge</p>
          <h1>{name}님 안녕하세요!</h1>
        </div>
        <p className="lead">
          앱이 설치되어 있으면 자동으로 앱을 열고, 설치되어 있지 않으면 이 웹 화면을 그대로 보여줍니다.
        </p>
      </section>

      <section className="panel">
        <p className="label">앱으로 열 링크</p>
        <p className="value">{appLink}</p>
      </section>

      <section className="panel">
        <p className="label">NFC에 넣을 URL 예시</p>
        <p className="value">https://nfc.zstrit.com/name={name}</p>
      </section>

      <BridgeClient name={name} appLink={appLink} />
    </main>
  );
}
