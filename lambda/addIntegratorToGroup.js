"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseUtils_1 = require("./Utils/DatabaseUtils");
const defaultErrorMessage_1 = require("./Constants/defaultErrorMessage");
const defaultHeaders_1 = require("./Constants/defaultHeaders");
exports.handler = async (event) => {
    try {
        const { integratorID, integratorGroupID, userID } = JSON.parse(event.body || '');
        const addIntegratorToGroupRequest = await (0, DatabaseUtils_1.addIntegratorToGroup)(integratorID, integratorGroupID, userID);
        if (addIntegratorToGroupRequest)
            return {
                statusCode: 200,
                headers: defaultHeaders_1.defaultHeaders,
                body: JSON.stringify({ message: 'Successfully added integrator to group' }),
            };
        console.error('addIntegratorToGroupRequest failed');
        return defaultErrorMessage_1.defaultErrorMessage;
    }
    catch (e) {
        console.error('Error catched: ', e);
        return defaultErrorMessage_1.defaultErrorMessage;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkSW50ZWdyYXRvclRvR3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhZGRJbnRlZ3JhdG9yVG9Hcm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlEQUEyRDtBQUMzRCx5RUFBb0U7QUFDcEUsK0RBQTBEO0FBRTFELE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxFQUFFLEtBQXNCLEVBQUUsRUFBRTtJQUMvQyxJQUFJO1FBQ0EsTUFBTSxFQUFDLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUE7UUFDOUUsTUFBTSwyQkFBMkIsR0FBRyxNQUFNLElBQUEsb0NBQW9CLEVBQUMsWUFBWSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQ3ZHLElBQUcsMkJBQTJCO1lBQUUsT0FBTztnQkFDbkMsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsT0FBTyxFQUFFLCtCQUFjO2dCQUN2QixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSx3Q0FBd0MsRUFBRSxDQUFDO2FBQzlFLENBQUE7UUFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUE7UUFDbkQsT0FBTyx5Q0FBbUIsQ0FBQTtLQUM3QjtJQUNELE9BQU0sQ0FBQyxFQUFFO1FBQ0wsT0FBTyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUNuQyxPQUFPLHlDQUFtQixDQUFBO0tBQzdCO0FBQ0wsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBUElHYXRld2F5RXZlbnR9IGZyb20gXCJhd3MtbGFtYmRhXCI7XHJcbmltcG9ydCB7YWRkSW50ZWdyYXRvclRvR3JvdXB9IGZyb20gXCIuL1V0aWxzL0RhdGFiYXNlVXRpbHNcIjtcclxuaW1wb3J0IHtkZWZhdWx0RXJyb3JNZXNzYWdlfSBmcm9tIFwiLi9Db25zdGFudHMvZGVmYXVsdEVycm9yTWVzc2FnZVwiO1xyXG5pbXBvcnQge2RlZmF1bHRIZWFkZXJzfSBmcm9tIFwiLi9Db25zdGFudHMvZGVmYXVsdEhlYWRlcnNcIjtcclxuXHJcbmV4cG9ydHMuaGFuZGxlciA9IGFzeW5jIChldmVudDogQVBJR2F0ZXdheUV2ZW50KSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHtpbnRlZ3JhdG9ySUQsIGludGVncmF0b3JHcm91cElELCB1c2VySUR9ID0gSlNPTi5wYXJzZShldmVudC5ib2R5IHx8ICcnKVxyXG4gICAgICAgIGNvbnN0IGFkZEludGVncmF0b3JUb0dyb3VwUmVxdWVzdCA9IGF3YWl0IGFkZEludGVncmF0b3JUb0dyb3VwKGludGVncmF0b3JJRCwgaW50ZWdyYXRvckdyb3VwSUQsIHVzZXJJRClcclxuICAgICAgICBpZihhZGRJbnRlZ3JhdG9yVG9Hcm91cFJlcXVlc3QpIHJldHVybiB7XHJcbiAgICAgICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcclxuICAgICAgICAgICAgaGVhZGVyczogZGVmYXVsdEhlYWRlcnMsXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgbWVzc2FnZTogJ1N1Y2Nlc3NmdWxseSBhZGRlZCBpbnRlZ3JhdG9yIHRvIGdyb3VwJyB9KSxcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignYWRkSW50ZWdyYXRvclRvR3JvdXBSZXF1ZXN0IGZhaWxlZCcpXHJcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRFcnJvck1lc3NhZ2VcclxuICAgIH1cclxuICAgIGNhdGNoKGUpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBjYXRjaGVkOiAnLCBlKVxyXG4gICAgICAgIHJldHVybiBkZWZhdWx0RXJyb3JNZXNzYWdlXHJcbiAgICB9XHJcbn0iXX0=