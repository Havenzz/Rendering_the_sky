import { onMounted, onUnmounted, ref, Ref } from 'vue';
import * as THREE from 'three'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default (container: Ref<HTMLElement>) => {
    const isLoading = ref(false);
    const computedAspect = () => {
        let width: number, height: number;
        if (window.innerWidth <= 800) {
            width = window.innerWidth;
            height = window.innerHeight - 345;
        } else if (window.innerWidth <= 1200) {
            width = 750;
            height = window.innerHeight - 245;
        } else {
            width = 750;
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
        container.value.appendChild(renderer.domElement)
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
            loadDraco.setDecoderPath('/draco/');
            loadGLTF.setDRACOLoader(loadDraco);
            await new Promise((resolve, reject) => {
                loadGLTF.load('/glb/the_sky.glb', (gltf: GLTF) => {
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

    return {
        isLoading,
        width,
        height
    }
}