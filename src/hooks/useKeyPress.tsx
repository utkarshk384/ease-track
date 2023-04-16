import { useState, useEffect } from "react";

// Hook
export function useKeyPress(
  targetKey: string,
  action?: () => unknown
): boolean {
  const [keyPressed, setKeyPressed] = useState(false);

  function downHandler({ key }: KeyboardEvent): void {
    if (key === targetKey) {
      setKeyPressed(true);
      if (action) action();
    }
  }

  const upHandler = ({ key }: KeyboardEvent): void => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}
