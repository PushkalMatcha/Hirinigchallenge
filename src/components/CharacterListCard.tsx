import { Character } from '@/app/types/character'

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-400">{label}:</span>
      <span className="text-sm text-white">{value}</span>
    </div>
  );
}

export default function CharacterListCard(props: Character) {
  const getTypeStyles = (type: string) => {
    switch (type) {
      case "AI":
        return "bg-blue-500/20 text-blue-400";
      case "Sports":
        return "bg-green-500/20 text-green-400";
      case "Anime":
        return "bg-purple-500/20 text-purple-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (    <div className="bg-[rgb(var(--background-lighter-rgb))] p-6 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">          <div className="relative group">
            <div className={`absolute -inset-0.5 rounded-full opacity-75 group-hover:opacity-100 transition duration-300 blur
              ${props.type === "AI" ? "bg-gradient-to-r from-blue-600 to-cyan-600" :
                props.type === "Sports" ? "bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse" :
                "bg-gradient-to-r from-purple-600 to-pink-600"
              }`}>
            </div>
            <img 
              src={props.avatar} 
              alt={props.name}
              className={`relative w-12 h-12 rounded-full transform transition-all duration-300 
                ${props.type === "Sports" ? "animate-bounce hover:animate-none hover:scale-110 hover:rotate-6" : 
                  "hover:scale-110 hover:rotate-6"} bg-black`}
            />
          </div>
          <h3 className="text-xl font-semibold text-white">{props.name}</h3>
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded ${getTypeStyles(props.type)}`}>
          {props.type}
        </span>
      </div>
      
      <div className="space-y-2">
        {props.type === "AI" && (
          <>
            <InfoRow label="Race" value={props.race} />
            <InfoRow label="Role" value={props.role} />
            <InfoRow label="Capability" value={props.capability} />
            <InfoRow label="Version" value={props.version} />
            <InfoRow label="Uptime" value={props.uptime} />
          </>
        )}

        {props.type === "Sports" && (
          <>            <InfoRow label="Sport" value={props.sport} />
            <InfoRow label="Role" value={props.role} />
            <InfoRow label="Achievements" value={props.achievements} />
            <InfoRow label="Experience" value={props.experience} />
            <InfoRow label="Rating" value={props.rating} />
          </>
        )}

        {props.type === "Anime" && (
          <>
            <InfoRow label="Class" value={props.class} />
            <InfoRow label="Power" value={props.power} />
            <InfoRow label="Rank" value={props.rank} />
            <InfoRow label="Special Move" value={props.specialMove} />
            <InfoRow label="Power Level" value={props.powerLevel} />
            <InfoRow label="Transformations" value={props.transformations.toString()} />
          </>
        )}
      </div>
    </div>
  );
}
