"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseUtils_1 = require("./Utils/DatabaseUtils");
const defaultHeaders_1 = require("./Constants/defaultHeaders");
const defaultErrorMessage_1 = require("./Constants/defaultErrorMessage");
exports.handler = async (event) => {
    const { integratorID, utcDateTime, rate, speed, total } = JSON.parse(event.body || '');
    if (integratorID && utcDateTime && rate && speed && total) {
        const createEntryRequest = await (0, DatabaseUtils_1.createEntry)(integratorID, utcDateTime, rate, speed, total);
        if (createEntryRequest) {
            console.log('xd', createEntryRequest);
            return {
                statusCode: 200,
                headers: defaultHeaders_1.defaultHeaders,
                body: JSON.stringify({ message: 'Successfully created the entry' })
            };
        }
        console.error('Could not create integrator entry', createEntryRequest);
        return defaultErrorMessage_1.defaultErrorMessage;
    }
    console.error('Missing params');
    return defaultErrorMessage_1.defaultErrorMessage;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlSW50ZWdyYXRvckVudHJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3JlYXRlSW50ZWdyYXRvckVudHJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EseURBQWtEO0FBQ2xELCtEQUEwRDtBQUMxRCx5RUFBb0U7QUFFcEUsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLEVBQUMsS0FBc0IsRUFBRSxFQUFFO0lBQzlDLE1BQU0sRUFBQyxZQUFZLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQ3BGLElBQUcsWUFBWSxJQUFJLFdBQVcsSUFBSSxJQUFJLElBQUksS0FBSyxJQUFJLEtBQUssRUFBRTtRQUN0RCxNQUFNLGtCQUFrQixHQUFHLE1BQU0sSUFBQSwyQkFBVyxFQUFDLFlBQVksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUMzRixJQUFHLGtCQUFrQixFQUFFO1lBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLGtCQUFrQixDQUFDLENBQUE7WUFDckMsT0FBTztnQkFDSCxVQUFVLEVBQUUsR0FBRztnQkFDZixPQUFPLEVBQUUsK0JBQWM7Z0JBQ3ZCLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUMsT0FBTyxFQUFFLGdDQUFnQyxFQUFDLENBQUM7YUFDcEUsQ0FBQTtTQUNKO1FBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxtQ0FBbUMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFBO1FBQ3RFLE9BQU8seUNBQW1CLENBQUE7S0FDN0I7SUFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFDL0IsT0FBTyx5Q0FBbUIsQ0FBQTtBQUM5QixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FQSUdhdGV3YXlFdmVudH0gZnJvbSBcImF3cy1sYW1iZGFcIjtcclxuaW1wb3J0IHtjcmVhdGVFbnRyeX0gZnJvbSBcIi4vVXRpbHMvRGF0YWJhc2VVdGlsc1wiO1xyXG5pbXBvcnQge2RlZmF1bHRIZWFkZXJzfSBmcm9tIFwiLi9Db25zdGFudHMvZGVmYXVsdEhlYWRlcnNcIjtcclxuaW1wb3J0IHtkZWZhdWx0RXJyb3JNZXNzYWdlfSBmcm9tIFwiLi9Db25zdGFudHMvZGVmYXVsdEVycm9yTWVzc2FnZVwiO1xyXG5cclxuZXhwb3J0cy5oYW5kbGVyID0gYXN5bmMoZXZlbnQ6IEFQSUdhdGV3YXlFdmVudCkgPT4ge1xyXG4gICAgY29uc3Qge2ludGVncmF0b3JJRCwgdXRjRGF0ZVRpbWUsIHJhdGUsIHNwZWVkLCB0b3RhbH0gPSBKU09OLnBhcnNlKGV2ZW50LmJvZHkgfHwgJycpXHJcbiAgICBpZihpbnRlZ3JhdG9ySUQgJiYgdXRjRGF0ZVRpbWUgJiYgcmF0ZSAmJiBzcGVlZCAmJiB0b3RhbCkge1xyXG4gICAgICAgIGNvbnN0IGNyZWF0ZUVudHJ5UmVxdWVzdCA9IGF3YWl0IGNyZWF0ZUVudHJ5KGludGVncmF0b3JJRCwgdXRjRGF0ZVRpbWUsIHJhdGUsIHNwZWVkLCB0b3RhbClcclxuICAgICAgICBpZihjcmVhdGVFbnRyeVJlcXVlc3QpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3hkJywgY3JlYXRlRW50cnlSZXF1ZXN0KVxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczogZGVmYXVsdEhlYWRlcnMsXHJcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7bWVzc2FnZTogJ1N1Y2Nlc3NmdWxseSBjcmVhdGVkIHRoZSBlbnRyeSd9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0NvdWxkIG5vdCBjcmVhdGUgaW50ZWdyYXRvciBlbnRyeScsIGNyZWF0ZUVudHJ5UmVxdWVzdClcclxuICAgICAgICByZXR1cm4gZGVmYXVsdEVycm9yTWVzc2FnZVxyXG4gICAgfVxyXG4gICAgY29uc29sZS5lcnJvcignTWlzc2luZyBwYXJhbXMnKVxyXG4gICAgcmV0dXJuIGRlZmF1bHRFcnJvck1lc3NhZ2VcclxufSJdfQ==