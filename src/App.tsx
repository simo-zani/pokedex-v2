import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PowerProvider } from "./hooks/usePowerState";
import { ThemeProvider } from "./hooks/useTheme";
import PokedexShell from "./components/shell/PokedexShell";
import HomePage from "./pages/HomePage";
import PokemonPage from "./pages/PokemonPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      gcTime: Infinity,
      retry: 2,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <PowerProvider>
            <PokedexShell>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/pokemon/:id" element={<PokemonPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </PokedexShell>
          </PowerProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
