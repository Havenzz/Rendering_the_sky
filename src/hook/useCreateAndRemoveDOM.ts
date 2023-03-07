import { onUnmounted } from "vue";

export default (DOMName: string) => {
    const DOM = document.createElement('DIV');
    DOM.id = DOMName;
    document.body.appendChild(DOM);

    onUnmounted(() => {
        document.body.removeChild(DOM);
    })
}