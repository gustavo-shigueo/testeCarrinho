interface ButtonProps {
	color?: string
	text: string
	action: () => any
}

const Button = ({ color, text, action }: ButtonProps) => {
	return (
		<button
			type="button"
			className={color ? `btn btn-${color}` : 'btn'}
			onClick={action}
		>
			{text}
		</button>
	)
}

export default Button
