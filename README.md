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
| **🎨 Categorías** | Filtrá por grupo (control-plane, core, networking, security, etc.) haciendo clic en la leyenda |
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

## Desarrollo

```
kube-elements/
├── index.html          # Página principal
├── app.js              # Lógica interactiva (213 líneas)
├── style.css           # Estilos completos
├── data/
│   └── elements.js     # Base de datos de 120+ elementos
├── Dockerfile          # Multi-stage con nginx alpine
└── docker-compose.yml  # Puerto 8080
```

## Roadmap

- [x] Grilla interactiva con 120+ elementos
- [x] Drawer con descripción, kubectl y YAML
- [x] Filtro por categorías
- [x] Docker + docker-compose
- [ ] Búsqueda por nombre
- [ ] Vista oscura/clara
- [ ] Soporte multilenguaje
- [ ] Exportar elementos como PDF
- [ ] Tests automatizados

## Licencia

MIT
