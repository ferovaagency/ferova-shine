/**
 * Mapa clave→ícono para la home. El contenido (src/content/home.ts) referencia
 * íconos por string; aquí se resuelven a componentes de lucide-react.
 */
import {
  Users, ShoppingCart, UserCog, BrainCircuit, Gauge, Compass,
  Search, TrendingUp, Code, Bot, Package, type LucideIcon,
} from "lucide-react";

export const HOME_ICONS: Record<string, LucideIcon> = {
  users: Users,
  "shopping-cart": ShoppingCart,
  "user-cog": UserCog,
  "brain-circuit": BrainCircuit,
  gauge: Gauge,
  compass: Compass,
  search: Search,
  "trending-up": TrendingUp,
  code: Code,
  bot: Bot,
  package: Package,
};
