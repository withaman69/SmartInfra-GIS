function AppLoader() {
  const loadingSteps = [
  
    "Loading Dashboard...",
  ];

  return (
    <div className="h-screen bg-slate-950 flex flex-col items-center justify-center overflow-hidden relative">

      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full" />
<div className="absolute top-20 left-20 w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
<div className="absolute top-40 right-32 w-2 h-2 bg-blue-400 rounded-full animate-ping" />
<div className="absolute bottom-32 left-40 w-4 h-4 bg-cyan-500 rounded-full animate-ping" />
<div className="absolute bottom-24 right-24 w-3 h-3 bg-blue-500 rounded-full animate-ping" />
      {/* Animated Globe */}

      <div className="relative mb-10">

        <div className="w-40 h-40 rounded-full border-4 border-blue-500 animate-spin" />

        <div className="absolute inset-0 w-40 h-40 rounded-full border-t-4 border-cyan-400 animate-spin" />

        <div className="absolute inset-4 rounded-full border border-blue-400 opacity-40" />

        <div className="absolute inset-8 rounded-full border border-cyan-400 opacity-40" />

      </div>

      {/* Logo */}

      <h1 className="text-6xl font-black text-white tracking-wider">
        SmartInfra
      </h1>

      <p className="text-cyan-400 text-xl mt-3">
        GIS Intelligence Platform
      </p>

      {/* Loading Steps */}

      <div className="mt-12 space-y-3">

       {loadingSteps.map((step, index) => (
  <div
    key={index}
    className="flex items-center gap-3 text-slate-300 animate-pulse"
    style={{
      animationDelay: `${index * 0.8}s`,
    }}
  >
    <div className="w-2 h-2 rounded-full bg-cyan-400" />
    <span>{step}</span>
  </div>
))}
      </div>

     

     

    </div>
  );
}

export default AppLoader;