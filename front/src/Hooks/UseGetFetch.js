import React, { useState } from "react"

export default function UseGetFetch(subUrl) {
  const [allResult, setAllResult] = useState("")
  function getAllResults() {
    fetch(`http://localhost:8000/api/${subUrl}`)
      .then((res) => res.json())
      .then((result) => {
        let reverseArr = result.reverse()
        setAllResult(reverseArr)
      })
  }

  return [allResult,getAllResults]
}
