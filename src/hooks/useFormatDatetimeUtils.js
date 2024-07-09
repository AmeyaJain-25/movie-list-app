import { parseISO } from 'date-fns';
import { format, utcToZonedTime } from 'date-fns-tz';

export default function useFormatDatetimeUtils() {
  const parseISODatetime = (datetimeValue) => {
    return parseISO(datetimeValue);
  };

  const convertDatetimeToTz = (datetimeValue, timeZone) => {
    return utcToZonedTime(datetimeValue, timeZone);
  };

  const formatDatetime = (datetimeValue, formatTemplate) => {
    const datetimeObj =
      datetimeValue instanceof Date ? datetimeValue : parseISO(datetimeValue);
    return format(datetimeObj, formatTemplate);
  };

  const formatDatetimeInTz = (
    datetimeValue,
    formatTemplate,
    timeZone = 'Asia/Kolkata'
  ) => {
    return formatDatetime(
      convertDatetimeToTz(datetimeValue, timeZone),
      formatTemplate
    );
  };

  return {
    parseISODatetime,
    convertDatetimeToTz,
    formatDatetime,
    formatDatetimeInTz,
  };
}
