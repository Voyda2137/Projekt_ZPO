"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseUtils_1 = require("./Utils/DatabaseUtils");
exports.handler = async (event) => {
    try {
        const userObject = JSON.parse(event.body || '');
        if (userObject.login && userObject.password) {
            const loginRequest = await (0, DatabaseUtils_1.userLogin)({ login: userObject.login, password: userObject.password });
            if (loginRequest)
                return {
                    statusCode: 200,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': true,
                    },
                    body: JSON.stringify({
                        user: {
                            login: loginRequest.login,
                            name: loginRequest.name,
                            surname: loginRequest.surname,
                            role: loginRequest.role,
                            integratorGroups: loginRequest.integratorGroups
                        }
                    }, null, 2)
                };
            else {
                console.log('Error while trying to login');
                return {
                    statusCode: 500,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': true,
                    },
                    body: JSON.stringify({ message: 'Internal Server Error' })
                };
            }
        }
        else {
            console.log('Missing login or password');
            return {
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                body: JSON.stringify({ message: 'Internal Server Error' })
            };
        }
    }
    catch (e) {
        console.log('Error: ', e);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ message: 'Internal Server Error' })
        };
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2dpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlEQUFnRDtBQUdoRCxPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssRUFBRSxLQUFzQixFQUFFLEVBQUU7SUFDL0MsSUFBSTtRQUNBLE1BQU0sVUFBVSxHQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUN0RCxJQUFHLFVBQVUsQ0FBQyxLQUFLLElBQUksVUFBVSxDQUFDLFFBQVEsRUFBQztZQUN2QyxNQUFNLFlBQVksR0FBRyxNQUFNLElBQUEseUJBQVMsRUFBQyxFQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQTtZQUM5RixJQUFHLFlBQVk7Z0JBQUUsT0FBTztvQkFDcEIsVUFBVSxFQUFFLEdBQUc7b0JBQ2YsT0FBTyxFQUFFO3dCQUNMLDZCQUE2QixFQUFFLEdBQUc7d0JBQ2xDLGtDQUFrQyxFQUFFLElBQUk7cUJBQzNDO29CQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO3dCQUNqQixJQUFJLEVBQUU7NEJBQ0YsS0FBSyxFQUFFLFlBQVksQ0FBQyxLQUFLOzRCQUN6QixJQUFJLEVBQUUsWUFBWSxDQUFDLElBQUk7NEJBQ3ZCLE9BQU8sRUFBRSxZQUFZLENBQUMsT0FBTzs0QkFDN0IsSUFBSSxFQUFFLFlBQVksQ0FBQyxJQUFJOzRCQUN2QixnQkFBZ0IsRUFBRSxZQUFZLENBQUMsZ0JBQWdCO3lCQUNsRDtxQkFDSixFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7aUJBQ2QsQ0FBQTtpQkFDSTtnQkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixDQUFDLENBQUE7Z0JBQzFDLE9BQU87b0JBQ0gsVUFBVSxFQUFFLEdBQUc7b0JBQ2YsT0FBTyxFQUFFO3dCQUNMLDZCQUE2QixFQUFFLEdBQUc7d0JBQ2xDLGtDQUFrQyxFQUFFLElBQUk7cUJBQzNDO29CQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUMsT0FBTyxFQUFFLHVCQUF1QixFQUFDLENBQUM7aUJBQzNELENBQUE7YUFDSjtTQUNKO2FBQ0k7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUE7WUFDeEMsT0FBTztnQkFDSCxVQUFVLEVBQUUsR0FBRztnQkFDZixPQUFPLEVBQUU7b0JBQ0wsNkJBQTZCLEVBQUUsR0FBRztvQkFDbEMsa0NBQWtDLEVBQUUsSUFBSTtpQkFDM0M7Z0JBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUMsQ0FBQzthQUMzRCxDQUFBO1NBQ0o7S0FDSjtJQUNELE9BQU8sQ0FBQyxFQUFFO1FBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDekIsT0FBTztZQUNILFVBQVUsRUFBRSxHQUFHO1lBQ2YsT0FBTyxFQUFFO2dCQUNMLDZCQUE2QixFQUFFLEdBQUc7Z0JBQ2xDLGtDQUFrQyxFQUFFLElBQUk7YUFDM0M7WUFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFDLE9BQU8sRUFBRSx1QkFBdUIsRUFBQyxDQUFDO1NBQzNELENBQUE7S0FDSjtBQUNMLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SVVzZXJ9IGZyb20gXCIuLi9JbnRlcmZhY2VzL0lVc2VyXCI7XHJcbmltcG9ydCB7dXNlckxvZ2lufSBmcm9tIFwiLi9VdGlscy9EYXRhYmFzZVV0aWxzXCI7XHJcbmltcG9ydCB7QVBJR2F0ZXdheUV2ZW50fSBmcm9tIFwiYXdzLWxhbWJkYVwiO1xyXG5cclxuZXhwb3J0cy5oYW5kbGVyID0gYXN5bmMgKGV2ZW50OiBBUElHYXRld2F5RXZlbnQpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgdXNlck9iamVjdDogSVVzZXIgPSBKU09OLnBhcnNlKGV2ZW50LmJvZHkgfHwgJycpXHJcbiAgICAgICAgaWYodXNlck9iamVjdC5sb2dpbiAmJiB1c2VyT2JqZWN0LnBhc3N3b3JkKXtcclxuICAgICAgICAgICAgY29uc3QgbG9naW5SZXF1ZXN0ID0gYXdhaXQgdXNlckxvZ2luKHtsb2dpbjogdXNlck9iamVjdC5sb2dpbiwgcGFzc3dvcmQ6IHVzZXJPYmplY3QucGFzc3dvcmR9KVxyXG4gICAgICAgICAgICBpZihsb2dpblJlcXVlc3QpIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcclxuICAgICAgICAgICAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHMnOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2luOiBsb2dpblJlcXVlc3QubG9naW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGxvZ2luUmVxdWVzdC5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdXJuYW1lOiBsb2dpblJlcXVlc3Quc3VybmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTogbG9naW5SZXF1ZXN0LnJvbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludGVncmF0b3JHcm91cHM6IGxvZ2luUmVxdWVzdC5pbnRlZ3JhdG9yR3JvdXBzXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgbnVsbCwgMilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciB3aGlsZSB0cnlpbmcgdG8gbG9naW4nKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiA1MDAsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHMnOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe21lc3NhZ2U6ICdJbnRlcm5hbCBTZXJ2ZXIgRXJyb3InfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ01pc3NpbmcgbG9naW4gb3IgcGFzc3dvcmQnKVxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogNTAwLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUNyZWRlbnRpYWxzJzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7bWVzc2FnZTogJ0ludGVybmFsIFNlcnZlciBFcnJvcid9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnRXJyb3I6ICcsIGUpXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc3RhdHVzQ29kZTogNTAwLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLFxyXG4gICAgICAgICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUNyZWRlbnRpYWxzJzogdHJ1ZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe21lc3NhZ2U6ICdJbnRlcm5hbCBTZXJ2ZXIgRXJyb3InfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19