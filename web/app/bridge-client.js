'use client';

import { useEffect } from 'react';

async function recordEvent(type, name, appLink) {
  try {
    await fetch('/api/events', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        type,
        name,
        url: window.location.href,
        appLink,
      }),
    });
  } catch {
    // The bridge should still open the app if event logging is unavailable.
  }
}

export default function BridgeClient({ name, appLink }) {
  useEffect(() => {
    void recordEvent('nfc_web_open', name, appLink);

    const timer = window.setTimeout(() => {
      void recordEvent('auto_app_open', name, appLink);
      window.location.href = appLink;
    }, 350);

    return () => window.clearTimeout(timer);
  }, [appLink, name]);

  return (
    <div className="actions">
      <button
        className="button"
        type="button"
        onClick={() => {
          void recordEvent('manual_app_open', name, appLink);
          window.location.href = appLink;
        }}
      >
        앱 열기
      </button>
      <a className="button secondary" href="/api/reports">
        신고 내역 보기
      </a>
    </div>
  );
}
