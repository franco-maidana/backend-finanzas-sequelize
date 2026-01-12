const { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } = require("./dateUtils");

function buildDateRange({ period, date, startDate, endDate }) {
  if (startDate && endDate) {
    return { start: new Date(startDate), end: new Date(endDate) };
  }

  if (!period || !date) {
    return null;
  }

  const base = new Date(date);

  switch (period) {
    case "day":
      return { start: startOfDay(base), end: endOfDay(base) };
    case "week":
      return { start: startOfWeek(base), end: endOfWeek(base) };
    case "month":
      return { start: startOfMonth(base), end: endOfMonth(base) };
    case "year":
      return { start: startOfYear(base), end: endOfYear(base) };
    default:
      return null;
  }
}

module.exports = { buildDateRange };
