export const isHTMLIFrame = (element: HTMLElement): element is HTMLIFrameElement =>
    element instanceof HTMLIFrameElement;

export const tabIds = ['html-tab', 'css-tab'] as const;
export type TabId = typeof tabIds[number];
export const isTabId = (value: string): value is TabId => tabIds.some(id => id === value);
