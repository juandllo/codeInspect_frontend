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
        <img src={icon} alt="Icono de la aplicacion" className="w-64 h-64" />
        <p className="mt-10 text-light text-gray-400">No se ha evaluado código.</p>
      </div>
    }
    {validationResult &&
      <Markdown className="px-5 prose max-w-full max-h-[760px] overflow-auto">{validationResult}</Markdown>
    }
  </div >
}