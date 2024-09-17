import { useCallback, useEffect, useMemo, useRef } from "react";

type Options = { multiple?: boolean; accept?: string };

const DEFAULT_OPTIONS: Options = { multiple: true, accept: "*" };
/**
 * Hook for picking files from user's computer
 * 
 * @param opts options for file input, default = { multiple: true, accept: "*" }
 */
export function useFilePicker(opts: Options) {
  const options = useMemo(() => ({ ...DEFAULT_OPTIONS, ...opts }), [opts]);
  const input = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!input.current) {
      input.current = document.createElement("input");
      input.current.type = "file";
      input.current.style.display = "none";
      document.body.appendChild(input.current);
    }

    return () => input.current?.remove();
  }, []);

  useEffect(() => {
    if (input.current) {
      if (options) {
        input.current.accept = options.accept || "";
        input.current.multiple = !!options.multiple;
      } else {
        input.current.accept = "";
        input.current.multiple = false;
      }
    }
  }, [options]);

  const onFilesSelected = useCallback((cb: (fileList: FileList) => void) => {
    if (input.current) {
      input.current.value = "";
      input.current.addEventListener(
        "change",
        () => {
          if (input.current && input.current.files) {
            cb(input.current.files);
          }
        },
        { once: true }
      );
      input.current.dispatchEvent(new MouseEvent("click"));
    }
  }, []);

  return {
    onFilesSelected,
  };
}
