"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseUtils_1 = require("./Utils/DatabaseUtils");
const defaultErrorMessage_1 = require("./Constants/defaultErrorMessage");
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
                return defaultErrorMessage_1.defaultErrorMessage;
            }
        }
        else {
            console.log('Missing login or password');
            return defaultErrorMessage_1.defaultErrorMessage;
        }
    }
    catch (e) {
        console.log('Error: ', e);
        return defaultErrorMessage_1.defaultErrorMessage;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2dpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlEQUFnRDtBQUdoRCx5RUFBb0U7QUFFcEUsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLEVBQUUsS0FBc0IsRUFBRSxFQUFFO0lBQy9DLElBQUk7UUFDQSxNQUFNLFVBQVUsR0FBVSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUE7UUFDdEQsSUFBRyxVQUFVLENBQUMsS0FBSyxJQUFJLFVBQVUsQ0FBQyxRQUFRLEVBQUM7WUFDdkMsTUFBTSxZQUFZLEdBQUcsTUFBTSxJQUFBLHlCQUFTLEVBQUMsRUFBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLFFBQVEsRUFBQyxDQUFDLENBQUE7WUFDOUYsSUFBRyxZQUFZO2dCQUFFLE9BQU87b0JBQ3BCLFVBQVUsRUFBRSxHQUFHO29CQUNmLE9BQU8sRUFBRTt3QkFDTCw2QkFBNkIsRUFBRSxHQUFHO3dCQUNsQyxrQ0FBa0MsRUFBRSxJQUFJO3FCQUMzQztvQkFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQzt3QkFDakIsSUFBSSxFQUFFOzRCQUNGLEtBQUssRUFBRSxZQUFZLENBQUMsS0FBSzs0QkFDekIsSUFBSSxFQUFFLFlBQVksQ0FBQyxJQUFJOzRCQUN2QixPQUFPLEVBQUUsWUFBWSxDQUFDLE9BQU87NEJBQzdCLElBQUksRUFBRSxZQUFZLENBQUMsSUFBSTs0QkFDdkIsZ0JBQWdCLEVBQUUsWUFBWSxDQUFDLGdCQUFnQjt5QkFDbEQ7cUJBQ0osRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2lCQUNkLENBQUE7aUJBQ0k7Z0JBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFBO2dCQUMxQyxPQUFPLHlDQUFtQixDQUFBO2FBQzdCO1NBQ0o7YUFDSTtZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQTtZQUN4QyxPQUFPLHlDQUFtQixDQUFBO1NBQzdCO0tBQ0o7SUFDRCxPQUFPLENBQUMsRUFBRTtRQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3pCLE9BQU8seUNBQW1CLENBQUE7S0FDN0I7QUFDTCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0lVc2VyfSBmcm9tIFwiLi4vSW50ZXJmYWNlcy9JVXNlclwiO1xyXG5pbXBvcnQge3VzZXJMb2dpbn0gZnJvbSBcIi4vVXRpbHMvRGF0YWJhc2VVdGlsc1wiO1xyXG5pbXBvcnQge0FQSUdhdGV3YXlFdmVudH0gZnJvbSBcImF3cy1sYW1iZGFcIjtcclxuaW1wb3J0IHtkZWZhdWx0SGVhZGVyc30gZnJvbSBcIi4vQ29uc3RhbnRzL2RlZmF1bHRIZWFkZXJzXCI7XHJcbmltcG9ydCB7ZGVmYXVsdEVycm9yTWVzc2FnZX0gZnJvbSBcIi4vQ29uc3RhbnRzL2RlZmF1bHRFcnJvck1lc3NhZ2VcIjtcclxuXHJcbmV4cG9ydHMuaGFuZGxlciA9IGFzeW5jIChldmVudDogQVBJR2F0ZXdheUV2ZW50KSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHVzZXJPYmplY3Q6IElVc2VyID0gSlNPTi5wYXJzZShldmVudC5ib2R5IHx8ICcnKVxyXG4gICAgICAgIGlmKHVzZXJPYmplY3QubG9naW4gJiYgdXNlck9iamVjdC5wYXNzd29yZCl7XHJcbiAgICAgICAgICAgIGNvbnN0IGxvZ2luUmVxdWVzdCA9IGF3YWl0IHVzZXJMb2dpbih7bG9naW46IHVzZXJPYmplY3QubG9naW4sIHBhc3N3b3JkOiB1c2VyT2JqZWN0LnBhc3N3b3JkfSlcclxuICAgICAgICAgICAgaWYobG9naW5SZXF1ZXN0KSByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LUNyZWRlbnRpYWxzJzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dpbjogbG9naW5SZXF1ZXN0LmxvZ2luLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBsb2dpblJlcXVlc3QubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VybmFtZTogbG9naW5SZXF1ZXN0LnN1cm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU6IGxvZ2luUmVxdWVzdC5yb2xlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnRlZ3JhdG9yR3JvdXBzOiBsb2dpblJlcXVlc3QuaW50ZWdyYXRvckdyb3Vwc1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIG51bGwsIDIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3Igd2hpbGUgdHJ5aW5nIHRvIGxvZ2luJylcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWZhdWx0RXJyb3JNZXNzYWdlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdNaXNzaW5nIGxvZ2luIG9yIHBhc3N3b3JkJylcclxuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRFcnJvck1lc3NhZ2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdFcnJvcjogJywgZSlcclxuICAgICAgICByZXR1cm4gZGVmYXVsdEVycm9yTWVzc2FnZVxyXG4gICAgfVxyXG59XHJcbiJdfQ==