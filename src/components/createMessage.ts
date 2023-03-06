import { h, render } from 'vue';
import Message from './message.vue';
export type MessageType = 'success' | 'error' | 'default';

const createMessage = (message: string, type: MessageType, timeout?: number) => {
    const messageVnode = h(Message, {
        message,
        type
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