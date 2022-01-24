(function () {

    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "type",
            alias: "type",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "answer_01",
            alias: "answer_01",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "answer_02",
            alias: "answer_02",
            dataType: tableau.dataTypeEnum.string
        }];

        var tableSchema = {
            id: "TouchPointsFeed",
            alias: "Sample Touch Points Data",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    myConnector.getData = function (table, doneCallback) {
        $.getJSON("https://api.gsa.gov/analytics/touchpoints/v1/forms/454ebacc.json?API_KEY=5SwQLcU169ZfG3bDZpnvb0gDP1Den6jApdQp23xO", function (data) {
            var feat = data.included,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "id": feat[i].id,
                    "type": feat[i].type,
                    "answer_01": feat[i].attributes.answer_01,
                    "answer_02": feat[i].attributes.answer_02
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "Touch Points Feed";
            tableau.submit();
        });
    });
})();
