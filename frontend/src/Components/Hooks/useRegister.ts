import { useState, ChangeEvent, FormEvent } from 'react';
import { useRegisterMutation } from '../../redux/features/authApiSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function useRegister() {
	const [formErrors, setFormErrors] = useState(null)
	const nav = useNavigate()
	const [register, { isLoading }] = useRegisterMutation();

	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		re_password: '',
	});

	const { username, email, password, re_password } = formData;

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		
		register({ username, email, password, re_password })
			.unwrap()
			.then(() => {
				toast.success('Please check email to verify account');
				nav('/auth/login');
			})
			.catch((errs) => {				
				setFormErrors(errs.data)
				toast.error('Failed to register account');
			});
	};

	return {
		username,
		email,
		password,
		re_password,
		isLoading,
		onChange,
		onSubmit,
		errors:formErrors
	};
}