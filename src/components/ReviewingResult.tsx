import Markdown from 'react-markdown'
import icon from '../assets/icon.png'

export default function ReviewingResult(props: {
  validationResult: string,
}) {

  const { validationResult } = props

  return <div className="flex flex-col max-h-full items-center my-5 mr-5 border border-gray-200 rounded-xl shadow-md">
    <h3 className="text-2xl text-gray-400 py-5">Resultado de la validación 📝</h3>
    {!validationResult &&
      <div className="flex flex-col justify-center h-full items-center">
        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 h-32 text-gray-300">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
        </svg> */}
        <img src={icon} alt="Icono de la aplicacion" className="w-64 h-64" />
        <p className="mt-10 text-light text-gray-400">No se ha evaluado código.</p>
      </div>
    }
    {validationResult &&
      <Markdown className="prose max-h-[720px] overflow-auto">{validationResult}</Markdown>
    }
  </div >
}