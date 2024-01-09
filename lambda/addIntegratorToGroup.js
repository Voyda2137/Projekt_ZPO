"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseUtils_1 = require("./Utils/DatabaseUtils");
const defaultErrorMessage_1 = require("./Constants/defaultErrorMessage");
exports.handler = async (event) => {
    try {
        const { integratorID, integratorGroupID, userID } = JSON.parse(event.body || '');
        const addIntegratorToGroupRequest = await (0, DatabaseUtils_1.addIntegratorToGroup)(integratorID, integratorGroupID, userID);
        if (addIntegratorToGroupRequest)
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                body: JSON.stringify({ message: 'Successfully added integrator to group' }),
            };
        return defaultErrorMessage_1.defaultErrorMessage;
    }
    catch (e) {
        return defaultErrorMessage_1.defaultErrorMessage;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkSW50ZWdyYXRvclRvR3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhZGRJbnRlZ3JhdG9yVG9Hcm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlEQUEyRDtBQUMzRCx5RUFBb0U7QUFHcEUsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLEVBQUUsS0FBc0IsRUFBRSxFQUFFO0lBQy9DLElBQUk7UUFDQSxNQUFNLEVBQUMsWUFBWSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUM5RSxNQUFNLDJCQUEyQixHQUFHLE1BQU0sSUFBQSxvQ0FBb0IsRUFBQyxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLENBQUE7UUFDdkcsSUFBRywyQkFBMkI7WUFBRSxPQUFPO2dCQUNuQyxVQUFVLEVBQUUsR0FBRztnQkFDZixPQUFPLEVBQUU7b0JBQ0wsNkJBQTZCLEVBQUUsR0FBRztvQkFDbEMsa0NBQWtDLEVBQUUsSUFBSTtpQkFDM0M7Z0JBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxPQUFPLEVBQUUsd0NBQXdDLEVBQUUsQ0FBQzthQUM5RSxDQUFBO1FBQ0QsT0FBTyx5Q0FBbUIsQ0FBQTtLQUM3QjtJQUNELE9BQU0sQ0FBQyxFQUFFO1FBQ0wsT0FBTyx5Q0FBbUIsQ0FBQTtLQUM3QjtBQUNMLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QVBJR2F0ZXdheUV2ZW50fSBmcm9tIFwiYXdzLWxhbWJkYVwiO1xyXG5pbXBvcnQge2FkZEludGVncmF0b3JUb0dyb3VwfSBmcm9tIFwiLi9VdGlscy9EYXRhYmFzZVV0aWxzXCI7XHJcbmltcG9ydCB7ZGVmYXVsdEVycm9yTWVzc2FnZX0gZnJvbSBcIi4vQ29uc3RhbnRzL2RlZmF1bHRFcnJvck1lc3NhZ2VcIjtcclxuaW1wb3J0IHtkZWZhdWx0SGVhZGVyc30gZnJvbSBcIi4vQ29uc3RhbnRzL2RlZmF1bHRIZWFkZXJzXCI7XHJcblxyXG5leHBvcnRzLmhhbmRsZXIgPSBhc3luYyAoZXZlbnQ6IEFQSUdhdGV3YXlFdmVudCkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCB7aW50ZWdyYXRvcklELCBpbnRlZ3JhdG9yR3JvdXBJRCwgdXNlcklEfSA9IEpTT04ucGFyc2UoZXZlbnQuYm9keSB8fCAnJylcclxuICAgICAgICBjb25zdCBhZGRJbnRlZ3JhdG9yVG9Hcm91cFJlcXVlc3QgPSBhd2FpdCBhZGRJbnRlZ3JhdG9yVG9Hcm91cChpbnRlZ3JhdG9ySUQsIGludGVncmF0b3JHcm91cElELCB1c2VySUQpXHJcbiAgICAgICAgaWYoYWRkSW50ZWdyYXRvclRvR3JvdXBSZXF1ZXN0KSByZXR1cm4ge1xyXG4gICAgICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsXHJcbiAgICAgICAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHMnOiB0cnVlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IG1lc3NhZ2U6ICdTdWNjZXNzZnVsbHkgYWRkZWQgaW50ZWdyYXRvciB0byBncm91cCcgfSksXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkZWZhdWx0RXJyb3JNZXNzYWdlXHJcbiAgICB9XHJcbiAgICBjYXRjaChlKSB7XHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRFcnJvck1lc3NhZ2VcclxuICAgIH1cclxufSJdfQ==