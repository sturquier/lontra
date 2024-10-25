const pattern = new RegExp(
  '^(https?:\\/\\/)?' + // Protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // Domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+\'()!*,:;=@&]*)*' + // Port and path (special chars)
  '(\\?[;&a-z\\d%_.~+=-]*)?' + // Query string
  '(\\#[-a-z\\d_]*)?$','i' // Fragment locator
);

export const isValidUrl = (url: string) => !!pattern.test(url);