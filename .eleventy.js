const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  /* ------------------------------------------------------------------ */
  /* Passthrough copies: static assets served exactly as written         */
  /* ------------------------------------------------------------------ */
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });

  /* ------------------------------------------------------------------ */
  /* Date filters — readable and machine formats for Nunjucks            */
  /* ------------------------------------------------------------------ */
  eleventyConfig.addFilter("readableDate", (dateObj) =>
    DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("d LLLL yyyy")
  );

  eleventyConfig.addFilter("htmlDateString", (dateObj) =>
    DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd")
  );

  /* ------------------------------------------------------------------ */
  /* Sermons collection — every scroll in src/sermons/, newest first     */
  /* ------------------------------------------------------------------ */
  eleventyConfig.addCollection("sermons", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("src/sermons/*.md")
      .sort((a, b) => b.date - a.date)
  );

  /* The featured sermon — the one marked 'featured: true', else the newest */
  eleventyConfig.addCollection("featuredSermon", (collectionApi) => {
    const all = collectionApi
      .getFilteredByGlob("src/sermons/*.md")
      .sort((a, b) => b.date - a.date);
    const chosen = all.find((s) => s.data.featured === true) || all[0];
    return chosen ? [chosen] : [];
  });

  /* ------------------------------------------------------------------ */
  /* Markdown — allow sanctified inline HTML (summary boxes, science     */
  /* boxes, pull quotes, full-bleed moments) inside sermon bodies        */
  /* ------------------------------------------------------------------ */
  eleventyConfig.amendLibrary("md", (mdLib) =>
    mdLib.set({
      html: true,
      breaks: false,
      linkify: true,
      typographer: true,
    })
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};
