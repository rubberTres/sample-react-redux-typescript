import { ChangeEvent, CSSProperties, useEffect, useState } from "react";
import classNames from "classnames";
import { isNotNull } from "types/typeguards";
import { Nullable } from "types/types";

export enum InputType {
	TEXT = "text",
	NUMBER = "number",
	PASSWORD = "password",
}

type ValueType = string;

type Props = {
	value: ValueType
	type: InputType
	onChange: (value: ValueType) => void
	icon?: string
	style?: CSSProperties
	error: Nullable<string>
	className?: string
	label?: string
	id?: string
	disabled?: boolean
	hideErrorMessage?: boolean
	errorMessageBackgroundColor: string
	placeholder?: string
}

const Input = (props: Props) => {

	const {
		value,
		type,
		onChange,
		icon,
		style,
		error,
		className = "",
		label,
		id,
		disabled,
		hideErrorMessage,
		errorMessageBackgroundColor,
		placeholder,
	} = props;

	useEffect(() => {
		setInputValue(value);
	}, [ value ])

	const [ inputValue, setInputValue ] = useState<ValueType>(value);

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		onChange(e.target.value);
	}

	return (
		<div id={ id } style={ style } className={ classNames("input", { [ className ]: className ,"input--error": isNotNull(error) }) }>
			{ isNotNull(label) && <label htmlFor={ id } className="input__label">{ label }</label> }
			{ isNotNull(icon) && <img src={ icon } alt="input icon" className="input__icon"/> }
			<input
				disabled={ disabled }
				className="input__input"
				placeholder={ placeholder }
				type={ type }
				value={ inputValue }
				onChange={ onInputChange }
			/>
			{ !hideErrorMessage && <span className="input__error" style={ { backgroundColor: errorMessageBackgroundColor } }>{ error }</span> }
		</div>
	)
}

export default Input;