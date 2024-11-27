import { parseISO, format, isToday } from 'date-fns';

export function formatedActivityDate(dateValue: string) {
  const date = parseISO(dateValue);

  if (isToday(date)) {
    return `Hoje às ${format(date, 'HH:mm')}`;
  }

  return format(date, "dd/MM 'às' HH:mm");
}
