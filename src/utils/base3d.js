// 1.引入threejs
import * as THREE from "three";
//2. 引入RGBELoader 加载器
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
// 4. 引入轨道控制器（控制器的一种）-----围绕物体进行查看
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
// 5.引入模型解析器
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

// 3.构建需要的3d的类
class Base3d {
  constructor(selector) {
    this.container = document.querySelector(selector); //场景中创建的物体
    this.camera; //照相机（Camera）
    this.scene; //场景（Scene）
    this.renderer; //渲染器（Renderer）

    this.model; //模型

    //初始化
    this.init()
    // 渲染界面
    this.animate()
  }

  init() {
    this.initScene(); //初始化场景
    this.initCamera(); //初始化照相机
    this.initRenderer(); //初始化渲染器
    this.initControls(); //初始化控制器
    this.addMesh(); //添加模型/物体
  }
  initScene() {
    this.scene = new THREE.Scene(); //初始化场景
    this.setEnvMap('000'); //初始化场景的背景
  }
  initCamera() {
    /**
     * PerspectiveCamera 透视相机
     * 
     * 第一个参数为 角度 例如 45 45°
     * 第二个参数为 摄像头的宽高比例 
     * 第三个参数为 最近的距离为多少
     * 第四个参数为 最远的距离为多少
     */
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.25,
      200
    )

    // 设置摄像机的位置 (参数为三位坐标)
    this.camera.position.set(-1.8, 0.6, 2.7)
  }
  initRenderer() {
    /**
     * 初始化渲染器
     * 
     * antialias 表示抗锯齿 指模型的圆润程度
     */
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    //设置屏幕像素比
    this.renderer.setPixelRatio(window.devicePixelRatio)
    // 渲染的尺寸大小
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // 色调映射 ACESFilmicToneMapping--电影级别的
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    //曝光程度
    this.renderer.toneMappingExposure = 3
    // 渲染的画面挂载到元素上
    this.container.appendChild(this.renderer.domElement);
  }
  initControls() {
    /**
     * 初始化控制器
     * 
     * 第一个参数为 摄像头
     * 第二个参数为 渲染器
     */
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
  }

  //设置场景的背景
  setEnvMap(hdr) {
    new RGBELoader().setPath("./files/hdr/").load(hdr + ".hdr", (texture) => {
      /**
       * 纹理的映射
       * 
       * EquirectangularReflectionMapping 圆柱映射
       */
      texture.mapping = THREE.EquirectangularReflectionMapping;
      // 加载纹理对象
      this.scene.background = texture;
      this.scene.environment = texture;
    })
  }

  // 设置模型
  setModel(modelName) {
    return new Promise((resolve, reject) => {
      // 初始化解析器
      const loader = new GLTFLoader().setPath('files/gltf/')
      loader.load(modelName, (gltf) => {
        //场景的第一个就是模型
        this.model = gltf.scene.children[0]
        this.scene.add(this.model)
        resolve(modelName + '模型添加成功')
      })
    })
  }
  addMesh() {
    this.setModel('bag2.glb')
  }

  // 渲染界面 
  render() {
    this.renderer.render(this.scene, this.camera)
  }
  //渲染帧
  animate() {
    this.renderer.setAnimationLoop(this.render.bind(this))
  }
}

export default Base3d