"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseUtils_1 = require("./Utils/DatabaseUtils");
const defaultErrorMessage_1 = require("./Constants/defaultErrorMessage");
exports.handler = async (event) => {
    try {
        console.log('Request: ', event.headers);
        if (event.httpMethod === 'OPTIONS') {
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE',
                    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,from',
                },
                body: '',
            };
        }
        const header = event.headers['from'];
        if (header) {
            const integratorGroups = await (0, DatabaseUtils_1.getIntegratorGroups)(header);
            if (integratorGroups)
                return {
                    statusCode: 200,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE',
                        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,from',
                    },
                    body: JSON.stringify({ integratorGroups: integratorGroups }, null, 2)
                };
            console.error('No integrator groups found');
            return defaultErrorMessage_1.defaultErrorMessage;
        }
        console.error('Missing header');
        return defaultErrorMessage_1.defaultErrorMessage;
    }
    catch (e) {
        console.error('Error: ', e);
        return defaultErrorMessage_1.defaultErrorMessage;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SW50ZWdyYXRvckdyb3Vwcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldEludGVncmF0b3JHcm91cHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSx5REFBMEQ7QUFDMUQseUVBQW9FO0FBRXBFLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxFQUFDLEtBQXNCLEVBQUUsRUFBRTtJQUM5QyxJQUFJO1FBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3ZDLElBQUksS0FBSyxDQUFDLFVBQVUsS0FBSyxTQUFTLEVBQUU7WUFDaEMsT0FBTztnQkFDSCxVQUFVLEVBQUUsR0FBRztnQkFDZixPQUFPLEVBQUU7b0JBQ0wsNkJBQTZCLEVBQUUsR0FBRztvQkFDbEMsa0NBQWtDLEVBQUUsSUFBSTtvQkFDeEMsOEJBQThCLEVBQUUsNkJBQTZCO29CQUM3RCw4QkFBOEIsRUFBRSwyRUFBMkU7aUJBQzlHO2dCQUNELElBQUksRUFBRSxFQUFFO2FBQ1gsQ0FBQztTQUNMO1FBQ0QsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUNwQyxJQUFHLE1BQU0sRUFBQztZQUNOLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxJQUFBLG1DQUFtQixFQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQzFELElBQUcsZ0JBQWdCO2dCQUFFLE9BQU87b0JBQ3hCLFVBQVUsRUFBRSxHQUFHO29CQUNmLE9BQU8sRUFBRTt3QkFDTCw2QkFBNkIsRUFBRSxHQUFHO3dCQUNsQyxrQ0FBa0MsRUFBRSxJQUFJO3dCQUN4Qyw4QkFBOEIsRUFBRSw2QkFBNkI7d0JBQzdELDhCQUE4QixFQUFFLDJFQUEyRTtxQkFDOUc7b0JBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQyxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7aUJBQ3RFLENBQUE7WUFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUE7WUFDM0MsT0FBTyx5Q0FBbUIsQ0FBQTtTQUM3QjtRQUNELE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtRQUMvQixPQUFPLHlDQUFtQixDQUFBO0tBQzdCO0lBQ0QsT0FBTyxDQUFDLEVBQUU7UUFDTixPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUMzQixPQUFPLHlDQUFtQixDQUFBO0tBQzdCO0FBQ0wsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBUElHYXRld2F5RXZlbnR9IGZyb20gXCJhd3MtbGFtYmRhXCI7XHJcbmltcG9ydCB7Z2V0SW50ZWdyYXRvckdyb3Vwc30gZnJvbSBcIi4vVXRpbHMvRGF0YWJhc2VVdGlsc1wiO1xyXG5pbXBvcnQge2RlZmF1bHRFcnJvck1lc3NhZ2V9IGZyb20gXCIuL0NvbnN0YW50cy9kZWZhdWx0RXJyb3JNZXNzYWdlXCI7XHJcblxyXG5leHBvcnRzLmhhbmRsZXIgPSBhc3luYyhldmVudDogQVBJR2F0ZXdheUV2ZW50KSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdSZXF1ZXN0OiAnLCBldmVudC5oZWFkZXJzKVxyXG4gICAgICAgIGlmIChldmVudC5odHRwTWV0aG9kID09PSAnT1BUSU9OUycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLFxyXG4gICAgICAgICAgICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFscyc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnOiAnT1BUSU9OUyxQT1NULEdFVCxQVVQsREVMRVRFJyxcclxuICAgICAgICAgICAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycyc6ICdDb250ZW50LVR5cGUsWC1BbXotRGF0ZSxBdXRob3JpemF0aW9uLFgtQXBpLUtleSxYLUFtei1TZWN1cml0eS1Ub2tlbixmcm9tJyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBib2R5OiAnJyxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgaGVhZGVyID0gZXZlbnQuaGVhZGVyc1snZnJvbSddXHJcbiAgICAgICAgaWYoaGVhZGVyKXtcclxuICAgICAgICAgICAgY29uc3QgaW50ZWdyYXRvckdyb3VwcyA9IGF3YWl0IGdldEludGVncmF0b3JHcm91cHMoaGVhZGVyKVxyXG4gICAgICAgICAgICBpZihpbnRlZ3JhdG9yR3JvdXBzKSByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUNyZWRlbnRpYWxzJzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcyc6ICdPUFRJT05TLFBPU1QsR0VULFBVVCxERUxFVEUnLFxyXG4gICAgICAgICAgICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJzogJ0NvbnRlbnQtVHlwZSxYLUFtei1EYXRlLEF1dGhvcml6YXRpb24sWC1BcGktS2V5LFgtQW16LVNlY3VyaXR5LVRva2VuLGZyb20nLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtpbnRlZ3JhdG9yR3JvdXBzOiBpbnRlZ3JhdG9yR3JvdXBzfSwgbnVsbCwgMilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdObyBpbnRlZ3JhdG9yIGdyb3VwcyBmb3VuZCcpXHJcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0RXJyb3JNZXNzYWdlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ01pc3NpbmcgaGVhZGVyJylcclxuICAgICAgICByZXR1cm4gZGVmYXVsdEVycm9yTWVzc2FnZVxyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvcjogJywgZSlcclxuICAgICAgICByZXR1cm4gZGVmYXVsdEVycm9yTWVzc2FnZVxyXG4gICAgfVxyXG59Il19