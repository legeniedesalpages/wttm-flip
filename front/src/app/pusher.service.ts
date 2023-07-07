/**
    * @description      : 
    * @author           : renau
    * @group            : 
    * @created          : 07/07/2023 - 10:23:56
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 07/07/2023
    * - Author          : renau
    * - Modification    : 
**/
import { Injectable, OnDestroy } from '@angular/core';
import { environment } from '../environments/environment';
import Pusher from 'pusher-js';
import { Channel } from 'pusher-js';

@Injectable({
  providedIn: 'root'
})
export class PusherService implements OnDestroy {

  private pusher: Pusher;
  public channel: Channel;

  constructor() {
    console.info("Enabling pusher")
    this.pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster
    });
    this.channel = this.pusher.subscribe('events-channel');
  }

  ngOnDestroy(): void {
    console.info("Destroying pusher")
    this.channel.disconnect();
  }
}
