const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      env: {
        mongodb_username: "admin",
        mongodb_password: "admin123",
        mongodb_clustername: "nextjsdata",
        mongodb_database: "myBlogSite-Dev",
      },
    };
  }

  return {
    reactStrictMode: true,
    env: {
      mongodb_username: "admin",
      mongodb_password: "admin123",
      mongodb_clustername: "nextjsdata",
      mongodb_database: "myBlogSite-Prod",
    },
  };
};
