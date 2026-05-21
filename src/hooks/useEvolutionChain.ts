import { useQuery } from "@tanstack/react-query";
import type { EvolutionChainResponse } from "../lib/types";

const baseUrl = "https://pokeapi.co/api/v2";

export function useEvolutionChain(url: string | undefined) {
  const id = url?.split("/").filter(Boolean).pop();

  return useQuery<EvolutionChainResponse>({
    queryKey: ["evolution-chain", id],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/evolution-chain/${id}`);
      if (!res.ok) throw new Error("Failed to fetch evolution chain");
      return res.json();
    },
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: !!id,
  });
}
