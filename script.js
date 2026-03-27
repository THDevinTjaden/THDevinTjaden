const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

const filterRoots = document.querySelectorAll(".js-filter-root");

filterRoots.forEach((root) => {
  const list = root.parentElement?.querySelector(".js-filter-list");
  if (!list) return;

  const items = Array.from(list.querySelectorAll(".js-filter-item"));
  if (!items.length) return;

  const searchInput = root.querySelector("[data-filter-search]");
  const tagButtons = Array.from(root.querySelectorAll("[data-filter-tag]"));
  const emptyId = root.getAttribute("data-empty-id");
  const emptyState = emptyId ? document.getElementById(emptyId) : null;

  let activeTag = "all";
  let searchTerm = "";

  const applyFilter = () => {
    let visibleCount = 0;

    items.forEach((item) => {
      const tags = item.getAttribute("data-tags") || "";
      const search = item.getAttribute("data-search") || "";
      const matchesTag = activeTag === "all" || tags.split(" ").includes(activeTag);
      const matchesSearch = !searchTerm || search.toLowerCase().includes(searchTerm);
      const visible = matchesTag && matchesSearch;

      item.classList.toggle("is-hidden", !visible);
      if (visible) visibleCount += 1;
    });

    if (emptyState) {
      emptyState.classList.toggle("is-hidden", visibleCount > 0);
    }
  };

  tagButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeTag = button.getAttribute("data-filter-tag") || "all";
      tagButtons.forEach((el) => el.classList.toggle("active", el === button));
      applyFilter();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      const value = event.target.value || "";
      searchTerm = value.trim().toLowerCase();
      applyFilter();
    });
  }

  applyFilter();
});
