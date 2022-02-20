import { parse, parseISO, format } from 'date-fns';

export const dateFormat = (date, fromFormat = 'DD MMM YYYY, HH:mm A') => format(new Date(date), fromFormat);
export const parseDateString = (date, fromFormat) => (fromFormat ? parse(date, fromFormat) : parseISO(date));
