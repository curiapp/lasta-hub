function isDbKnownError(err: any) {
  return typeof err.code === 'string' && /^P000\d$/.test(err.code);
}