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
      onInput={e => resize(e.target as HTMLTextAreaElement)}
    />
  );
}

export default DynamicTextarea;
