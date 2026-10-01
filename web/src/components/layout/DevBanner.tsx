import { isDevMode } from "@/config/integrations";
import { getPendingIntegrations, getPublicConfig } from "@/lib/public-config";

const modeLabel = {
  "systeme-api": "API de Systeme.io",
  "systeme-embed": "formulario embebido de Systeme.io",
  "systeme-url": "página de registro de Systeme.io",
  "dev-simulated": "SIMULADO (no guarda datos ni envía correos)",
  pending: "pendiente",
} as const;

/** Barra superior visible sólo en modo desarrollo. */
export function DevBanner() {
  if (!isDevMode) return null;
  const pending = getPendingIntegrations();
  const { leadMode } = getPublicConfig();

  return (
    <div role="note" className="bg-dev text-ink">
      <details className="mx-auto max-w-[90rem] px-5 py-2 font-mono text-xs sm:px-8 lg:px-12">
        <summary className="cursor-pointer">
          <strong>MODO DESARROLLO</strong> · Registro: {modeLabel[leadMode]} ·{" "}
          {pending.length} integraciones pendientes (ver detalle)
        </summary>
        <ul className="mt-2 list-disc pl-5">
          {pending.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-2">
          Etiquetas amarillas = sólo desarrollo. En producción, las integraciones
          vacías muestran &quot;Configuración pendiente&quot;. Ver README.md.
        </p>
      </details>
    </div>
  );
}
