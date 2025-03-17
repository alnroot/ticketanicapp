"use client"

import { useEffect, useRef, useState } from "react"
import { Html5Qrcode } from "html5-qrcode"
import { Button } from "@/components/ui/button"

interface QRScannerProps {
  onScan: (data: string) => void
  onError?: (error: string) => void
}

export default function QRScanner({ onScan, onError }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [scannerInitialized, setScannerInitialized] = useState(false)
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const scannerContainerId = "qr-reader"

  useEffect(() => {
    // Cleanup function to stop scanner when component unmounts
    return () => {
      if (scannerRef.current && scannerInitialized) {
        scannerRef.current.stop().catch((error) => {
          console.error("Error stopping scanner:", error)
        })
      }
    }
  }, [scannerInitialized])

  const startScanner = async () => {
    try {
      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode(scannerContainerId)
      }

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
      }

      await scannerRef.current.start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
          onScan(decodedText)
          // Optionally stop scanning after successful scan
          // stopScanner()
        },
        (errorMessage) => {
          // Ignore errors during scanning as they're usually just frames without QR codes
          if (onError && errorMessage.includes("No QR code found")) {
            // This is normal behavior when no QR is in view
            return
          }

          if (onError) {
            onError(errorMessage)
          }
        },
      )

      setIsScanning(true)
      setScannerInitialized(true)
    } catch (error) {
      console.error("Error starting scanner:", error)
      if (onError) {
        onError("Error al iniciar el escáner: " + error)
      }
    }
  }

  const stopScanner = async () => {
    if (scannerRef.current && isScanning) {
      try {
        await scannerRef.current.stop()
        setIsScanning(false)
      } catch (error) {
        console.error("Error stopping scanner:", error)
      }
    }
  }

  const toggleScanner = () => {
    if (isScanning) {
      stopScanner()
    } else {
      startScanner()
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div id={scannerContainerId} className="w-full max-w-md h-64 bg-gray-100 rounded-lg overflow-hidden"></div>
      <div className="mt-4">
        <Button onClick={toggleScanner} className="w-full">
          {isScanning ? "Detener Escáner" : "Iniciar Escáner"}
        </Button>
      </div>
    </div>
  )
}

