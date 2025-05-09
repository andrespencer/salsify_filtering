import React, { useEffect, useState } from 'react'
import { filterProducts } from './utils/filterProducts'
import './utils/datastore.js'
import './App.css'

function App() {
  const [properties, setProperties] = useState([])
  const [operators, setOperators] = useState([])
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [selectedPropertyId, setSelectedPropertyId] = useState(null)
  const [selectedOperator, setSelectedOperator] = useState('')
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    setProperties(window.datastore.getProperties())
    setOperators(window.datastore.getOperators())
    setProducts(window.datastore.getProducts())
    setFiltered(window.datastore.getProducts())
  }, [])

  useEffect(() => {
    if (!selectedPropertyId || !selectedOperator) return
  
    const delay = setTimeout(() => {
      handleFilter()
    }, 300)
  
    return () => clearTimeout(delay)
  }, [selectedPropertyId, selectedOperator, inputValue])

  const getPropertyById = (id) => properties.find(p => p.id === Number(id))

  const handleFilter = () => {
    // Prevent premature filtering
    if (!selectedPropertyId || !selectedOperator || (selectedOperator === 'in' && !inputValue)) return
  
    const property = getPropertyById(selectedPropertyId)
    const filteredResult = filterProducts(products, property, selectedOperator, inputValue)
  
    setFiltered(filteredResult)
  }

  const handleClear = () => {
    setFiltered(products)
    setSelectedPropertyId(null)
    setSelectedOperator('')
    setInputValue('')
  }

  const validOperators = selectedPropertyId ? {
    string: ['equals', 'any', 'none', 'in', 'contains'],
    number: ['equals', 'greater_than', 'less_than', 'any', 'none', 'in'],
    enumerated: ['equals', 'any', 'none', 'in']
  }[getPropertyById(selectedPropertyId)?.type] : []

  const renderFilterInput = (property, selectedOperator, inputValue, setInputValue) => {
    const isMultiSelect = selectedOperator === 'in' && Array.isArray(property?.values)
  
    if (isMultiSelect) {
      return (
        <select
          multiple
          size={property.values.length}
          value={inputValue.split(',')}
          onChange={(e) => {
            const selected = Array.from(e.target.selectedOptions, o => o.value)
            setInputValue(selected.join(','))
          }}
        >
          {property.values.map(val => (
            <option key={val} value={val}>{val}</option>
          ))}
        </select>
      )
    }
  
    return (
      <input
        placeholder='Enter value(s)'
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
    )
  }  

  return (
    <div className='filterWrapper'>
      <h1>Product Filter</h1>
      <div className='filterOptions'>
        <select 
          value={selectedPropertyId ?? ''}
          onChange={e => {
            setSelectedPropertyId(e.target.value)
            // Resets the input value and unfilters, for better UX (seeing all products)
            setInputValue('')
            setFiltered(products)
          }}
        >
          <option value='' disabled>Select property</option>
          {properties.map(p => (
            <option key={p.id} value={p.id}>
              {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
            </option>
          ))}
        </select>

        <select value={selectedOperator} onChange={e => setSelectedOperator(e.target.value)}>
          <option value='' disabled>Select operator</option>
          {operators.filter(o => validOperators.includes(o.id)).map(o => (
            <option key={o.id} value={o.id}>{o.text}</option>
          ))}
        </select>

        {selectedOperator && !['any', 'none'].includes(selectedOperator) &&
          renderFilterInput(getPropertyById(selectedPropertyId), selectedOperator, inputValue, setInputValue)
        }

        <button onClick={handleClear}>Clear</button>
      </div>

      <table className='filteredTable'>
        <thead>
          <tr>
            <th>Product ID</th>
            {properties.map(prop => (
              <th key={prop.id}>{prop.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              {properties.map(prop => {
                const valueObj = product.property_values.find(pv => pv.property_id === prop.id)
                const value = valueObj ? valueObj.value : '-'
                return <td key={prop.id}>{value}</td>
              })}
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default App