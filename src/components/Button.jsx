const Button = ({ text, as: Component = 'button', className, ...props }) => {
  return (
    <Component
      className={`py-3 px-6 rounded-lg shadow-lg transition duration-300 ${className}`}
      {...props}
    >
      {text}
    </Component>
  );
};

export default Button;