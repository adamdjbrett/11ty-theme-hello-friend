---
permalink: /feed/pretty-atom-feed.xsl
layout: null
---
<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <title>Atom Feed</title>
        <style>
          body{font-family:system-ui,sans-serif;margin:2rem;line-height:1.5} article{border:1px solid #ddd;padding:1rem;border-radius:.5rem;margin-bottom:1rem}
        </style>
      </head>
      <body>
        <h1><xsl:value-of select="atom:feed/atom:title"/></h1>
        <xsl:for-each select="atom:feed/atom:entry">
          <article>
            <h2><a><xsl:attribute name="href"><xsl:value-of select="atom:link/@href"/></xsl:attribute><xsl:value-of select="atom:title"/></a></h2>
            <p><xsl:value-of select="atom:updated"/></p>
            <div><xsl:value-of select="atom:summary"/></div>
          </article>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
