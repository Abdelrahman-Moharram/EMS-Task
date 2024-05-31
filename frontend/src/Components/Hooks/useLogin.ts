import { useState, ChangeEvent, FormEvent } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { useLoginMutation } from '../../redux/features/authApiSlice';
import { setAuth } from '../../redux/features/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function useLogin() {
	const nav = useNavigate();
	const dispatch = useAppDispatch();
	const [login, { isLoading }] = useLoginMutation();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		login({ email, password })
			.unwrap()
			.then((data) => {
				dispatch(setAuth(data?.access));
				toast.success('Logged in');
				nav('/');
			})
			.catch(() => {
				toast.error('Failed to log in');
			});
	};
	return {
		email,
		password,
		isLoading,
		onChange,
		onSubmit,
	};
}