"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseUtils_1 = require("./Utils/DatabaseUtils");
const defaultErrorMessage_1 = require("./Constants/defaultErrorMessage");
exports.handler = async (event) => {
    try {
        const { integratorGroupID, userID, addedUserID } = JSON.parse(event.body || '');
        const addUserToGroupRequest = await (0, DatabaseUtils_1.addUserToIntegratorGroup)(integratorGroupID, userID, addedUserID);
        if (addUserToGroupRequest)
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                body: JSON.stringify({ message: 'Successfully added user to integrator group' })
            };
        console.error('Could not add user to group');
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ message: 'Could not add user to group' })
        };
    }
    catch (e) {
        console.error('Internal server error', e);
        return defaultErrorMessage_1.defaultErrorMessage;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkVXNlclRvR3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhZGRVc2VyVG9Hcm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlEQUErRDtBQUUvRCx5RUFBb0U7QUFFcEUsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLEVBQUUsS0FBc0IsRUFBRSxFQUFFO0lBQy9DLElBQUk7UUFDQSxNQUFNLEVBQUMsaUJBQWlCLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUM3RSxNQUFNLHFCQUFxQixHQUFHLE1BQU0sSUFBQSx3Q0FBd0IsRUFBQyxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUE7UUFDcEcsSUFBRyxxQkFBcUI7WUFBRSxPQUFPO2dCQUM3QixVQUFVLEVBQUUsR0FBRztnQkFDZixPQUFPLEVBQUU7b0JBQ0wsNkJBQTZCLEVBQUUsR0FBRztvQkFDbEMsa0NBQWtDLEVBQUUsSUFBSTtpQkFDM0M7Z0JBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxPQUFPLEVBQUUsNkNBQTZDLEVBQUUsQ0FBQzthQUNuRixDQUFBO1FBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFBO1FBQzVDLE9BQU87WUFDSCxVQUFVLEVBQUUsR0FBRztZQUNmLE9BQU8sRUFBRTtnQkFDTCw2QkFBNkIsRUFBRSxHQUFHO2dCQUNsQyxrQ0FBa0MsRUFBRSxJQUFJO2FBQzNDO1lBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsQ0FBQztTQUNuRSxDQUFBO0tBQ0o7SUFDRCxPQUFPLENBQUMsRUFBRTtRQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDekMsT0FBTyx5Q0FBbUIsQ0FBQTtLQUM3QjtBQUNMLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QVBJR2F0ZXdheUV2ZW50fSBmcm9tIFwiYXdzLWxhbWJkYVwiO1xyXG5pbXBvcnQge2FkZFVzZXJUb0ludGVncmF0b3JHcm91cH0gZnJvbSBcIi4vVXRpbHMvRGF0YWJhc2VVdGlsc1wiO1xyXG5pbXBvcnQge2RlZmF1bHRIZWFkZXJzfSBmcm9tIFwiLi9Db25zdGFudHMvZGVmYXVsdEhlYWRlcnNcIjtcclxuaW1wb3J0IHtkZWZhdWx0RXJyb3JNZXNzYWdlfSBmcm9tIFwiLi9Db25zdGFudHMvZGVmYXVsdEVycm9yTWVzc2FnZVwiO1xyXG5cclxuZXhwb3J0cy5oYW5kbGVyID0gYXN5bmMgKGV2ZW50OiBBUElHYXRld2F5RXZlbnQpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3Qge2ludGVncmF0b3JHcm91cElELCB1c2VySUQsIGFkZGVkVXNlcklEfSA9IEpTT04ucGFyc2UoZXZlbnQuYm9keSB8fCAnJylcclxuICAgICAgICBjb25zdCBhZGRVc2VyVG9Hcm91cFJlcXVlc3QgPSBhd2FpdCBhZGRVc2VyVG9JbnRlZ3JhdG9yR3JvdXAoaW50ZWdyYXRvckdyb3VwSUQsIHVzZXJJRCwgYWRkZWRVc2VySUQpXHJcbiAgICAgICAgaWYoYWRkVXNlclRvR3JvdXBSZXF1ZXN0KSByZXR1cm4ge1xyXG4gICAgICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsXHJcbiAgICAgICAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHMnOiB0cnVlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IG1lc3NhZ2U6ICdTdWNjZXNzZnVsbHkgYWRkZWQgdXNlciB0byBpbnRlZ3JhdG9yIGdyb3VwJyB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmVycm9yKCdDb3VsZCBub3QgYWRkIHVzZXIgdG8gZ3JvdXAnKVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHN0YXR1c0NvZGU6IDUwMCxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcclxuICAgICAgICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFscyc6IHRydWUsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgbWVzc2FnZTogJ0NvdWxkIG5vdCBhZGQgdXNlciB0byBncm91cCcgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ludGVybmFsIHNlcnZlciBlcnJvcicsIGUpXHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRFcnJvck1lc3NhZ2VcclxuICAgIH1cclxufSJdfQ==