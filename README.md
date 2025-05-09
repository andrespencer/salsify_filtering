# Salsify Filtering UI Challenge

## Guided Tour
This React app allows users to filter a list of products based on a selected property, operator, and value. As filters are selected, the list of products updates automatically, reflecting only those that match the conditions.

## Development Process

1. Set up **Vite** for fast dev environment
2. Built HTML skeleton and displayed products
3. Added filtering function (with apply button)
4. Added basic CSS
5. Removed apply button, added debounce on auto filter
6. **Multi-select support** for `"Is any of"` (enumerated properties)
7. Prevented premature filtering when no values are selected
8. Extracted filtering logic into `filterProducts()` for better code organization
9. Wrote one unit test using the real datastore

---

## Assumptions
- Did not modify the provided `datastore.js`
- User should have all data visible when building a filter

---

## Areas for Improvement / next steps
- **Accessibility**: add `aria-labels`, keyboard navigation enhancements
- **Mobile** - improve layout for smaller screens
- Add **micro-interactions**
- **Support multi-select** for strings/numbers
- **Modularize** - make `FilterBar` and `ProductTable` into components
- **Expand tests** - include all operator/property combinations and edge cases

---

## Time Spent
Roughly **5 hours**, including some time spent on UX polishing that helped the interactions feel more natural.

---

## 📦 How to Run
```bash
npm install
npm run dev
```

To run tests:
```bash
npx vitest run
```

---

Thank you for reviewing!