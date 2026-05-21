import { useNavigate } from "react-router-dom";
import { parseEvolutionChain } from "../../lib/evolution";
import type { EvolutionChainResponse } from "../../lib/types";
import { getDefaultRetroGame, mapGameVersionToSpritePath } from "../../lib/sprites";
import EvolutionArrow from "./EvolutionArrow";
import TransparentSprite from "./TransparentSprite";

const spriteBase = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

interface EvolutionChainProps {
  data: EvolutionChainResponse;
  isRetro: boolean;
}

function getRetroSpriteUrl(id: number): string {
  const game = getDefaultRetroGame(id);
  if (game === "default") {
    return `${spriteBase}/${id}.png`;
  }
  const info = mapGameVersionToSpritePath(game);
  if (!info) {
    return `${spriteBase}/${id}.png`;
  }
  return `${spriteBase}/versions/${info.gen}/${info.game}/${id}.png`;
}

function NodeView({ speciesName, speciesId, isRetro }: { speciesName: string; speciesId: number; isRetro: boolean }) {
  const navigate = useNavigate();
  const src = isRetro ? getRetroSpriteUrl(speciesId) : `${spriteBase}/${speciesId}.png`;

  return (
    <button
      onClick={() => navigate(`/pokemon/${speciesId}`)}
      className="flex flex-col items-center gap-1"
    >
      {isRetro ? (
        <TransparentSprite
          src={src}
          alt={speciesName}
          width={40}
          height={40}
          className="gb-evo-filter"
        />
      ) : (
        <img
          src={src}
          alt={speciesName}
          className="w-14 h-14 object-contain pixelated"
        />
      )}
      <span className={`capitalize whitespace-nowrap ${
        isRetro ? "text-[6px] font-retro text-gb-darkest" : "text-[11px] font-modern text-gray-700"
      }`}>
        {speciesName.replace(/-/g, " ")}
      </span>
    </button>
  );
}

function ChainBranch({ node, isRetro }: { node: ReturnType<typeof parseEvolutionChain>; isRetro: boolean }) {
  if (node.children.length === 0) {
    return <NodeView speciesName={node.speciesName} speciesId={node.speciesId} isRetro={isRetro} />;
  }

  if (node.children.length === 1) {
    const child = node.children[0]!;
    return (
      <div className="flex items-center">
        <NodeView speciesName={node.speciesName} speciesId={node.speciesId} isRetro={isRetro} />
        <EvolutionArrow details={child.details} isRetro={isRetro} />
        <ChainBranch node={child} isRetro={isRetro} />
      </div>
    );
  }

  return (
    <div className="flex items-start">
      <div className="flex items-center pt-2">
        <NodeView speciesName={node.speciesName} speciesId={node.speciesId} isRetro={isRetro} />
      </div>
      <div className={`flex flex-col gap-3 ${isRetro ? "ml-1" : "ml-2"}`}>
        {node.children.map((child, i) => (
          <div key={i} className="flex items-center">
            <EvolutionArrow details={child.details} isRetro={isRetro} />
            <ChainBranch node={child} isRetro={isRetro} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EvolutionChain({ data, isRetro }: EvolutionChainProps) {
  const root = parseEvolutionChain(data.chain);

  return (
    <div className={`p-3 ${isRetro ? "border-t border-gb-dark" : ""}`}>
      <h2 className={`mb-3 uppercase tracking-wider ${
        isRetro
          ? "text-[8px] font-retro text-gb-darkest"
          : "text-base font-modern text-gray-600"
      }`}>
        {isRetro ? "CATENA EVOLUTIVA" : "Catena evolutiva"}
      </h2>
      <div className="overflow-x-auto pb-2">
        <div className="inline-flex min-w-0">
          <ChainBranch node={root} isRetro={isRetro} />
        </div>
      </div>
    </div>
  );
}
