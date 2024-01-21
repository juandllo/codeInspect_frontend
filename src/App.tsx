import { useState } from 'react'
import './App.css'
import CodeEditor from './components/CodeEditor'
import ReviewingResult from './components/ReviewingResult'

const langs = [
  { name: 'Javascript', code: 'javascript' },
  { name: 'Java', code: 'java' },
  { name: 'Python', code: 'python' },
  { name: 'Typescript', code: 'typescript' },
  { name: 'CSS', code: 'css' },
  { name: 'HTML', code: 'html' },
  { name: 'Kotlin', code: 'kotlin' },
  { name: 'Swift', code: 'swift' },
  { name: 'MySql', code: 'mysql' },
]

function App() {
  const [code, setCode] = useState<string>("")
  const [validationResult, setValidationResult] = useState<string>("")
  const [isReviewing, setIsReviewing] = useState<boolean>(false)
  const [selected, setSelected] = useState(langs[0])

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
        'prompt': code,
        'languaje': selected.name
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
      <CodeEditor code={code} langs={langs} setCode={setCode} handleValidateCode={handleValidateCode} isReviewing={isReviewing} selected={selected} setSelected={setSelected} />
      <ReviewingResult validationResult={validationResult} />
    </div>
  )
}

export default App
