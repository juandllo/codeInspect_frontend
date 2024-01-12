import { useState } from 'react'
import './App.css'
import CodeEditor from './components/CodeEditor'
import ReviewingResult from './components/ReviewingResult'

function App() {
  const [code, setCode] = useState<string>("")
  const [validationResult, setValidationResult] = useState<string>("")
  const [isReviewing, setIsReviewing] = useState<boolean>(false)

  const handleValidateCode = async () => {
    if (!code) {
      alert('Debe ingresar el código a evaluar!')
      return
    }
    
    setIsReviewing(true)

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'prompt': code
      })
    }
    await fetch('http://localhost:3000/openai', requestOptions)
      .then(response => response.json())
      .then(response => {
        if (response.status !== 200) {
          alert("Ha ocurrido un error evaluando el código!")
          setIsReviewing(false)
          return
        }

        setIsReviewing(false)
        setValidationResult(response.data)
      })
  }

  return (
    <div className="grid grid-cols-2 gap-5">
      <CodeEditor code={code} setCode={setCode} handleValidateCode={handleValidateCode} isReviewing={isReviewing} />
      <ReviewingResult validationResult={validationResult} />
    </div>
  )
}

export default App
