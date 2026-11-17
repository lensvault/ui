import { type ReactNode, useRef, useState } from "react";
import { Button } from "./Button.js";
import { cx } from "./cx.js";
import { hasContent } from "./has-content.js";
import s from "./FilePicker.module.css";
import t from "./text.module.css";

export interface FilePickerProps {
  file?: File | undefined;
  onChange: (file: File | undefined) => void;
  accept?: string;
  buttonText?: string;
  hint?: ReactNode;
}

function formatFileSize(sizeBytes: number): string {
  return `${(sizeBytes / 1024).toFixed(2)} KB`;
}

export function FilePicker({
  file,
  onChange,
  accept,
  buttonText = "Choose a file",
  hint,
}: FilePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- dropping a file is a mouse shortcut; the button inside does the same from the keyboard
    <div
      role="group"
      aria-label={buttonText}
      className={cx(t.text, s.picker, dragging && s.dragging)}
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => {
        setDragging(false);
      }}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);
        const dropped = event.dataTransfer.files[0];
        if (dropped) onChange(dropped);
      }}
    >
      <div>
        <Button variant="primary" onClick={() => inputRef.current?.click()}>
          {buttonText}
        </Button>
        <input
          ref={inputRef}
          className={s.input}
          type="file"
          accept={accept}
          tabIndex={-1}
          aria-hidden
          onChange={(event) => {
            onChange(event.target.files?.[0]);
            event.target.value = "";
          }}
        />
      </div>
      {hasContent(hint) && <span className={s.hint}>{hint}</span>}
      {file && (
        <div className={s.file}>
          <span>
            {file.name} <span className={s.hint}>{formatFileSize(file.size)}</span>
          </span>
          <Button
            variant="inline"
            aria-label={`Remove ${file.name}`}
            onClick={() => {
              onChange(undefined);
            }}
          >
            ×
          </Button>
        </div>
      )}
    </div>
  );
}
