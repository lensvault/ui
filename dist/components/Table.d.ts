import type { ReactNode } from "react";
export interface TableColumn<T> {
    id: string;
    header: ReactNode;
    cell: (item: T) => ReactNode;
}
export interface TableProps<T> {
    items: readonly T[];
    rowKey: (item: T) => string;
    columns: readonly TableColumn<T>[];
    caption?: ReactNode;
    className?: string;
}
export declare function Table<T>({ items, rowKey, columns, caption, className }: TableProps<T>): import("react").JSX.Element;
