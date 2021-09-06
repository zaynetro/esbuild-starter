// Allow import sass modules.
declare module '*.scss' {
  const css: { [className: string]: string };
  export default css;
}
