export interface CalendarEvent {
  start: Date;
  end: Date;
  summary: string;
}

/**
 * Fetches calendar events via our server-side API proxy
 */
export async function fetchAndParseCalendar(url: string): Promise<CalendarEvent[]> {
  try {
    const response = await fetch(
      `/api/availability?url=${encodeURIComponent(url)}&t=${Date.now()}`
    );
    if (!response.ok) throw new Error(`Failed to fetch calendar: ${response.statusText}`);

    const data = await response.json();

    // Convert date strings back to Date objects
    return data.map((ev: { start: string; end: string; summary: string }) => ({
      ...ev,
      start: new Date(ev.start),
      end: new Date(ev.end),
    }));
  } catch (error) {
    console.error('Error parsing calendar:', error);
    return [];
  }
}

/**
 * Checks if a given date is within any of the booked events
 */
export function isDateBooked(date: Date, bookedEvents: CalendarEvent[]): boolean {
  // Normalize checking date to UTC midnight for consistent comparison
  const checkTime = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());

  return bookedEvents.some((event) => {
    const start = new Date(event.start);

    // If it's a multi-day event or all-day event from Google,
    // we want to block every day from start (inclusive) to end (exclusive).
    // Normalize start to UTC midnight of its day.
    const startTime = Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate());
    const finalEndTime = Date.UTC(
      new Date(event.end).getUTCFullYear(),
      new Date(event.end).getUTCMonth(),
      new Date(event.end).getUTCDate()
    );

    return checkTime >= startTime && checkTime < finalEndTime;
  });
}

/**
 * Checks if a selected range overlaps with any booked events
 */
export function hasOverlap(from: Date, to: Date, bookedEvents: CalendarEvent[]): boolean {
  const fromTime = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate());
  const toTime = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate());

  return bookedEvents.some((event) => {
    const start = new Date(event.start);
    const end = new Date(event.end);

    const startTime = Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate());
    const endTime = Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate());

    // standard overlap: (start1 < end2) && (end1 > start2)
    return fromTime < endTime && toTime > startTime;
  });
}
