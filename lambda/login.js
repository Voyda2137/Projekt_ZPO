"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseUtils_1 = require("./Utils/DatabaseUtils");
const defaultHeaders_1 = require("./Constants/defaultHeaders");
const defaultErrorMessage_1 = require("./Constants/defaultErrorMessage");
exports.handler = async (event) => {
    try {
        const userObject = JSON.parse(event.body || '');
        if (userObject.login && userObject.password) {
            const loginRequest = await (0, DatabaseUtils_1.userLogin)({ login: userObject.login, password: userObject.password });
            if (loginRequest)
                return {
                    statusCode: 200,
                    headers: defaultHeaders_1.defaultHeaders,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2dpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlEQUFnRDtBQUVoRCwrREFBMEQ7QUFDMUQseUVBQW9FO0FBRXBFLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxFQUFFLEtBQXNCLEVBQUUsRUFBRTtJQUMvQyxJQUFJO1FBQ0EsTUFBTSxVQUFVLEdBQVUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1FBQ3RELElBQUcsVUFBVSxDQUFDLEtBQUssSUFBSSxVQUFVLENBQUMsUUFBUSxFQUFDO1lBQ3ZDLE1BQU0sWUFBWSxHQUFHLE1BQU0sSUFBQSx5QkFBUyxFQUFDLEVBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxRQUFRLEVBQUMsQ0FBQyxDQUFBO1lBQzlGLElBQUcsWUFBWTtnQkFBRSxPQUFPO29CQUNwQixVQUFVLEVBQUUsR0FBRztvQkFDZixPQUFPLEVBQUUsK0JBQWM7b0JBQ3ZCLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO3dCQUNqQixJQUFJLEVBQUU7NEJBQ0YsS0FBSyxFQUFFLFlBQVksQ0FBQyxLQUFLOzRCQUN6QixJQUFJLEVBQUUsWUFBWSxDQUFDLElBQUk7NEJBQ3ZCLE9BQU8sRUFBRSxZQUFZLENBQUMsT0FBTzs0QkFDN0IsSUFBSSxFQUFFLFlBQVksQ0FBQyxJQUFJOzRCQUN2QixnQkFBZ0IsRUFBRSxZQUFZLENBQUMsZ0JBQWdCO3lCQUNsRDtxQkFDSixFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7aUJBQ2QsQ0FBQTtpQkFDSTtnQkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixDQUFDLENBQUE7Z0JBQzFDLE9BQU8seUNBQW1CLENBQUE7YUFDN0I7U0FDSjthQUNJO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFBO1lBQ3hDLE9BQU8seUNBQW1CLENBQUE7U0FDN0I7S0FDSjtJQUNELE9BQU8sQ0FBQyxFQUFFO1FBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDekIsT0FBTyx5Q0FBbUIsQ0FBQTtLQUM3QjtBQUNMLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SVVzZXJ9IGZyb20gXCIuLi9JbnRlcmZhY2VzL0lVc2VyXCI7XHJcbmltcG9ydCB7dXNlckxvZ2lufSBmcm9tIFwiLi9VdGlscy9EYXRhYmFzZVV0aWxzXCI7XHJcbmltcG9ydCB7QVBJR2F0ZXdheUV2ZW50fSBmcm9tIFwiYXdzLWxhbWJkYVwiO1xyXG5pbXBvcnQge2RlZmF1bHRIZWFkZXJzfSBmcm9tIFwiLi9Db25zdGFudHMvZGVmYXVsdEhlYWRlcnNcIjtcclxuaW1wb3J0IHtkZWZhdWx0RXJyb3JNZXNzYWdlfSBmcm9tIFwiLi9Db25zdGFudHMvZGVmYXVsdEVycm9yTWVzc2FnZVwiO1xyXG5cclxuZXhwb3J0cy5oYW5kbGVyID0gYXN5bmMgKGV2ZW50OiBBUElHYXRld2F5RXZlbnQpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgdXNlck9iamVjdDogSVVzZXIgPSBKU09OLnBhcnNlKGV2ZW50LmJvZHkgfHwgJycpXHJcbiAgICAgICAgaWYodXNlck9iamVjdC5sb2dpbiAmJiB1c2VyT2JqZWN0LnBhc3N3b3JkKXtcclxuICAgICAgICAgICAgY29uc3QgbG9naW5SZXF1ZXN0ID0gYXdhaXQgdXNlckxvZ2luKHtsb2dpbjogdXNlck9iamVjdC5sb2dpbiwgcGFzc3dvcmQ6IHVzZXJPYmplY3QucGFzc3dvcmR9KVxyXG4gICAgICAgICAgICBpZihsb2dpblJlcXVlc3QpIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiBkZWZhdWx0SGVhZGVycyxcclxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2luOiBsb2dpblJlcXVlc3QubG9naW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGxvZ2luUmVxdWVzdC5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdXJuYW1lOiBsb2dpblJlcXVlc3Quc3VybmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZTogbG9naW5SZXF1ZXN0LnJvbGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludGVncmF0b3JHcm91cHM6IGxvZ2luUmVxdWVzdC5pbnRlZ3JhdG9yR3JvdXBzXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgbnVsbCwgMilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciB3aGlsZSB0cnlpbmcgdG8gbG9naW4nKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRFcnJvck1lc3NhZ2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ01pc3NpbmcgbG9naW4gb3IgcGFzc3dvcmQnKVxyXG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdEVycm9yTWVzc2FnZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yOiAnLCBlKVxyXG4gICAgICAgIHJldHVybiBkZWZhdWx0RXJyb3JNZXNzYWdlXHJcbiAgICB9XHJcbn1cclxuIl19