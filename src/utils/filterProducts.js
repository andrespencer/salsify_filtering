export function filterProducts(products, property, operator, inputValue) {
    return products.filter(product => {
      const prop = product.property_values.find(pv => pv.property_id === property.id)
      const val = prop ? prop.value : null
  
      switch (operator) {
        case 'equals':
          return val === inputValue
        case 'greater_than':
          return Number(val) > Number(inputValue)
        case 'less_than':
          return Number(val) < Number(inputValue)
        case 'any':
          return val != null
        case 'none':
          return val == null
        case 'in':
          return inputValue
            .toLowerCase()
            .split(',')
            .map(v => v.trim())
            .includes(val?.toLowerCase())
        case 'contains':
          return val?.toLowerCase().includes(inputValue.toLowerCase())
        default:
          return true
      }
    })
  }  