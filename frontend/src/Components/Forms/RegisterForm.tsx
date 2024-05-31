import { useRegister } from '../Hooks'
import Form from './Form';

export default function RegisterForm() {
	const {
		username,
		email,
		password,
		re_password,
		isLoading,
		onChange,
		onSubmit,
		errors
	} = useRegister();

	const config = [
		{
			labelText: 'username',
			labelId: 'username',
			type: 'text',
			value: username,
			required: true,
		},
		{
			labelText: 'Email address',
			labelId: 'email',
			type: 'email',
			value: email,
			required: true,
		},
		{
			labelText: 'Password',
			labelId: 'password',
			type: 'password',
			value: password,
			required: true,
		},
		{
			labelText: 'Confirm password',
			labelId: 're_password',
			type: 'password',
			value: re_password,
			required: true,
		},
	];

	return (
		<Form
			config={config}
			isLoading={isLoading}
			btnText='Sign up'
			onChange={onChange}
			onSubmit={onSubmit}
			errors={errors}
		/>
	);
}