/* jshint node: true */
"use strict";

const path = require("path");

module.exports = {
  name: "ember-flickity",

  treeForVendor() {
    var Funnel = require("broccoli-funnel");
    var flickityPath = path.join(path.dirname(require.resolve("flickity")), "..");

    return new Funnel(this.treeGenerator(flickityPath), {
      destDir: "flickity"
    });
  },

  included(app) {
    this._super.included.apply(this, app);

    if (process.env.EMBER_CLI_FASTBOOT) { return; }

    const flickityPath = path.join("vendor/flickity/dist");

    if (app.env === "production") {
      app.import(path.join(flickityPath, "flickity.pkgd.min.js"));
    } else {
      app.import(path.join(flickityPath, "flickity.pkgd.js"));
    }
  },

  isDevelopingAddon() {
    return true;
  }
};
