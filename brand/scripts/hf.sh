#!/usr/bin/env bash
# HyperFrames (HTML → video, github.com/heygen-com/hyperframes) con la configuración de MAS.
#
#   brand/scripts/hf.sh check  brand/work/<slug>                                  # lint + runtime + layout + contraste
#   brand/scripts/hf.sh render brand/work/<slug> -o brand/work/<slug>/out/<slug>.mp4
#   brand/scripts/hf.sh preview brand/work/<slug>                                 # Studio local (solo en tu compu)
#
# - Versión fija: el mismo proyecto se renderiza igual mañana.
# - Bloquea los comandos que suben el proyecto a internet (publish, cloud, lambda, cloudrun): el proyecto
#   carga las fuentes Obviously y su licencia prohíbe servirlas o compartirlas (brand/fonts/README.md).
# - Sin telemetría ni consulta de skills a GitHub.
# - En sesiones de Claude en la nube usa el Chromium que ya trae el contenedor (no puede bajar el suyo).
set -euo pipefail

HF_VERSION=0.8.171

case "${1:-}" in
  publish|cloud|lambda|cloudrun)
    echo "hf.sh: '$1' sube el proyecto, con las fuentes Obviously, a internet. La licencia no lo permite." >&2
    exit 1 ;;
esac

export HYPERFRAMES_NO_TELEMETRY=1 HYPERFRAMES_SKIP_SKILLS=1
if [ -z "${HYPERFRAMES_BROWSER_PATH:-}" ]; then
  for b in /opt/pw-browsers/chromium_headless_shell-*/chrome-linux/headless_shell; do
    [ -x "$b" ] && export HYPERFRAMES_BROWSER_PATH="$b"
  done
fi

exec npx --yes "hyperframes@$HF_VERSION" "$@"
