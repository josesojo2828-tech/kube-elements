# kube-elements ☸️

[![HTML](https://img.shields.io/badge/HTML-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)](https://docker.com)

**Tabla periódica interactiva de Kubernetes.** Una guía visual para explorar los componentes, recursos y conceptos de Kubernetes, con comandos `kubectl` y snippets YAML para cada elemento.

## Cómo funciona

| Elemento | Funcionalidad |
|----------|--------------|
| **🧩 Grilla** | 120+ elementos organizados por categorías: Control Plane, Core, Networking, Security, CI/CD, etc. |
| **🔍 Búsqueda** | Filtrado instantáneo por nombre, símbolo o descripción |
| **🎨 Categorías** | Filtrá por grupo (control-plane, core, networking, security, etc.) haciendo clic en la leyenda |
| **🌓 Dark/Light mode** | Toggle para cambiar entre tema oscuro y claro |
| **📖 Drawer lateral** | Al hacer clic en un elemento: descripción, comandos `kubectl` frecuentes y manifiesto YAML de ejemplo |
| **📋 Copiar YAML** | Botón "Copiar" en el drawer para llevarte el manifiesto al portapapeles |

## Categorías

| Grupo | Elementos |
|-------|-----------|
| 🔵 **Control Plane & Infra** | Node, API Server, Scheduler, Controller Manager, etcd, Kubelet |
| 🟢 **Core Components** | Pod, Deployment, Service, Namespace, ReplicaSet |
| 🟡 **Config & Data** | ConfigMap, Secret, PersistentVolume, PersistentVolumeClaim |
| 🔴 **Networking** | Ingress, NetworkPolicy, Service Mesh, CNI |
| 🟣 **Security** | ServiceAccount, RBAC, PodSecurityPolicy, OPA/Gatekeeper |
| 🟠 **CI/CD & Deployments** | Rollout, Canary, Blue/Green, Helm, ArgoCD |
| ⚪ **Monitoring** | Prometheus, Grafana, Metrics Server, Alertmanager |
| 🔵 **Stateful Apps** | StatefulSet, Headless Service, Operator |
| 🟤 **Autoscaling & LB** | HPA, VPA, Cluster Autoscaler, Load Balancer |
| y más... |

## Quick Start

### Con Docker

```bash
docker compose up -d
# Abrir http://localhost:8080
```

### Sin Docker

```bash
# Servir con cualquier HTTP server
python3 -m http.server 8080
# O con npx
npx serve .
```

### GitHub Pages

El proyecto es 100% estático, ideal para GitHub Pages:

1. Andá a **Settings > Pages** del repo
2. En **Source** seleccioná **GitHub Actions**
3. El workflow `.github/workflows/pages.yml` se encarga del deploy automático

O simplemente configurá **Deploy from a branch** → `main` + `/ (root)`.

## Desarrollo

```
kube-elements/
├── index.html              # Página principal
├── app.js                  # Lógica interactiva (288 líneas)
├── style.css               # Estilos completos con dark/light mode
├── data/
│   └── elements.js         # Base de datos de 120+ elementos
├── tests/
│   ├── tests.html          # Arnés manual en el navegador
│   └── validate-data.js    # Validación automática (node, sin dependencias)
├── Dockerfile              # Nginx 1.27-alpine con healthcheck
├── docker-compose.yml      # Puerto 8080
├── Makefile                # test · serve · image
├── .github/
│   └── workflows/
│       ├── pages.yml       # Deploy a GitHub Pages
│       └── ci.yml          # Validación + build + smoke test
└── README.md
```

## Tests

Validación automática de la base de datos, sin navegador ni dependencias:

```bash
node tests/validate-data.js
```

Verifica que existan al menos 120 elementos, que los números atómicos y las
coordenadas `(row, col)` sean únicos, y que ningún campo requerido esté vacío.
El CI lo corre en cada push, junto con el build de la imagen y un smoke test
que levanta el contenedor y comprueba que responda.

Para inspección manual existe `tests/tests.html`: abrilo en el navegador y
muestra el resultado de cada verificación.

## Roadmap

- [x] Grilla interactiva con 120+ elementos
- [x] Drawer con descripción, kubectl y YAML
- [x] Filtro por categorías
- [x] Búsqueda por nombre
- [x] Vista oscura/clara
- [x] Docker + docker-compose
- [x] GitHub Pages
- [ ] Soporte multilenguaje
- [ ] Exportar elementos como PDF
- [x] Tests automatizados (headless)

## Licencia

MIT
