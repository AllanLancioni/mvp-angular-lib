export function addItemGA(transactionId, name, sku, category, price, quantity) {
  try { 
  (window as any)
    .ga('ec:addItem', {
      id: transactionId, // Required.
      name,
      sku,
      category,
      price,
      quantity,
    })(window as any)
    .ga('ec:send');
  } catch (error) {
    //console.log(error);
    
  }
}

export default function addTransactionGA(transactionId, total) {
  (window as any).ga('ecommerce:addTransaction', {
    id: transactionId, // Required.
    affiliation: 'Positiva ECOMMERCE',
    revenue: total
  });
  (window as any).ga('ecommerce:send');
}

export function sendInfo() {
  (window as any).ga('ecommerce:send');
}
