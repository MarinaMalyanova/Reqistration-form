import { useForm } from 'react-hook-form';
import { useState } from 'react';
import styles from './App.module.css';

const initialState = {
	email: '',
	password: '',
	repeatPassword: '',
};
export const useStore = () => {
	const [state, setState] = useState(initialState);
	return {
		getState: () => state,
		updateState: (fieldName, newValue) => {
			setState({ ...state, [fieldName]: newValue });
		},
	};
};

function App() {
	const [errorPasswordMessage, setErrorPasswordMessage] = useState('');
	const [errorEmailMessage, setErrorEmailMessage] = useState('');
	const [errorRepeatPassword, setErrorRepeatPassword] = useState('');
	const sendData = (data) => {
		console.log(data);
	};
	const { getState, updateState } = useStore();
	const onSubmit = (event) => {
		event.preventDefault();
		sendData(getState());
	};
	const { email, password, repeatPassword } = getState();

	const onChange = ({ target }) => {
		updateState(target.name, target.value);
		let errorPasswordMessage = '';
		let errorEmailMessage = '';
		if (target.name === 'password') {
			if (!/^[\w_]*$/.test(target.value)) {
				errorPasswordMessage =
					'Неверный пароль. Должны использоваться только буквы, цифры и нижнее подчеркивание.';
			} else if (target.value.length > 20) {
				errorPasswordMessage = 'Неверный пароль. Должно быть меньше 20 символов.';
			}
			setErrorPasswordMessage(errorPasswordMessage);
		}
		if (target.name === 'email') {
			if (!/^[\w_@.]*$/.test(target.value)) {
				errorEmailMessage =
					'Неверный email. Должны использоваться только буквы, цифры и нижнее подчеркивание.';
			} else if (target.value.length > 20) {
				errorEmailMessage = 'Неверный email. Должно быть меньше 20 символов.';
			}
			setErrorEmailMessage(errorEmailMessage);
		}
	};

	const onBlur = () => {
		if (repeatPassword !== password) {
			setErrorRepeatPassword('Пароли должны совпадать.');
		} else setErrorRepeatPassword('');
	};

	return (
		<div className={styles.app}>
			Регистрация нового пользователя
			<form className={styles.emailForm} onSubmit={onSubmit}>
				<label>
					Почта<span className={styles.spanStar}>*</span>
				</label>
				<input
					className={errorEmailMessage && styles.errorInput}
					type="email"
					name="email"
					value={email}
					placeholder="Введите email"
					onChange={onChange}
				/>
				<div className={styles.errorMessage}>{errorEmailMessage}</div>
				<label>
					Пароль<span className={styles.spanStar}>*</span>
				</label>
				<input
					className={errorPasswordMessage && styles.errorInput}
					type="password"
					name="password"
					value={password}
					placeholder="Введите пароль"
					onChange={onChange}
				/>
				<div className={styles.errorMessage}>{errorPasswordMessage}</div>
				<label>
					Пароль еще раз<span className={styles.spanStar}>*</span>
				</label>
				<input
					className={errorRepeatPassword && styles.errorInput}
					type="password"
					name="repeatPassword"
					value={repeatPassword}
					placeholder="Введите пароль еще раз"
					onChange={onChange}
					onBlur={onBlur}
				/>
				<div className={styles.errorMessage}>{errorRepeatPassword}</div>
				<button
					type="submit"
					disabled={errorPasswordMessage !== ''}
					className={styles.registrationButton}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
}

export default App;
