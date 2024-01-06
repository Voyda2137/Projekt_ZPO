"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseUtils_1 = require("./Utils/DatabaseUtils");
exports.handler = async (event) => {
    try {
        const header = event.headers['From'];
        if (header) {
            const user = await (0, DatabaseUtils_1.getUserByLogin)(header);
            if (user) {
                const integrators = await (0, DatabaseUtils_1.getIntegrators)(user);
                if (integrators)
                    return {
                        statusCode: 200,
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Credentials': true,
                        },
                        body: JSON.stringify({ integrators: integrators }, null, 2)
                    };
            }
            console.error('No user found');
        }
        console.error('Missing header');
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
    catch (e) {
        console.error('Error: ', e);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SW50ZWdyYXRvcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRJbnRlZ3JhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlEQUFxRTtBQUVyRSxPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssRUFBQyxLQUFzQixFQUFFLEVBQUU7SUFDOUMsSUFBSTtRQUNBLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDcEMsSUFBRyxNQUFNLEVBQUM7WUFDTixNQUFNLElBQUksR0FBRyxNQUFNLElBQUEsOEJBQWMsRUFBQyxNQUFNLENBQUMsQ0FBQTtZQUN6QyxJQUFHLElBQUksRUFBQztnQkFDSixNQUFNLFdBQVcsR0FBRyxNQUFNLElBQUEsOEJBQWMsRUFBQyxJQUFJLENBQUMsQ0FBQTtnQkFDOUMsSUFBRyxXQUFXO29CQUFFLE9BQU87d0JBQ25CLFVBQVUsRUFBRSxHQUFHO3dCQUNmLE9BQU8sRUFBRTs0QkFDTCw2QkFBNkIsRUFBRSxHQUFHOzRCQUNsQyxrQ0FBa0MsRUFBRSxJQUFJO3lCQUMzQzt3QkFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO3FCQUM1RCxDQUFBO2FBQ0o7WUFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFBO1NBQ2pDO1FBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1FBQy9CLE9BQU87WUFDSCxVQUFVLEVBQUUsR0FBRztZQUNmLE9BQU8sRUFBRTtnQkFDTCw2QkFBNkIsRUFBRSxHQUFHO2dCQUNsQyxrQ0FBa0MsRUFBRSxJQUFJO2FBQzNDO1lBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQyxLQUFLLEVBQUUsdUJBQXVCLEVBQUMsQ0FBQztTQUN6RCxDQUFBO0tBQ0o7SUFDRCxPQUFPLENBQUMsRUFBRTtRQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQzNCLE9BQU87WUFDSCxVQUFVLEVBQUUsR0FBRztZQUNmLE9BQU8sRUFBRTtnQkFDTCw2QkFBNkIsRUFBRSxHQUFHO2dCQUNsQyxrQ0FBa0MsRUFBRSxJQUFJO2FBQzNDO1lBQ0QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQyxLQUFLLEVBQUUsdUJBQXVCLEVBQUMsQ0FBQztTQUN6RCxDQUFBO0tBQ0o7QUFDTCxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FQSUdhdGV3YXlFdmVudH0gZnJvbSBcImF3cy1sYW1iZGFcIjtcclxuaW1wb3J0IHtnZXRJbnRlZ3JhdG9ycywgZ2V0VXNlckJ5TG9naW59IGZyb20gXCIuL1V0aWxzL0RhdGFiYXNlVXRpbHNcIjtcclxuXHJcbmV4cG9ydHMuaGFuZGxlciA9IGFzeW5jKGV2ZW50OiBBUElHYXRld2F5RXZlbnQpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgaGVhZGVyID0gZXZlbnQuaGVhZGVyc1snRnJvbSddXHJcbiAgICAgICAgaWYoaGVhZGVyKXtcclxuICAgICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IGdldFVzZXJCeUxvZ2luKGhlYWRlcilcclxuICAgICAgICAgICAgaWYodXNlcil7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbnRlZ3JhdG9ycyA9IGF3YWl0IGdldEludGVncmF0b3JzKHVzZXIpXHJcbiAgICAgICAgICAgICAgICBpZihpbnRlZ3JhdG9ycykgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHMnOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe2ludGVncmF0b3JzOiBpbnRlZ3JhdG9yc30sIG51bGwsIDIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignTm8gdXNlciBmb3VuZCcpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ01pc3NpbmcgaGVhZGVyJylcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzdGF0dXNDb2RlOiA1MDAsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKicsXHJcbiAgICAgICAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHMnOiB0cnVlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7ZXJyb3I6ICdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yOiAnLCBlKVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHN0YXR1c0NvZGU6IDUwMCxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcclxuICAgICAgICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFscyc6IHRydWUsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtlcnJvcjogJ0ludGVybmFsIHNlcnZlciBlcnJvcid9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==