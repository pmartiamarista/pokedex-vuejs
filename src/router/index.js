import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: (resolve) => require(["../views/Home.vue"], resolve),
    icon: "mdi-home-circle-outline",
    meta: {
      title: "Home - Pokedex",
      metaTags: [
        {
          name: "description",
          content: "The home page of Pokedex app.",
        },
        {
          property: "og:description",
          content: "The home page of Pokedex app.",
        },
      ],
    },
  },
  {
    path: "/regions",
    name: "Regions",
    component: (resolve) => require(["../views/Regions.vue"], resolve),
    icon: "mdi-earth",
    meta: {
      title: "Regions - Pokedex",
      meta: {
        title: "Home - Pokedex",
        metaTags: [
          {
            name: "description",
            content: "Search pokemon by region",
          },
          {
            property: "og:description",
            content: "Search pokemon by region",
          },
        ],
      },
    },
  },
  {
    path: "/types",
    name: "Types",
    component: (resolve) => require(["../views/Types.vue"], resolve),
    icon: "mdi-atom",
    meta: {
      title: "Regions - Pokedex",
      meta: {
        title: "Home - Pokedex",
        metaTags: [
          {
            name: "description",
            content: "Search pokemon by type",
          },
          {
            property: "og:description",
            content: "Search pokemon by type",
          },
        ],
      },
    },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
  // `/nested`'s will be chosen.
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else if (previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(
    document.querySelectorAll("[data-vue-router-controlled]")
  ).map((el) => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags
    .map((tagDef) => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create so we don't interfere with other ones.
      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    // Add the meta tags to the document head.
    .forEach((tag) => document.head.appendChild(tag));

  next();
});

export default router;
