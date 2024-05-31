import { ChangeEvent, FormEvent } from 'react';
import { Spinner } from '../Common';
import FloatingInput from './FloatingInput';

interface Config {
	labelText: string;
	labelId: string;
	type: string;
	value: string;
	link?: {
		linkText: string;
		linkUrl: string;
	};
	required?: boolean;

}

interface Props {
	config: Config[];
	isLoading: boolean;
	btnText: string;
	errors?:any | null
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function Form({
	config,
	isLoading,
	btnText,
	onChange,
	onSubmit,
	errors
}: Props) {
	
	return (
		<form className='space-y-6' onSubmit={onSubmit}>
			{config.map(input => (
				<FloatingInput
					key={input.labelId}
					labelId={input.labelId}
					type={input.type}
					onChange={(e:ChangeEvent<HTMLInputElement>)=>onChange(e)}
					value={input.value}
					required={input.required}
					label={input.labelText}
					errors={errors? errors[input.labelId]: []}
				/>
				
			))}

			<div>
				<button
					type='submit'
					className='flex  w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
					disabled={isLoading}
				>
					{isLoading ? <Spinner sm /> : `${btnText}`}
				</button>
			</div>
		</form>
	);
}