import { sampleHtml, sampleCss } from '../assets/samples.js';

const appendStyle = (style: string) => {
    const styleElement = document.createElement('style');
    styleElement.textContent = style;
    document.head.append(styleElement);
};

chrome.storage.sync.get(['html', 'js', 'css'], items => {
    const container = document.getElementById('container');
    container.insertAdjacentHTML('afterbegin', items.html ?? sampleHtml);
    appendStyle(items.css ?? sampleCss);
});
