import { useState } from "react"
import { getNepaliFromEnglish } from 'nepali-input-react';

function IndexPopup() {
  const [data, setData] = useState("")
  function handleChangeOnSpaceKey(e: any) {
    if (e.keyCode === 32||e.key===' ') {
      e.target.value = getNepaliFromEnglish(e.target.value)
    }
  }
  return (
    <div
      style={{
        padding: 16
      }}>
      <h2>
        Roman to Devnagari
        Extension!
      </h2>
      
      <input onChange={(e) => setData(e.target.value)} 
      onKeyDown={handleChangeOnSpaceKey} value={data} />
      <p>{getNepaliFromEnglish(data)}</p>
      <a href="https://docs.plasmo.com" target="_blank">
        View Docs
      </a>
    </div>
  )
}

export default IndexPopup
