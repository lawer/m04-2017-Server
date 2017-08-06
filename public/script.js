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

$.fn.renderXSLT = function renderXSLT(dataUrl, xslUrl) {
    var target = this;

    var xmlPromise = $.get({
        url: dataUrl,
        dataType: 'xml',
    });

    var xslPromise = $.get({
        url: xslUrl,
        dataType: 'xml',
    });

    return Promise
        .all([xmlPromise, xslPromise])
        .then(function (values) {
            console.log(values[0]);
            console.log(values[1]);

            target.html(doTransform(values[0], values[1]));
        })
        .catch(function (error) {
            console.log(error);
        });
};

$.fn.renderEJS = function renderEJS(jsonUrl, ejsUrl) {
    var target = this;

    const promises = [
        $.get({
            url: jsonUrl,
        }),
        $.get({
            url: ejsUrl
        }),
    ];

    return Promise
        .all(promises)
        .then(function (values) {
            console.log(values[0]);
            var html = ejs.render(values[1], values[0]);

            target.html(html);
        })
        .catch(function (error) {
            console.log(error);
        });
};


$(document).ready(function () {
    var urlBase = "api/";
    var resource = "characters";

    /*var urlXml = `${urlBase}${resource}/?format=xml`;
    var urlXsl = "comics.xslt";

    $("#comics").renderXSLT(urlXml, urlXsl)*/

    var urlJSON = `${urlBase}${resource}/?format=json`;
    var urlXsl = "comics.xslt";
    var urlEjs = "comics.ejs";

    //$("#comics").renderXSLT(urlJSON, urlXsl, "json");

    $("#comics").renderEJS(urlJSON, urlEjs);
});