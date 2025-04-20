//Čistimo stilove da ne bi dolazilo do mešanja kada prelazimo sa komponente na komponentu

export function cleanupComponentStyles(except = []) {
  const removeStyles = (attrName) => {
    const styles = document.querySelectorAll(`style[${attrName}]`);
    styles.forEach(style => {
      const name = style.getAttribute(attrName);
      if (!except.includes(name)) {
        if (style.parentNode) {
          style.parentNode.removeChild(style);
        }
      }
    });
  };

  removeStyles('data-tatamata-style');
  removeStyles('data-component-style');
}
