import { createContext, useContext } from "react";

export interface FieldControlIds {
  id: string;
  describedBy: string | undefined;
}

export const FieldControlContext = createContext<FieldControlIds | undefined>(undefined);

interface ControlIdProps {
  id?: string | undefined;
  "aria-describedby"?: string | undefined;
}

function joinIds(...lists: (string | undefined)[]): string | undefined {
  const ids = new Set(lists.flatMap((list) => list?.split(/\s+/).filter(Boolean) ?? []));
  return ids.size > 0 ? [...ids].join(" ") : undefined;
}

export function useFieldControlIds({ id, "aria-describedby": describedBy }: ControlIdProps) {
  const field = useContext(FieldControlContext);
  return {
    id: id ?? field?.id,
    "aria-describedby": joinIds(field?.describedBy, describedBy),
  };
}
