import { cx } from '@/utils/cx';
import { X } from '@untitledui/icons';
import * as React from 'react';
import { Dialog, Heading, Modal, ModalOverlay } from 'react-aria-components';

export type BaseModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title?: React.ReactNode;
  ariaLabel?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  isDismissable?: boolean;
  className?: string;
};

export function BaseModal({
  isOpen,
  onOpenChange,
  title,
  ariaLabel,
  children,
  footer,
  isDismissable = true,
  className,
}: BaseModalProps) {
  const computedAriaLabel =
    ariaLabel ?? (typeof title === 'string' ? title : undefined) ?? 'Dialog';

  return (
    <ModalOverlay
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={isDismissable}
      className={cx(
        'fixed inset-0 z-50 bg-black/70',
        'flex min-h-dvh items-center justify-center p-4 overflow-y-auto',
        'entering:animate-in entering:fade-in entering:duration-300',
        'exiting:animate-out exiting:fade-out exiting:duration-200'
      )}
    >
      <Modal
        className={cx(
          'w-full max-w-md rounded-2xl bg-white outline-none',
          'entering:animate-in entering:zoom-in-95 entering:duration-300',
          'exiting:animate-out exiting:zoom-out-95 exiting:duration-200',
          className
        )}
      >
        <Dialog aria-label={computedAriaLabel} className="outline-none">
          <div className="px-5 py-7">
            {(title || isDismissable) && (
              <div className="flex items-center justify-between gap-4">
                {title ? (
                  <Heading
                    slot="title"
                    className="text-xl font-bold leading-7.5 text-gray-900"
                  >
                    {title}
                  </Heading>
                ) : (
                  <span />
                )}

                {isDismissable && (
                  <button
                    type="button"
                    onClick={() => onOpenChange(false)}
                    aria-label="Close"
                    className={cx(
                      'inline-flex h-9 w-9 items-center justify-center rounded-lg',
                      'text-gray-400 hover:bg-gray-100 hover:text-gray-700',
                      'focus:outline-none focus:ring-2 focus:ring-gray-300'
                    )}
                  >
                    <X />
                  </button>
                )}
              </div>
            )}

            <div className="mt-4">{children}</div>

            {footer && (
              <div className="mt-6 border-t border-gray-200 pt-4">
                <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                  {footer}
                </div>
              </div>
            )}
          </div>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}
