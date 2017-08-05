// Code goes here

function doTransform(xml, xsl) {
    // code for IE
    if (window.ActiveXObject) {
        ex = xml.transformNode(xsl);
        return ex;
    }
    // code for Chrome, Firefox, Opera, etc.
    else if (document.implementation && document.implementation.createDocument) {
        xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xsl);
        resultDocument = xsltProcessor.transformToFragment(xml, document);
        return resultDocument;
    }

}

$.fn.renderXSLT = function renderXSLT(xmlUrl, xslUrl) {
    var target = this;

    const promises = [
        $.get({
            url: xmlUrl,
            dataType: 'xml',
        }),
        $.get({
            url: xslUrl,
            dataType: 'xml',
        }),
    ];

    return Promise
        .all(promises)
        .then(function (values) {
            console.log(values[0]);
            target.html(doTransform(values[0], values[1]));
        })
        .catch(function (error) {
            console.log(error);
        });
};


$(document).ready(function () {
    var urlBase = "api/";
    var resource = "characters";
    var url = `${urlBase}${resource}/?format=xml`;

    console.log(url);

    var urlXsl = "comics.xslt";

    $("#comics").renderXSLT(url, urlXsl)
     /*   .then(function () {
            $('img').jqthumb({
                width: '100%',
                height: '300px',
                position: {
                    x: '50%',
                    y: '0%'
                }
            });
        })
        .catch(function (error) {
            console.log(error);
        });*/
});