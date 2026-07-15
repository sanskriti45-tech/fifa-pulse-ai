import { useEffect, useState } from "react";
import { getDashboardData } from "../api";

export default function Header() {

const [status,setStatus]=useState(null);


useEffect(()=>{

const load=()=>{

getDashboardData()
.then(data=>{

setStatus(data.aggregate);

})
.catch(()=>{
setStatus(null);
})

}


load();

const interval=setInterval(load,4000);

return()=>clearInterval(interval);


},[])



return (

<header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-desktop py-4 bg-surface/15 dark:bg-surface-dim/20 backdrop-blur-xl border-b border-outline-variant/30">


<div className="flex items-center gap-8">


<span className="text-headline-md font-headline-md font-extrabold tracking-tighter text-primary dark:text-primary-fixed">

FIFA PULSE AI

</span>



<nav className="hidden md:flex items-center gap-6">


<a
className="text-primary dark:text-primary-fixed font-bold border-b-2 border-primary pb-1"
href="#hero"
>
Dashboard
</a>


<a
className="text-on-surface-variant hover:text-primary transition"
href="#stadium-hub"
>
Operational Hub
</a>


<a
className="text-on-surface-variant hover:text-primary transition"
href="#crowd-analytics"
>
Analytics
</a>


<a
className="text-on-surface-variant hover:text-primary transition"
href="#emergency"
>
Emergency
</a>


</nav>


</div>




<div className="flex items-center gap-5">


<div className="hidden md:flex items-center gap-3 text-xs">


<span className="flex items-center gap-1 text-neon-green">

<span className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></span>

SYSTEM ONLINE

</span>


<span className="opacity-60">

🏟️ {status?.stadiumCount || "--"} VENUES

</span>


<span className="opacity-60">

📡 LIVE

</span>


</div>



<button className="bg-primary-container text-on-primary-container px-6 py-2 rounded-full font-bold hover:scale-95 transition-all">

Deploy Field Mode

</button>


</div>


</header>

)

}