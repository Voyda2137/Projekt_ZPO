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
            const getUser = await (0, DatabaseUtils_1.getUserByID)(header);
            if (getUser.role.isManager) {
                const workers = await (0, DatabaseUtils_1.getWorkers)(header);
                if ('error' in workers) {
                    console.error('Error in workers', workers.error);
                    return defaultErrorMessage_1.defaultErrorMessage;
                }
                return {
                    statusCode: 200,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': true,
                        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE',
                        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,from',
                    },
                    body: JSON.stringify({ workers: workers }, null, 2)
                };
            }
            console.error('User is not a manager');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0V29ya2Vycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldFdvcmtlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSx5REFBOEQ7QUFDOUQseUVBQW9FO0FBRXBFLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxFQUFDLEtBQXNCLEVBQUUsRUFBRTtJQUM5QyxJQUFJO1FBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3ZDLElBQUksS0FBSyxDQUFDLFVBQVUsS0FBSyxTQUFTLEVBQUU7WUFDaEMsT0FBTztnQkFDSCxVQUFVLEVBQUUsR0FBRztnQkFDZixPQUFPLEVBQUU7b0JBQ0wsNkJBQTZCLEVBQUUsR0FBRztvQkFDbEMsa0NBQWtDLEVBQUUsSUFBSTtvQkFDeEMsOEJBQThCLEVBQUUsNkJBQTZCO29CQUM3RCw4QkFBOEIsRUFBRSwyRUFBMkU7aUJBQzlHO2dCQUNELElBQUksRUFBRSxFQUFFO2FBQ1gsQ0FBQztTQUNMO1FBRUQsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUVwQyxJQUFHLE1BQU0sRUFBQztZQUNOLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBQSwyQkFBVyxFQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3pDLElBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUM7Z0JBQ3RCLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBQSwwQkFBVSxFQUFDLE1BQU0sQ0FBQyxDQUFBO2dCQUN4QyxJQUFHLE9BQU8sSUFBSSxPQUFPLEVBQUM7b0JBQ2xCLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO29CQUNoRCxPQUFPLHlDQUFtQixDQUFBO2lCQUM3QjtnQkFDRCxPQUFPO29CQUNILFVBQVUsRUFBRSxHQUFHO29CQUNmLE9BQU8sRUFBRTt3QkFDTCw2QkFBNkIsRUFBRSxHQUFHO3dCQUNsQyxrQ0FBa0MsRUFBRSxJQUFJO3dCQUN4Qyw4QkFBOEIsRUFBRSw2QkFBNkI7d0JBQzdELDhCQUE4QixFQUFFLDJFQUEyRTtxQkFDOUc7b0JBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztpQkFDcEQsQ0FBQTthQUNKO1lBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBO1lBQ3RDLE9BQU8seUNBQW1CLENBQUE7U0FDN0I7YUFDRztZQUNBLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtZQUNsQyxPQUFPLHlDQUFtQixDQUFBO1NBQzdCO0tBQ0o7SUFDRCxPQUFPLENBQUMsRUFBRTtRQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQzFCLE9BQU8seUNBQW1CLENBQUE7S0FDN0I7QUFDTCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FQSUdhdGV3YXlFdmVudH0gZnJvbSBcImF3cy1sYW1iZGFcIjtcclxuaW1wb3J0IHtnZXRVc2VyQnlJRCwgZ2V0V29ya2Vyc30gZnJvbSBcIi4vVXRpbHMvRGF0YWJhc2VVdGlsc1wiO1xyXG5pbXBvcnQge2RlZmF1bHRFcnJvck1lc3NhZ2V9IGZyb20gXCIuL0NvbnN0YW50cy9kZWZhdWx0RXJyb3JNZXNzYWdlXCI7XHJcblxyXG5leHBvcnRzLmhhbmRsZXIgPSBhc3luYyhldmVudDogQVBJR2F0ZXdheUV2ZW50KSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdSZXF1ZXN0OiAnLCBldmVudC5oZWFkZXJzKVxyXG4gICAgICAgIGlmIChldmVudC5odHRwTWV0aG9kID09PSAnT1BUSU9OUycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLFxyXG4gICAgICAgICAgICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFscyc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnOiAnT1BUSU9OUyxQT1NULEdFVCxQVVQsREVMRVRFJyxcclxuICAgICAgICAgICAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctSGVhZGVycyc6ICdDb250ZW50LVR5cGUsWC1BbXotRGF0ZSxBdXRob3JpemF0aW9uLFgtQXBpLUtleSxYLUFtei1TZWN1cml0eS1Ub2tlbixmcm9tJyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBib2R5OiAnJyxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IGV2ZW50LmhlYWRlcnNbJ2Zyb20nXVxyXG5cclxuICAgICAgICBpZihoZWFkZXIpe1xyXG4gICAgICAgICAgICBjb25zdCBnZXRVc2VyID0gYXdhaXQgZ2V0VXNlckJ5SUQoaGVhZGVyKVxyXG4gICAgICAgICAgICBpZihnZXRVc2VyLnJvbGUuaXNNYW5hZ2VyKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHdvcmtlcnMgPSBhd2FpdCBnZXRXb3JrZXJzKGhlYWRlcilcclxuICAgICAgICAgICAgICAgIGlmKCdlcnJvcicgaW4gd29ya2Vycyl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgaW4gd29ya2VycycsIHdvcmtlcnMuZXJyb3IpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRFcnJvck1lc3NhZ2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUNyZWRlbnRpYWxzJzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnOiAnT1BUSU9OUyxQT1NULEdFVCxQVVQsREVMRVRFJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnMnOiAnQ29udGVudC1UeXBlLFgtQW16LURhdGUsQXV0aG9yaXphdGlvbixYLUFwaS1LZXksWC1BbXotU2VjdXJpdHktVG9rZW4sZnJvbScsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7d29ya2Vyczogd29ya2Vyc30sIG51bGwsIDIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignVXNlciBpcyBub3QgYSBtYW5hZ2VyJylcclxuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRFcnJvck1lc3NhZ2VcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignSGVhZGVyIGlzIG1pc3NpbmcnKVxyXG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdEVycm9yTWVzc2FnZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgJywgZSlcclxuICAgICAgICByZXR1cm4gZGVmYXVsdEVycm9yTWVzc2FnZVxyXG4gICAgfVxyXG59Il19