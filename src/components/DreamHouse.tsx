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

    /**
     * Textures
     */
    const textureLoader = new THREE.TextureLoader()

    /**
     * House
     */
    //================= Group ==================//
    const house = new THREE.Group()
    scene.add(house)
    //================= Group ==================//

    //Walls
    const walls = new THREE.Mesh(
      new THREE.BoxGeometry(4, 2.5, 4),
      new THREE.MeshStandardMaterial({ color: '#ac8e82' })
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
      new THREE.PlaneGeometry(2, 2),
      new THREE.MeshStandardMaterial({ color: '#aa7b7b' })
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

    // Floor (create floor)
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20),
      new THREE.MeshStandardMaterial({ color: '#a9c388' })
    )
    floor.rotation.x = -Math.PI * 0.5
    floor.position.y = 0
    scene.add(floor)

    /**
     * Lights
     */
    // Ambient light
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
    gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
    scene.add(ambientLight)

    // Directional light
    const moonLight = new THREE.DirectionalLight('#ffffff', 0.5)
    moonLight.position.set(4, 5, -2)
    gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
    gui.add(moonLight.position, 'x').min(-5).max(5).step(0.001)
    gui.add(moonLight.position, 'y').min(-5).max(5).step(0.001)
    gui.add(moonLight.position, 'z').min(-5).max(5).step(0.001)
    scene.add(moonLight)

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

    /**
     * Animate
     */
    const clock = new THREE.Clock()

    const tick = () => {
      const elapsedTime = clock.getElapsedTime()

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
