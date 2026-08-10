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

  return <div className="mt-2 overflow-hidden rounded-xl border border-border bg-background focus-within:border-primary/50"><div className="flex flex-wrap gap-1 border-b border-border bg-muted/40 p-2">{controls.map(({ label, icon: Icon, action }) => <button key={label} type="button" title={label} aria-label={label} onMouseDown={(event) => event.preventDefault()} onClick={action} className="rounded-md p-2 text-muted-foreground hover:bg-background hover:text-foreground"><Icon className="h-4 w-4" /></button>)}</div><div ref={editor} contentEditable suppressContentEditableWarning role="textbox" aria-multiline="true" aria-label="Contenido del artículo" data-placeholder="Escribe el artículo aquí…" onInput={(event) => onChange(event.currentTarget.innerHTML)} className="prose-blog min-h-[420px] max-w-none px-5 py-4 text-sm outline-none empty:before:text-muted-foreground empty:before:content-[attr(data-placeholder)]" /></div>;
}
