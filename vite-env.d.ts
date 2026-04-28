/// <reference types="vite/client" />
/// <reference types="react" />
/// <reference types="react-dom" />

// Figma asset imports (for local development, these will be replaced with placeholders)
declare module 'figma:asset/*' {
  const content: string;
  export default content;
}