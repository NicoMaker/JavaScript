function showChildren() {
    let container = document.getElementById("container");
    let children = container.childNodes;
    let message = "Nodi figli trovati:\n";
    children.forEach(node => {
        message += node.nodeName + "\n";
    });
    alert(message);
}