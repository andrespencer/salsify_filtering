import { describe, it, expect, beforeAll } from 'vitest'
import { filterProducts } from '../utils/filterProducts'

let products = []
let properties = []

beforeAll(() => {
  global.window = {}
  require('../utils/datastore.js')
  products = window.datastore.getProducts()
  properties = window.datastore.getProperties()
})

describe('filterProducts (using real datastore)', () => {

  it('filters by greater_than (number)', () => {
    const weightProp = properties.find(p => p.name.toLowerCase().includes('weight'))
    const result = filterProducts(products, weightProp, 'greater_than', '3')
    expect(result.every(p => {
      const val = p.property_values.find(pv => pv.property_id === weightProp.id)?.value
      return Number(val) > 3
    })).toBe(true)
  })

  // Add more tests
})
