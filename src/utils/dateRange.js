const {
  formatDate,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear
} = require("./dateUtils");

function buildDateRange({ period, date, startDate, endDate }) {
  if (startDate && endDate) {
    return { start: startDate, end: endDate };
  }

  if (!period || !date) {
    return null;
  }

  const base = new Date(date);

  switch (period) {
    case "day":
      return {
        start: formatDate(startOfDay(base)),
        end: formatDate(endOfDay(base))
      };
    case "week":
      return {
        start: formatDate(startOfWeek(base)),
        end: formatDate(endOfWeek(base))
      };
    case "month":
      return {
        start: formatDate(startOfMonth(base)),
        end: formatDate(endOfMonth(base))
      };
    case "year":
      return {
        start: formatDate(startOfYear(base)),
        end: formatDate(endOfYear(base))
      };
    default:
      return null;
  }
}

module.exports = { buildDateRange };
