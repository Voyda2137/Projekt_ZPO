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
            const user = await (0, DatabaseUtils_1.getUserByLogin)(header);
            if (user) {
                console.log('user found');
                const integrators = await (0, DatabaseUtils_1.getIntegrators)(user);
                if (integrators)
                    return {
                        statusCode: 200,
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Credentials': true,
                            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE',
                            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,from',
                        },
                        body: JSON.stringify({ integrators: integrators }, null, 2)
                    };
            }
            console.error('No user found');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SW50ZWdyYXRvcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRJbnRlZ3JhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlEQUFxRTtBQUNyRSx5RUFBb0U7QUFHcEUsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLEVBQUMsS0FBc0IsRUFBRSxFQUFFO0lBQzlDLElBQUk7UUFDQSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDdkMsSUFBSSxLQUFLLENBQUMsVUFBVSxLQUFLLFNBQVMsRUFBRTtZQUNoQyxPQUFPO2dCQUNILFVBQVUsRUFBRSxHQUFHO2dCQUNmLE9BQU8sRUFBRTtvQkFDTCw2QkFBNkIsRUFBRSxHQUFHO29CQUNsQyxrQ0FBa0MsRUFBRSxJQUFJO29CQUN4Qyw4QkFBOEIsRUFBRSw2QkFBNkI7b0JBQzdELDhCQUE4QixFQUFFLDJFQUEyRTtpQkFDOUc7Z0JBQ0QsSUFBSSxFQUFFLEVBQUU7YUFDWCxDQUFDO1NBQ0w7UUFDRCxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ3BDLElBQUcsTUFBTSxFQUFDO1lBQ04sTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFBLDhCQUFjLEVBQUMsTUFBTSxDQUFDLENBQUE7WUFDekMsSUFBRyxJQUFJLEVBQUM7Z0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQTtnQkFDekIsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFBLDhCQUFjLEVBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQzlDLElBQUcsV0FBVztvQkFBRSxPQUFPO3dCQUNuQixVQUFVLEVBQUUsR0FBRzt3QkFDZixPQUFPLEVBQUU7NEJBQ0wsNkJBQTZCLEVBQUUsR0FBRzs0QkFDbEMsa0NBQWtDLEVBQUUsSUFBSTs0QkFDeEMsOEJBQThCLEVBQUUsNkJBQTZCOzRCQUM3RCw4QkFBOEIsRUFBRSwyRUFBMkU7eUJBQzlHO3dCQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUMsV0FBVyxFQUFFLFdBQVcsRUFBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7cUJBQzVELENBQUE7YUFDSjtZQUNELE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7WUFDOUIsT0FBTyx5Q0FBbUIsQ0FBQTtTQUM3QjtRQUNELE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtRQUMvQixPQUFPLHlDQUFtQixDQUFBO0tBQzdCO0lBQ0QsT0FBTyxDQUFDLEVBQUU7UUFDTixPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUMzQixPQUFPLHlDQUFtQixDQUFBO0tBQzdCO0FBQ0wsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBUElHYXRld2F5RXZlbnR9IGZyb20gXCJhd3MtbGFtYmRhXCI7XHJcbmltcG9ydCB7Z2V0SW50ZWdyYXRvcnMsIGdldFVzZXJCeUxvZ2lufSBmcm9tIFwiLi9VdGlscy9EYXRhYmFzZVV0aWxzXCI7XHJcbmltcG9ydCB7ZGVmYXVsdEVycm9yTWVzc2FnZX0gZnJvbSBcIi4vQ29uc3RhbnRzL2RlZmF1bHRFcnJvck1lc3NhZ2VcIjtcclxuaW1wb3J0IHtkZWZhdWx0SGVhZGVyc30gZnJvbSBcIi4vQ29uc3RhbnRzL2RlZmF1bHRIZWFkZXJzXCI7XHJcblxyXG5leHBvcnRzLmhhbmRsZXIgPSBhc3luYyhldmVudDogQVBJR2F0ZXdheUV2ZW50KSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdSZXF1ZXN0OiAnLCBldmVudC5oZWFkZXJzKVxyXG4gICAgICAgIGlmIChldmVudC5odHRwTWV0aG9kID09PSAnT1BUSU9OUycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLFxyXG4gICAgICAgICAgICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFscyc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnOiAnT1BUSU9OUyxQT1NULEdFVCxQVVQsREVMRVRFJyxcclxuICAgICAgICAgICAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycyc6ICdDb250ZW50LVR5cGUsWC1BbXotRGF0ZSxBdXRob3JpemF0aW9uLFgtQXBpLUtleSxYLUFtei1TZWN1cml0eS1Ub2tlbixmcm9tJyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBib2R5OiAnJyxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgaGVhZGVyID0gZXZlbnQuaGVhZGVyc1snZnJvbSddXHJcbiAgICAgICAgaWYoaGVhZGVyKXtcclxuICAgICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IGdldFVzZXJCeUxvZ2luKGhlYWRlcilcclxuICAgICAgICAgICAgaWYodXNlcil7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndXNlciBmb3VuZCcpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbnRlZ3JhdG9ycyA9IGF3YWl0IGdldEludGVncmF0b3JzKHVzZXIpXHJcbiAgICAgICAgICAgICAgICBpZihpbnRlZ3JhdG9ycykgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHMnOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcyc6ICdPUFRJT05TLFBPU1QsR0VULFBVVCxERUxFVEUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycyc6ICdDb250ZW50LVR5cGUsWC1BbXotRGF0ZSxBdXRob3JpemF0aW9uLFgtQXBpLUtleSxYLUFtei1TZWN1cml0eS1Ub2tlbixmcm9tJyxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtpbnRlZ3JhdG9yczogaW50ZWdyYXRvcnN9LCBudWxsLCAyKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ05vIHVzZXIgZm91bmQnKVxyXG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdEVycm9yTWVzc2FnZVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmVycm9yKCdNaXNzaW5nIGhlYWRlcicpXHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRFcnJvck1lc3NhZ2VcclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3I6ICcsIGUpXHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRFcnJvck1lc3NhZ2VcclxuICAgIH1cclxufSJdfQ==