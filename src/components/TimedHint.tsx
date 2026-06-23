import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  watchValue: unknown;
  duration?: number;
};

export function TimedHint({ children, watchValue, duration = 1000 }: Props) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setVisible(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => setVisible(false), duration);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [watchValue, duration]);

  return visible ? children : null;
}
