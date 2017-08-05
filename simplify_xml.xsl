<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="xml" cdata-section-elements="name deck description image"/>

    <xsl:template match="/">

            <characters>
                <xsl:for-each select="/response/results/character">
                    <xsl:sort select="name"/>
                    <character>
                        <id>
                            <xsl:value-of select="normalize-space(id)"/>
                        </id>
                        <name>
                            <xsl:value-of select="normalize-space(name)"/>
                        </name>
                        <deck>
                            <xsl:value-of select="normalize-space(deck)"/>
                        </deck>
                        <description>
                            <xsl:value-of select="normalize-space(description)" disable-output-escaping="yes"/>
                        </description>
                        <image>
                            <xsl:value-of select="normalize-space(image/medium_url)" disable-output-escaping="yes"/>
                        </image>
                    </character>
                </xsl:for-each>
            </characters>

    </xsl:template>

</xsl:stylesheet>