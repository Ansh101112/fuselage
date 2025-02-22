import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import React from 'react';

type MessageGenericPreviewTitleProps = {
  children?: ReactNode;
  externalUrl?: string;
} & HTMLAttributes<HTMLSpanElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

export const MessageGenericPreviewTitle = ({
  externalUrl,
  ...props
}: MessageGenericPreviewTitleProps) =>
  externalUrl ? (
    <a
      className='rcx-message-generic-preview__title'
      href={externalUrl}
      target='_blank'
      {...props}
    />
  ) : (
    <span className='rcx-message-generic-preview__title' {...props} />
  );
