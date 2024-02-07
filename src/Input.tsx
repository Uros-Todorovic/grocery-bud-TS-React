import { type ComponentPropsWithoutRef } from 'react';
type InputProps = {
	name: string;
} & ComponentPropsWithoutRef<'input'>;

const Input = ({ name, ...props }: InputProps) => {
	return (
		<>
			<input type="text" name={name} {...props} />
		</>
	);
};

export default Input;
