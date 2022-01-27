(function () {

    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "id",
            alias: "id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "type",
            alias: "type",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "created_at",
            alias: "created_at",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "updated_at",
            alias: "updated_at",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "referer",
            alias: "referer",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "page",
            alias: "page",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "user_agent",
            alias: "user_agent",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "answer_01",
            alias: "experience_satisfaction",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "answer_02",
            alias: "interaction_freq",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "answer_03",
            alias: "interaction_ease",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "answer_04",
            alias: "diagnostic_satisfaction",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "answer_05",
            alias: "issue_resolved",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "answer_06",
            alias: "future_experience_improvement",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "ip_address",
            alias: "ip_address",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "location_code",
            alias: "location_code",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "flagged",
            alias: "flagged",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "archived",
            alias: "archived",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "aasm_state",
            alias: "aasm_state",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "language",
            alias: "language",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "uuid",
            alias: "uuid",
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
        $.getJSON("https://touchpoints-dev-api.azure-api.us/", function (data) {
            var feat = data,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "id": feat[i].id,
                    "type": feat[i].type,
                    "created_at": feat[i].attributes.created_at,
                    "updated_at": feat[i].attributes.updated_at,
                    "referer": feat[i].attributes.referer,
                    "page": feat[i].attributes.page,
                    "user_agent": feat[i].attributes.user_agent,
                    "answer_01": feat[i].attributes.answer_01,
                    "answer_02": feat[i].attributes.answer_02,
                    "answer_03": feat[i].attributes.answer_03,
                    "answer_04": feat[i].attributes.answer_04,
                    "answer_05": feat[i].attributes.answer_05,
                    "answer_06": feat[i].attributes.answer_06,
                    "ip_address": feat[i].attributes.ip_address,
                    "location_code": feat[i].attributes.location_code,
                    "flagged": feat[i].attributes.flagged,
                    "archived": feat[i].attributes.archived,
                    "aasm_state": feat[i].attributes.aasm_state,
                    "language": feat[i].attributes.language,
                    "uuid": feat[i].attributes.uuid
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
