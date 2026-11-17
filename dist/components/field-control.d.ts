export interface FieldControlIds {
    id: string;
    describedBy: string | undefined;
}
export declare const FieldControlContext: import("react").Context<FieldControlIds | undefined>;
interface ControlIdProps {
    id?: string | undefined;
    "aria-describedby"?: string | undefined;
}
export declare function useFieldControlIds({ id, "aria-describedby": describedBy }: ControlIdProps): {
    id: string | undefined;
    "aria-describedby": string | undefined;
};
export {};
