import React from 'react'

import SEO from '../components/SEO'

const IndexPage = () => (
  <div className="min-h-screen bg-blue-100">
    <SEO title="Home" />
    <h1>Hello World</h1>
    <div className="block">
      <span className="text-gray-700">Checkboxes</span>
      <div className="mt-2">
        <div>
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox text-indigo-600" aria-labelledby="chk-opt-01" checked readOnly />
            <span id="chk-opt-01" className="ml-2">Option 1</span>
          </label>
        </div>
        <div>
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox text-green-500" aria-labelledby="chk-opt-02" checked readOnly />
            <span id="chk-opt-02" className="ml-2">Option 2</span>
          </label>
        </div>
        <div>
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox text-pink-600" aria-labelledby="chk-opt-03" checked readOnly />
            <span id="chk-opt-03" className="ml-2">Option 3</span>
          </label>
        </div>
      </div>
    </div>
  </div>
)

export default IndexPage
