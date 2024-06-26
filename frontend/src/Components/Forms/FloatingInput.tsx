import React, { ChangeEvent } from 'react'
import { FaEye } from 'react-icons/fa';

interface props {
	labelId: string;
	type: string;
	onChange: (e:ChangeEvent<HTMLInputElement>) => void;
	value: string | number;
	label: string
	required?: boolean;
    children?: React.ReactNode | undefined
    errors?:any[]
    readOnly?:boolean
}

const FloatingInput = ({
    labelId,
	type,
	onChange,
	value,
	label,
	required = false,
    children,
    errors,
    readOnly
}: props) => {
    
  return (
    <>
        <label
            htmlFor={labelId}
            className={"relative block rounded-md borde shadow-md "+ (errors?.length?"border-red-500":"border-primary/80")}
        >
            <input
                type={type}
                name={labelId}
                id={labelId}
                onChange={onChange}
                value={value}
                required={required}
                className="[&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none p-2 peer w-full border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                placeholder={''}
                readOnly={readOnly}
            />
                <span
                    className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-primary transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                >
                    {label}
                </span>
                {
                    type === 'password'?
                        <button 
                            onClick={()=>{
                                type = 'text'
                            }}
                            className='absolute right-1 rounded-full top-1 p-2 hover:bg-gray-100'
                        >
                            <FaEye />
                        </button>
                    :null
                }
                {children}
        </label>
        {
            errors?.length?
             <ul>
                {
                    errors?.map((error, idx)=>
                        <li key={idx} className='text-red-500'>{error}</li>
                    )
                }
             </ul>
             :null
        }
    </>
  )
}

export default FloatingInput
