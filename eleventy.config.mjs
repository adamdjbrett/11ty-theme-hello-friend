import { DateTime } from "luxon";
import pluginRss from "@11ty/eleventy-plugin-rss";
import { mkdirSync } from "node:fs";
import yaml from "js-yaml";

function ensureOutputDirs() {
  const dirs = [
    "_site",
    "_site/about",
    "_site/archive",
    "_site/feed",
    "_site/posts",
    "_site/search",
    "_site/showcase"
  ];
  for (const dir of dirs) {
    mkdirSync(dir, { recursive: true });
  }
}

export default function (eleventyConfig) {
  // In watch mode, _site can disappear (e.g. parallel clean/build). Pre-create
  // expected output folders so template writes don't fail with ENOENT.
  eleventyConfig.on("eleventy.before", ensureOutputDirs);
  eleventyConfig.on("beforeWatch", ensureOutputDirs);

  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addDataExtension("yml", (contents) => yaml.load(contents));
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  eleventyConfig.addPassthroughCopy({ "assets/fonts": "assets/fonts" });
  eleventyConfig.addPassthroughCopy({ "assets/js": "assets/js" });
  eleventyConfig.addPassthroughCopy({ "images": "images" });
  eleventyConfig.addPassthroughCopy({ "static/img": "img" });
  eleventyConfig.addPassthroughCopy({ "static/style.css": "style.css" });

  eleventyConfig.addFilter("dateISO", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toISO();
  });

  eleventyConfig.addFilter("dateReadable", (dateObj, format = "yyyy-LL-dd") => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(format);
  });

  eleventyConfig.addFilter("dateRfc2822", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toHTTP();
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  eleventyConfig.addFilter("readingTime", (content) => {
    const words = (content || "").replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 225));
  });

  eleventyConfig.addFilter("slug", (value) => {
    return String(value || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  });

  eleventyConfig.addFilter("currentYear", () => String(new Date().getUTCFullYear()));

  eleventyConfig.addCollection("posts", (collectionApi) => {
    const posts = collectionApi
      .getFilteredByGlob("content/posts/**/*.{md,njk}")
      .filter((item) => item.data.published !== false)
      .sort((a, b) => a.date - b.date);

    posts.forEach((post, index) => {
      post.data.prevPost = posts[index - 1] || null;
      post.data.nextPost = posts[index + 1] || null;
    });

    return posts;
  });

  eleventyConfig.addCollection("postsDesc", (collectionApi) => {
    return [...collectionApi.getFilteredByGlob("content/posts/**/*.{md,njk}")]
      .filter((item) => item.data.published !== false)
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("pagesForSitemap", (collectionApi) => {
    return collectionApi.getAll().filter((item) => {
      const outputPath = item.outputPath || "";
      if (!outputPath.endsWith(".html") && !outputPath.endsWith(".xml") && !outputPath.endsWith(".txt")) {
        return false;
      }
      if (item.data.permalink === false) {
        return false;
      }
      if (item.data.eleventyExcludeFromCollections) {
        return false;
      }
      if (item.data.published === false) {
        return false;
      }
      return true;
    });
  });

  eleventyConfig.setDataDeepMerge(true);

  return {
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html", "xml", "txt", "xsl"],
    dir: {
      input: "content",
      includes: "../_includes",
      data: "../_data",
      output: "_site"
    }
  };
}
