// 1.引入threejs
import * as THREE from "three";
//2. 引入RGBELoader 加载器
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

// 3.构建需要的3d的类
class Base3d {
  constructor(selector) {
    this.container = document.querySelector(selector); //场景中创建的物体
    this.camera; //照相机（Camera）
    this.scene; //场景（Scene）
    this.renderer; //渲染器（Renderer）

    //初始化
    this.init()
    // 渲染界面
    this.animate()
  }

  init() {
    this.initScene(); //初始化场景
    this.initCamera(); //初始化照相机
    this.initRenderer(); //初始化渲染器
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
    // 渲染的画面挂载到元素上
    console.log(this.container);
    this.container.appendChild(this.renderer.domElement);
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