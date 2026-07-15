const LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const CURRENT_LEVEL = LEVELS[process.env.LOG_LEVEL] ?? LEVELS.info;

function timestamp() {
  return new Date().toISOString();
}

function format(level, message) {
  return `[${timestamp()}] [${level.toUpperCase()}] ${message}`;
}

function log(level, message, meta) {
  if (LEVELS[level] > CURRENT_LEVEL) return;
  const line = format(level, message);
  const printer = level === 'error' ? console.error : level === 'warn' ? console.warn : console.log;
  if (meta !== undefined) {
    printer(line, meta);
  } else {
    printer(line);
  }
}

module.exports = {
  error: (msg, meta) => log('error', msg, meta),
  warn: (msg, meta) => log('warn', msg, meta),
  info: (msg, meta) => log('info', msg, meta),
  debug: (msg, meta) => log('debug', msg, meta),
};
