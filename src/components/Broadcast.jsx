import { useEffect, useState } from "react";
import { getDashboardData } from "../api";

export default function Broadcast() {

const [cctv,setCctv]=useState(null);

useEffect(()=>{

const load=()=>{
 getDashboardData().then(data=>{
   setCctv(data.stadiums[0].metrics.cctv)
 })
}

load();

const interval=setInterval(load,4000);

return()=>clearInterval(interval);

},[])


return (
<section className="px-margin-desktop max-w-container-max mx-auto reveal">

<div className="flex flex-col lg:flex-row gap-gutter">


<div className="flex-1 glass-panel p-1 rounded-xl overflow-hidden">

<img
alt="Broadcast Command Station"
className="w-full aspect-video object-cover"
src="/images/broadcast.png"
/>

</div>



<div className="w-full lg:w-96 space-y-gutter">


<div className="glass-panel p-6 rounded-xl">

<h4 className="text-data-label font-data-label text-neon-green mb-4">
LIVE CAMERA GRID
</h4>


<div className="grid grid-cols-2 gap-2">


{
[1,2,3,4].map((cam)=>(
<div
key={cam}
className={`aspect-square flex items-center justify-center ${
cam===3
?"bg-neon-green/20 border border-neon-green text-neon-green"
:"bg-surface-container-highest opacity-60"
}`}
>

CAM_{cam.toString().padStart(2,"0")}

</div>
))
}


</div>


<p className="mt-4 text-sm">

ONLINE:
<span className="text-neon-green ml-2">

{cctv ? cctv.camerasOnline:"--"}

</span>

</p>


<p className="text-sm">

INCIDENTS:

<span className="text-red-400 ml-2">

{cctv ? cctv.incidentsDetected:"--"}

</span>

</p>


</div>



<div className="glass-panel p-6 rounded-xl">

<h4 className="text-data-label font-data-label text-neon-green mb-4">
PRODUCTION TIMELINE
</h4>

<div className="space-y-4 font-data-label text-xs">

<div className="flex justify-between">
<span className="opacity-40">
14:02:11
</span>

<span>
INTRO GRAPHICS END
</span>

</div>


<div className="flex justify-between text-neon-green">

<span>
14:02:15
</span>

<span>
LIVE KICK-OFF
</span>

</div>


</div>


</div>


</div>

</div>

</section>
)

}