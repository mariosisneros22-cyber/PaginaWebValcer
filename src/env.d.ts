/// <reference types="astro/client" />

export {};

declare global {
  interface Window {
    __valcerCopyInit?: boolean;
    __valcerToastTimer?: number;
  }
}