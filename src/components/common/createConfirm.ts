import { h, render, defineAsyncComponent  } from 'vue';

const createConfirm = async (message: string, callback: Function) => {
    const Confirm = await defineAsyncComponent(() => import('./confirm.vue'));
    const messageVnode = h(Confirm, {
        message,
        callback
    })
    const mountNode = document.createElement('div');
    render(messageVnode, mountNode);
    const destroy = () => {
        render(null, mountNode)
        mountNode.remove()
    }

    return destroy
}

export default createConfirm