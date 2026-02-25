// Lightweight analytics for growth KPIs
// Tracks the funnel: visit → quiz_start → quiz_complete → share → referral_visit → premium_convert

export type AnalyticsEvent =
  | 'page_view'
  | 'quiz_start'
  | 'quiz_step_complete'
  | 'quiz_complete'
  | 'score_view'
  | 'share_click_linkedin'
  | 'share_click_twitter'
  | 'share_click_copy'
  | 'share_complete'
  | 'referral_visit'
  | 'waitlist_signup'
  | 'premium_cta_click'
  | 'premium_convert'
  | 'email_capture';

interface EventData {
  event: AnalyticsEvent;
  properties?: Record<string, string | number | boolean>;
  timestamp: number;
  sessionId: string;
  referralCode?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

let sessionId: string | null = null;

function getSessionId(): string {
  if (sessionId) return sessionId;
  if (typeof window === 'undefined') return 'server';

  const stored = sessionStorage.getItem('ss_session_id');
  if (stored) {
    sessionId = stored;
    return stored;
  }

  const id = `ss_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  sessionStorage.setItem('ss_session_id', id);
  sessionId = id;
  return id;
}

export function trackEvent(event: AnalyticsEvent, properties?: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);

  const eventData: EventData = {
    event,
    properties,
    timestamp: Date.now(),
    sessionId: getSessionId(),
    referralCode: params.get('ref') ?? undefined,
    utmSource: params.get('utm_source') ?? undefined,
    utmMedium: params.get('utm_medium') ?? undefined,
    utmCampaign: params.get('utm_campaign') ?? undefined,
  };

  // Store locally for now (replace with your analytics endpoint)
  const events: EventData[] = JSON.parse(localStorage.getItem('ss_events') || '[]');
  events.push(eventData);
  localStorage.setItem('ss_events', JSON.stringify(events));

  // Fire to analytics API (non-blocking)
  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData),
  }).catch(() => {
    // Silent fail — analytics should never block UX
  });

  // Console in dev
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', event, properties);
  }
}

// Growth KPI targets (for dashboard)
export const KPI_TARGETS = {
  quiz_start_rate: 0.60,         // 60% of visitors start quiz
  quiz_completion_rate: 0.80,    // 80% who start, finish
  share_rate: 0.35,              // 35% who see score, share it
  viral_coefficient: 1.5,        // each share brings 1.5 new users
  premium_conversion: 0.04,      // 4% free → premium
  waitlist_conversion: 0.25,     // 25% of pre-launch visitors join waitlist
};
