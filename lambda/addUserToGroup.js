"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseUtils_1 = require("./Utils/DatabaseUtils");
const defaultHeaders_1 = require("./Constants/defaultHeaders");
const defaultErrorMessage_1 = require("./Constants/defaultErrorMessage");
exports.handler = async (event) => {
    try {
        const { integratorGroupID, userID, addedUserID } = JSON.parse(event.body || '');
        const addUserToGroupRequest = await (0, DatabaseUtils_1.addUserToIntegratorGroup)(integratorGroupID, userID, addedUserID);
        if (addUserToGroupRequest)
            return {
                statusCode: 200,
                headers: defaultHeaders_1.defaultHeaders,
                body: JSON.stringify({ message: 'Successfully added user to integrator group' })
            };
        console.error('Could not add user to group');
        return {
            statusCode: 500,
            headers: defaultHeaders_1.defaultHeaders,
            body: JSON.stringify({ message: 'Could not add user to group' })
        };
    }
    catch (e) {
        console.error('Internal server error', e);
        return defaultErrorMessage_1.defaultErrorMessage;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkVXNlclRvR3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhZGRVc2VyVG9Hcm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlEQUErRDtBQUMvRCwrREFBMEQ7QUFDMUQseUVBQW9FO0FBRXBFLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxFQUFFLEtBQXNCLEVBQUUsRUFBRTtJQUMvQyxJQUFJO1FBQ0EsTUFBTSxFQUFDLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUE7UUFDN0UsTUFBTSxxQkFBcUIsR0FBRyxNQUFNLElBQUEsd0NBQXdCLEVBQUMsaUJBQWlCLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFBO1FBQ3BHLElBQUcscUJBQXFCO1lBQUUsT0FBTztnQkFDN0IsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsT0FBTyxFQUFFLCtCQUFjO2dCQUN2QixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSw2Q0FBNkMsRUFBRSxDQUFDO2FBQ25GLENBQUE7UUFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUE7UUFDNUMsT0FBTztZQUNILFVBQVUsRUFBRSxHQUFHO1lBQ2YsT0FBTyxFQUFFLCtCQUFjO1lBQ3ZCLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLDZCQUE2QixFQUFFLENBQUM7U0FDbkUsQ0FBQTtLQUNKO0lBQ0QsT0FBTyxDQUFDLEVBQUU7UUFDTixPQUFPLENBQUMsS0FBSyxDQUFDLHVCQUF1QixFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3pDLE9BQU8seUNBQW1CLENBQUE7S0FDN0I7QUFDTCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FQSUdhdGV3YXlFdmVudH0gZnJvbSBcImF3cy1sYW1iZGFcIjtcclxuaW1wb3J0IHthZGRVc2VyVG9JbnRlZ3JhdG9yR3JvdXB9IGZyb20gXCIuL1V0aWxzL0RhdGFiYXNlVXRpbHNcIjtcclxuaW1wb3J0IHtkZWZhdWx0SGVhZGVyc30gZnJvbSBcIi4vQ29uc3RhbnRzL2RlZmF1bHRIZWFkZXJzXCI7XHJcbmltcG9ydCB7ZGVmYXVsdEVycm9yTWVzc2FnZX0gZnJvbSBcIi4vQ29uc3RhbnRzL2RlZmF1bHRFcnJvck1lc3NhZ2VcIjtcclxuXHJcbmV4cG9ydHMuaGFuZGxlciA9IGFzeW5jIChldmVudDogQVBJR2F0ZXdheUV2ZW50KSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHtpbnRlZ3JhdG9yR3JvdXBJRCwgdXNlcklELCBhZGRlZFVzZXJJRH0gPSBKU09OLnBhcnNlKGV2ZW50LmJvZHkgfHwgJycpXHJcbiAgICAgICAgY29uc3QgYWRkVXNlclRvR3JvdXBSZXF1ZXN0ID0gYXdhaXQgYWRkVXNlclRvSW50ZWdyYXRvckdyb3VwKGludGVncmF0b3JHcm91cElELCB1c2VySUQsIGFkZGVkVXNlcklEKVxyXG4gICAgICAgIGlmKGFkZFVzZXJUb0dyb3VwUmVxdWVzdCkgcmV0dXJuIHtcclxuICAgICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiBkZWZhdWx0SGVhZGVycyxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBtZXNzYWdlOiAnU3VjY2Vzc2Z1bGx5IGFkZGVkIHVzZXIgdG8gaW50ZWdyYXRvciBncm91cCcgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignQ291bGQgbm90IGFkZCB1c2VyIHRvIGdyb3VwJylcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzdGF0dXNDb2RlOiA1MDAsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IGRlZmF1bHRIZWFkZXJzLFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IG1lc3NhZ2U6ICdDb3VsZCBub3QgYWRkIHVzZXIgdG8gZ3JvdXAnIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InLCBlKVxyXG4gICAgICAgIHJldHVybiBkZWZhdWx0RXJyb3JNZXNzYWdlXHJcbiAgICB9XHJcbn0iXX0=