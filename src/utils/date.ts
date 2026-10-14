import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const DATE = 'YYYY-MM-DD';
const DATE_TIME = 'YYYY-MM-DDTHH:mm';

export const pad = (n: number): string => String(n).padStart(2, '0');

export const toISODate = (date: Date): string => dayjs(date).format(DATE);
export const fromISODate = (iso: string): Date => dayjs(iso, DATE).toDate();
export const todayISO = (): string => dayjs().format(DATE);
export const addDaysISO = (iso: string, days: number): string => dayjs(iso, DATE).add(days, 'day').format(DATE);

export const formatShortDate = (iso: string): string => dayjs(iso, DATE).format('D MMM');
export const formatLongDate = (isoDateTime: string): string => dayjs(isoDateTime).format('ddd, D MMM YYYY');
export const formatTime = (isoDateTime: string): string => dayjs(isoDateTime).format('HH:mm');

export const formatDuration = (totalMinutes: number): string => `${Math.floor(totalMinutes / 60)}h ${String(totalMinutes % 60).padStart(2, '0')}m`;

export const addMinutes = (isoDateTime: string, minutes: number): string => dayjs.utc(isoDateTime).add(minutes, 'minute').format(DATE_TIME);
