import { useEffect, useState } from "react";
import { getDashboardData } from "../api";

export default function Emergency() {

  const [emergency,setEmergency] = useState(null);


  useEffect(()=>{

    const load = ()=>{

      getDashboardData()
      .then(data=>{

        const total = data.stadiums.reduce(
          (acc,stadium)=>{

            acc.incidents += stadium.metrics.emergency.activeIncidents;
            acc.teams += stadium.metrics.emergency.responseTeamsDeployed;
            acc.calls += stadium.metrics.emergency.medicalCallsLastHour;

            return acc;

          },
          {
            incidents:0,
            teams:0,
            calls:0
          }
        );


        setEmergency(total);

      });

    }


    load();

    const interval=setInterval(load,4000);

    return ()=>clearInterval(interval);


  },[])



return (

<section className="px-margin-desktop reveal" id="emergency">

<div className="grid grid-cols-12 gap-gutter">


<div className="col-span-12 lg:col-span-4 space-y-gutter">


<div className="glass-panel emergency-glass p-8 rounded-xl">


<div className="flex items-center gap-3 text-emergency-red mb-4">

<span className="material-symbols-outlined">
emergency
</span>


<h3 className="font-headline-md text-headline-md">
TACTICAL RESPONSE
</h3>


</div>



<p className="text-on-surface-variant mb-6">

AI emergency monitoring active across all connected stadiums.
Real-time incidents are detected and response teams are coordinated automatically.

</p>



<button className="w-full border border-emergency-red text-emergency-red py-4 font-bold hover:bg-emergency-red hover:text-white transition-all uppercase tracking-widest">

EXECUTE RESPONSE PROTOCOL

</button>


</div>




<div className="glass-panel p-6 rounded-xl">


<h4 className="text-data-label font-data-label mb-4 opacity-60 uppercase">

Emergency Status

</h4>



<div className="flex justify-between items-center">


<span className="text-data-value font-data-value">

{emergency?.incidents || 0} INCIDENTS

</span>



<span className={`px-2 py-1 text-xs font-bold ${
(emergency?.incidents || 0)>0
?"bg-red-500/20 text-red-400"
:"bg-neon-green/20 text-neon-green"
}`}>

{
(emergency?.incidents || 0)>0
?"ACTIVE"
:"CLEAR"
}

</span>


</div>


</div>



<div className="glass-panel p-6 rounded-xl">


<h4 className="text-data-label font-data-label mb-4 opacity-60 uppercase">

Response Teams

</h4>


<div className="flex justify-between">


<span className="text-data-value font-data-value">

{emergency?.teams || 0}

</span>


<span className="text-neon-green">

DEPLOYED

</span>


</div>


</div>


</div>




<div className="col-span-12 lg:col-span-8 glass-panel rounded-xl overflow-hidden relative h-[500px]">


<img

alt="Emergency Response Tactical Map"

className="w-full h-full object-cover"

src="/images/emergency.png"

/>


<div className="absolute inset-0 bg-emergency-red/5 mix-blend-overlay"></div>


</div>



</div>


</section>


)

}