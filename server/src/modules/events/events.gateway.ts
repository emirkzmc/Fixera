import { 
  WebSocketGateway, 
  WebSocketServer, 
  SubscribeMessage, 
  MessageBody, 
  ConnectedSocket, 
  OnGatewayConnection, 
  OnGatewayDisconnect 
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { IEventsService } from './interfaces/events.service.interface';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000', 'https://app.tikir.com'], 
    credentials: true,
  },
})
export class EventsGateway implements IEventsService, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  handleConnection(client: Socket) {
    // Şimdilik dursun
  }

  handleDisconnect(client: Socket) {
    // Şimdilik dursun
  }

  @SubscribeMessage('subscribeToJob')
  handleSubscribeToJob(@MessageBody() data: { trackingCode: string }, @ConnectedSocket() client: Socket) {
    if (data && data.trackingCode) {
      const room = `job_${data.trackingCode}`;
      client.join(room); 
      return { event: 'subscribed', data: room };
    }
  }

  emitJobUpdated(trackingCode: string, jobData: any): void {
    const room = `job_${trackingCode}`;
    this.server.to(room).emit('jobUpdated', jobData);
  }
}
