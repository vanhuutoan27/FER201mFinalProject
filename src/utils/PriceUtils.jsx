export function formatPriceWithDot(price) {
  if (!isNaN(price)) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  return price;
}
