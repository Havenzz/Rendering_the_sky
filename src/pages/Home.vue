<template>
    <div class="home">
        <div class="home_loading" :style="{ width: width + 'px', height: height + 'px' }" v-if="isLoading">
            <span>(●'◡'●) 模型加载中...</span>
        </div>
        <div id="home_threeJS" v-show="!isLoading" ref="threeRef"></div>
        <div class="textBox">
            <h1>Welcome</h1>
            <h1>to</h1>
            <h1>Logic's</h1>
            <h1>blog!</h1>
            <div class="btn_container">
                <button @click="goInfoRoute">了解更多</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, Ref } from 'vue';
import * as THREE from 'three'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useRouter } from 'vue-router';

export default defineComponent({
    setup() {
        // router
        const router = useRouter()
        // 该页面需要
        const isLoading = ref(false);
        const computedAspect = () => {
            let width: number, height: number;
            if (window.innerWidth <= 800) {
                width = window.innerWidth;
                height = window.innerHeight - 345;
            } else if (window.innerWidth <= 1200) {
                width = 800;
                height = window.innerHeight - 245;
            } else {
                width = 800;
                height = window.innerHeight - 100;
            }
            return {
                width,
                height
            }
        }
        // timer 
        let timer: NodeJS.Timeout;
        // threejs
        let { width, height } = computedAspect();
        let camera: THREE.PerspectiveCamera,
            scene: THREE.Scene,
            renderer: THREE.WebGLRenderer,
            controls: OrbitControls,
            aspect: number = width / height;
        // threejsDOM
        const threeRef = ref<Ref | null>(null);
        const init = () => {
            // 开启 loading
            isLoading.value = true

            // 场景
            scene = new THREE.Scene();

            // 摄像机
            camera = new THREE.PerspectiveCamera(30, aspect, 0.1, 1000);
            camera.position.set(4, 1.3, 4.1);

            // 渲染器
            renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true
            });
            threeRef.value.appendChild(renderer.domElement)
            // 设置色调
            renderer.toneMappingExposure = 1;
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.outputEncoding = THREE.sRGBEncoding;
            renderer.setSize(width, height)

            // 控制器
            controls = new OrbitControls(camera, renderer.domElement);
            controls.autoRotate = true;
            controls.autoRotateSpeed = -0.6;

            // // // 坐标图
            // const axe = new THREE.AxesHelper(5);
            // scene.add(axe)

            // // // 地面网格
            // const gridHelper = new THREE.GridHelper(10, 10);
            // gridHelper.material.opacity = 0.2;
            // gridHelper.material.transparent = true;
            // scene.add(gridHelper)

            // 加载器
            const load = async () => {


                const loadGLTF = new GLTFLoader();
                const loadDraco = new DRACOLoader();
                loadDraco.setDecoderPath('../src/lib/draco/');
                loadGLTF.setDRACOLoader(loadDraco);
                await new Promise((resolve, reject) => {
                    loadGLTF.load('src/lib/the_sky.glb', (gltf: GLTF) => {
                        let obj = gltf.scene;
                        obj.position.y = -0.16;
                        obj.traverse((child: any) => {
                            if (child.isMesh) {
                                if (['174', '177', '175', '176'].includes(child.name.replace('Object_', ''))) {
                                    child.material.color = new THREE.Color(0xFFFF00);
                                }
                                if (['180', '181', '182', '183'].includes(child.name.replace('Object_', ''))) {
                                    child.material.color = new THREE.Color(0xCC8800);
                                }
                                if (['185', '187'].includes(child.name.replace('Object_', ''))) {
                                    child.material.color = new THREE.Color(0xCC0000);
                                }
                            }
                        })

                        scene.add(obj);
                        renderer.render(obj, camera)
                        resolve(obj)
                    },
                        undefined,
                        reject => {
                            console.log(reject)
                        })
                })
                // 解除 loading
                isLoading.value = false
            }
            load()
        }
        let req: null | number = null;
        const onresize = () => {
            let { width, height } = computedAspect();
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        }
        onMounted(() => {
            // 初始化
            init()
            // 递归
            const render = () => {
                req = requestAnimationFrame(render);
                controls && controls.update();
                renderer.render(scene, camera);
            }
            // 首次执行
            render()
            window.addEventListener('resize', onresize)
        })

        onUnmounted(() => {
            cancelAnimationFrame(req as number);
            window.removeEventListener('resize', onresize)
            renderer.domElement.remove();
            renderer.dispose();
            clearTimeout(timer);
            isLoading.value = false
        })

        const goInfoRoute = () => {
            router.push('/info')
        }

        return {
            threeRef,
            goInfoRoute,
            isLoading,
            width,
            height
        }
    }
})
</script>

<style scoped lang="less">
.home {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    display: flex;
    padding-top: 66px;
    box-sizing: border-box;
}

.home_loading {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    --size: 50px;

    @media screen and (max-width: 1200px) {
        margin: 0 auto;
    }

    span {
        display: block;
        box-sizing: border-box;
        color: #fff;
        font-size: 18px;
        text-align: center;
        line-height: 30px;
        padding-top: 30px;
    }

    &::before {
        content: '';
        width: var(--size);
        height: var(--size);
        border: 3px solid #fff;
        border-right-color: #AA97EC;
        border-radius: 50%;
        animation: rotate .8s linear infinite;
    }

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
}


#home_threeJS {
    overflow: hidden;

    @media screen and (max-width: 1200px) {
        margin: 0 auto;
    }
}

:deep(#home_threeJS canvas) {
    cursor: grab;
}

.textBox {
    position: absolute;
    top: 16%;
    right: 66px;
    overflow: hidden;
    padding: 10px;
    user-select: none;
    box-sizing: border-box;


    h1 {
        font-size: 110px;
        color: #aa97ec;
        text-align: end;
        text-shadow: 2px 2px 0px #d89aeb, 4px 4px 0px #e0bede;
        @media screen and (max-width:900px) {
            text-shadow: 1px 1px 0px #d89aeb, 2px 2px 0px #e0bede;
        }
    }

    .btn_container {
        margin-top: 66px;
        display: flex;
        justify-content: end;

        button {
            margin: 10px;
            padding: 16px 20px;
            background-color: rgba(6, 6, 6, 0.66);
            box-shadow: 0px 3px 7px 0px rgb(0 0 0 / 35%);
            text-shadow: 0 0 3px #a189e2, 0 0 6px #e0b5eb, ;
            color: #fff;
        }
    }

    @media screen and (max-width: 1200px) {
        display: flex;
        flex-flow: wrap;
        justify-content: center;
        top: 100%;
        width: 800px;
        margin: 0 auto;
        left: 0;
        right: 0;

        h1 {
            font-size: 56px;
            margin-right: 20px;
            text-align: center;
        }

        .btn_container {
            margin: 0 auto;
            display: block;
            width: 100%;
            text-align: center;
        }
    }

    @media screen and (max-width: 800px) {
        width: 100%;

        h1 {
            font-size: 42px;
        }
    }

    @media screen and (max-width: 520px) {
        top: 105%;

        h1 {
            font-size: 28px;
            margin-right: 10px;
        }

        .btn_container {
            margin: 20px auto 0;
            display: block;
            width: 100%;
            text-align: center;
        }
    }
}
</style>