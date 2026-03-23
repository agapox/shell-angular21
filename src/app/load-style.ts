export function loadRemoteStyle(href: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`link[href="${href}"]`);
    if (existing) {
      resolve();
      return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;

    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Error loading ${href}`));

    document.head.appendChild(link);
  });
}
