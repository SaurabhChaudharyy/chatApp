import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormLabel } from "./ui/form"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import axios from "axios";




export default function HomeComponent() {
  const[loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const { toast } = useToast();
  
  const postDetails = (pics) => {
      setLoading(true)
      if(pics === undefined){
        toast({
          title: "Please select and image",
          variant: "destructive",
          duration:1000,
        });
        setLoading(false);
        return;
      }
      let reader = new FileReader();
      reader.onloadend = () =>{
        setPreview(reader.result);
      }
      reader.readAsDataURL(pics);
      setLoading(false);
    }
      
    const handleImageUpload = async(e) =>{
      e.preventDefault();

      if(!preview) return;

      try {
        // const res = axios.post("http://localhost:8000/upload",{
        //   image_url :preview,
        // });
        console.log("success");
        toast({
          title: "Successfully uploaded the image",
          variant: "default",
          duration:1000,
        });
        // console.log(res);
      } catch (error) {
        console.log(error);
        toast({
          title: "Please select and image",
          variant: "destructive",
          duration:1000,
        });
      }
      


    }

    const submitHandlerSignup = () =>{

    }

    const submitHandlerSignin = () =>{
      
    } 
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Welcome</CardTitle>
        <CardDescription>Sign up or sign in to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs className="space-y-4" defaultValue="signup">
          <TabsList className="grid grid-cols-2 gap-2">
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            <TabsTrigger value="signin">Sign In</TabsTrigger>
          </TabsList>
          <TabsContent value="signup">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="m@example.com" type="email" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="profile-image">Profile Image</Label>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Input onChange={(e)=>postDetails(e.target.files[0])} style={{ marginRight: '20px' }} id="profile-image" type="file" accept="image" />
                  <Button onClick={handleImageUpload} style={{ padding: '2px 10px', fontSize: '14px' , width: '100px' }}>Upload</Button>
                  </div>
                </div>
                <img src={preview}/>
              </div>
              <Button className="w-full" onClick = {submitHandlerSignup} disabled={loading}>
              {loading ? 'Signing Up...' : 'Sign Up'}
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="signin">
            <div className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="m@example.com" type="email" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div>
              <div className="flex items-center justify-between">
                <Button onClick = {submitHandlerSignin}className="w-full" type="submit">
                  Sign In
                </Button>
                <Link className="ml-4 inline-block text-sm underline" href="#">
                  Forgot password?
                </Link>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
