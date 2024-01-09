"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseUtils_1 = require("./Utils/DatabaseUtils");
const defaultErrorMessage_1 = require("./Constants/defaultErrorMessage");
exports.handler = async (event) => {
    try {
        const { integratorGroupName, userID } = JSON.parse(event.body || '');
        const createIntegratorGroupRequest = await (0, DatabaseUtils_1.createIntegratorGroup)(integratorGroupName, userID);
        if ('error' in createIntegratorGroupRequest) {
            return defaultErrorMessage_1.defaultErrorMessage;
        }
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(createIntegratorGroupRequest, null, 2)
        };
    }
    catch (e) {
        console.error("Error: ", e);
        return defaultErrorMessage_1.defaultErrorMessage;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlSW50ZWdyYXRvckdyb3VwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3JlYXRlSW50ZWdyYXRvckdyb3VwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EseURBQTREO0FBQzVELHlFQUFvRTtBQUdwRSxPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssRUFBRSxLQUFzQixFQUFFLEVBQUU7SUFDL0MsSUFBSTtRQUNBLE1BQU0sRUFBQyxtQkFBbUIsRUFBRSxNQUFNLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUE7UUFDbEUsTUFBTSw0QkFBNEIsR0FBRyxNQUFNLElBQUEscUNBQXFCLEVBQUMsbUJBQW1CLEVBQUUsTUFBTSxDQUFDLENBQUE7UUFDN0YsSUFBRyxPQUFPLElBQUksNEJBQTRCLEVBQUM7WUFDdkMsT0FBTyx5Q0FBbUIsQ0FBQTtTQUM3QjtRQUNELE9BQU87WUFDSCxVQUFVLEVBQUUsR0FBRztZQUNmLE9BQU8sRUFBRTtnQkFDTCw2QkFBNkIsRUFBRSxHQUFHO2dCQUNsQyxrQ0FBa0MsRUFBRSxJQUFJO2FBQzNDO1lBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsNEJBQTRCLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUM5RCxDQUFBO0tBQ0o7SUFDRCxPQUFPLENBQUMsRUFBRTtRQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQzNCLE9BQU8seUNBQW1CLENBQUE7S0FDN0I7QUFDTCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FQSUdhdGV3YXlFdmVudH0gZnJvbSBcImF3cy1sYW1iZGFcIjtcclxuaW1wb3J0IHtjcmVhdGVJbnRlZ3JhdG9yR3JvdXB9IGZyb20gXCIuL1V0aWxzL0RhdGFiYXNlVXRpbHNcIjtcclxuaW1wb3J0IHtkZWZhdWx0RXJyb3JNZXNzYWdlfSBmcm9tIFwiLi9Db25zdGFudHMvZGVmYXVsdEVycm9yTWVzc2FnZVwiO1xyXG5pbXBvcnQge2RlZmF1bHRIZWFkZXJzfSBmcm9tIFwiLi9Db25zdGFudHMvZGVmYXVsdEhlYWRlcnNcIjtcclxuXHJcbmV4cG9ydHMuaGFuZGxlciA9IGFzeW5jIChldmVudDogQVBJR2F0ZXdheUV2ZW50KSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHtpbnRlZ3JhdG9yR3JvdXBOYW1lLCB1c2VySUR9ID0gSlNPTi5wYXJzZShldmVudC5ib2R5IHx8ICcnKVxyXG4gICAgICAgIGNvbnN0IGNyZWF0ZUludGVncmF0b3JHcm91cFJlcXVlc3QgPSBhd2FpdCBjcmVhdGVJbnRlZ3JhdG9yR3JvdXAoaW50ZWdyYXRvckdyb3VwTmFtZSwgdXNlcklEKVxyXG4gICAgICAgIGlmKCdlcnJvcicgaW4gY3JlYXRlSW50ZWdyYXRvckdyb3VwUmVxdWVzdCl7XHJcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0RXJyb3JNZXNzYWdlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcclxuICAgICAgICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFscyc6IHRydWUsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGNyZWF0ZUludGVncmF0b3JHcm91cFJlcXVlc3QsIG51bGwsIDIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3I6IFwiLCBlKVxyXG4gICAgICAgIHJldHVybiBkZWZhdWx0RXJyb3JNZXNzYWdlXHJcbiAgICB9XHJcbn0iXX0=