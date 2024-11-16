import "./DynamicTextarea.scss";
import { useEffect, useRef } from "react";

function DynamicTextarea(
  props: React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resize = (elem: HTMLTextAreaElement) => {
    elem.style.height = "";
    elem.style.height = `${elem.scrollHeight}px`;
  };

  const handleInput: React.FormEventHandler<HTMLTextAreaElement> = e => {
    resize(e.target as HTMLTextAreaElement);
    if (props.onInput) {
      props.onInput(e);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      resize(textareaRef.current);
    }
  }, []);

  return (
    <textarea
      {...props}
      className={`${props.className} dynamic-textarea`}
      ref={textareaRef}
      onInput={handleInput}
    />
  );
}

export default DynamicTextarea;
