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
            const getUser = await (0, DatabaseUtils_1.getUserByLogin)(header);
            if (getUser) {
                delete getUser.password;
                return {
                    statusCode: 200,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE',
                        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,from',
                    },
                    body: JSON.stringify({ user: getUser }, null, 2)
                };
            }
            console.error('No user found');
            return defaultErrorMessage_1.defaultErrorMessage;
        }
        else {
            console.error('Header is missing');
            return defaultErrorMessage_1.defaultErrorMessage;
        }
    }
    catch (e) {
        console.error('Error ', e);
        return defaultErrorMessage_1.defaultErrorMessage;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldFVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSx5REFBcUQ7QUFDckQseUVBQW9FO0FBR3BFLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxFQUFDLEtBQXNCLEVBQUUsRUFBRTtJQUM5QyxJQUFJO1FBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3ZDLElBQUksS0FBSyxDQUFDLFVBQVUsS0FBSyxTQUFTLEVBQUU7WUFDaEMsT0FBTztnQkFDSCxVQUFVLEVBQUUsR0FBRztnQkFDZixPQUFPLEVBQUU7b0JBQ0wsNkJBQTZCLEVBQUUsR0FBRztvQkFDbEMsa0NBQWtDLEVBQUUsSUFBSTtvQkFDeEMsOEJBQThCLEVBQUUsNkJBQTZCO29CQUM3RCw4QkFBOEIsRUFBRSwyRUFBMkU7aUJBQzlHO2dCQUNELElBQUksRUFBRSxFQUFFO2FBQ1gsQ0FBQztTQUNMO1FBRUQsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUVwQyxJQUFHLE1BQU0sRUFBQztZQUNOLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBQSw4QkFBYyxFQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQzVDLElBQUcsT0FBTyxFQUFDO2dCQUNQLE9BQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQTtnQkFDdkIsT0FBTztvQkFDSCxVQUFVLEVBQUUsR0FBRztvQkFDZixPQUFPLEVBQUU7d0JBQ0wsNkJBQTZCLEVBQUUsR0FBRzt3QkFDbEMsa0NBQWtDLEVBQUUsSUFBSTt3QkFDeEMsOEJBQThCLEVBQUUsNkJBQTZCO3dCQUM3RCw4QkFBOEIsRUFBRSwyRUFBMkU7cUJBQzlHO29CQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7aUJBQ2pELENBQUE7YUFDSjtZQUNELE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7WUFDOUIsT0FBTyx5Q0FBbUIsQ0FBQTtTQUM3QjthQUNHO1lBQ0EsT0FBTyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO1lBQ2xDLE9BQU8seUNBQW1CLENBQUE7U0FDN0I7S0FDSjtJQUNELE9BQU8sQ0FBQyxFQUFFO1FBQ04sT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDMUIsT0FBTyx5Q0FBbUIsQ0FBQTtLQUM3QjtBQUNMLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QVBJR2F0ZXdheUV2ZW50fSBmcm9tIFwiYXdzLWxhbWJkYVwiO1xyXG5pbXBvcnQge2dldFVzZXJCeUxvZ2lufSBmcm9tIFwiLi9VdGlscy9EYXRhYmFzZVV0aWxzXCI7XHJcbmltcG9ydCB7ZGVmYXVsdEVycm9yTWVzc2FnZX0gZnJvbSBcIi4vQ29uc3RhbnRzL2RlZmF1bHRFcnJvck1lc3NhZ2VcIjtcclxuaW1wb3J0IHtkZWZhdWx0SGVhZGVyc30gZnJvbSBcIi4vQ29uc3RhbnRzL2RlZmF1bHRIZWFkZXJzXCI7XHJcblxyXG5leHBvcnRzLmhhbmRsZXIgPSBhc3luYyhldmVudDogQVBJR2F0ZXdheUV2ZW50KSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdSZXF1ZXN0OiAnLCBldmVudC5oZWFkZXJzKVxyXG4gICAgICAgIGlmIChldmVudC5odHRwTWV0aG9kID09PSAnT1BUSU9OUycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLFxyXG4gICAgICAgICAgICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFscyc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnOiAnT1BUSU9OUyxQT1NULEdFVCxQVVQsREVMRVRFJyxcclxuICAgICAgICAgICAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycyc6ICdDb250ZW50LVR5cGUsWC1BbXotRGF0ZSxBdXRob3JpemF0aW9uLFgtQXBpLUtleSxYLUFtei1TZWN1cml0eS1Ub2tlbixmcm9tJyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBib2R5OiAnJyxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IGV2ZW50LmhlYWRlcnNbJ2Zyb20nXVxyXG5cclxuICAgICAgICBpZihoZWFkZXIpe1xyXG4gICAgICAgICAgICBjb25zdCBnZXRVc2VyID0gYXdhaXQgZ2V0VXNlckJ5TG9naW4oaGVhZGVyKVxyXG4gICAgICAgICAgICBpZihnZXRVc2VyKXtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBnZXRVc2VyLnBhc3N3b3JkXHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFscyc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzJzogJ09QVElPTlMsUE9TVCxHRVQsUFVULERFTEVURScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJzogJ0NvbnRlbnQtVHlwZSxYLUFtei1EYXRlLEF1dGhvcml6YXRpb24sWC1BcGktS2V5LFgtQW16LVNlY3VyaXR5LVRva2VuLGZyb20nLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe3VzZXI6IGdldFVzZXJ9LCBudWxsLCAyKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ05vIHVzZXIgZm91bmQnKVxyXG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdEVycm9yTWVzc2FnZVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdIZWFkZXIgaXMgbWlzc2luZycpXHJcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0RXJyb3JNZXNzYWdlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciAnLCBlKVxyXG4gICAgICAgIHJldHVybiBkZWZhdWx0RXJyb3JNZXNzYWdlXHJcbiAgICB9XHJcbn0iXX0=