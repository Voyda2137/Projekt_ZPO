"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseUtils_1 = require("./Utils/DatabaseUtils");
const defaultErrorMessage_1 = require("./Constants/defaultErrorMessage");
exports.handler = async (event) => {
    try {
        const { location, serialNumber, userID } = JSON.parse(event.body || '');
        if (location && serialNumber && userID) {
            console.log(`location: ${location}, serial: ${serialNumber}, user: ${userID}`);
            const createIntegratorRequest = await (0, DatabaseUtils_1.createIntegrator)({ location: location, serialNumber: serialNumber, userID: userID });
            if ('error' in createIntegratorRequest) {
                console.error(createIntegratorRequest.error);
                return defaultErrorMessage_1.defaultErrorMessage;
            }
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                body: JSON.stringify(createIntegratorRequest, null, 2)
            };
        }
        console.error('missing params');
        return defaultErrorMessage_1.defaultErrorMessage;
    }
    catch (e) {
        console.error('Error adding integrator', e);
        return defaultErrorMessage_1.defaultErrorMessage;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWdyYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImludGVncmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5REFBdUQ7QUFFdkQseUVBQW9FO0FBR3BFLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxFQUFFLEtBQXNCLEVBQUUsRUFBRTtJQUMvQyxJQUFHO1FBQ0MsTUFBTSxFQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1FBQ3JFLElBQUcsUUFBUSxJQUFJLFlBQVksSUFBSSxNQUFNLEVBQUU7WUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLFFBQVEsYUFBYSxZQUFZLFdBQVcsTUFBTSxFQUFFLENBQUMsQ0FBQTtZQUM5RSxNQUFNLHVCQUF1QixHQUFHLE1BQU0sSUFBQSxnQ0FBZ0IsRUFBQyxFQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQTtZQUN4SCxJQUFHLE9BQU8sSUFBSSx1QkFBdUIsRUFBQztnQkFDbEMsT0FBTyxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFDNUMsT0FBTyx5Q0FBbUIsQ0FBQTthQUM3QjtZQUNELE9BQU87Z0JBQ0gsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsT0FBTyxFQUFFO29CQUNMLDZCQUE2QixFQUFFLEdBQUc7b0JBQ2xDLGtDQUFrQyxFQUFFLElBQUk7aUJBQzNDO2dCQUNELElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLHVCQUF1QixFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7YUFDekQsQ0FBQTtTQUNKO1FBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1FBQy9CLE9BQU8seUNBQW1CLENBQUE7S0FDN0I7SUFDRCxPQUFPLENBQUMsRUFBRTtRQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUMseUJBQXlCLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDM0MsT0FBTyx5Q0FBbUIsQ0FBQTtLQUM3QjtBQUNMLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Y3JlYXRlSW50ZWdyYXRvcn0gZnJvbSBcIi4vVXRpbHMvRGF0YWJhc2VVdGlsc1wiO1xyXG5pbXBvcnQge0FQSUdhdGV3YXlFdmVudH0gZnJvbSBcImF3cy1sYW1iZGFcIjtcclxuaW1wb3J0IHtkZWZhdWx0RXJyb3JNZXNzYWdlfSBmcm9tIFwiLi9Db25zdGFudHMvZGVmYXVsdEVycm9yTWVzc2FnZVwiO1xyXG5pbXBvcnQge2RlZmF1bHRIZWFkZXJzfSBmcm9tIFwiLi9Db25zdGFudHMvZGVmYXVsdEhlYWRlcnNcIjtcclxuXHJcbmV4cG9ydHMuaGFuZGxlciA9IGFzeW5jIChldmVudDogQVBJR2F0ZXdheUV2ZW50KSA9PiB7XHJcbiAgICB0cnl7XHJcbiAgICAgICAgY29uc3Qge2xvY2F0aW9uLCBzZXJpYWxOdW1iZXIsIHVzZXJJRH0gPSBKU09OLnBhcnNlKGV2ZW50LmJvZHkgfHwgJycpXHJcbiAgICAgICAgaWYobG9jYXRpb24gJiYgc2VyaWFsTnVtYmVyICYmIHVzZXJJRCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgbG9jYXRpb246ICR7bG9jYXRpb259LCBzZXJpYWw6ICR7c2VyaWFsTnVtYmVyfSwgdXNlcjogJHt1c2VySUR9YClcclxuICAgICAgICAgICAgY29uc3QgY3JlYXRlSW50ZWdyYXRvclJlcXVlc3QgPSBhd2FpdCBjcmVhdGVJbnRlZ3JhdG9yKHtsb2NhdGlvbjogbG9jYXRpb24sIHNlcmlhbE51bWJlcjogc2VyaWFsTnVtYmVyLCB1c2VySUQ6IHVzZXJJRH0pXHJcbiAgICAgICAgICAgIGlmKCdlcnJvcicgaW4gY3JlYXRlSW50ZWdyYXRvclJlcXVlc3Qpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihjcmVhdGVJbnRlZ3JhdG9yUmVxdWVzdC5lcnJvcilcclxuICAgICAgICAgICAgICAgIHJldHVybiBkZWZhdWx0RXJyb3JNZXNzYWdlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLFxyXG4gICAgICAgICAgICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFscyc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY3JlYXRlSW50ZWdyYXRvclJlcXVlc3QsIG51bGwsIDIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignbWlzc2luZyBwYXJhbXMnKVxyXG4gICAgICAgIHJldHVybiBkZWZhdWx0RXJyb3JNZXNzYWdlXHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGFkZGluZyBpbnRlZ3JhdG9yJywgZSlcclxuICAgICAgICByZXR1cm4gZGVmYXVsdEVycm9yTWVzc2FnZVxyXG4gICAgfVxyXG59Il19