// kube-elements: Database of Kubernetes elements
// Contains 120 elements mapped to coordinates for a periodic table layout.

const KUBE_ELEMENTS = [
  // --- ROW 1 ---
  {
    number: 1,
    symbol: "No",
    name: "Node",
    group: "control-plane",
    row: 1,
    col: 1,
    desc: "Un nodo es una máquina de trabajo en Kubernetes, que puede ser física o virtual. Contiene los servicios necesarios para ejecutar Pods (como kubelet y container runtime) y es administrado por el plano de control.",
    kubectl: "kubectl get nodes\nkubectl describe node <node-name>",
    yaml: `apiVersion: v1
kind: Node
metadata:
  name: example-node
spec:
  unschedulable: false`
  },
  {
    number: 2,
    symbol: "Sa",
    name: "Stateful App",
    group: "stateful",
    row: 1,
    col: 18,
    desc: "Aplicación con estado. A diferencia de las stateless, requiere persistencia de datos y de identidad de red a lo largo de reinicios o reprogramaciones de contenedores (ej. bases de datos).",
    kubectl: "# Monitorear aplicaciones con estado en el cluster\nkubectl get statefulsets",
    yaml: `apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: stateful-app`
  },

  // --- ROW 2 ---
  {
    number: 3,
    symbol: "Op",
    name: "Operator",
    group: "control-plane",
    row: 2,
    col: 1,
    desc: "Patrón de extensión que utiliza recursos personalizados (CRDs) para automatizar el ciclo de vida completo de aplicaciones complejas, actuando como un administrador humano virtual.",
    kubectl: "kubectl get operators || echo \"No standard operator CRD installed\"",
    yaml: `apiVersion: k8s.operator.example/v1
kind: MyCustomApp
metadata:
  name: my-app-instance`
  },
  {
    number: 4,
    symbol: "Cl",
    name: "Cluster",
    group: "core",
    row: 2,
    col: 2,
    desc: "Conjunto de máquinas (nodos) que ejecutan aplicaciones contenedorizadas administradas por Kubernetes. Agrupa el plano de control y los nodos de trabajo.",
    kubectl: "kubectl cluster-info",
    yaml: `# El cluster en sí no se define en un YAML simple, se aprovisiona mediante herramientas como kubeadm o proveedores de nube.`
  },
  {
    number: 5,
    symbol: "Br",
    name: "Backup & Restore",
    group: "backup-dr",
    row: 2,
    col: 13,
    desc: "Procesos y herramientas (como Velero) para respaldar el estado del cluster (etcd) y los volúmenes persistentes, garantizando la recuperación ante desastres.",
    kubectl: "# Comandos típicos de Velero (si está instalado)\nvelero backup create my-backup --include-namespaces default",
    yaml: `apiVersion: velero.io/v1
kind: Backup
metadata:
  name: default-backup
  namespace: velero
spec:
  includedNamespaces:
  - '*'`
  },
  {
    number: 6,
    symbol: "Rb",
    name: "RBAC",
    group: "security",
    row: 2,
    col: 14,
    desc: "Control de Acceso Basado en Roles. Método para regular el acceso a los recursos de la API de Kubernetes en base a los roles de usuarios individuales o cuentas de servicio.",
    kubectl: "kubectl get roles,rolebindings --all-namespaces",
    yaml: `apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: default
  name: pod-reader
rules:
- apiGroups: [""] # "" indica el core API group
  resources: ["pods"]
  verbs: ["get", "watch", "list"]`
  },
  {
    number: 7,
    symbol: "Psp",
    name: "Pod Security",
    group: "security",
    row: 2,
    col: 15,
    desc: "Mecanismo (históricamente PodSecurityPolicy, ahora Pod Security Standards/Admission) para controlar aspectos de seguridad en la creación de Pods, como privilegios de root o acceso al host.",
    kubectl: "kubectl get ns --show-labels # Ver etiquetas de Pod Security en namespaces",
    yaml: `apiVersion: v1
kind: Namespace
metadata:
  name: secure-namespace
  labels:
    pod-security.kubernetes.io/enforce: restricted`
  },
  {
    number: 8,
    symbol: "Rbm",
    name: "RBAC Manager",
    group: "security",
    row: 2,
    col: 16,
    desc: "Operadores y herramientas de terceros para simplificar la gestión de accesos y autorizaciones RBAC en clusters multi-inquilino de gran escala.",
    kubectl: "# Obtener definiciones del manager si aplica\nkubectl get rbacdefinitions",
    yaml: `apiVersion: rbacmanager.reactiveops.com/v1beta1
kind: RBACDefinition
metadata:
  name: example-rbac`
  },
  {
    number: 9,
    symbol: "Iam",
    name: "Identity Mgmt",
    group: "security",
    row: 2,
    col: 17,
    desc: "Integración de Kubernetes con proveedores de identidad externos (OIDC, AWS IAM, Azure AD) para autenticar usuarios y asignarles roles del cluster.",
    kubectl: "# Ver la configuración del API server o tokens OIDC",
    yaml: `# Configurado vía flags del kube-apiserver:\n# --oidc-issuer-url=https://issuer.example.com\n# --oidc-client-id=kubernetes`
  },
  {
    number: 10,
    symbol: "Csi",
    name: "CSI",
    group: "stateful",
    row: 2,
    col: 18,
    desc: "Container Storage Interface. Estándar industrial que permite a proveedores de almacenamiento externos desarrollar plugins de storage que se integren directamente con Kubernetes sin tocar el core.",
    kubectl: "kubectl get csidrivers",
    yaml: `apiVersion: storage.k8s.io/v1
kind: CSIDriver
metadata:
  name: pd.csi.storage.gke.io
spec:
  attachRequired: true
  podInfoOnMount: true`
  },

  // --- ROW 3 ---
  {
    number: 11,
    symbol: "Cp",
    name: "Control Plane",
    group: "control-plane",
    row: 3,
    col: 1,
    desc: "Cerebro del cluster. Conjunto de servicios (API server, Scheduler, Controller Manager, etcd) que toman decisiones globales y detectan/responden a los eventos del cluster.",
    kubectl: "kubectl get pods -n kube-system -l tier=control-plane",
    yaml: `# Componentes del Control Plane típicamente corren como Static Pods definidos en /etc/kubernetes/manifests/`
  },
  {
    number: 12,
    symbol: "Pd",
    name: "Pod",
    group: "core",
    row: 3,
    col: 2,
    desc: "La unidad de ejecución más pequeña y simple en Kubernetes. Representa un grupo de uno o más contenedores que comparten almacenamiento, red y especificaciones de ejecución.",
    kubectl: "kubectl get pods\nkubectl logs <pod-name>\nkubectl exec -it <pod-name> -- sh",
    yaml: `apiVersion: v1
kind: Pod
metadata:
  name: web-pod
  labels:
    app: web
spec:
  containers:
  - name: nginx
    image: nginx:alpine
    ports:
    - containerPort: 80`
  },
  {
    number: 13,
    symbol: "Dr",
    name: "Disaster Recovery",
    group: "backup-dr",
    row: 3,
    col: 13,
    desc: "Estrategias de replicación multisitio y failover del cluster entero para asegurar la continuidad del negocio ante caídas totales del centro de datos.",
    kubectl: "# Verificar replicación de etcd o backup remoto",
    yaml: `# Estrategias declaradas en herramientas de GitOps multi-cluster como ArgoCD o Rancher Fleet.`
  },
  {
    number: 14,
    symbol: "Cmp",
    name: "Compliance Policies",
    group: "backup-dr",
    row: 3,
    col: 14,
    desc: "Políticas organizacionales aplicadas al cluster (ej. OPA Gatekeeper, Kyverno) para auditar y forzar el cumplimiento de estándares corporativos y regulatorios.",
    kubectl: "kubectl get constrainttemplates",
    yaml: `apiVersion: templates.gatekeeper.sh/v1
kind: ConstraintTemplate
metadata:
  name: k8srequiredlabels
spec:
  crd:
    spec:
      names:
        kind: K8sRequiredLabels`
  },
  {
    number: 15,
    symbol: "Au",
    name: "Authentication",
    group: "security",
    row: 3,
    col: 15,
    desc: "Fase de la API de Kubernetes que valida la identidad del emisor de una petición mediante certificados X.509, tokens HTTP, u OIDC.",
    kubectl: "kubectl auth can-i create pods",
    yaml: `apiVersion: authentication.k8s.io/v1
kind: TokenReview
spec:
  token: "eyJhbGciOiJSUzI1Ni..."`
  },
  {
    number: 16,
    symbol: "Az",
    name: "Authorization",
    group: "security",
    row: 3,
    col: 16,
    desc: "Fase que determina si un usuario o ServiceAccount autenticado tiene permiso para realizar una acción específica sobre un recurso (evaluado vía RBAC, ABAC, o Webhooks).",
    kubectl: "kubectl auth can-i list secrets --all-namespaces",
    yaml: `apiVersion: authorization.k8s.io/v1
kind: SubjectAccessReview
spec:
  user: "johndoe"
  resourceAttributes:
    verb: "get"
    resource: "pods"
    namespace: "default"`
  },
  {
    number: 17,
    symbol: "En",
    name: "Encryption",
    group: "security",
    row: 3,
    col: 17,
    desc: "Cifrado de datos tanto en tránsito (TLS entre componentes del cluster) como en reposo (cifrar los secretos guardados en la base de datos etcd).",
    kubectl: "# Validar TLS en la config de kubelet o api server",
    yaml: `apiVersion: apiserver.config.k8s.io/v1
kind: EncryptionConfiguration
resources:
  - resources:
      - secrets
    providers:
      - aescbc:
          keys:
            - name: key1
              secret: cGFzc3dvcmQxMjM0NTY3OA==`
  },
  {
    number: 18,
    symbol: "Pvc",
    name: "Volume Claim",
    group: "stateful",
    row: 3,
    col: 18,
    desc: "Persistent Volume Claim. Solicitud de almacenamiento realizada por un desarrollador. Define tamaño, tipo y modos de acceso (ej. ReadWriteOnce) sin preocuparse por la infraestructura física subyacente.",
    kubectl: "kubectl get pvc\nkubectl describe pvc <pvc-name>",
    yaml: `apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: task-pv-claim
spec:
  storageClassName: manual
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 3Gi`
  },

  // --- ROW 4 ---
  {
    number: 19,
    symbol: "Kt",
    name: "Kubelet",
    group: "control-plane",
    row: 4,
    col: 1,
    desc: "El agente principal que corre en cada nodo. Se asegura de que los contenedores descritos en los PodSpecs estén ejecutándose y saludables en la máquina.",
    kubectl: "systemctl status kubelet # Ejecutado en el nodo de trabajo",
    yaml: `# Archivo de configuración típico de Kubelet (/var/lib/kubelet/config.yaml):\nkind: KubeletConfiguration\napiVersion: kubelet.config.k8s.io/v1beta1\nauthentication:\n  anonymous:\n    enabled: false`
  },
  {
    number: 20,
    symbol: "Sv",
    name: "Service",
    group: "core",
    row: 4,
    col: 2,
    desc: "Abstracción que define una política de acceso y un nombre DNS lógico para un grupo de Pods dinámicos (seleccionados por etiquetas), actuando como balanceador de carga interno.",
    kubectl: "kubectl get svc\nkubectl describe service <service-name>",
    yaml: `apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app.kubernetes.io/name: MyApp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 9376
  type: ClusterIP`
  },
  {
    number: 21,
    symbol: "Cfm",
    name: "ConfigMap",
    group: "config",
    row: 4,
    col: 3,
    desc: "Objeto de API utilizado para guardar datos no confidenciales en formato clave-valor. Permite desacoplar la configuración del entorno de las imágenes de contenedor para máxima portabilidad.",
    kubectl: "kubectl get configmaps\nkubectl describe cm <cm-name>",
    yaml: `apiVersion: v1
kind: ConfigMap
metadata:
  name: game-config
data:
  ui.properties: |
    color.properties=orange
    allow.textmode=true
  user.interface: "normal"`
  },
  {
    number: 22,
    symbol: "St",
    name: "StatefulSet",
    group: "config",
    row: 4,
    col: 4,
    desc: "Controlador de workloads diseñado para aplicaciones con estado. Garantiza la identidad única y ordenada (ej: pod-0, pod-1) y almacenamiento persistente estable para cada Pod en el set.",
    kubectl: "kubectl get statefulsets\nkubectl describe statefulset <name>",
    yaml: `apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: web
spec:
  serviceName: "nginx"
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: registry.k8s.io/nginx-slim:0.24`
  },
  {
    number: 23,
    symbol: "Ct",
    name: "Container",
    group: "other",
    row: 4,
    col: 5,
    desc: "Paquete de software ejecutable y liviano que incluye todo lo necesario para correr una aplicación (código, runtime, herramientas de sistema, librerías).",
    kubectl: "# Ver detalles del contenedor dentro del Pod\nkubectl get pod <pod-name> -o jsonpath='{.spec.containers[*].image}'",
    yaml: `spec:
  containers:
  - name: my-app-container
    image: node:20-alpine
    resources:
      limits:
        memory: "256Mi"`
  },
  {
    number: 24,
    symbol: "Nm",
    name: "Node Maint.",
    group: "other",
    row: 4,
    col: 6,
    desc: "Procedimiento de mantenimiento del nodo. Consiste en acordonar (cordon) el nodo para no recibir nuevos Pods y drenar (drain) los existentes a otros nodos.",
    kubectl: "kubectl cordon <node-name>\nkubectl drain <node-name> --ignore-daemonsets --delete-emptydir-data",
    yaml: `# No se define por YAML, es una acción imperativa del CLI.`
  },
  {
    number: 25,
    symbol: "Cb",
    name: "CrashLoop",
    group: "other",
    row: 4,
    col: 7,
    desc: "CrashLoopBackOff. Estado de ciclo de falla en el cual un Pod se cae inmediatamente tras iniciar, y Kubernetes espera un tiempo incremental antes de volver a intentar iniciarlo.",
    kubectl: "kubectl get pods | grep CrashLoopBackOff\nkubectl logs <pod-name> --previous",
    yaml: `# Es un estado de runtime de error, no un objeto declarativo.`
  },
  {
    number: 26,
    symbol: "Cls",
    name: "CPU Limits",
    group: "other",
    row: 4,
    col: 8,
    desc: "Límites máximos de CPU asignados a un contenedor. Evita que un contenedor consuma ciclos de CPU ilimitados y afecte a otros contenedores del mismo nodo.",
    kubectl: "kubectl describe pod <pod-name> # Buscar la sección Limits",
    yaml: `spec:
  containers:
  - name: app
    image: hashicorp/http-echo
    resources:
      limits:
        cpu: "500m" # Equivalente a 0.5 cores`
  },
  {
    number: 27,
    symbol: "Cma",
    name: "Custom Metrics",
    group: "other",
    row: 4,
    col: 9,
    desc: "API de Métricas Personalizadas. Permite a Kubernetes escalar workloads (HPA) en función de métricas de aplicación que no sean solo CPU/RAM (ej: número de requests HTTP/seg).",
    kubectl: "kubectl get --raw \"/apis/custom.metrics.k8s.io/\"",
    yaml: `apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: custom-metric-hpa
spec:
  metrics:
  - type: Object
    object:
      metric:
        name: http_requests_per_second`
  },
  {
    number: 28,
    symbol: "Crv",
    name: "CRD Validation",
    group: "other",
    row: 4,
    col: 10,
    desc: "Validación de Custom Resource Definitions mediante OpenAPI v3 schema. Asegura que los campos ingresados por usuarios en recursos personalizados tengan el tipo y restricciones correctas.",
    kubectl: "kubectl explain mycustomresource",
    yaml: `apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: crontabs.stable.example.com
spec:
  versions:
  - name: v1
    schema:
      openAPIV3Schema:
        type: object
        properties:
          spec:
            type: object
            properties:
              cronSpec:
                type: string
                pattern: '^(\\d+|\\*)\\s+'`
  },
  {
    number: 29,
    symbol: "Ms",
    name: "Metrics Server",
    group: "monitoring",
    row: 4,
    col: 11,
    desc: "Agregador de métricas de recursos de cluster ultraligero y de corto plazo. Consulta datos de kubelet y expone la API utilizada por kubectl top y HPA.",
    kubectl: "kubectl top nodes\nkubectl top pods",
    yaml: `# Típicamente desplegado en kube-system:\n# image: registry.k8s.io/metrics-server/metrics-server:v0.6.4`
  },
  {
    number: 30,
    symbol: "Lg",
    name: "Logging",
    group: "monitoring",
    row: 4,
    col: 12,
    desc: "Registro de bitácoras. Mecanismo para capturar el stdout y stderr de los contenedores para auditoría, depuración y análisis histórico de comportamiento.",
    kubectl: "kubectl logs <pod-name>\nkubectl logs -f <pod-name> --tail=50",
    yaml: `# Estructurado típicamente enviando logs de consola a un agregador centralizado.`
  },
  {
    number: 31,
    symbol: "Al",
    name: "Audit Logs",
    group: "monitoring",
    row: 4,
    col: 13,
    desc: "Registro cronológico de actividades del sistema de Kubernetes. Registra las peticiones que se hacen al API Server con información de quién, cuándo y qué acción realizó.",
    kubectl: "# Configurado vía flags del kube-apiserver para escribir a disco",
    yaml: `apiVersion: audit.k8s.io/v1
kind: Policy
rules:
- level: RequestResponse
  resources:
  - group: ""
    resources: ["pods"]`
  },
  {
    number: 32,
    symbol: "Pe",
    name: "Policy Enforce",
    group: "governance",
    row: 4,
    col: 14,
    desc: "Ejecución activa de políticas en el cluster. Mecanismo que rechaza en el Admission Controller cualquier creación o modificación de recursos que viole directrices de seguridad o arquitectura.",
    kubectl: "kubectl describe admissionreports # OPA/Kyverno",
    yaml: `apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: disallow-privileged-containers
spec:
  validationFailureAction: Enforce`
  },
  {
    number: 33,
    symbol: "Pm",
    name: "Policy Mgmt",
    group: "governance",
    row: 4,
    col: 15,
    desc: "Administración centralizada de políticas corporativas. Herramientas para definir y distribuir reglas y estándares uniformes sobre múltiples clusters de Kubernetes.",
    kubectl: "# Listar políticas activas\nkubectl get clusterpolicies",
    yaml: `apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: require-labels`
  },
  {
    number: 34,
    symbol: "Fw",
    name: "Firewall",
    group: "governance",
    row: 4,
    col: 16,
    desc: "Cortafuegos y controles perimetrales. Políticas a nivel de nodo o de red cloud que restringen qué puertos e IPs pueden conectarse a la API de Kubernetes o a los balanceadores de carga.",
    kubectl: "# Comandos de firewall específicos del proveedor de nube o iptables local",
    yaml: `# Configurado fuera de K8s o mediante recursos CRD específicos del CNI (ej. Calico GlobalNetworkPolicy).`
  },
  {
    number: 35,
    symbol: "Sct",
    name: "Security Context",
    group: "governance",
    row: 4,
    col: 17,
    desc: "Conjunto de privilegios y configuración de control de acceso asignados a un Pod o contenedor en el YAML (ej. correr como usuario no-root, solo lectura en rootfs).",
    kubectl: "kubectl describe pod <pod-name> | grep -A 5 \"Security Context\"",
    yaml: `apiVersion: v1
kind: Pod
metadata:
  name: security-context-demo
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000`
  },
  {
    number: 36,
    symbol: "Crd",
    name: "CRD",
    group: "security",
    row: 4,
    col: 18,
    desc: "Custom Resource Definition. Objeto de la API de Kubernetes que te permite definir tus propios recursos personalizados, extendiendo las capacidades básicas del cluster con tus propios conceptos.",
    kubectl: "kubectl get crds",
    yaml: `apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: backplanes.agencia.com
spec:
  group: agencia.com
  versions:
    - name: v1
      served: true
      storage: true
  scope: Namespaced
  names:
    plural: backplanes
    singular: backplane
    kind: Backplane`
  },

  // --- ROW 5 ---
  {
    number: 37,
    symbol: "As",
    name: "API Server",
    group: "control-plane",
    row: 5,
    col: 1,
    desc: "Kube-apiserver. El punto de entrada principal para toda la administración del cluster. Expone la API de Kubernetes y procesa todas las consultas y mutaciones (CRUD) externas e internas.",
    kubectl: "kubectl get api-resources",
    yaml: `# Típicamente corre como un Pod estático en master-node`
  },
  {
    number: 38,
    symbol: "Dp",
    name: "Deployment",
    group: "core",
    row: 5,
    col: 2,
    desc: "Controlador declarativo para aplicaciones sin estado (stateless). Gestiona actualizaciones de software progresivas (Rolling Updates) y escalamiento de pods de manera automatizada.",
    kubectl: "kubectl get deployments\nkubectl scale deployment <name> --replicas=5\nkubectl rollout status deployment <name>",
    yaml: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80`
  },
  {
    number: 39,
    symbol: "Sc",
    name: "Secret",
    group: "config",
    row: 5,
    col: 3,
    desc: "Objeto diseñado para almacenar datos confidenciales como contraseñas, tokens OAuth y llaves SSH. A nivel de API, los valores se guardan codificados en Base64.",
    kubectl: "kubectl get secrets\nkubectl get secret my-secret -o jsonpath='{.data.password}' | base64 --decode",
    yaml: `apiVersion: v1
kind: Secret
metadata:
  name: my-secret
type: Opaque
data:
  username: YWRtaW4= # admin en Base64
  password: MWYyZDNhNDFiZDM= # hash en Base64`
  },
  {
    number: 40,
    symbol: "Ds",
    name: "DaemonSet",
    group: "config",
    row: 5,
    col: 4,
    desc: "Controlador que asegura que todos (o algunos) de los nodos del cluster ejecuten exactamente una copia de un Pod específico. Común para demonios de logs o agentes de monitorización.",
    kubectl: "kubectl get daemonsets",
    yaml: `apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: fluentd-elasticsearch
spec:
  selector:
    matchLabels:
      name: fluentd-elasticsearch
  template:
    metadata:
      labels:
        name: fluentd-elasticsearch
    spec:
      containers:
      - name: fluentd-elasticsearch
        image: quay.io/fluentd_elasticsearch/fluentd:v2.5.2`
  },
  {
    number: 41,
    symbol: "Sh",
    name: "Scheduler",
    group: "other",
    row: 5,
    col: 5,
    desc: "Kube-scheduler. Componente de plano de control que monitoriza los Pods recién creados que no tienen un nodo asignado, y selecciona el nodo de trabajo óptimo en base a recursos disponibles y políticas.",
    kubectl: "kubectl get pods -n kube-system -l component=kube-scheduler",
    yaml: `# El scheduler se configura en su inicio con directivas YAML de scheduling.`
  },
  {
    number: 42,
    symbol: "Cm",
    name: "Custom Metrics",
    group: "other",
    row: 5,
    col: 6,
    desc: "Métricas personalizadas en runtime. Estadísticas producidas por el código del usuario y exportadas por utilidades como Prometheus exporter para evaluar el rendimiento interno.",
    kubectl: "# Validar métricas expuestas en el puerto de métricas del Pod",
    yaml: `# Típica anotación para scraping automático:\n# prometheus.io/scrape: "true"\n# prometheus.io/port: "8080"`
  },
  {
    number: 43,
    symbol: "Ru",
    name: "Rolling Update",
    group: "other",
    row: 5,
    col: 7,
    desc: "Estrategia de actualización por defecto de los Deployments. Va reemplazando gradualmente instancias viejas de Pods por nuevas sin interrumpir el servicio (cero downtime).",
    kubectl: "kubectl rollout history deployment/<name>\nkubectl rollout undo deployment/<name> # Rollback",
    yaml: `spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0`
  },
  {
    number: 44,
    symbol: "Mls",
    name: "Mem. Limits",
    group: "other",
    row: 5,
    col: 8,
    desc: "Límites de memoria RAM asignados a un contenedor. Si un contenedor sobrepasa este límite, el kernel de Linux lo detendrá inmediatamente con un error OOMKilled (Out of Memory).",
    kubectl: "kubectl describe pod <pod> # Validar si terminó por OOMKilled",
    yaml: `spec:
  containers:
  - name: web
    image: nginx
    resources:
      limits:
        memory: "512Mi"`
  },
  {
    number: 45,
    symbol: "Esg",
    name: "Ext. Storage",
    group: "other",
    row: 5,
    col: 9,
    desc: "Almacenamiento Externo. Integración con cabinas de almacenamiento en la nube (AWS EBS, Azure Disk, NFS local) que proveen la base física para los volúmenes persistentes.",
    kubectl: "kubectl get storageclass",
    yaml: `apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: external-nfs
provisioner: example.com/nfs`
  },
  {
    number: 46,
    symbol: "Pep",
    name: "Policy Point",
    group: "other",
    row: 5,
    col: 10,
    desc: "Punto de Aplicación de Políticas. El lugar lógico dentro del flujo de la API (generalmente interceptado por webhooks de validación) donde se dictamina el éxito de una petición.",
    kubectl: "# Logs del webhook verificando admisiones",
    yaml: `apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingWebhookConfiguration
metadata:
  name: policy-enforcer-webhook`
  },
  {
    number: 47,
    symbol: "Pms",
    name: "Prometheus",
    group: "monitoring",
    row: 5,
    col: 11,
    desc: "Sistema open-source de monitorización basado en series temporales. Herramienta estándar del ecosistema CNCF para recolectar métricas de Kubernetes.",
    kubectl: "# Obtener los pods del operador de Prometheus\nkubectl get pods -n monitoring",
    yaml: `apiVersion: monitoring.coreos.com/v1
kind: Prometheus
metadata:
  name: prometheus-main
  namespace: monitoring`
  },
  {
    number: 48,
    symbol: "La",
    name: "Log Aggreg.",
    group: "monitoring",
    row: 5,
    col: 12,
    desc: "Agregación de logs centralizada. Sistemas como Loki, Elasticsearch, o Splunk que recolectan los registros de todos los nodos para permitir búsquedas globales e indexadas.",
    kubectl: "# Buscar logs en Loki mediante LogCLI",
    yaml: `# Típica config de agente (ej. Promtail) para extraer logs de /var/log/pods`
  },
  {
    number: 49,
    symbol: "Sm",
    name: "Service Mesh",
    group: "monitoring",
    row: 5,
    col: 13,
    desc: "Malla de Servicios. Capa de infraestructura dedicada a gestionar la comunicación entre microservicios, proporcionando telemetría, seguridad (mTLS) y control de tráfico sin cambiar el código.",
    kubectl: "kubectl get serviceprofiles # Linkerd / Istio",
    yaml: `apiVersion: linkerd.io/v1alpha2
kind: ServiceProfile
metadata:
  name: web-service.default.svc.cluster.local`
  },
  {
    number: 50,
    symbol: "Is",
    name: "Istio",
    group: "networking",
    row: 5,
    col: 14,
    desc: "Una de las implementaciones de Service Mesh más populares. Utiliza proxies Envoy inyectados como sidecars en los Pods para interceptar y dirigir la comunicación de red.",
    kubectl: "istioctl analyze\nistioctl dashboard controlz",
    yaml: `apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: my-route
spec:
  hosts:
  - "*"
  gateways:
  - my-gateway`
  },
  {
    number: 51,
    symbol: "Pmo",
    name: "Policy Mon.",
    group: "networking",
    row: 5,
    col: 15,
    desc: "Monitorización de Políticas de Red. Auditoría del comportamiento de flujo de tráfico en el cluster para asegurar que las NetworkPolicies estén actuando como se espera.",
    kubectl: "# Inspección de logs de flujo en el CNI (ej. Cilium monitor)",
    yaml: `# Políticas para auditar tráfico de red (ej. Cilium Network Policy con log: true).`
  },
  {
    number: 52,
    symbol: "Pr",
    name: "Policy Report",
    group: "networking",
    row: 5,
    col: 16,
    desc: "Reporte de Cumplimiento de Políticas. Reportes estructurados generados en el cluster para mostrar a los administradores qué recursos cumplen o violan las reglas corporativas.",
    kubectl: "kubectl get policyreports --all-namespaces",
    yaml: `# Generado automáticamente por motores de políticas como Kyverno en formato PolicyReport CRD.`
  },
  {
    number: 53,
    symbol: "Km",
    name: "Key Mgmt",
    group: "networking",
    row: 5,
    col: 17,
    desc: "Gestión de claves criptográficas. Integración con sistemas KMS externos (ej. Vault, AWS KMS) para resguardar las claves de cifrado de secretos de Kubernetes de manera externa.",
    kubectl: "# Verificar estado de conexión con el proveedor KMS externo",
    yaml: `# Configuración en el Kube API Server para interactuar con un plugin KMS externo.`
  },
  {
    number: 54,
    symbol: "Csd",
    name: "CSI Driver",
    group: "stateful",
    row: 5,
    col: 18,
    desc: "Driver del Container Storage Interface. El componente de software específico del proveedor de almacenamiento que orquesta la creación y montaje físico de volúmenes persistentes en los nodos.",
    kubectl: "kubectl get csidrivers",
    yaml: `apiVersion: storage.k8s.io/v1
kind: CSIDriver
metadata:
  name: ebs.csi.aws.com`
  },

  // --- ROW 6 ---
  {
    number: 55,
    symbol: "Et",
    name: "etcd",
    group: "control-plane",
    row: 6,
    col: 1,
    desc: "Base de datos clave-valor distribuida y consistente. Actúa como el único almacenamiento persistente de Kubernetes, guardando el estado completo del cluster en todo momento.",
    kubectl: "kubectl exec -n kube-system etcd-master-node -- etcdctl endpoint health",
    yaml: `# Típicamente desplegado como Static Pod en master nodes en /etc/kubernetes/manifests/etcd.yaml`
  },
  {
    number: 56,
    symbol: "Rs",
    name: "ReplicaSet",
    group: "core",
    row: 6,
    col: 2,
    desc: "Controlador que asegura que se ejecute una cantidad constante de réplicas de un Pod en cualquier momento dado. Rara vez se usa directamente; es gestionado de forma nativa por los Deployments.",
    kubectl: "kubectl get replicasets\nkubectl describe rs <replicaset-name>",
    yaml: `apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      tier: frontend
  template:
    metadata:
      labels:
        tier: frontend
    spec:
      containers:
      - name: php-redis
        image: gcr.io/google_samples/gb-frontend:v3`
  },
  {
    number: 57,
    symbol: "Ig",
    name: "Ingress",
    group: "config",
    row: 6,
    col: 3,
    desc: "Objeto de API que administra el acceso externo (HTTP/HTTPS) a los servicios del cluster, actuando como router inverso y ofreciendo SSL termination y redirección basada en rutas.",
    kubectl: "kubectl get ingress\nkubectl describe ingress <ingress-name>",
    yaml: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: minimal-ingress
spec:
  ingressClassName: nginx
  rules:
  - http:
      paths:
      - path: /testpath
        pathType: Prefix
        backend:
          service:
            name: test
            port:
              number: 80`
  },
  {
    number: 58,
    symbol: "Jb",
    name: "Job",
    group: "config",
    row: 6,
    col: 4,
    desc: "Controlador que crea uno o más Pods y se asegura de que una cantidad específica de ellos finalice con éxito (exit code 0). Ideal para tareas de procesamiento por lotes de una sola ejecución.",
    kubectl: "kubectl get jobs\nkubectl logs job/<job-name>",
    yaml: `apiVersion: batch/v1
kind: Job
metadata:
  name: pi
spec:
  template:
    spec:
      containers:
      - name: pi
        image: perl:5.34.0
        command: ["perl",  "-Mbignum=bpi", "-wle", "print bpi(2000)"]
      restartPolicy: Never
  backoffLimit: 4`
  },
  {
    number: 59,
    symbol: "Spe",
    name: "State Pers.",
    group: "other",
    row: 6,
    col: 5,
    desc: "Persistencia de Estado. Conceptos relacionados con el almacenamiento no volátil de datos de usuario en contenedores LXC/Docker mediante volúmenes permanentes.",
    kubectl: "kubectl get pv,pvc",
    yaml: `# Manejado declarativamente mediante StorageClasses, PersistentVolumes y PVCs.`
  },
  {
    number: 60,
    symbol: "Rp",
    name: "Readiness Probe",
    group: "other",
    row: 6,
    col: 6,
    desc: "Prueba de preparación. Indica si un contenedor está listo para recibir tráfico de red. Si falla, el balanceador de carga de Kubernetes removerá el Pod del Service.",
    kubectl: "kubectl describe pod <pod-name> # Buscar Readiness",
    yaml: `spec:
  containers:
  - name: server
    image: hashicorp/http-echo
    readinessProbe:
      httpGet:
        path: /ready
        port: 8080
      initialDelaySeconds: 5
      periodSeconds: 5`
  },
  {
    number: 61,
    symbol: "Kn",
    name: "Knative",
    group: "other",
    row: 6,
    col: 7,
    desc: "Tecnología de extensión para desplegar cargas Serverless sobre Kubernetes. Permite escalamiento automático a cero (scale-to-zero) y routing de eventos dinámicos.",
    kubectl: "kubectl get ksvc # Listar Knative Services",
    yaml: `apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: helloworld-go
spec:
  template:
    spec:
      containers:
      - image: gcr.io/knative-samples/helloworld-go`
  },
  {
    number: 62,
    symbol: "Gp",
    name: "GPU Support",
    group: "other",
    row: 6,
    col: 8,
    desc: "Soporte de hardware especializado. Permite mapear GPUs del host físico a contenedores específicos para acelerar tareas de Inteligencia Artificial, Machine Learning o renderizado.",
    kubectl: "kubectl describe node | grep nvidia.com/gpu",
    yaml: `spec:
  containers:
  - name: cuda-vector-add
    image: nvidia/samples:vectoradd-cuda10.2
    resources:
      limits:
        nvidia.com/gpu: 1`
  },
  {
    number: 63,
    symbol: "Ac",
    name: "Admission Ctrl",
    group: "other",
    row: 6,
    col: 9,
    desc: "Admission Controller. Plugins que interceptan peticiones al API Server (después de autenticación y autorización) para modificar o rechazar la creación de objetos.",
    kubectl: "# Configurado en flags del kube-apiserver --enable-admission-plugins",
    yaml: `# Típico control a través de Webhooks Mutantes o Validantes.`
  },
  {
    number: 64,
    symbol: "Aw",
    name: "Adm. Webhook",
    group: "other",
    row: 6,
    col: 10,
    desc: "Webhook de Admisión. Servicio web externo al core de Kubernetes que es llamado por el API server durante el flujo de admisión de recursos para validar o mutar configuraciones.",
    kubectl: "kubectl get validatingwebhookconfigurations",
    yaml: `apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingWebhookConfiguration
metadata:
  name: validation-webhook`
  },
  {
    number: 65,
    symbol: "Gf",
    name: "Grafana",
    group: "monitoring",
    row: 6,
    col: 11,
    desc: "Plataforma analítica y de visualización líder para monitorizar métricas. Permite crear dashboards interactivos con gráficos enriquecidos basados en datos de Prometheus.",
    kubectl: "# Obtener detalles del servicio de Grafana\nkubectl get svc -n monitoring | grep grafana",
    yaml: `# Dashboard de Grafana comúnmente configurado mediante ConfigMaps importados automáticamente.`
  },
  {
    number: 66,
    symbol: "Tr",
    name: "Tracing",
    group: "monitoring",
    row: 6,
    col: 12,
    desc: "Trazabilidad distribuida. Captura del flujo de peticiones a través de microservicios (ej. Jaeger, Zipkin) para depurar cuellos de botella e identificar llamadas lentas.",
    kubectl: "# Listar agentes de tracing activos en el cluster",
    yaml: `# Configurado comúnmente inyectando agentes de recolección en los sidecars de la Service Mesh.`
  },
  {
    number: 67,
    symbol: "Np",
    name: "Net Policy",
    group: "monitoring",
    row: 6,
    col: 13,
    desc: "Network Policy. Recurso de red que actúa como firewall interno del cluster, regulando cómo los Pods pueden comunicarse entre sí y con otros endpoints externos.",
    kubectl: "kubectl get networkpolicies\nkubectl describe netpol <policy-name>",
    yaml: `apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: test-network-policy
spec:
  podSelector:
    matchLabels:
      role: db
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - ipBlock:
        cidr: 172.17.0.0/16
    ports:
    - protocol: TCP
      port: 6379`
  },
  {
    number: 68,
    symbol: "Dn",
    name: "DNS",
    group: "monitoring",
    row: 6,
    col: 14,
    desc: "CoreDNS. Sistema de resolución de nombres de dominio interno y altamente extensible. Asigna automáticamente nombres DNS internos de tipo 'my-svc.my-ns.svc.cluster.local' a los servicios.",
    kubectl: "kubectl get pods -n kube-system -l k8s-app=kube-dns",
    yaml: `apiVersion: v1
kind: ConfigMap
metadata:
  name: coredns
  namespace: kube-system
data:
  Corefile: |
    .:53 {
        errors
        health
        kubernetes cluster.local in-addr.arpa ip6.arpa
        prometheus :9153
        forward . /etc/resolv.conf
    }`
  },
  {
    number: 69,
    symbol: "Ic",
    name: "Ingress Ctrl",
    group: "monitoring",
    row: 6,
    col: 15,
    desc: "Ingress Controller. El balanceador de carga de software (ej. NGINX Ingress, Traefik) que se ejecuta en el cluster para procesar y satisfacer las reglas declaradas en los Ingress.",
    kubectl: "kubectl get pods -n ingress-nginx",
    yaml: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: ingress-nginx-controller
  namespace: ingress-nginx`
  },
  {
    number: 70,
    symbol: "Im",
    name: "Image Security",
    group: "monitoring",
    row: 6,
    col: 16,
    desc: "Escaneo y seguridad de imágenes. Herramientas (ej. Trivy) que comprueban si las imágenes de contenedor tienen vulnerabilidades antes de permitir su despliegue.",
    kubectl: "# Ejecutar análisis en caliente del cluster",
    yaml: `apiVersion: v1
kind: Pod
metadata:
  name: secure-pod
spec:
  imagePullSecrets:
  - name: private-registry-key`
  },
  {
    number: 71,
    symbol: "Es",
    name: "Ext. Secrets",
    group: "monitoring",
    row: 6,
    col: 17,
    desc: "External Secrets Operator. Herramienta para sincronizar secretos desde proveedores externos seguros (ej. HashiCorp Vault, AWS Secrets Manager) directamente a objetos Secret nativos de Kubernetes.",
    kubectl: "kubectl get externalsecrets",
    yaml: `apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: vault-secret
spec:
  refreshInterval: "1h"
  secretStoreRef:
    name: vault-backend
    kind: SecretStore
  target:
    name: my-k8s-secret`
  },
  {
    number: 72,
    symbol: "Vs",
    name: "Vol. Snapshot",
    group: "stateful",
    row: 6,
    col: 18,
    desc: "Copia instantánea de un volumen persistente en un punto en el tiempo. Permite realizar backups atómicos y consistentes de bases de datos sobre almacenamiento físico compatible.",
    kubectl: "kubectl get volumesnapshots",
    yaml: `apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshot
metadata:
  name: new-snapshot-demo
spec:
  volumeSnapshotClassName: csi-aws-vsc
  source:
    persistentVolumeClaimName: task-pv-claim`
  },

  // --- ROW 7 ---
  {
    number: 73,
    symbol: "Kc",
    name: "Kubectl",
    group: "control-plane",
    row: 7,
    col: 1,
    desc: "Herramienta de CLI oficial para interactuar con el API Server de Kubernetes. Permite inspeccionar recursos, aplicar manifiestos y ver logs del cluster.",
    kubectl: "kubectl version --client\nkubectl api-resources",
    yaml: `# Kubectl se configura localmente leyendo el archivo kubeconfig en ~/.kube/config`
  },
  {
    number: 74,
    symbol: "Ns",
    name: "Namespace",
    group: "core",
    row: 7,
    col: 2,
    desc: "Mecanismo para aislar grupos de recursos dentro de un mismo cluster de Kubernetes. Útil para separar entornos (ej. dev, staging, prod) o equipos de trabajo.",
    kubectl: "kubectl get namespaces\nkubectl create namespace development",
    yaml: `apiVersion: v1
kind: Namespace
metadata:
  name: development
  labels:
    environment: dev`
  },
  {
    number: 75,
    symbol: "Pv",
    name: "Volume",
    group: "config",
    row: 7,
    col: 3,
    desc: "Persistent Volume. Porción de almacenamiento físico de red aprovisionada por un administrador del cluster. Su ciclo de vida es independiente de cualquier Pod individual.",
    kubectl: "kubectl get pv\nkubectl describe pv <pv-name>",
    yaml: `apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv0003
spec:
  capacity:
    storage: 5Gi
  volumeMode: Filesystem
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Recycle
  storageClassName: slow
  nfs:
    path: /tmp
    server: 172.17.0.2`
  },
  {
    number: 76,
    symbol: "Cj",
    name: "CronJob",
    group: "config",
    row: 7,
    col: 4,
    desc: "Controlador que ejecuta Jobs de forma periódica en base a un formato de tiempo cron. Ideal para backups diarios, reportes mensuales y limpieza de base de datos.",
    kubectl: "kubectl get cronjobs\nkubectl create job --from=cronjob/<name> manual-run",
    yaml: `apiVersion: batch/v1
kind: CronJob
metadata:
  name: hello
spec:
  schedule: "*/1 * * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: hello
            image: registry.k8s.io/busybox
            imagePullPolicy: IfNotPresent
            command:
            - /bin/sh
            - -c
            - date; echo Hello from Kubernetes
          restartPolicy: OnFailure`
  },
  {
    number: 77,
    symbol: "Lt",
    name: "Load Test",
    group: "other",
    row: 7,
    col: 5,
    desc: "Pruebas de Carga. Simulación de altos niveles de tráfico (ej. Locust, K6) dirigidos al cluster para evaluar el rendimiento de escalado y cuellos de botella de red.",
    kubectl: "# Iniciar pod de pruebas de carga en el cluster",
    yaml: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: k6-test-runner`
  },
  {
    number: 78,
    symbol: "Lp",
    name: "Liveness Probe",
    group: "other",
    row: 7,
    col: 6,
    desc: "Prueba de vida. Indica si un contenedor está vivo y funcionando correctamente. Si esta prueba falla, Kubernetes destruirá el contenedor y creará uno nuevo (reinicio).",
    kubectl: "kubectl describe pod <pod-name> # Buscar sección Liveness",
    yaml: `spec:
  containers:
  - name: liveness
    image: registry.k8s.io/liveness
    livenessProbe:
      httpGet:
        path: /healthz
        port: 8080
      initialDelaySeconds: 3
      periodSeconds: 3`
  },
  {
    number: 79,
    symbol: "Cbs",
    name: "Cron Sched.",
    group: "other",
    row: 7,
    col: 7,
    desc: "Calendarización basada en tiempo. El mecanismo interno del cluster que lee eventos temporales periódicos para instanciar controladores por lotes.",
    kubectl: "kubectl get cronjobs",
    yaml: `spec:
  schedule: "0 0 * * *"`
  },
  {
    number: 80,
    symbol: "Tm",
    name: "Topology Mgr",
    group: "other",
    row: 7,
    col: 8,
    desc: "Coordinador de recursos a nivel de nodo. Alinea la asignación de memoria NUMA, cores de CPU de alto rendimiento y dispositivos PCIe (como GPUs) para tareas de latencia ultra-baja.",
    kubectl: "# Configurado en /var/lib/kubelet/config.yaml como topologymanagerpolicy",
    yaml: `topologyManagerPolicy: single-numa-node`
  },
  {
    number: 81,
    symbol: "Caw",
    name: "Custom Webhook",
    group: "other",
    row: 7,
    col: 9,
    desc: "Webhook personalizado. Código creado por la organización para forzar políticas internas personalizadas (ej. inyectar sidecar de configuración secreta a cada Pod).",
    kubectl: "kubectl get mutatingwebhookconfigurations",
    yaml: `apiVersion: admissionregistration.k8s.io/v1
kind: MutatingWebhookConfiguration
metadata:
  name: sidecar-injector-webhook`
  },
  {
    number: 82,
    symbol: "Azw",
    name: "Auth Webhook",
    group: "other",
    row: 7,
    col: 10,
    desc: "Webhook de Autorización. Integra Kubernetes con motores externos (ej: Open Policy Agent) para resolver en tiempo real si un actor tiene permitido realizar una acción.",
    kubectl: "# Configurado en kube-apiserver via --authorization-mode=Webhook",
    yaml: `# Configuración de webhook de autorización externa:\n# clusters:\n# - name: authz-service\n#   cluster:\n#     server: https://authz.example.com/check`
  },
  {
    number: 83,
    symbol: "Ev",
    name: "Events",
    group: "monitoring",
    row: 7,
    col: 11,
    desc: "Objetos del cluster que registran incidencias e información sobre los cambios de estado del sistema (ej: contenedor descargando imagen, fallo de volumen).",
    kubectl: "kubectl get events --sort-by='.metadata.creationTimestamp'",
    yaml: `# Es un objeto informativo generado automáticamente por el api server.`
  },
  {
    number: 84,
    symbol: "Ot",
    name: "OpenTelemetry",
    group: "monitoring",
    row: 7,
    col: 12,
    desc: "Estándar de observabilidad moderna para la recopilación de trazas, métricas y logs de aplicaciones, integrándose de manera óptima con colectores dentro de K8s.",
    kubectl: "kubectl get otelcol # Listar OpenTelemetry Collectors",
    yaml: `apiVersion: opentelemetry.io/v1alpha1
kind: OpenTelemetryCollector
metadata:
  name: otel-collector`
  },
  {
    number: 85,
    symbol: "Smp",
    name: "Mesh Proxy",
    group: "monitoring",
    row: 7,
    col: 13,
    desc: "Proxy de Service Mesh. El proxy de red (habitualmente Envoy) inyectado en cada Pod que maneja de forma transparente todo el tráfico saliente y entrante.",
    kubectl: "# Ver puertos abiertos de Envoy\nkubectl exec <pod-name> -c istio-proxy -- curl localhost:15000/info",
    yaml: `# Inyectado mediante anotaciones:\n# sidecar.istio.io/inject: "true"`
  },
  {
    number: 86,
    symbol: "Ag",
    name: "API Gateway",
    group: "monitoring",
    row: 7,
    col: 14,
    desc: "Punto de entrada de red unificado. Implementaciones basadas en la nueva especificación Gateway API que reemplaza de forma más potente y modular a los Ingress.",
    kubectl: "kubectl get gatewayclasses,gateways",
    yaml: `apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: prod-web
spec:
  gatewayClassName: amazon-vpc-lattice
  listeners:
  - name: http
    protocol: HTTP
    port: 80`
  },
  {
    number: 87,
    symbol: "Ed",
    name: "External DNS",
    group: "monitoring",
    row: 7,
    col: 15,
    desc: "Operador de Kubernetes que sincroniza dinámicamente recursos de Ingress/Service con proveedores de DNS públicos o privados externos (ej. AWS Route53, Cloudflare).",
    kubectl: "kubectl get deployment external-dns",
    yaml: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: external-dns`
  },
  {
    number: 88,
    symbol: "Ch",
    name: "Caching",
    group: "monitoring",
    row: 7,
    col: 16,
    desc: "Sistemas de caché internos para acelerar el procesamiento de datos del cluster (ej: proxies locales de Docker Registry para cachear imágenes en el nodo de Proxmox/K8s).",
    kubectl: "# Verificar logs del docker registry cache",
    yaml: `# Configurado comúnmente en la configuración del runtime de contenedores del nodo (/etc/containerd/config.toml).`
  },
  {
    number: 89,
    symbol: "Sp",
    name: "Security Pol.",
    group: "monitoring",
    row: 7,
    col: 17,
    desc: "Políticas de Seguridad en Red. Normas y cortafuegos dinámicos gestionados por el CNI (Container Network Interface) para cifrar tráfico vía Wireguard/IPSec.",
    kubectl: "# Verificar encriptación en Cilium\ncilium status --health",
    yaml: `# Configuración global del CNI para activar cifrado automático en tránsito.`
  },
  {
    number: 90,
    symbol: "Vsc",
    name: "Snapshot Class",
    group: "stateful",
    row: 7,
    col: 18,
    desc: "Volume Snapshot Class. Define el driver de almacenamiento y los parámetros de creación del snapshot, actuando de forma similar a una StorageClass pero para copias de seguridad.",
    kubectl: "kubectl get volumesnapshotclasses",
    yaml: `apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshotClass
metadata:
  name: csi-aws-vsc
driver: ebs.csi.aws.com
deletionPolicy: Delete`
  },

  // --- DETACHED BLOCK 1 (Row 8, cols 2-16) ---
  {
    number: 91,
    symbol: "Ci",
    name: "CI Integration",
    group: "cicd",
    row: 8,
    col: 2,
    desc: "Integración Continua. Automatización de compilaciones, ejecución de tests y creación de imágenes docker a partir de commits en repositorios de Git.",
    kubectl: "# Monitorear pipelines de CI locales en el cluster (ej. Tekton)\nkubectl get pipelineruns",
    yaml: `apiVersion: tekton.dev/v1beta1
kind: PipelineRun
metadata:
  name: build-app-run`
  },
  {
    number: 92,
    symbol: "Cd",
    name: "CD Deployment",
    group: "cicd",
    row: 8,
    col: 3,
    desc: "Despliegue Continuo. Distribución automatizada de las imágenes aprobadas del repositorio de imágenes directamente en los entornos del cluster de Kubernetes.",
    kubectl: "# Obtener aplicaciones del CD (ej. ArgoCD)\nkubectl get applications -n argocd",
    yaml: `apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app
  namespace: argocd
spec:
  destination:
    server: 'https://kubernetes.default.svc'
    namespace: prod`
  },
  {
    number: 93,
    symbol: "Go",
    name: "GitOps",
    group: "cicd",
    row: 8,
    col: 4,
    desc: "Metodología que usa repositorios de Git como la única fuente de verdad para la infraestructura y las aplicaciones, sincronizando el cluster de forma automática.",
    kubectl: "kubectl get gitrepositories -A # FluxCD",
    yaml: `apiVersion: source.toolkit.fluxcd.io/v1beta2
kind: GitRepository
metadata:
  name: podinfo
  namespace: flux-system`
  },
  {
    number: 94,
    symbol: "Cnd",
    name: "Canary Deploy",
    group: "cicd",
    row: 8,
    col: 5,
    desc: "Despliegues tipo Canario. Técnica para exponer nuevas versiones del software a un porcentaje pequeño de usuarios antes de desplegarlo al 100%.",
    kubectl: "kubectl get rollouts # Argo Rollouts",
    yaml: `apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: guestbook
spec:
  replicas: 5
  strategy:
    canary:
      steps:
      - setWeight: 20
      - pause: { duration: 10m }`
  },
  {
    number: 95,
    symbol: "Bg",
    name: "Blue-Green",
    group: "cicd",
    row: 8,
    col: 6,
    desc: "Despliegue Azul-Verde. Estrategia de cero-downtime que levanta una copia exacta nueva (Green) junto a la existente (Blue) y cambia el tráfico instantáneamente al Service.",
    kubectl: "kubectl describe service/active-frontend",
    yaml: `spec:
  strategy:
    blueGreen:
      activeService: active-frontend
      previewService: preview-frontend`
  },
  {
    number: 96,
    symbol: "Rud",
    name: "Roll. Update Dp",
    group: "cicd",
    row: 8,
    col: 7,
    desc: "Estrategias de actualización progresiva automatizadas a nivel de CI/CD para optimizar la transición segura de versiones en producción.",
    kubectl: "kubectl rollout status deployment/web-server",
    yaml: `spec:
  strategy:
    type: RollingUpdate`
  },
  {
    number: 97,
    symbol: "Ca",
    name: "Canary Analysis",
    group: "cicd",
    row: 8,
    col: 8,
    desc: "Análisis automático de despliegues canarios. Analizadores (ej. Flagger) que verifican métricas de error de la versión canaria para decidir si hacer Rollout o Rollback.",
    kubectl: "kubectl get canary",
    yaml: `apiVersion: flagger.app/v1beta1
kind: Canary
metadata:
  name: podinfo
spec:
  analysis:
    interval: 1m
    threshold: 5
    maxWeight: 50`
  },
  {
    number: 98,
    symbol: "Goo",
    name: "GitOps Operator",
    group: "cicd",
    row: 8,
    col: 9,
    desc: "El operador que corre en el cluster encargado de hacer Pull de Git y reconciliar el estado deseado con el real del cluster (ej. ArgoCD Controller, Flux Helm Controller).",
    kubectl: "kubectl get pods -n flux-system",
    yaml: `apiVersion: helm.toolkit.fluxcd.io/v2beta1
kind: HelmRelease
metadata:
  name: podinfo`
  },
  {
    number: 99,
    symbol: "Cat",
    name: "Canary Tools",
    group: "cicd",
    row: 8,
    col: 10,
    desc: "Herramientas auxiliares y scripts para inyectar fallos de red simulados en la versión canaria para probar la resiliencia del software.",
    kubectl: "# Correr simulaciones de caos en el cluster",
    yaml: `apiVersion: chaos-mesh.org/v1alpha1
kind: NetworkChaos
metadata:
  name: network-delay`
  },
  {
    number: 100,
    symbol: "Bp",
    name: "Backpressure",
    group: "cicd",
    row: 8,
    col: 11,
    desc: "Controles de contrapresión en red. Asegura que los despliegues lentos o saturados no tiren abajo el plano de control limitando la tasa de peticiones simultáneas.",
    kubectl: "kubectl get flowschemas,prioritylevelconfigurations",
    yaml: `apiVersion: flowcontrol.apiserver.k8s.io/v1beta3
kind: FlowSchema
metadata:
  name: restrict-logs`
  },
  {
    number: 101,
    symbol: "Nap",
    name: "Node Auto-Prov",
    group: "autoscaling",
    row: 8,
    col: 12,
    desc: "Aprovisionamiento Automático de Nodos. Herramientas avanzadas (ej. Karpenter) que aprovisionan nodos optimizados en la nube basándose exactamente en los requerimientos del Pod encolado.",
    kubectl: "kubectl get provisioners # Karpenter",
    yaml: `apiVersion: karpenter.sh/v1alpha5
kind: Provisioner
metadata:
  name: default
spec:
  requirements:
    - key: "karpenter.k8s.aws/instance-category"
      operator: In
      values: ["c", "m", "r"]`
  },
  {
    number: 102,
    symbol: "Hpa",
    name: "HPA",
    group: "autoscaling",
    row: 8,
    col: 13,
    desc: "Horizontal Pod Autoscaler. Escala automáticamente el número de réplicas de un Deployment basándose en métricas de CPU, memoria u otras personalizadas.",
    kubectl: "kubectl get hpa\nkubectl describe hpa <hpa-name>",
    yaml: `apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: php-apache
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: php-apache
  minReplicas: 1
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 50`
  },
  {
    number: 103,
    symbol: "Vpa",
    name: "VPA",
    group: "autoscaling",
    row: 8,
    col: 14,
    desc: "Vertical Pod Autoscaler. Ajusta automáticamente las peticiones y límites de recursos (CPU y RAM) de los contenedores de un Pod, optimizando los costos de infraestructura.",
    kubectl: "kubectl get vpa",
    yaml: `apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: my-rec-vpa
spec:
  targetRef:
    apiVersion: "apps/v1"
    kind: Deployment
    name: my-rec-deployment
  updatePolicy:
    updateMode: "Auto"`
  },
  {
    number: 104,
    symbol: "Cas",
    name: "Cluster Auto",
    group: "autoscaling",
    row: 8,
    col: 15,
    desc: "Cluster Autoscaler. Agrega o elimina nodos físicos/virtuales del cluster de forma dinámica cuando hay Pods en cola que no pueden programarse por falta de recursos.",
    kubectl: "kubectl get deployment cluster-autoscaler -n kube-system",
    yaml: `# Configurado comúnmente vía flags del proveedor Cloud o escalador nativo.`
  },
  {
    number: 105,
    symbol: "Lb",
    name: "Load Balancer",
    group: "autoscaling",
    row: 8,
    col: 16,
    desc: "Balanceador de Carga. Tipo de servicio Kubernetes (`type: LoadBalancer`) que aprovisiona un balanceador real en el proveedor de nube pública para dirigir tráfico externo al cluster.",
    kubectl: "kubectl get svc -l type=LoadBalancer",
    yaml: `apiVersion: v1
kind: Service
metadata:
  name: lb-service
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 8080
  selector:
    app: web`
  },

  // --- DETACHED BLOCK 2 (Row 9, cols 2-16) ---
  {
    number: 106,
    symbol: "Rq",
    name: "Resource Quota",
    group: "resource",
    row: 9,
    col: 2,
    desc: "Límites máximos de consumo acumulados para un Namespace entero. Permite restringir el total de CPU, memoria, almacenamiento y cantidad de recursos (ej: máx 10 Pods).",
    kubectl: "kubectl get resourcequotas -A",
    yaml: `apiVersion: v1
kind: ResourceQuota
metadata:
  name: compute-resources
spec:
  hard:
    requests.cpu: "1"
    requests.memory: 1Gi
    limits.cpu: "2"
    limits.memory: 2Gi
    pods: "4"`
  },
  {
    number: 107,
    symbol: "Rls",
    name: "Resource Limits",
    group: "resource",
    row: 9,
    col: 3,
    desc: "Restricciones individuales a nivel de contenedor. Limitan el máximo de recursos de CPU y memoria RAM que un contenedor en particular puede reclamar en runtime.",
    kubectl: "kubectl describe limitranges",
    yaml: `apiVersion: v1
kind: LimitRange
metadata:
  name: cpu-min-max-demo-lr
spec:
  limits:
  - max:
      cpu: "800m"
      memory: "1Gi"
    min:
      cpu: "100m"
      memory: "99Mi"
    type: Container`
  },
  {
    number: 108,
    symbol: "Rm",
    name: "Resource Mon.",
    group: "resource",
    row: 9,
    col: 4,
    desc: "Monitorización de Recursos. Comprobación constante del estado físico e hilos de procesamiento ocupados en el hipervisor de los contenedores.",
    kubectl: "kubectl top node\nkubectl top pod",
    yaml: `# Habilitado de forma nativa recolectando datos de cgroups de Linux.`
  },
  {
    number: 109,
    symbol: "Ra",
    name: "Resource Alloc.",
    group: "resource",
    row: 9,
    col: 5,
    desc: "Asignación de Recursos. Configuración interna del scheduler para ubicar las cargas de trabajo más pesadas en las máquinas con mayor cantidad de memoria libre.",
    kubectl: "kubectl describe node | grep Allocated",
    yaml: `# Determinado por los CPU Requests y Memory Requests del PodSpec.`
  },
  {
    number: 110,
    symbol: "Pa",
    name: "Pod Affinity",
    group: "resource",
    row: 9,
    col: 6,
    desc: "Afinidad de Pods. Indica al scheduler que posicione Pods juntos en el mismo nodo o zona si ya existen Pods con etiquetas específicas en esa máquina (ej. poner web-server con db-cache).",
    kubectl: "kubectl get pods -o wide # Verificar si comparten nodo",
    yaml: `spec:
  affinity:
    podAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
      - labelSelector:
          matchExpressions:
          - key: security
            operator: In
            values:
            - S1
        topologyKey: topology.kubernetes.io/zone`
  },
  {
    number: 111,
    symbol: "Paa",
    name: "Pod Anti-Affinity",
    group: "resource",
    row: 9,
    col: 7,
    desc: "Antiafinidad de Pods. Evita que ciertos Pods se programen en el mismo nodo. Ideal para asegurar que réplicas de la misma aplicación estén distribuidas físicamente ante caídas.",
    kubectl: "kubectl get pods -o wide",
    yaml: `spec:
  affinity:
    podAntiAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 100
        podAffinityTerm:
          labelSelector:
            matchExpressions:
            - key: security
              operator: In
              values:
              - S2
          topologyKey: kubernetes.io/hostname`
  },
  {
    number: 112,
    symbol: "Na",
    name: "Node Affinity",
    group: "resource",
    row: 9,
    col: 8,
    desc: "Afinidad de Nodo. Permite restringir en qué nodos específicos puede programarse un Pod basándose en etiquetas de nodo (ej: requerir nodos con almacenamiento SSD).",
    kubectl: "kubectl get nodes --show-labels",
    yaml: `spec:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: disktype
            operator: In
            values:
            - ssd`
  },
  {
    number: 113,
    symbol: "Nsr",
    name: "Node Selector",
    group: "resource",
    row: 9,
    col: 9,
    desc: "La forma más simple de restricción de selección de nodos en PodSpecs. Consiste en mapear etiquetas clave-valor exactas para forzar la ejecución en una máquina específica.",
    kubectl: "kubectl get nodes --show-labels",
    yaml: `spec:
  nodeSelector:
    disktype: ssd`
  },
  {
    number: 114,
    symbol: "Tt",
    name: "Taints & Tolerations",
    group: "resource",
    row: 9,
    col: 10,
    desc: "Restricciones de exclusión. Las taints (repulsiones) se ponen en los nodos para rechazar ciertos Pods. Las tolerations (tolerancias) se declaran en el Pod para permitir su ejecución en nodos con taints.",
    kubectl: "kubectl taint nodes node1 key1=value1:NoSchedule\nkubectl describe node node1 | grep Taints",
    yaml: `spec:
  tolerations:
  - key: "key1"
    operator: "Equal"
    value: "value1"
    effect: "NoSchedule"`
  },
  {
    number: 115,
    symbol: "Pdb",
    name: "PDB",
    group: "resource",
    row: 9,
    col: 11,
    desc: "Pod Disruption Budget. Define el número mínimo de réplicas de un Pod que deben estar operativas simultáneamente durante mantenimientos del cluster o drenado de nodos.",
    kubectl: "kubectl get pdb",
    yaml: `apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: zk-pdb
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: zookeeper`
  },
  {
    number: 116,
    symbol: "Gc",
    name: "Garbage Coll.",
    group: "resource",
    row: 9,
    col: 12,
    desc: "Recolector de basura. Proceso interno de Kubernetes (y del runtime de contenedores) que limpia recursos huérfanos sin dueños activos (ej: eliminar imágenes docker no usadas en el disco).",
    kubectl: "# Configurado vía flags del kubelet para umbrales de uso de disco",
    yaml: `# kubelet config:\n# imageGCHighThresholdPercent: 85\n# imageGCLowThresholdPercent: 80`
  },
  {
    number: 117,
    symbol: "Hm",
    name: "Helm",
    group: "package",
    row: 9,
    col: 13,
    desc: "El gestor de paquetes estándar de facto para Kubernetes. Permite empaquetar, configurar y desplegar aplicaciones complejas en forma de plantillas reutilizables (Charts).",
    kubectl: "helm list\nhelm install my-app stable/nginx-ingress",
    yaml: `# Un Chart de Helm define la estructura:\n# Chart.yaml\n# values.yaml\n# templates/deployment.yaml`
  },
  {
    number: 118,
    symbol: "Ku",
    name: "Kustomize",
    group: "package",
    row: 9,
    col: 14,
    desc: "Herramienta integrada en kubectl para personalizar manifiestos de Kubernetes sin plantillas (template-free). Utiliza capas superpuestas (overlays) sobre bases comunes.",
    kubectl: "kubectl apply -k overlays/production",
    yaml: `apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - ../base
patches:
  - path: replica_count.yaml`
  },
  {
    number: 119,
    symbol: "Of",
    name: "Operator Framework",
    group: "package",
    row: 9,
    col: 15,
    desc: "SDK y herramientas de código abierto para facilitar el desarrollo, empaquetado y distribución segura de Operators de Kubernetes.",
    kubectl: "operator-sdk init --plugins=go/v4",
    yaml: `# Proyecto estructurado con carpetas configuradas por el SDK:\n# config/crd/\n# config/rbac/`
  },
  {
    number: 120,
    symbol: "Cs",
    name: "Config Sync",
    group: "package",
    row: 9,
    col: 16,
    desc: "Sincronizador de configuración. Herramientas GitOps (ej: Anthos Config Management) para asegurar que las configuraciones de seguridad y políticas estén sincronizadas en múltiples clusters simultáneamente.",
    kubectl: "nomos status # Si ACM está instalado",
    yaml: `apiVersion: configsync.gke.io/v1beta1
kind: RootSync
metadata:
  name: root-sync
  namespace: config-management-system`
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = KUBE_ELEMENTS;
}
