export function diff(vDom, dom) {
  let vDomChildNodes = vDom.childNodes;

  console.log("diff function run with", vDomChildNodes, dom.childNodes);
  //check if DOM is empty but there are child nodes in vDom then add all those child nodes in DOM
  if (vDom.hasChildNodes() && !dom.hasChildNodes()) {
    for (let i = 0; i < vDomChildNodes.length; i++) {
      const template = vDomChildNodes[i].cloneNode(true);
      dom.append(template);
    }
  } else {
    //if bith vDom and dom are equal
    if (vDom.isEqualNode(dom)) {
      return;
    }

    //if DOM have more nodes the vDom then remove extra nodes
    if (vDomChildNodes.length < dom.childNodes.length) {
      let difference = dom.childNodes.length - vDomChildNodes.length;
      for (; difference > 0; difference--) {
        dom.childNodes[dom.childNodes.length - 1].remove();
      }
    }

    //compare every child node of vDom with dom
    for (let i = 0; i < vDomChildNodes.length; i++) {
      //if DOM doesnt have child node at current index, then add the corresponding childnode for vDom into the dom
      if (!dom.childNodes[i]) {
        const template = vDomChildNodes[i].cloneNode(true);
        dom.append(template);
      } else {
        //if it is present then check wether both node are same or not
        if (getnodeType(vDomChildNodes[i]) === getnodeType(dom.childNodes[i])) {
          //check the if child node is text node and if different then update the DOM text node with vDom text node
          if (
            vDomChildNodes[i].nodeType === 3 &&
            dom.childNodes[i].nodeType === 3
          ) {
            if (
              vDomChildNodes[i].textContent !== dom.childNodes[i].textContent
            ) {
              dom.childNodes[i].textContent = vDomChildNodes[i].textContent;
            }
          } else {
            //if nodes are not text then check and update attributes of the child nodes
          }
        } else {
          //if the node in DOM IS DIFFERENT than node in Vdom then replace the child node in DOM by corresponding child node of Vdom
          dom.childNodes[i].replaceWith(vDomChildNodes[i].cloneNode(true));
        }
        //if child is not text type but an element then run diff recursively to check and compare the child nodes of the current child node of vDom and DOM
        if (vDomChildNodes[i].nodeType !== 3) {
          diff(vDomChildNodes[i], dom.childNodes[i]);
        }
      }
    }
  }
}

function getnodeType(node) {
  if (node.nodeType == 1) return node.tagName.toLowerCase();
  else return node.nodeType;
}
