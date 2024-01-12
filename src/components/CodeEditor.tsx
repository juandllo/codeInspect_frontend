
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import AceEditor from 'react-ace'
import { CheckIcon, ChevronUpDownIcon, ArrowPathIcon } from '@heroicons/react/20/solid'

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

const langs = [
  { name: 'Javascript', code: 'javascript' },
  { name: 'Java', code: 'java' },
  { name: 'Python', code: 'python' }
]

export default function CodeEditor(props: {
  code: string,
  isReviewing: boolean,
  setCode: (code: string) => void,
  handleValidateCode: () => void
}) {
  const { code, setCode, handleValidateCode, isReviewing } = props
  const [selected, setSelected] = useState(langs[0])

  return <div className="flex flex-col items-center my-5 ml-5 border border-gray-200 rounded-xl shadow-md">
    <h3 className="text-2xl text-gray-400 py-5">Código a validar 👌</h3>
    <div className="flex justify-center items-center px-5 mb-5 z-10 w-full">
      <p className="text-md mr-5">Lenguaje</p>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1 w-[200px]">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md border focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {langs.map((lang, idx) => (
                <Listbox.Option
                  key={idx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-cyan-100 text-cyan-900' : 'text-gray-900'
                    }`
                  }
                  value={lang}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                          }`}
                      >
                        {lang.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-cyan-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
    <div className="pb-5">
      <AceEditor
        className="rounded-xl"
        width="625px"
        height="600px"
        placeholder="Placeholder Text"
        mode={selected.code}
        theme="monokai"
        name="blah2"
        onChange={setCode}
        fontSize={16}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={code}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2
        }} />
    </div>
    <div className="px-5 w-full">
      <button onClick={handleValidateCode} type="button"
        disabled={isReviewing ? true : false}
        className="flex justify-center items-center py-2 w-full mb-5 border bg-blue-500 text-white rounded-md hover:bg-blue-600 active:bg-blue-400 disabled:bg-blue-300">
        Solicitar Revisión {isReviewing && <ArrowPathIcon className="ml-2 h-5 w-5 animate-spin" />}
      </button>
    </div>
  </div>
}