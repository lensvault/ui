import s from "./Skeleton.module.css";

// A stand-in for content still loading, sized like it so nothing moves when it arrives: one line
// of the surrounding text by default.
export function Skeleton({
  widthPercent = 100,
  heightPx,
}: Readonly<{ widthPercent?: number; heightPx?: number }>) {
  return (
    <span
      className={s.skeleton}
      aria-hidden="true"
      style={{
        width: `${String(widthPercent)}%`,
        ...(heightPx === undefined ? {} : { height: `${String(heightPx)}px` }),
      }}
    />
  );
}
