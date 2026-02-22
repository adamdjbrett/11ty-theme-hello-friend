// Keep metadata.yml as source-of-truth for humans; this JS mirror guarantees
// Eleventy global data availability across environments.
export default {
  title: "Hello Friend",
  subtitle: "A simple theme for Eleventy",
  url: "https://hello.000000076.xyz",
  language: "en",
  locale: "en_US",
  description: "Hello Friend theme ported to Eleventy 3.1.2 with ESM, Nunjucks, Luxon, and Pagefind.",
  keywords: ["eleventy", "11ty", "blog", "theme"],
  author: {
    name: "Radosław Kozieł",
    url: "https://github.com/panr"
  },
  copyright: "",
  menuMore: "Show more",
  writtenBy: "Written by",
  readMore: "Read more",
  readOtherPosts: "Read other posts",
  newerPosts: "Newer posts",
  olderPosts: "Older posts",
  minuteReadingTime: "min read",
  dateFormatSingle: "yyyy-LL-dd",
  dateFormatList: "yyyy-LL-dd",
  defaultTheme: "dark",
  showMenuItems: 2,
  showReadingTime: false,
  showToc: false,
  feed: {
    subtitle: "Recent posts"
  },
  logo: {
    logoText: "hello friend",
    logoHomeLink: "/"
  },
  navigation: [
    { title: "Home", url: "/" },
    { title: "Blog", url: "/blog/" },
    { title: "About", url: "/about/" },
    { title: "Showcase", url: "/showcase/" },
    { title: "Archive", url: "/archive/" },
    { title: "Search", url: "/search/" }
  ],
  social: {
    github: "https://github.com/panr/hugo-theme-hello-friend"
  }
};
