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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldFVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSx5REFBcUQ7QUFDckQseUVBQW9FO0FBRXBFLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxFQUFDLEtBQXNCLEVBQUUsRUFBRTtJQUM5QyxJQUFJO1FBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3ZDLElBQUksS0FBSyxDQUFDLFVBQVUsS0FBSyxTQUFTLEVBQUU7WUFDaEMsT0FBTztnQkFDSCxVQUFVLEVBQUUsR0FBRztnQkFDZixPQUFPLEVBQUU7b0JBQ0wsNkJBQTZCLEVBQUUsR0FBRztvQkFDbEMsa0NBQWtDLEVBQUUsSUFBSTtvQkFDeEMsOEJBQThCLEVBQUUsNkJBQTZCO29CQUM3RCw4QkFBOEIsRUFBRSwyRUFBMkU7aUJBQzlHO2dCQUNELElBQUksRUFBRSxFQUFFO2FBQ1gsQ0FBQztTQUNMO1FBRUQsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUVwQyxJQUFHLE1BQU0sRUFBQztZQUNOLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBQSw4QkFBYyxFQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQzVDLElBQUcsT0FBTyxFQUFDO2dCQUNQLE9BQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQTtnQkFDdkIsT0FBTztvQkFDSCxVQUFVLEVBQUUsR0FBRztvQkFDZixPQUFPLEVBQUU7d0JBQ0wsNkJBQTZCLEVBQUUsR0FBRzt3QkFDbEMsa0NBQWtDLEVBQUUsSUFBSTt3QkFDeEMsOEJBQThCLEVBQUUsNkJBQTZCO3dCQUM3RCw4QkFBOEIsRUFBRSwyRUFBMkU7cUJBQzlHO29CQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7aUJBQ2pELENBQUE7YUFDSjtZQUNELE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7WUFDOUIsT0FBTyx5Q0FBbUIsQ0FBQTtTQUM3QjthQUNHO1lBQ0EsT0FBTyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO1lBQ2xDLE9BQU8seUNBQW1CLENBQUE7U0FDN0I7S0FDSjtJQUNELE9BQU8sQ0FBQyxFQUFFO1FBQ04sT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDMUIsT0FBTyx5Q0FBbUIsQ0FBQTtLQUM3QjtBQUNMLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QVBJR2F0ZXdheUV2ZW50fSBmcm9tIFwiYXdzLWxhbWJkYVwiO1xyXG5pbXBvcnQge2dldFVzZXJCeUxvZ2lufSBmcm9tIFwiLi9VdGlscy9EYXRhYmFzZVV0aWxzXCI7XHJcbmltcG9ydCB7ZGVmYXVsdEVycm9yTWVzc2FnZX0gZnJvbSBcIi4vQ29uc3RhbnRzL2RlZmF1bHRFcnJvck1lc3NhZ2VcIjtcclxuXHJcbmV4cG9ydHMuaGFuZGxlciA9IGFzeW5jKGV2ZW50OiBBUElHYXRld2F5RXZlbnQpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1JlcXVlc3Q6ICcsIGV2ZW50LmhlYWRlcnMpXHJcbiAgICAgICAgaWYgKGV2ZW50Lmh0dHBNZXRob2QgPT09ICdPUFRJT05TJykge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUNyZWRlbnRpYWxzJzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kcyc6ICdPUFRJT05TLFBPU1QsR0VULFBVVCxERUxFVEUnLFxyXG4gICAgICAgICAgICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJzogJ0NvbnRlbnQtVHlwZSxYLUFtei1EYXRlLEF1dGhvcml6YXRpb24sWC1BcGktS2V5LFgtQW16LVNlY3VyaXR5LVRva2VuLGZyb20nLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGJvZHk6ICcnLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaGVhZGVyID0gZXZlbnQuaGVhZGVyc1snZnJvbSddXHJcblxyXG4gICAgICAgIGlmKGhlYWRlcil7XHJcbiAgICAgICAgICAgIGNvbnN0IGdldFVzZXIgPSBhd2FpdCBnZXRVc2VyQnlMb2dpbihoZWFkZXIpXHJcbiAgICAgICAgICAgIGlmKGdldFVzZXIpe1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGdldFVzZXIucGFzc3dvcmRcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUNyZWRlbnRpYWxzJzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnOiAnT1BUSU9OUyxQT1NULEdFVCxQVVQsREVMRVRFJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnOiAnQ29udGVudC1UeXBlLFgtQW16LURhdGUsQXV0aG9yaXphdGlvbixYLUFwaS1LZXksWC1BbXotU2VjdXJpdHktVG9rZW4sZnJvbScsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7dXNlcjogZ2V0VXNlcn0sIG51bGwsIDIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignTm8gdXNlciBmb3VuZCcpXHJcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0RXJyb3JNZXNzYWdlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0hlYWRlciBpcyBtaXNzaW5nJylcclxuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRFcnJvck1lc3NhZ2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yICcsIGUpXHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRFcnJvck1lc3NhZ2VcclxuICAgIH1cclxufSJdfQ==