declare module "react-pdf" {
  import * as React from "react";

  export interface DocumentProps {
    file: string | File | Uint8Array | Blob;
    onLoadSuccess?: (data: { numPages: number }) => void;
    loading?: React.ReactNode;
    children?: React.ReactNode; //
  }

  export interface PageProps {
    pageNumber: number;
    width?: number;
    scale?: number;
    renderTextLayer?: boolean;
    renderAnnotationLayer?: boolean;
    loading?: React.ReactNode;
  }

  export const Document: React.FC<DocumentProps>;
  export const Page: React.FC<PageProps>;

  export const pdfjs: any;
}
