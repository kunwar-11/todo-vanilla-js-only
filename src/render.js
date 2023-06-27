import { diff } from "./diffing/index.js";

export function render(template, dom) {
  //convert vDom to HTML because right now vDom is string
  let vDom = parseHTML(template);
  //this will remove the extra line(next line) text node and comment from the DOM
  clean(dom);
  diff(vDom, dom);
}

function parseHTML(str) {
  let parser = new DOMParser();
  let doc = parser.parseFromString(str, "text/html");
  //this will remove the extra line(next line) text node and comment from the DOM
  clean(doc.body);
  return doc.body;
}

//this function will remove the comment and text node (which are next line text node)
function clean(dom) {
  for (let i = 0; i < dom.childNodes.length; i++) {
    let child = dom.childNodes[i];
    if (
      child.nodeType === 8 ||
      (child.nodeType === 3 &&
        !/\S/.test(child.nodeValue) &&
        child.nodeValue.includes("\n"))
    ) {
      dom.removeChild(child);
      i--;
    } else {
      if (child.nodeType === 1) {
        clean(child);
      }
    }
  }
}
