// sap.ui.define([
//     "sap/ui/core/mvc/Controller"
// ],
//     function (Controller) {
//         "use strict";

//         return Controller.extend("project1.controller.View1", {
//             onInit: function () {
//             },

//             onSelectionChange: function (oEvent) {
//                 // 1. Get the selected item
//                 var oItem = oEvent.getParameter("listItem") || oEvent.getSource();
                
//                 // 2. Get the Business Partner ID from the context
//                 var sBpID = oItem.getBindingContext().getProperty("BusinessPartner");

//                 // 3. Navigate to the Wizard route, passing the ID
//                 var oRouter = this.getOwnerComponent().getRouter();
//                 oRouter.navTo("RouteWizard", {
//                     bpID: sBpID
//                 });
//             }
//         });
//     });


sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("project1.controller.View1", {
        onInit: function () {
        },

        onSearch: function () {
            var aFilters = [];

            // 1. Get the values typed into the specific FilterBar inputs
            var sID = this.byId("filterID").getValue();
            var sCategory = this.byId("filterCategory").getValue();
            var sName = this.byId("filterName").getValue();

            // 2. Build the filters conditionally (only if the user typed something)
            if (sID) {
                aFilters.push(new Filter("BusinessPartner", FilterOperator.Contains, sID));
            }
            if (sCategory) {
                aFilters.push(new Filter("BusinessPartnerCategory", FilterOperator.Contains, sCategory));
            }
            if (sName) {
                aFilters.push(new Filter("BusinessPartnerFullName", FilterOperator.Contains, sName));
            }

            // 3. Apply the combined filters to the Table
            var oTable = this.byId("bpTable");
            var oBinding = oTable.getBinding("items");
            
            // SAPUI5 automatically treats an array of filters as an "AND" condition
            oBinding.filter(aFilters);
        },

        onClear: function () {
            // 1. Clear the inputs in the UI
            this.byId("filterID").setValue("");
            this.byId("filterCategory").setValue("");
            this.byId("filterName").setValue("");

            // 2. Remove all filters from the table to load all data again
            var oTable = this.byId("bpTable");
            oTable.getBinding("items").filter([]);
        },

        onSelectionChange: function (oEvent) {
            // 1. Get the selected item
            var oItem = oEvent.getParameter("listItem") || oEvent.getSource();
            
            // 2. Get the Business Partner ID from the context
            var sBpID = oItem.getBindingContext().getProperty("BusinessPartner");

            // 3. Navigate to the Wizard route, passing the ID
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteWizard", {
                bpID: sBpID
            });
        }
    });
});