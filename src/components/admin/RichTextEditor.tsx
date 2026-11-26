import { useEffect, useRef } from "react";
import { Bold, Heading2, Heading3, Italic, Link2, List, ListOrdered } from "lucide-react";

export default function RichTextEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const editor = useRef<HTMLDivElement>(null);
  useEffect(() => { if (editor.current && editor.current.innerHTML !== value) editor.current.innerHTML = value; }, [value]);

  const command = (name: string, commandValue?: string) => {
    editor.current?.focus();
    document.execCommand(name, false, commandValue);
    if (editor.current) onChange(editor.current.innerHTML);
  };
  const addLink = () => {
    const url = window.prompt("Pega la URL del enlace:", "https://");
    if (url) command("createLink", url);
  };

  const controls = [
    { label: "Negrita", icon: Bold, action: () => command("bold") },
    { label: "Cursiva", icon: Italic, action: () => command("italic") },
    { label: "Título H2", icon: Heading2, action: () => command("formatBlock", "h2") },
    { label: "Título H3", icon: Heading3, action: () => command("formatBlock", "h3") },
    { label: "Lista", icon: List, action: () => command("insertUnorderedList") },
    { label: "Lista numerada", icon: ListOrdered, action: () => command("insertOrderedList") },
    { label: "Enlace", icon: Link2, action: addLink },
  ];

  return <div className="admin-rte"><div className="admin-rte__bar" role="toolbar" aria-label="Formato del texto">{controls.map(({ label, icon: Icon, action }) => <button key={label} type="button" title={label} aria-label={label} onMouseDown={(event) => event.preventDefault()} onClick={action}><Icon className="h-4 w-4" aria-hidden="true" /></button>)}</div><div ref={editor} contentEditable suppressContentEditableWarning role="textbox" aria-multiline="true" aria-label="Contenido del artículo" data-placeholder="Escribe el artículo aquí…" onInput={(event) => onChange(event.currentTarget.innerHTML)} className="admin-rte__body prose-blog min-h-[420px] max-w-none px-4 py-4 text-sm sm:px-5 empty:before:text-muted-foreground empty:before:content-[attr(data-placeholder)]" /></div>;
}
