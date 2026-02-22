---
permalink: /sitemap.xsl
layout: null
---
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <title>Sitemap</title>
        <style>
          body{font-family:system-ui,sans-serif;margin:2rem;line-height:1.5} table{width:100%;border-collapse:collapse} th,td{border:1px solid #ccc;padding:.5rem;text-align:left}
        </style>
      </head>
      <body>
        <h1>XML Sitemap</h1>
        <table>
          <thead><tr><th>URL</th><th>Last Modified</th></tr></thead>
          <tbody>
            <xsl:for-each select="s:urlset/s:url">
              <tr>
                <td><a><xsl:attribute name="href"><xsl:value-of select="s:loc"/></xsl:attribute><xsl:value-of select="s:loc"/></a></td>
                <td><xsl:value-of select="s:lastmod"/></td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
