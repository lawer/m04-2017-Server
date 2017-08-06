<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" encoding="UTF-8" indent="yes" omit-xml-declaration="yes" xml:lang="en"/>

    <xsl:template match="//character">
        <div class="card-columns ">
                <xsl:sort select="name"/>

                <xsl:if test="(deck != '') and (image != '')">
                    <div class="card border rounded m-1 w-10">
                        <div class="thumb"
                             style="background-image: url({normalize-space(image)})">
                        </div>
                        <div class="card-block">
                            <h4 class="card-title">
                                <xsl:value-of select="name"/>
                            </h4>
                            <p class="card-text">
                                <xsl:value-of select="deck"/>
                            </p>

                            <xsl:if test="(description != '')">
                                <button type="button" class="btn btn-primary" data-toggle="modal"
                                        data-target="#{id}-modal">
                                    Details
                                </button>

                                <div class="modal fade " id="{id}-modal">
                                    <div class="modal-dialog modal-lg" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title">
                                                    <xsl:value-of select="name"/>
                                                </h5>
                                                <button type="button" class="close" data-dismiss="modal"
                                                        aria-label="Close">
                                                    <span aria-hidden="true"/>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <xsl:value-of select="description" disable-output-escaping="yes"/>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </xsl:if>


                        </div>

                    </div>

                </xsl:if>
        </div>

    </xsl:template>
</xsl:stylesheet>
