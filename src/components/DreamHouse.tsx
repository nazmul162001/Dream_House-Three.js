import React, { useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'lil-gui'

const DreamHouse = () => {
  useEffect(() => {
    /**
     * Base
     */
    // Debug
    const gui = new dat.GUI()

    // Canvas
    const canvas: HTMLElement = document.querySelector(
      'canvas.webgl'
    ) as HTMLElement

    // Scene
    const scene = new THREE.Scene()

    // Fog
    const fog = new THREE.Fog('#262837', 2, 15) // color, near, far
    scene.fog = fog

    /**
     * Textures
     */
    const textureLoader = new THREE.TextureLoader()

    const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
    const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
    const doorAmbientOcclusionTexture = textureLoader.load(
      './textures/door/ambientOcclusion.jpg'
    )
    const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
    const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg')
    const doorMetalnessTexture = textureLoader.load(
      './textures/door/metalness.jpg'
    )
    const doorRoughnessTexture = textureLoader.load(
      './textures/door/roughness.jpg'
    )

    // Bricks Texture
    const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
    const bricksAmbientOcclusionTexture = textureLoader.load(
      '/textures/bricks/ambientOcclusion.jpg'
    )
    const bricksNormalTexture = textureLoader.load(
      '/textures/bricks/normal.jpg'
    )
    const bricksRougnessTexture = textureLoader.load(
      '/textures/bricks/rougness.jpg'
    )

    // Grass Texture
    const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
    const grassAmbientOcclusionTexture = textureLoader.load(
      '/textures/grass/ambientOcclusion.jpg'
    )
    const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
    ;('/textures/grass/rougness.jpg')
    const grassRougnessTexture = textureLoader.load()

    // repeat
    grassColorTexture.repeat.set(8, 8)
    grassAmbientOcclusionTexture.repeat.set(8, 8)
    grassNormalTexture.repeat.set(8, 8)
    grassRougnessTexture.repeat.set(8, 8)

    grassColorTexture.wrapS = THREE.RepeatWrapping
    grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
    grassNormalTexture.wrapS = THREE.RepeatWrapping
    grassRougnessTexture.wrapS = THREE.RepeatWrapping

    grassColorTexture.wrapT = THREE.RepeatWrapping
    grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
    grassNormalTexture.wrapT = THREE.RepeatWrapping
    grassRougnessTexture.wrapT = THREE.RepeatWrapping

    /**
     * House
     */
    //================= House Group ==================//
    const house = new THREE.Group()
    scene.add(house)
    //================= House Group ==================//

    //Walls
    const walls = new THREE.Mesh(
      new THREE.BoxGeometry(4, 2.5, 4),
      new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRougnessTexture, // wall sharpness & oil painting
      })
    )
    walls.geometry.setAttribute(
      'uv2',
      new THREE.BufferAttribute(walls.geometry.attributes.uv.array, 2)
    )
    walls.position.y = 1.25
    house.add(walls)

    // Roof (Using Pyramid)
    const roof = new THREE.Mesh(
      new THREE.ConeGeometry(3.5, 1, 4),
      new THREE.MeshStandardMaterial({ color: '#b35f45' })
    )
    // By default ConeGeometry set to the bottom - let's move up the roof
    roof.position.y = 2.5 + 0.5 // 2.5 is the same as the BoxGeometry & 0.5 is the half of the ConeGeometry
    // rotate the roof
    roof.rotation.y = Math.PI * 0.25 // or Math.PI / 4 is the same result
    house.add(roof)

    // Door
    const door = new THREE.Mesh(
      new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
      new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture,
      })
    )
    door.geometry.setAttribute(
      'uv2',
      new THREE.BufferAttribute(door.geometry.attributes.uv.array, 2)
    )
    // fixed the position of the door
    door.position.y = 1 // 1 is the half of the planeGeometry
    door.position.z = 2 + 0.01 // 2 is the half of the  last value in the BoxGeometry
    house.add(door)

    // Bushes
    const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
    const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })

    const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
    bush1.scale.set(0.5, 0.5, 0.5)
    bush1.position.set(0.8, 0.2, 2.2)

    const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
    bush2.scale.set(0.25, 0.25, 0.25)
    bush2.position.set(1.4, 0.1, 2.1)

    const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
    bush3.scale.set(0.4, 0.4, 0.4)
    bush3.position.set(-0.8, 0.1, 2.2)

    const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
    bush4.scale.set(0.15, 0.15, 0.15)
    bush4.position.set(-1, 0.05, 2.6)

    house.add(bush1, bush2, bush3, bush4)

    //================= Graves Group ==================//
    const graves = new THREE.Group()
    scene.add(graves)
    //================= Graves Group ==================//

    const graveGeometry = new THREE.BoxGeometry(0.6, 0.88, 0.2)
    const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' })

    // set random angle position for graves
    for (let i = 0; i < 50; i++) {
      const angle = Math.random() * Math.PI * 2
      // set random distance for grave
      const radius = 3 + Math.random() * 6 // radius value starting from 3 & maximum 9
      const x = Math.sin(angle) * radius
      const z = Math.cos(angle) * radius

      const grave = new THREE.Mesh(graveGeometry, graveMaterial)
      grave.position.set(x, 0.3, z)
      // set the grave random rotation
      grave.rotation.y = (Math.random() - 0.5) * 0.4
      grave.rotation.z = (Math.random() - 0.5) * 0.4
      graves.add(grave)
    }

    // Floor (create floor)
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20),
      new THREE.MeshStandardMaterial({
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRougnessTexture,
      })
    )
    floor.geometry.setAttribute(
      'uv2',
      new THREE.BufferAttribute(floor.geometry.attributes.uv.array, 2)
    )
    floor.rotation.x = -Math.PI * 0.5
    floor.position.y = 0
    scene.add(floor)

    /**
     * Lights
     */
    // Ambient light
    const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
    gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
    scene.add(ambientLight)

    // Directional light
    const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
    moonLight.position.set(4, 5, -2)
    gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
    gui.add(moonLight.position, 'x').min(-5).max(5).step(0.001)
    gui.add(moonLight.position, 'y').min(-5).max(5).step(0.001)
    gui.add(moonLight.position, 'z').min(-5).max(5).step(0.001)
    scene.add(moonLight)

    // Door Light
    const doorLight = new THREE.PointLight('#ff7d46', 1, 7) // color, intensity, distance
    doorLight.position.set(0, 2.2, 2.7)
    house.add(doorLight) // it's a part of the house that's why I add in into house Group

    /**
     * Ghost
     */
    const ghost1 = new THREE.PointLight('#ff00ff', 2, 3)
    scene.add(ghost1)

    const ghost2 = new THREE.PointLight('#00ffff', 2, 3)
    scene.add(ghost2)

    const ghost3 = new THREE.PointLight('#ffff00', 2, 3)
    scene.add(ghost3)

    /**
     * Sizes
     */
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    }

    window.addEventListener('resize', () => {
      // Update sizes
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight

      // Update camera
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()

      // Update renderer
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    )
    camera.position.x = 4
    camera.position.y = 2
    camera.position.z = 5
    scene.add(camera)

    // Controls
    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas,
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    // Set same fog color when zoom out screen
    renderer.setClearColor('#262837')

    /**
     * Animate
     */
    const clock = new THREE.Clock()

    const tick = () => {
      const elapsedTime = clock.getElapsedTime()

      // Update Ghosts
      const ghost1Angle = elapsedTime * 0.5
      ghost1.position.x = Math.cos(ghost1Angle) * 4
      ghost1.position.z = Math.sin(ghost1Angle) * 4
      ghost1.position.y = Math.sin(elapsedTime * 3)

      const ghost2Angle = -elapsedTime * 0.32
      ghost2.position.x = Math.cos(ghost2Angle) * 5
      ghost2.position.z = Math.sin(ghost2Angle) * 5
      ghost2.position.y =
        Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

      const ghost3Angle = -elapsedTime * 0.18
      ghost3.position.x =
        Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
      ghost3.position.z =
        Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5))
      ghost3.position.y =
        Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

      // Update controls
      controls.update()

      // Render
      renderer.render(scene, camera)

      // Call tick again on the next frame
      window.requestAnimationFrame(tick)
    }

    tick()
  }, [])
  return (
    <section>
      <canvas className='webgl'></canvas>
    </section>
  )
}

export default DreamHouse
