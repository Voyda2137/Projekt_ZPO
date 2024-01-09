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
                console.error('No integrators found');
                return defaultErrorMessage_1.defaultErrorMessage;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SW50ZWdyYXRvcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRJbnRlZ3JhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlEQUFxRTtBQUNyRSx5RUFBb0U7QUFFcEUsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLEVBQUMsS0FBc0IsRUFBRSxFQUFFO0lBQzlDLElBQUk7UUFDQSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDdkMsSUFBSSxLQUFLLENBQUMsVUFBVSxLQUFLLFNBQVMsRUFBRTtZQUNoQyxPQUFPO2dCQUNILFVBQVUsRUFBRSxHQUFHO2dCQUNmLE9BQU8sRUFBRTtvQkFDTCw2QkFBNkIsRUFBRSxHQUFHO29CQUNsQyxrQ0FBa0MsRUFBRSxJQUFJO29CQUN4Qyw4QkFBOEIsRUFBRSw2QkFBNkI7b0JBQzdELDhCQUE4QixFQUFFLDJFQUEyRTtpQkFDOUc7Z0JBQ0QsSUFBSSxFQUFFLEVBQUU7YUFDWCxDQUFDO1NBQ0w7UUFDRCxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ3BDLElBQUcsTUFBTSxFQUFDO1lBQ04sTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFBLDhCQUFjLEVBQUMsTUFBTSxDQUFDLENBQUE7WUFDekMsSUFBRyxJQUFJLEVBQUM7Z0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQTtnQkFDekIsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFBLDhCQUFjLEVBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQzlDLElBQUcsV0FBVztvQkFBRSxPQUFPO3dCQUNuQixVQUFVLEVBQUUsR0FBRzt3QkFDZixPQUFPLEVBQUU7NEJBQ0wsNkJBQTZCLEVBQUUsR0FBRzs0QkFDbEMsa0NBQWtDLEVBQUUsSUFBSTs0QkFDeEMsOEJBQThCLEVBQUUsNkJBQTZCOzRCQUM3RCw4QkFBOEIsRUFBRSwyRUFBMkU7eUJBQzlHO3dCQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUMsV0FBVyxFQUFFLFdBQVcsRUFBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7cUJBQzVELENBQUE7Z0JBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO2dCQUNyQyxPQUFPLHlDQUFtQixDQUFBO2FBQzdCO1lBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQTtZQUM5QixPQUFPLHlDQUFtQixDQUFBO1NBQzdCO1FBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1FBQy9CLE9BQU8seUNBQW1CLENBQUE7S0FDN0I7SUFDRCxPQUFPLENBQUMsRUFBRTtRQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQzNCLE9BQU8seUNBQW1CLENBQUE7S0FDN0I7QUFDTCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FQSUdhdGV3YXlFdmVudH0gZnJvbSBcImF3cy1sYW1iZGFcIjtcclxuaW1wb3J0IHtnZXRJbnRlZ3JhdG9ycywgZ2V0VXNlckJ5TG9naW59IGZyb20gXCIuL1V0aWxzL0RhdGFiYXNlVXRpbHNcIjtcclxuaW1wb3J0IHtkZWZhdWx0RXJyb3JNZXNzYWdlfSBmcm9tIFwiLi9Db25zdGFudHMvZGVmYXVsdEVycm9yTWVzc2FnZVwiO1xyXG5cclxuZXhwb3J0cy5oYW5kbGVyID0gYXN5bmMoZXZlbnQ6IEFQSUdhdGV3YXlFdmVudCkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zb2xlLmxvZygnUmVxdWVzdDogJywgZXZlbnQuaGVhZGVycylcclxuICAgICAgICBpZiAoZXZlbnQuaHR0cE1ldGhvZCA9PT0gJ09QVElPTlMnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcclxuICAgICAgICAgICAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHMnOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJzogJ09QVElPTlMsUE9TVCxHRVQsUFVULERFTEVURScsXHJcbiAgICAgICAgICAgICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnOiAnQ29udGVudC1UeXBlLFgtQW16LURhdGUsQXV0aG9yaXphdGlvbixYLUFwaS1LZXksWC1BbXotU2VjdXJpdHktVG9rZW4sZnJvbScsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYm9keTogJycsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IGV2ZW50LmhlYWRlcnNbJ2Zyb20nXVxyXG4gICAgICAgIGlmKGhlYWRlcil7XHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBnZXRVc2VyQnlMb2dpbihoZWFkZXIpXHJcbiAgICAgICAgICAgIGlmKHVzZXIpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3VzZXIgZm91bmQnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgaW50ZWdyYXRvcnMgPSBhd2FpdCBnZXRJbnRlZ3JhdG9ycyh1c2VyKVxyXG4gICAgICAgICAgICAgICAgaWYoaW50ZWdyYXRvcnMpIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUNyZWRlbnRpYWxzJzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnOiAnT1BUSU9OUyxQT1NULEdFVCxQVVQsREVMRVRFJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnOiAnQ29udGVudC1UeXBlLFgtQW16LURhdGUsQXV0aG9yaXphdGlvbixYLUFwaS1LZXksWC1BbXotU2VjdXJpdHktVG9rZW4sZnJvbScsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7aW50ZWdyYXRvcnM6IGludGVncmF0b3JzfSwgbnVsbCwgMilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ05vIGludGVncmF0b3JzIGZvdW5kJylcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWZhdWx0RXJyb3JNZXNzYWdlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignTm8gdXNlciBmb3VuZCcpXHJcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0RXJyb3JNZXNzYWdlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ01pc3NpbmcgaGVhZGVyJylcclxuICAgICAgICByZXR1cm4gZGVmYXVsdEVycm9yTWVzc2FnZVxyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvcjogJywgZSlcclxuICAgICAgICByZXR1cm4gZGVmYXVsdEVycm9yTWVzc2FnZVxyXG4gICAgfVxyXG59Il19