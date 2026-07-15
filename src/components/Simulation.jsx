import { useEffect, useState } from "react";
import { getDashboardData } from "../api";

export default function Simulation() {

  const [risk, setRisk] = useState(0);


  useEffect(() => {

    const calculateRisk = (data) => {

      let score = 0;

      data.stadiums.forEach((stadium) => {

        const m = stadium.metrics;


        // Emergency impact
        if (m.emergency.activeIncidents > 0) {
          score += 20;
        }


        // Crowd pressure
        if (m.crowdDensity.overallPercent > 85) {
          score += 15;
        } 
        else if (m.crowdDensity.overallPercent > 60) {
          score += 8;
        }


        // CCTV incidents
        if (m.cctv.incidentsDetected > 3) {
          score += 10;
        }


        // IoT problems
        if (m.iot.anomalyEvents > 5) {
          score += 5;
        }


        // Broadcast issues
        if (m.broadcast.status === "Technical Issue") {
          score += 5;
        }


        // Transport problems
        if (
          m.metro.status === "Suspended" ||
          m.metro.status === "Crowded"
        ) {
          score += 5;
        }

      });


      return Math.min(score, 100);

    };



    const fetchRisk = () => {

      getDashboardData()
        .then((data) => {

          const calculatedRisk = calculateRisk(data);

          setRisk(calculatedRisk);

        })
        .catch((err)=>{
          console.error("Risk calculation failed",err);
        });

    };


    fetchRisk();


    const interval = setInterval(fetchRisk,4000);


    return () => clearInterval(interval);


  },[]);



  return (

    <section className="px-margin-desktop max-w-container-max mx-auto reveal" id="simulation">

      <div className="glass-panel rounded-xl overflow-hidden">


        <div className="p-8 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container/30">


          <div>

            <span className="text-data-label font-data-label text-neon-green uppercase tracking-widest">

              Digital Twin Simulation

            </span>


            <h2 className="font-headline-md text-headline-md mt-1">

              AI SCENARIO RUNTIME: V4.2

            </h2>

          </div>



          <div className="flex gap-4">


            <div className="text-right">

              <span className="text-data-label font-data-label opacity-40 block">

                RISK INDEX

              </span>


              <span 
                className={`text-data-value font-data-value ${
                  risk > 70 
                  ? "text-red-400" 
                  : "text-neon-green"
                }`}
              >

                {risk}%

              </span>


            </div>



            <button className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all">

              <span className="material-symbols-outlined">

                refresh

              </span>

            </button>


          </div>


        </div>




        <div className="relative min-h-[500px]">


          <img

            alt="Stadium Digital Twin Simulation"

            className="w-full h-full object-cover opacity-60"

            src="/images/simulation.png"

          />



          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">


            <div className="w-64 h-64 border border-neon-green/40 rounded-full animate-ping">

            </div>


          </div>



          <div className="absolute bottom-6 left-6 glass-panel px-6 py-4 rounded-xl">

            <p className="text-sm opacity-60">

              LIVE AI ASSESSMENT

            </p>


            <p className="text-neon-green font-bold">

              {risk > 70 
                ? "HIGH PRIORITY RESPONSE REQUIRED"
                : risk > 40
                ? "MONITORING ACTIVE"
                : "SYSTEM STABLE"
              }

            </p>


          </div>


        </div>



      </div>


    </section>

  );

}