"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseUtils_1 = require("./Utils/DatabaseUtils");
const defaultErrorMessage_1 = require("./Constants/defaultErrorMessage");
const defaultHeaders_1 = require("./Constants/defaultHeaders");
exports.handler = async (event) => {
    try {
        const { location, serialNumber, userID } = JSON.parse(event.body || '');
        if (location && serialNumber && userID) {
            const createIntegratorRequest = await (0, DatabaseUtils_1.createIntegrator)({ location: location, serialNumber: serialNumber, userID: userID });
            if ('error' in createIntegratorRequest) {
                console.error('Error in createIntegratorRequest: ', createIntegratorRequest.error);
                return defaultErrorMessage_1.defaultErrorMessage;
            }
            return {
                statusCode: 200,
                headers: defaultHeaders_1.defaultHeaders,
                body: JSON.stringify(createIntegratorRequest, null, 2)
            };
        }
        console.error('missing params');
        return defaultErrorMessage_1.defaultErrorMessage;
    }
    catch (e) {
        console.error('Error adding integrator: ', e);
        return defaultErrorMessage_1.defaultErrorMessage;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWdyYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImludGVncmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5REFBdUQ7QUFFdkQseUVBQW9FO0FBQ3BFLCtEQUEwRDtBQUUxRCxPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssRUFBRSxLQUFzQixFQUFFLEVBQUU7SUFDL0MsSUFBRztRQUNDLE1BQU0sRUFBQyxRQUFRLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUNyRSxJQUFHLFFBQVEsSUFBSSxZQUFZLElBQUksTUFBTSxFQUFFO1lBQ25DLE1BQU0sdUJBQXVCLEdBQUcsTUFBTSxJQUFBLGdDQUFnQixFQUFDLEVBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFBO1lBQ3hILElBQUcsT0FBTyxJQUFJLHVCQUF1QixFQUFDO2dCQUNsQyxPQUFPLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxFQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxDQUFBO2dCQUNqRixPQUFPLHlDQUFtQixDQUFBO2FBQzdCO1lBQ0QsT0FBTztnQkFDSCxVQUFVLEVBQUUsR0FBRztnQkFDZixPQUFPLEVBQUUsK0JBQWM7Z0JBQ3ZCLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLHVCQUF1QixFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7YUFDekQsQ0FBQTtTQUNKO1FBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1FBQy9CLE9BQU8seUNBQW1CLENBQUE7S0FDN0I7SUFDRCxPQUFPLENBQUMsRUFBRTtRQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUMsMkJBQTJCLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDN0MsT0FBTyx5Q0FBbUIsQ0FBQTtLQUM3QjtBQUNMLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Y3JlYXRlSW50ZWdyYXRvcn0gZnJvbSBcIi4vVXRpbHMvRGF0YWJhc2VVdGlsc1wiO1xyXG5pbXBvcnQge0FQSUdhdGV3YXlFdmVudH0gZnJvbSBcImF3cy1sYW1iZGFcIjtcclxuaW1wb3J0IHtkZWZhdWx0RXJyb3JNZXNzYWdlfSBmcm9tIFwiLi9Db25zdGFudHMvZGVmYXVsdEVycm9yTWVzc2FnZVwiO1xyXG5pbXBvcnQge2RlZmF1bHRIZWFkZXJzfSBmcm9tIFwiLi9Db25zdGFudHMvZGVmYXVsdEhlYWRlcnNcIjtcclxuXHJcbmV4cG9ydHMuaGFuZGxlciA9IGFzeW5jIChldmVudDogQVBJR2F0ZXdheUV2ZW50KSA9PiB7XHJcbiAgICB0cnl7XHJcbiAgICAgICAgY29uc3Qge2xvY2F0aW9uLCBzZXJpYWxOdW1iZXIsIHVzZXJJRH0gPSBKU09OLnBhcnNlKGV2ZW50LmJvZHkgfHwgJycpXHJcbiAgICAgICAgaWYobG9jYXRpb24gJiYgc2VyaWFsTnVtYmVyICYmIHVzZXJJRCkge1xyXG4gICAgICAgICAgICBjb25zdCBjcmVhdGVJbnRlZ3JhdG9yUmVxdWVzdCA9IGF3YWl0IGNyZWF0ZUludGVncmF0b3Ioe2xvY2F0aW9uOiBsb2NhdGlvbiwgc2VyaWFsTnVtYmVyOiBzZXJpYWxOdW1iZXIsIHVzZXJJRDogdXNlcklEfSlcclxuICAgICAgICAgICAgaWYoJ2Vycm9yJyBpbiBjcmVhdGVJbnRlZ3JhdG9yUmVxdWVzdCl7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBpbiBjcmVhdGVJbnRlZ3JhdG9yUmVxdWVzdDogJyxjcmVhdGVJbnRlZ3JhdG9yUmVxdWVzdC5lcnJvcilcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWZhdWx0RXJyb3JNZXNzYWdlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IGRlZmF1bHRIZWFkZXJzLFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY3JlYXRlSW50ZWdyYXRvclJlcXVlc3QsIG51bGwsIDIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignbWlzc2luZyBwYXJhbXMnKVxyXG4gICAgICAgIHJldHVybiBkZWZhdWx0RXJyb3JNZXNzYWdlXHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGFkZGluZyBpbnRlZ3JhdG9yOiAnLCBlKVxyXG4gICAgICAgIHJldHVybiBkZWZhdWx0RXJyb3JNZXNzYWdlXHJcbiAgICB9XHJcbn0iXX0=