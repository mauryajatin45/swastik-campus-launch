/// <reference types="vite/client" />

// Video file declarations
declare module "*.MOV" {
  const src: string;
  export default src;
}

declare module "*.mov" {
  const src: string;
  export default src;
}

declare module "*.mp4" {
  const src: string;
  export default src;
}
