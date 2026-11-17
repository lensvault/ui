import { type ReactNode } from "react";
export interface FilePickerProps {
    file?: File | undefined;
    onChange: (file: File | undefined) => void;
    accept?: string;
    buttonText?: string;
    hint?: ReactNode;
}
export declare function FilePicker({ file, onChange, accept, buttonText, hint, }: FilePickerProps): import("react").JSX.Element;
