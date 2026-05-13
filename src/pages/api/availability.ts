import type { APIRoute } from 'astro';
import ical from 'node-ical';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const targetUrl = url.searchParams.get('url');

  if (!targetUrl) {
    return new Response(JSON.stringify({ error: 'URL is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Add timestamp to prevent caching from Google's side
    const cacheBuster = `t=${Date.now()}`;
    const fetchUrl = targetUrl.includes('?')
      ? `${targetUrl}&${cacheBuster}`
      : `${targetUrl}?${cacheBuster}`;

    const response = await fetch(fetchUrl);
    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: `External calendar returned ${response.status}` }),
        {
          status: 502,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const text = await response.text();
    const data = ical.parseICS(text);
    const events = Object.values(data)
      .filter((ev) => ev.type === 'VEVENT' && ev.start && ev.end)
      .map((ev) => {
        // If it's an all-day event, node-ical parses it as UTC.
        // We want to preserve the date without timezone shifts.
        const start = ev.start as Date;
        const end = ev.end as Date;

        return {
          start: start.toISOString(),
          end: end.toISOString(),
          summary:
            typeof ev.summary === 'string'
              ? ev.summary
              : (ev.summary as { val?: string })?.val || 'Reserva',
        };
      });

    // Filter events to only include future ones (up to 30 days ago to catch ongoing stays)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const filteredEvents = events.filter((ev) => new Date(ev.end) > thirtyDaysAgo);

    return new Response(JSON.stringify(filteredEvents), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
  } catch (error) {
    console.error('Error fetching calendar:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch calendar' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
