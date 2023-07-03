import Image from "next/image";
import { MouseEventHandler } from "react";

interface ButtonProps {
  title: string;
  type?: 'button' | 'submit';
  leftIcon?: string | null;
  rightIcon?: string | null;
  handleClick?: MouseEventHandler;
  isSubmitting?: boolean;
  bgColor?: string;
  textColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  type,
  leftIcon,
  rightIcon,
  handleClick,
  isSubmitting,
  bgColor,
  textColor
}) => {
  return (
    <button
      type={type || 'button'}
      disabled={isSubmitting}
      className={`flexCenter gap-3 px-4 py-3 
        ${textColor ? textColor : 'text-white'}
        ${isSubmitting ? 'bg-black/50' : bgColor ? bgColor : 'bg-primary-purple'}
        rounded-xl text-sm font-medium max-md:w-full
      `}
      onClick={handleClick}
    >
      {leftIcon && <Image alt="left-icon" src={leftIcon} width={14} height={14} />}
      {title}
      {rightIcon && <Image alt="left-icon" src={rightIcon} width={14} height={14} />}
    </button>
  )
}

export default Button