const config = {
  "gatsby": {
    "pathPrefix": "/",
    "siteUrl": "https://engineering.verumex.com",
    "gaTrackingId": null
  },
  "header": {
    "logo": "",
    "logoLink": "/",
    "title": "/ vmx / engineering",
    "githubUrl": "https://github.com/Verumex/vmx_engineering",
    "helpUrl": "",
    "tweetText": "",
    "links": [
      { "text": "", "link": ""}
    ],
    "search": {
      "enabled": false,
      "indexName": "",
      "algoliaAppId": process.env.GATSBY_ALGOLIA_APP_ID,
      "algoliaSearchKey": process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      "algoliaAdminKey": process.env.ALGOLIA_ADMIN_KEY
    }
  },
  "sidebar": {
    "forcedNavOrder": [
      "/about",
      "/team",
      "/platform",
      "/playbook",
      "/design_patterns",
      "/testing",
    ],
    "links": [
      { "text": "Anvil", "link": "https://www.anvil.no"},
      { "text": "Lockstep", "link": "https://github.com/lockstep"},
    ],
    "frontline": false,
    "ignoreIndex": true,
  },
  "siteMetadata": {
    "title": "VmX Engineering",
    "description": "Get to know the team and methodology behind the VmX Platform.",
    "ogImage": null,
    "docsLocation": "https://github.com/verumex/vmx_engineering/tree/master/content",
  },
};

module.exports = config;
