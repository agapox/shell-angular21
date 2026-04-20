export function loadRemoteScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = false;

    script.onload = () => {
      resolve();
    };

    script.onerror = (event) => {
      console.error('[failed]', src, event);
      reject(new Error(`Error loading ${src}`));
    };

    document.head.appendChild(script);
  });
}
