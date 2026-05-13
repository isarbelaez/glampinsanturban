import ical from 'node-ical';

export interface CalendarEvent {
  start: Date;
  end: Date;
  summary: string;
}

export async function getCalendarEventsServer(url: string): Promise<CalendarEvent[]> {
  try {
    const cacheBuster = `t=${Date.now()}`;
    const fetchUrl = url.includes('?') ? `${url}&${cacheBuster}` : `${url}?${cacheBuster}`;
    const response = await fetch(fetchUrl);
    if (!response.ok) throw new Error(`Failed to fetch calendar: ${response.status}`);

    const text = await response.text();
    const data = ical.parseICS(text);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return Object.values(data)
      .filter((ev) => ev.type === 'VEVENT' && ev.start && ev.end)
      .map((ev) => ({
        start: new Date(ev.start as Date),
        end: new Date(ev.end as Date),
        summary:
          typeof ev.summary === 'string'
            ? ev.summary
            : (ev.summary as { val?: string })?.val || 'Reserva',
      }))
      .filter((ev) => ev.end > thirtyDaysAgo);
  } catch (error) {
    console.error('Error fetching calendar on server:', error);
    return [];
  }
}
