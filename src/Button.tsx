import { type ComponentPropsWithoutRef } from 'react';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
	text: string;
};

const Button = ({ text, ...props }: ButtonProps) => {
	return <button {...props}>{text}</button>;
};

export default Button;
