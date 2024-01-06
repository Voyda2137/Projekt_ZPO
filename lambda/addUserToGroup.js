"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseUtils_1 = require("./Utils/DatabaseUtils");
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
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ message: 'Internal server error' })
        };
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkVXNlclRvR3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhZGRVc2VyVG9Hcm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlEQUErRDtBQUUvRCxPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssRUFBRSxLQUFzQixFQUFFLEVBQUU7SUFDL0MsSUFBSTtRQUNBLE1BQU0sRUFBQyxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1FBQzdFLE1BQU0scUJBQXFCLEdBQUcsTUFBTSxJQUFBLHdDQUF3QixFQUFDLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQTtRQUNwRyxJQUFHLHFCQUFxQjtZQUFFLE9BQU87Z0JBQzdCLFVBQVUsRUFBRSxHQUFHO2dCQUNmLE9BQU8sRUFBRTtvQkFDTCw2QkFBNkIsRUFBRSxHQUFHO29CQUNsQyxrQ0FBa0MsRUFBRSxJQUFJO2lCQUMzQztnQkFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSw2Q0FBNkMsRUFBRSxDQUFDO2FBQ25GLENBQUE7UUFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUE7UUFDNUMsT0FBTztZQUNILFVBQVUsRUFBRSxHQUFHO1lBQ2YsT0FBTyxFQUFFO2dCQUNMLDZCQUE2QixFQUFFLEdBQUc7Z0JBQ2xDLGtDQUFrQyxFQUFFLElBQUk7YUFDM0M7WUFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxDQUFDO1NBQ25FLENBQUE7S0FDSjtJQUNELE9BQU8sQ0FBQyxFQUFFO1FBQ04sT0FBTyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUN6QyxPQUFPO1lBQ0gsVUFBVSxFQUFFLEdBQUc7WUFDZixPQUFPLEVBQUU7Z0JBQ0wsNkJBQTZCLEVBQUUsR0FBRztnQkFDbEMsa0NBQWtDLEVBQUUsSUFBSTthQUMzQztZQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLENBQUM7U0FDN0QsQ0FBQTtLQUNKO0FBQ0wsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBUElHYXRld2F5RXZlbnR9IGZyb20gXCJhd3MtbGFtYmRhXCI7XHJcbmltcG9ydCB7YWRkVXNlclRvSW50ZWdyYXRvckdyb3VwfSBmcm9tIFwiLi9VdGlscy9EYXRhYmFzZVV0aWxzXCI7XHJcblxyXG5leHBvcnRzLmhhbmRsZXIgPSBhc3luYyAoZXZlbnQ6IEFQSUdhdGV3YXlFdmVudCkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCB7aW50ZWdyYXRvckdyb3VwSUQsIHVzZXJJRCwgYWRkZWRVc2VySUR9ID0gSlNPTi5wYXJzZShldmVudC5ib2R5IHx8ICcnKVxyXG4gICAgICAgIGNvbnN0IGFkZFVzZXJUb0dyb3VwUmVxdWVzdCA9IGF3YWl0IGFkZFVzZXJUb0ludGVncmF0b3JHcm91cChpbnRlZ3JhdG9yR3JvdXBJRCwgdXNlcklELCBhZGRlZFVzZXJJRClcclxuICAgICAgICBpZihhZGRVc2VyVG9Hcm91cFJlcXVlc3QpIHJldHVybiB7XHJcbiAgICAgICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcclxuICAgICAgICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFscyc6IHRydWUsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgbWVzc2FnZTogJ1N1Y2Nlc3NmdWxseSBhZGRlZCB1c2VyIHRvIGludGVncmF0b3IgZ3JvdXAnIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0NvdWxkIG5vdCBhZGQgdXNlciB0byBncm91cCcpXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc3RhdHVzQ29kZTogNTAwLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLFxyXG4gICAgICAgICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUNyZWRlbnRpYWxzJzogdHJ1ZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBtZXNzYWdlOiAnQ291bGQgbm90IGFkZCB1c2VyIHRvIGdyb3VwJyB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignSW50ZXJuYWwgc2VydmVyIGVycm9yJywgZSlcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzdGF0dXNDb2RlOiA1MDAsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsXHJcbiAgICAgICAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHMnOiB0cnVlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IG1lc3NhZ2U6ICdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19