export default function (sel, data, children, text, elm){
    const key = data === undefined ? undefined : data.key;
    return { sel:sel.toLowerCase(), data, children, text, elm, key };
}
