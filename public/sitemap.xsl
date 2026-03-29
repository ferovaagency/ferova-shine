<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html>
      <head>
        <title>Sitemap — Ferova Agency</title>
        <style>
          body { font-family: sans-serif; max-width: 900px; margin: 40px auto; padding: 0 20px; }
          h1 { color: #c9a84c; }
          table { width: 100%; border-collapse: collapse; }
          th { background: #1a1830; color: #c9a84c; padding: 10px; text-align: left; }
          td { padding: 8px 10px; border-bottom: 1px solid #eee; font-size: 13px; }
          a { color: #1a1830; text-decoration: none; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <h1>Sitemap — Ferova Agency</h1>
        <p>Total de URLs: <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></p>
        <table>
          <tr><th>URL</th><th>Frecuencia</th><th>Prioridad</th></tr>
          <xsl:for-each select="sitemap:urlset/sitemap:url">
            <tr>
              <td><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
              <td><xsl:value-of select="sitemap:changefreq"/></td>
              <td><xsl:value-of select="sitemap:priority"/></td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
