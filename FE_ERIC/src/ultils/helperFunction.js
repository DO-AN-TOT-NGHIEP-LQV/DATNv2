export function calculateDisplayValue(value) {
  const min = 0;
  const max = 100;
  const threshold = 70;

  const maxPriceValue = 10000000;
  const minPriceValue = 1000000;

  if (value <= threshold) {
    // Phần đầu (0 - threshold)
    const range = minPriceValue - min;
    const adjustedValue = (value - min) / (threshold - min);
    return Math.round(min + adjustedValue * range);
  } else if (value <= 100) {
    // Phần sau (threshold - max)
    const range = maxPriceValue - minPriceValue;
    const adjustedValue = (value - threshold) / (max - threshold);
    return Math.round(minPriceValue + adjustedValue * range);
  } else {
    return undefined;
  }
}

export function getFileExtension(fileName) {
  const extension = fileName.split(".").pop();
  return extension.toLowerCase();
}

export function hasSalerRole(roles) {
  if (roles.some((role) => role.name == "ROLE_SALER")) return true;
  else false;
}

export function hasAdminRole(roles) {
  if (roles.some((role) => role.name == "ROLE_ADMIN")) return true;
  else false;


}
