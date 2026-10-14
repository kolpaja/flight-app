export const FLIGHT_STATUS = {
	Scheduled: 'Scheduled',
	OnTime: 'On Time',
	Boarding: 'Boarding',
	Delayed: 'Delayed',
	Cancelled: 'Cancelled',
} as const;

export type FlightStatus = (typeof FLIGHT_STATUS)[keyof typeof FLIGHT_STATUS];

export const FLIGHT_STATUSES = Object.values(FLIGHT_STATUS);

export const isFlightStatus = (value: unknown) => typeof value === 'string' && (FLIGHT_STATUSES as readonly string[]).includes(value);

export const STATUS_TONE = {
	[FLIGHT_STATUS.Scheduled]: 'neutral',
	[FLIGHT_STATUS.OnTime]: 'success',
	[FLIGHT_STATUS.Boarding]: 'info',
	[FLIGHT_STATUS.Delayed]: 'warning',
	[FLIGHT_STATUS.Cancelled]: 'danger',
} as const satisfies Record<FlightStatus, 'neutral' | 'success' | 'info' | 'warning' | 'danger'>;
