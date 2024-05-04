"use client"
import { Button } from "@/components/ui/button"
import HomeComponent from "@/components/home";



function popup() {
  alert("heelo user");
}
export default function Home() {
  return (
    <div>
      <Button variant="outline" onClick={popup}>Button</Button>
      <HomeComponent />
    </div>
  )
}
