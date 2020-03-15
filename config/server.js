module.exports = {
  APPLICATION_ID:
    process.env.APPLICATION_ID ||
    '1ec894e114e534ccb5780f624e4ab05461e5c60b29496f45f92c4127efbe1ddb',
  SECRET: process.env.SECRET || '705894bfe6ccd628f5049d8a141205a4fe8309d05beee7fcac7e96c3fdd12645',
  CALLBACK_URL: process.env.CALLBACK_URL || 'http://localhost:3000'
};
