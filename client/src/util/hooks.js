import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
	const [values, setValues] = useState(initialState);

	//modify corresponding values
	const onChange = (event) => {
		setValues({ ...values, [event.target.name]: event.target.value });
	};

	//when form is submitted dont refresh
	const onSubmit = (event) => {
		event.preventDefault();
		callback();
	};

	return {
		onChange,
		onSubmit,
		values,
	};
};
