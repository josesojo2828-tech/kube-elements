// app.js - Main interactive logic for kube-elements

document.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("periodic-table");
  const drawer = document.getElementById("details-drawer");
  const btnCloseDrawer = document.getElementById("close-drawer");
  
  // Drawer nodes
  const badge = document.getElementById("drawer-element-badge");
  const nameNode = document.getElementById("drawer-element-name");
  const numberNode = document.getElementById("drawer-element-number");
  const descNode = document.getElementById("drawer-element-desc");
  const kubectlNode = document.getElementById("drawer-element-kubectl");
  const yamlNode = document.getElementById("drawer-element-yaml");
  const sectionKubectl = document.getElementById("section-kubectl");
  const sectionYaml = document.getElementById("section-yaml");
  const btnCopyYaml = document.getElementById("btn-copy-yaml");

  // Search nodes
  const searchInput = document.getElementById("search-input");
  let searchDebounce = null;

  // Theme toggle node
  const themeToggle = document.getElementById("theme-toggle");

  // Filtering nodes
  const legendItems = document.querySelectorAll(".legend-item");
  const btnClearFilter = document.getElementById("clear-filter");

  let activeGroupFilter = null;
  let copiedTimeout = null;

  // 1. Render all elements dynamically into the grid
  if (typeof KUBE_ELEMENTS !== "undefined") {
    KUBE_ELEMENTS.forEach(el => {
      const cell = document.createElement("div");
      cell.className = "element-cell";
      cell.setAttribute("data-group", el.group);
      cell.setAttribute("data-number", el.number);
      
      // Position element in the periodic table CSS grid
      cell.style.gridRow = el.row;
      cell.style.gridColumn = el.col;

      // Inside cell HTML
      cell.innerHTML = `
        <span class="cell-number">${el.number}</span>
        <span class="cell-symbol">${el.symbol}</span>
        <span class="cell-name">${el.name}</span>
      `;

      // Event listener for opening drawer
      cell.addEventListener("click", () => {
        openElementDetails(el);
      });

      table.appendChild(cell);
    });
  } else {
    console.error("KUBE_ELEMENTS is not defined. Make sure data/elements.js is loaded first.");
  }

  // 2. Details Drawer functions
  function openElementDetails(el) {
    // Fill drawer content
    badge.textContent = el.symbol;
    badge.className = `element-badge ${el.group}`;
    nameNode.textContent = el.name;
    numberNode.textContent = `Elemento #${el.number} • Categoría: ${formatGroupName(el.group)}`;
    descNode.textContent = el.desc;

    // Handle kubectl section
    if (el.kubectl && el.kubectl.trim().length > 0) {
      kubectlNode.textContent = el.kubectl;
      sectionKubectl.classList.remove("hidden");
    } else {
      sectionKubectl.classList.add("hidden");
    }

    // Handle YAML section
    if (el.yaml && el.yaml.trim().length > 0) {
      yamlNode.textContent = el.yaml;
      sectionYaml.classList.remove("hidden");
    } else {
      sectionYaml.classList.add("hidden");
    }

    // Slide in drawer
    drawer.classList.add("open");
  }

  function closeElementDetails() {
    drawer.classList.remove("open");
  }

  btnCloseDrawer.addEventListener("click", closeElementDetails);

  // Close drawer if clicking outside
  document.addEventListener("click", (e) => {
    if (drawer.classList.contains("open") && 
        !drawer.contains(e.target) && 
        !e.target.closest(".element-cell")) {
      closeElementDetails();
    }
  });

  // Esc key closes drawer
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeElementDetails();
    }
  });

  // 3. Copy YAML logic
  btnCopyYaml.addEventListener("click", () => {
    const yamlCode = yamlNode.textContent;
    navigator.clipboard.writeText(yamlCode).then(() => {
      btnCopyYaml.textContent = "¡Copiado!";
      btnCopyYaml.classList.add("copied");

      if (copiedTimeout) clearTimeout(copiedTimeout);
      copiedTimeout = setTimeout(() => {
        btnCopyYaml.textContent = "Copiar";
        btnCopyYaml.classList.remove("copied");
      }, 2000);
    }).catch(err => {
      console.error("Error al copiar YAML: ", err);
    });
  });

  // 4. Filtering and legend interactive highlighting
  legendItems.forEach(item => {
    const group = item.getAttribute("data-group");

    item.addEventListener("click", () => {
      toggleGroupFilter(group);
    });
  });

  btnClearFilter.addEventListener("click", () => {
    clearActiveFilter();
  });

  function toggleGroupFilter(group) {
    if (activeGroupFilter === group) {
      // Toggle off if clicking the same group
      clearActiveFilter();
    } else {
      applyGroupFilter(group);
    }
  }

  function applyGroupFilter(group) {
    activeGroupFilter = group;
    
    // Add filtering class to parent container for CSS opacity transitions
    table.classList.add("filtered");
    
    // Highlight elements of selected group (skip search-hidden)
    const cells = table.querySelectorAll(".element-cell");
    cells.forEach(cell => {
      if (cell.classList.contains("hidden")) return;
      if (cell.getAttribute("data-group") === group) {
        cell.classList.add("highlighted");
      } else {
        cell.classList.remove("highlighted");
      }
    });

    // Highlight legend item
    legendItems.forEach(item => {
      if (item.getAttribute("data-group") === group) {
        item.style.borderColor = "var(--border-active)";
        item.style.background = "rgba(255, 255, 255, 0.08)";
      } else {
        item.style.borderColor = "transparent";
        item.style.background = "rgba(255, 255, 255, 0.02)";
      }
    });

    btnClearFilter.classList.remove("hidden");
  }

  function clearActiveFilter() {
    activeGroupFilter = null;
    table.classList.remove("filtered");
    
    const cells = table.querySelectorAll(".element-cell");
    cells.forEach(cell => {
      cell.classList.remove("highlighted");
    });

    legendItems.forEach(item => {
      item.style.borderColor = "transparent";
      item.style.background = "rgba(255, 255, 255, 0.02)";
    });

    btnClearFilter.classList.add("hidden");
  }

  // 5. Search with debounce
  function filterElements(query) {
    const q = query.toLowerCase().trim();
    const cells = table.querySelectorAll(".element-cell");

    if (!q && !activeGroupFilter) {
      cells.forEach(cell => cell.classList.remove("hidden"));
      return;
    }

    cells.forEach(cell => {
      const number = parseInt(cell.getAttribute("data-number"));
      const el = KUBE_ELEMENTS.find(e => e.number === number);
      if (!el) return;

      const matchesSearch = !q ||
        el.name.toLowerCase().includes(q) ||
        el.symbol.toLowerCase().includes(q) ||
        el.desc.toLowerCase().includes(q);

      if (matchesSearch) {
        cell.classList.remove("hidden");
      } else {
        cell.classList.add("hidden");
      }
    });

    if (activeGroupFilter) {
      table.classList.add("filtered");
      cells.forEach(cell => {
        if (cell.classList.contains("hidden")) return;
        if (cell.getAttribute("data-group") === activeGroupFilter) {
          cell.classList.add("highlighted");
        } else {
          cell.classList.remove("highlighted");
        }
      });
    }
  }

  searchInput.addEventListener("input", () => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      filterElements(searchInput.value);
    }, 150);
  });

  // 6. Theme toggle
  function toggleTheme() {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    const newTheme = isLight ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    themeToggle.textContent = isLight ? "☀️" : "🌙";
  }

  themeToggle.addEventListener("click", toggleTheme);

  // Restore theme from localStorage
  (function initTheme() {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      document.documentElement.setAttribute("data-theme", "light");
      themeToggle.textContent = "🌙";
    }
  })();

  // Helper formatter for Group Name
  function formatGroupName(group) {
    const names = {
      "control-plane": "Control Plane & Infraestructura",
      "core": "Componentes Core",
      "config": "Configuración y Manejo de Datos",
      "other": "Otros Elementos",
      "monitoring": "Monitoreo y Observabilidad",
      "backup-dr": "Backup y Recuperación ante Desastres",
      "security": "Seguridad y Gestión de Identidad",
      "governance": "Gobernanza y Cumplimiento",
      "networking": "Redes y Networking",
      "stateful": "Aplicaciones con Estado",
      "cicd": "Integración y Despliegue Continuo (CI/CD)",
      "autoscaling": "Autoescalado y Balanceo de Carga",
      "resource": "Gestión de Recursos",
      "package": "Gestión de Paquetes y Sincronización"
    };
    return names[group] || group;
  }
});
