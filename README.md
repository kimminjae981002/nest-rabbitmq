## npm 설치

- npm i --save amqplib amqp-connection-manager - RabbitMQ
- npm i socket.io socket.io-client @nestjs/platform-socket.io @nestjs/websockets - socket

## 💨 RabbitMQ를 활용한 실시간 채팅 흐름

1. **메시지 전송(Publisher)**

- 메시지 전송 -> 큐로 발행 -> 큐에 저장

- event.gateway에서 client 데이터를 받아와 RabbitMQ 큐에 저장

2. **메시지 소비(Consumer)**

- 여러 서버나 서비스들이 큐를 구독 -> 해당 메시지를 모든 연결된 클라이언트에 전송

- message.controller에서 consumer를 설정해준다.

- consumer는 @MessagePattern을 통해 설정 가능하다.

- consumer를 설정해줘야 queue에서 ready 상태에서 빠져나온다.

3. **WebSocket을 통한 실시간 전송**

- 서버는 RabbitMQ 큐에서 메시지를 읽음 -> WebSocket을 통해 모든 클라이언트에 메시지 전송

- consumer에서 받아온 데이터를 다시 socket으로 보내준다.

4. **메시지 저장**

- 큐에서 메시지를 받아 배치 작업을 통해 데이터를 저장할 수도 있다.

### why use?

- 비동기 메시지 처리: 만약 수신자가 접속이 끊기면 queue를 통해 전송할 수 있다.

- 내구성 및 신뢰성: 메시지가 손실되지 않도록 다양한 내구성 옵션을 제공한다.

## RabbitMQ 다운로드 방법

<a href="https://velog.io/@minjae98/RabbitMQ-RabbitMQ-%EC%84%A4%EC%B9%98">RabbitMQ 다운로드 링크</a>
