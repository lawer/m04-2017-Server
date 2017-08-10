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
            var html = ejs.render(values[1], values[0]);

            target.hide();

            target.html(html);

            target.fadeIn(1000);
        })
        .catch(function (error) {
            console.log(error);
        });
};

$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

$.fn.hideModal = function () {
    this.find("[data-dismiss=modal]").click();
};


function refreshData() {
    $.LoadingOverlay("show");

    $("#comics")
        .renderEJS("api/characters", "comics.ejs")
        .then(function () {
            $.LoadingOverlay("hide");
        });
}

$(document).ready(function () {
    var urlBase = "api/";
    var resource = "characters";

    var urlJSON = `${urlBase}${resource}`;
    var urlEjs = "comics.ejs";

    refreshData();

    $(document)
        .on("click", ".btn-delete", function (event) {
            var boto = $(this);
            var id = boto.data("id");

            $.ajax({
                url: 'api/characters/' + id,
                type: 'DELETE',
            }).then(function () {
                $("#card-" + id).fadeOut(1000);
            }).catch(function (error) {
                console.log(error);
            });
        })
        .on("submit", "#add-user-form", function (event) {
            var form = $(this);
            event.preventDefault();

            var data = form.serializeObject();

            $.ajax({
                url: 'api/characters/',
                data: data,
                type: 'POST',
            }).then(function () {
                refreshData();

                $("#add-user-form").hideModal();
            }).catch(function (error) {
                console.log(error);
            });
        })
        .on("submit", ".edit-form", function (event) {
            var form = $(this);
            event.preventDefault();

            var data = form.serializeObject();

            $.ajax({
                url: 'api/characters/' + data.id,
                data: data,
                type: 'PUT',
            }).then(function () {
                refreshData();

                $("#edit-user-form-" + data.id).hideModal();
            }).catch(function (error) {
                console.log(error);
            });
        })
});