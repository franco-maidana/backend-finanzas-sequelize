function pad2(value) {
  return String(value).padStart(2, "0");
}

function formatDate(date) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
}

function endOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
}

function startOfWeek(date) {
  const day = date.getDay();
  const diff = (day === 0 ? -6 : 1) - day; // Monday as first day
  const d = new Date(date);
  d.setDate(d.getDate() + diff);
  return startOfDay(d);
}

function endOfWeek(date) {
  const start = startOfWeek(date);
  const d = new Date(start);
  d.setDate(d.getDate() + 6);
  return endOfDay(d);
}

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
}

function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
}

function startOfYear(date) {
  return new Date(date.getFullYear(), 0, 1, 0, 0, 0, 0);
}

function endOfYear(date) {
  return new Date(date.getFullYear(), 11, 31, 23, 59, 59, 999);
}

module.exports = {
  formatDate,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear
};
