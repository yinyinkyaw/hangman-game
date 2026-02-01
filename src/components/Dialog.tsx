import { forwardRef, type ComponentProps } from 'react';

export const DialogPopup = forwardRef<HTMLDialogElement, ComponentProps<'dialog'>>(
  (props, ref) => {
    const { children, ...rest } = props;
    return (
      <dialog
        ref={ref}
        {...rest}
        className="shadow-inset fixed top-1/2 left-1/2 h-fit w-[calc(100%-4rem)] overflow-visible rounded-4xl bg-linear-to-b from-blue-500 to-blue-900 p-12 text-white xl:w-xl"
      >
        {children}
      </dialog>
    );
  }
);
