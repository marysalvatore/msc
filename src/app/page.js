"use client"
import Image from "next/image";
import Universal from "@/components/Universal/Universal";
import Footer from "@/components/Footer/Footer";
import { useEffect, useState } from "react";

export default function Home() {
  const [geoInfo, setGeoInfo] = useState(null)

  useEffect(() => {
    async function getGeoInfo() {
      const response = await fetch('/api/getInfo')
      const data = await response.json()
      setGeoInfo(data)
    }

    getGeoInfo()
  } , [])

  return (
    <div className="App">
      <Universal data={geoInfo} />
      <Footer />
    </div>
  );
}
