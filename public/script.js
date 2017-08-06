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
            url: ejsUrl,
            ejsUrl
        }),
    ];

    return Promise
        .all(promises)
        .then(function (values) {
            console.log(values[0]);
            var html = ejs.render(values[1], {objects: values[0]});

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
    var urlEjs = "comics.ejs";

    $("#comics").renderEJS(urlJSON, urlEjs);
});