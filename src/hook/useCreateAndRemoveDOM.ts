import { onUnmounted } from "vue";

export default (DOMName: string) => {
    const DOM = document.createElement('DIV');
    DOM.id = DOMName;
    document.body.appendChild(DOM);
    if(DOMName === 'back'){
        document.body.style.overflow = 'hidden'
    }

    onUnmounted(() => {
        document.body.removeChild(DOM);
        if(DOMName === 'back'){
            document.body.removeAttribute('style')
        }
    })
}