import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
  constructor() {}

  async messagePermission(
    chId: string,
    userId: string,
    permission: 'on' | 'off',
  ) {
    // const user = await this.messageRepository.find(userId);
    // if (permission === 'on') {
    //   userId.permission = 'on';
    //   console.log('채팅이 가능합니다.');
    // } else {
    //   user.permission = 'off';
    //   console.log('채팅이 불가능합니다.');
    // }
  }
}
