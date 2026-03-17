import { JSDOM } from "jsdom";
const dom = new JSDOM(`<!DOCTYPE html><body><div id="test">We're hiring. If you're passionate about media, technology, and the future of Canada's digital ecosystem, come build with us. We're always looking for great people. Check out our jobs page for current opportunities.</div></body>`);
const element = dom.window.document.getElementById("test");
const words = element.textContent?.split(' ') || [];
element.textContent = '';
words.forEach((word, index) => {
    const span = dom.window.document.createElement('span');
    span.textContent = word;
    element.appendChild(span);

    if (index < words.length - 1) {
        element.appendChild(dom.window.document.createTextNode(' '));
    }
});
console.log("innerHTML:", element.innerHTML);
