import { useEffect, useState } from "react";
import { getDashboardData } from "../api";

export default function StadiumHub() {

const [telemetry,setTelemetry]=useState(null);


useEffect(()=>{

const load=()=>{

getDashboardData()
.then(data=>{

const stadium=data.stadiums[0];

setTelemetry({

sensors: stadium.metrics.iot.sensorsOnline,

totalSensors: stadium.metrics.iot.sensorsTotal,

weather: stadium.metrics.weather.condition,

emergency: stadium.metrics.emergency.activeIncidents,

latency: stadium.metrics.iot.avgLatencyMs

});


})

}


load();

const interval=setInterval(load,4000);


return()=>clearInterval(interval);


},[])



return (

<section className="px-margin-desktop reveal" id="stadium-hub">


<div className="glass-panel rounded-xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">


<div className="w-full md:w-2/3 relative h-[400px] md:h-auto">


<img

alt="Stadium Intelligence Hub"

className="w-full h-full object-cover"

src="/images/stadium.png"

/>


<div className="absolute inset-0 bg-gradient-to-r from-surface to-transparent"></div>


</div>



<div className="w-full md:w-1/3 p-12 flex flex-col justify-center">


<h2 className="font-display-lg text-display-lg mb-6 leading-tight">

STADIUM

<br/>

INTELLIGENCE

</h2>



<p className="text-on-surface-variant mb-8 font-body-lg">

Real-time digital twin monitoring powered by AI.
Every sensor, crowd movement and emergency signal
is analyzed continuously.

</p>



<ul className="space-y-4">


<li className="flex items-center gap-3">

<span className="material-symbols-outlined text-neon-green">

wifi_tethering

</span>


<span className="text-data-label font-data-label">

{telemetry
? `${telemetry.sensors}/${telemetry.totalSensors} SENSOR NODES`
:"LOADING SENSORS"}

</span>


</li>




<li className="flex items-center gap-3">

<span className="material-symbols-outlined text-neon-green">

ac_unit

</span>


<span className="text-data-label font-data-label">

WEATHER: {telemetry?.weather || "--"}

</span>


</li>




<li className="flex items-center gap-3">

<span className="material-symbols-outlined text-neon-green">

emergency

</span>


<span className="text-data-label font-data-label">

{telemetry
? `${telemetry.emergency} ACTIVE INCIDENTS`
:"CHECKING STATUS"}

</span>


</li>



<li className="flex items-center gap-3">

<span className="material-symbols-outlined text-neon-green">

speed

</span>


<span className="text-data-label font-data-label">

{telemetry
? `${telemetry.latency}ms NETWORK LATENCY`
:"--"}

</span>


</li>



</ul>


</div>


</div>


</section>

)

}