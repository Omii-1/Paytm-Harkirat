import React from 'react'

export function InputBox({label, type, placeholder, name, onChange, value}) {
  return (
    <div>
      <div className='text-sm font-medium text-left py-2'>
        {label}
      </div>
      <input type={type} placeholder={placeholder} name={name} onChange={onChange} value={value} className='w-full px-2 py-1 border rounded border-slate-200'/>
    </div>
  )
}

