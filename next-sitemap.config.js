/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.suman.co.kr",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: [
    "/admin", // 관리자페이지 사이트맵 차단
    "/admin/*",
  ],
};
