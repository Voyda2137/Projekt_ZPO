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
                    body: JSON.stringify({ message: 'Internal Server Error' })
                };
            }
        }
        else {
            console.log('Missing login or password');
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Internal Server Error' })
            };
        }
    }
    catch (e) {
        console.log('Error: ', e);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' })
        };
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2dpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlEQUFnRDtBQUdoRCxPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssRUFBRSxLQUFzQixFQUFFLEVBQUU7SUFDL0MsSUFBSTtRQUNBLE1BQU0sVUFBVSxHQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUN0RCxJQUFHLFVBQVUsQ0FBQyxLQUFLLElBQUksVUFBVSxDQUFDLFFBQVEsRUFBQztZQUN2QyxNQUFNLFlBQVksR0FBRyxNQUFNLElBQUEseUJBQVMsRUFBQyxFQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQTtZQUM5RixJQUFHLFlBQVk7Z0JBQUUsT0FBTztvQkFDcEIsVUFBVSxFQUFFLEdBQUc7b0JBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7d0JBQ2pCLElBQUksRUFBRTs0QkFDRixLQUFLLEVBQUUsWUFBWSxDQUFDLEtBQUs7NEJBQ3pCLElBQUksRUFBRSxZQUFZLENBQUMsSUFBSTs0QkFDdkIsT0FBTyxFQUFFLFlBQVksQ0FBQyxPQUFPOzRCQUM3QixJQUFJLEVBQUUsWUFBWSxDQUFDLElBQUk7NEJBQ3ZCLGdCQUFnQixFQUFFLFlBQVksQ0FBQyxnQkFBZ0I7eUJBQ2xEO3FCQUNKLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztpQkFDZCxDQUFBO2lCQUNJO2dCQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQTtnQkFDMUMsT0FBTztvQkFDSCxVQUFVLEVBQUUsR0FBRztvQkFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFDLE9BQU8sRUFBRSx1QkFBdUIsRUFBQyxDQUFDO2lCQUMzRCxDQUFBO2FBQ0o7U0FDSjthQUNJO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFBO1lBQ3hDLE9BQU87Z0JBQ0gsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUMsQ0FBQzthQUMzRCxDQUFBO1NBQ0o7S0FDSjtJQUNELE9BQU8sQ0FBQyxFQUFFO1FBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDekIsT0FBTztZQUNILFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUMsQ0FBQztTQUMzRCxDQUFBO0tBQ0o7QUFDTCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0lVc2VyfSBmcm9tIFwiLi4vSW50ZXJmYWNlcy9JVXNlclwiO1xyXG5pbXBvcnQge3VzZXJMb2dpbn0gZnJvbSBcIi4vVXRpbHMvRGF0YWJhc2VVdGlsc1wiO1xyXG5pbXBvcnQge0FQSUdhdGV3YXlFdmVudH0gZnJvbSBcImF3cy1sYW1iZGFcIjtcclxuXHJcbmV4cG9ydHMuaGFuZGxlciA9IGFzeW5jIChldmVudDogQVBJR2F0ZXdheUV2ZW50KSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHVzZXJPYmplY3Q6IElVc2VyID0gSlNPTi5wYXJzZShldmVudC5ib2R5IHx8ICcnKVxyXG4gICAgICAgIGlmKHVzZXJPYmplY3QubG9naW4gJiYgdXNlck9iamVjdC5wYXNzd29yZCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGxvZ2luUmVxdWVzdCA9IGF3YWl0IHVzZXJMb2dpbih7bG9naW46IHVzZXJPYmplY3QubG9naW4sIHBhc3N3b3JkOiB1c2VyT2JqZWN0LnBhc3N3b3JkfSlcclxuICAgICAgICAgICAgaWYobG9naW5SZXF1ZXN0KSByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9naW46IGxvZ2luUmVxdWVzdC5sb2dpbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbG9naW5SZXF1ZXN0Lm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1cm5hbWU6IGxvZ2luUmVxdWVzdC5zdXJuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb2xlOiBsb2dpblJlcXVlc3Qucm9sZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW50ZWdyYXRvckdyb3VwczogbG9naW5SZXF1ZXN0LmludGVncmF0b3JHcm91cHNcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCBudWxsLCAyKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIHdoaWxlIHRyeWluZyB0byBsb2dpbicpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IDUwMCxcclxuICAgICAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7bWVzc2FnZTogJ0ludGVybmFsIFNlcnZlciBFcnJvcid9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTWlzc2luZyBsb2dpbiBvciBwYXNzd29yZCcpXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiA1MDAsXHJcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7bWVzc2FnZTogJ0ludGVybmFsIFNlcnZlciBFcnJvcid9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnRXJyb3I6ICcsIGUpXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc3RhdHVzQ29kZTogNTAwLFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7bWVzc2FnZTogJ0ludGVybmFsIFNlcnZlciBFcnJvcid9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=