"use client"

import { useEffect, useRef, useState } from "react"

interface CopilotCharacterProps {
  modelPath?: string
  className?: string
  trackCursor?: boolean
}

export function CopilotCharacter({
  modelPath = "/Copilot3D-0297b89f-44f5-41e0-8847-697f089b442a.glb",
  className = "",
  trackCursor = false,
}: CopilotCharacterProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container || typeof window === "undefined") return

    let animationFrameId: number
    let isCancelled = false
    let cleanupFn: (() => void) | null = null

    async function initThree() {
      try {
        const THREE = await import("three")
        const { GLTFLoader } = await import("three/addons/loaders/GLTFLoader.js")
        const { DRACOLoader } = await import("three/addons/loaders/DRACOLoader.js")

        if (isCancelled || !container) return

        let modelGroup: any = null

        // Scene setup
        const scene = new THREE.Scene()

        // Camera setup
        const rect = container.getBoundingClientRect()
        const width = rect.width || container.clientWidth || 400
        const height = rect.height || container.clientHeight || 400
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
        camera.position.set(0, 0, 5)

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setSize(width, height)
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
        renderer.outputColorSpace = THREE.SRGBColorSpace

        // Ensure canvas expands to fill container
        renderer.domElement.style.width = "100%"
        renderer.domElement.style.height = "100%"
        renderer.domElement.style.display = "block"

        container.appendChild(renderer.domElement)

        // Lighting setup
        const ambientLight = new THREE.AmbientLight(0xffffff, 2.0)
        scene.add(ambientLight)

        const mainLight = new THREE.DirectionalLight(0xffffff, 2.5)
        mainLight.position.set(5, 8, 5)
        mainLight.castShadow = true
        scene.add(mainLight)

        const fillLight = new THREE.DirectionalLight(0x9d4edd, 1.5)
        fillLight.position.set(-5, 2, -3)
        scene.add(fillLight)

        const topLight = new THREE.PointLight(0xffffff, 1.5, 10)
        topLight.position.set(0, 4, 2)
        scene.add(topLight)

        const bottomLight = new THREE.PointLight(0x7c4fd4, 1.2, 8)
        bottomLight.position.set(0, -3, 2)
        scene.add(bottomLight)

        // Mouse interaction variables
        let targetRotationY = 0
        let targetRotationX = 0
        let mouseX = 0
        let mouseY = 0

        const handleMouseMove = (event: MouseEvent) => {
          if (!trackCursor) return
          const currentRect = container.getBoundingClientRect()
          if (!currentRect.width || !currentRect.height) return

          const charCenterX = currentRect.left + currentRect.width / 2
          const charCenterY = currentRect.top + currentRect.height / 2

          // Normalize relative cursor position from character center across screen bounds
          const rawX = (event.clientX - charCenterX) / (window.innerWidth / 2)
          const rawY = -(event.clientY - charCenterY) / (window.innerHeight / 2)

          // Clamp to [-1, 1] for smooth, natural rotation limits
          mouseX = Math.max(-1, Math.min(1, rawX))
          mouseY = Math.max(-1, Math.min(1, rawY))
        }

        if (trackCursor) {
          window.addEventListener("mousemove", handleMouseMove)
        }

        // Setup GLTF & Draco Loaders
        const loader = new GLTFLoader()
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.7/gltf/")
        loader.setDRACOLoader(dracoLoader)

        loader.load(
          modelPath,
          (gltf: any) => {
            if (isCancelled) return
            modelGroup = gltf.scene

            // Calculate bounding box to center & auto-scale model
            const box = new THREE.Box3().setFromObject(modelGroup)
            const center = box.getCenter(new THREE.Vector3())
            const size = box.getSize(new THREE.Vector3())

            // Center model origin
            modelGroup.position.x = -center.x
            modelGroup.position.y = -center.y
            modelGroup.position.z = -center.z

            // Enable shadows & smooth materials
            modelGroup.traverse((child: any) => {
              if (child.isMesh) {
                child.castShadow = true
                child.receiveShadow = true
              }
            })

            const wrapper = new THREE.Group()
            wrapper.add(modelGroup)

            // Fit scale inside camera view
            const maxDim = Math.max(size.x, size.y, size.z) || 1
            const desiredScale = 3.2 / maxDim
            wrapper.scale.set(desiredScale, desiredScale, desiredScale)

            scene.add(wrapper)
            modelGroup = wrapper

            setIsLoading(false)
          },
          undefined,
          (error: any) => {
            console.error("Error loading 3D GLB model:", error)
            const msg = error?.message || error?.statusText || "Gagal mengunduh berkas GLB"
            setErrorMessage(msg)
            setIsLoading(false)
          }
        )

        // Handle Resize
        const handleResize = () => {
          if (!container) return
          const currentRect = container.getBoundingClientRect()
          const w = currentRect.width || container.clientWidth
          const h = currentRect.height || container.clientHeight
          if (w > 0 && h > 0) {
            camera.aspect = w / h
            camera.updateProjectionMatrix()
            renderer.setSize(w, h)
          }
        }

        const resizeObserver = new ResizeObserver(() => handleResize())
        resizeObserver.observe(container)

        // Animation Loop
        const clock = new THREE.Clock()

        const animate = () => {
          animationFrameId = requestAnimationFrame(animate)
          const elapsedTime = clock.getElapsedTime()

          if (modelGroup) {
            // Subtle floating / breathing idle animation
            modelGroup.position.y = Math.sin(elapsedTime * 1.8) * 0.08
            
            // Mouse look effect: head & eyes follow the cursor
            targetRotationY = -mouseX * 0.6
            targetRotationX = -mouseY * 0.35

            modelGroup.rotation.y += (targetRotationY - modelGroup.rotation.y) * 0.08
            modelGroup.rotation.x += (targetRotationX - modelGroup.rotation.x) * 0.08
          }

          renderer.render(scene, camera)
        }

        animate()

        cleanupFn = () => {
          if (trackCursor) {
            window.removeEventListener("mousemove", handleMouseMove)
          }
          resizeObserver.disconnect()
          cancelAnimationFrame(animationFrameId)
          if (renderer.domElement && container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement)
          }
          renderer.dispose()
          dracoLoader.dispose()
        }
      } catch (err: any) {
        console.error("Failed to initialize Three.js:", err)
        setErrorMessage(err?.message || "Gagal inisialisasi WebGL")
        setIsLoading(false)
      }
    }

    initThree()

    return () => {
      isCancelled = true
      if (cleanupFn) cleanupFn()
    }
  }, [modelPath, trackCursor])

  return (
    <div className={`relative w-full h-full min-h-[300px] flex items-center justify-center ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#7c4fd4] border-t-transparent" />
        </div>
      )}

      {errorMessage && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center p-4 text-xs text-purple-900/80 bg-white/80 backdrop-blur-md rounded-2xl border border-purple-200">
          <p className="font-semibold mb-1">Karakter 3D tidak dapat dimuat</p>
          <p className="text-[10px] text-purple-600/80">{errorMessage}</p>
        </div>
      )}

      <div ref={containerRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}
