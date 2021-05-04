const REGEX_URL = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

export const rules = {
  required: (message = 'This field is required') => ({
    isFailed: v => v.length === 0,
    message
  }),
  max: maxLength => (message = `Can't be longer than ${maxLength}`) => ({
    isFailed: v => v.length > maxLength,
    message
  }),
  isUrl: (message = 'It should be a valid URL') => ({
    isFailed: v => !REGEX_URL.test(v),
    message
  })
};

export const getValidationFunc = rules => val =>
  rules.find(rule => rule.isFailed(val) && rule.message);
