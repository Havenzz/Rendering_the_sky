import { h, render, defineAsyncComponent  } from 'vue';
export type MessageType = 'success' | 'error' | 'default';
export const MESSAGE_DELAY = 2000;


const createMessage = async (message: string, type: MessageType, timeout?: number) => {
    const Message = await defineAsyncComponent(() => import('./message.vue'));
    const messageVnode = h(Message, {
        message,
        type,
        timeout
    })
    const mountNode = document.createElement('div');
    render(messageVnode, mountNode);
    const destroy = () => {
        render(null, mountNode)
        mountNode.remove()
    }
    if (timeout) {
        setTimeout(() => {
            destroy()
        }, timeout);
    }

    return destroy
}

export default createMessage