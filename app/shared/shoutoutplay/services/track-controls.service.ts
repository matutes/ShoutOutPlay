// angular
import {Injectable} from '@angular/core';

// nativescript
import {isIOS} from 'platform';
import * as socialShare from "nativescript-social-share";

// libs
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/take';

// app
import {LogService} from '../../core/index';
import {PlayerService, IPlayerState} from './player.service';
import {PlaylistService} from './playlist.service';

@Injectable()
export class TrackControlService {
  public playingIcon$: BehaviorSubject<string> = new BehaviorSubject('fa-play-circle');
  public isPreview$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _currentTrackId: string;
  private _sub: Subscription;

  constructor(private logger: LogService, public player: PlayerService, public playlistService: PlaylistService) {
    player.state$.subscribe((state: IPlayerState) => {
      this._currentTrackId = state.currentTrackId || state.previewTrackId;
      this.isPreview$.next(state.previewTrackId ? true : false);
      this.playingIcon$.next(state.playing ? 'fa-pause-circle' : 'fa-play-circle');
    });
  }

  public togglePlay() {
    this.playlistService.togglePlay(null, { id: this._currentTrackId });
    // this.player.togglePlay(this._currentTrackId, PlayerService.isPreview, !PlayerService.isPlaying);
  }

  public openShareOptions() {
    this.player.currentTrack$.take(1).subscribe((track: any) => {
      let uriParts = track.uri.split(':');
      let uri = uriParts[uriParts.length - 1];
      let msg = `
Check out this track:\n
https://open.spotify.com/track/${uri}\n
Enjoyed with ShoutOutPlay, download here:\n
${isIOS ? 'https://itunes.apple.com/us/app/shoutoutplay/id1130768471?mt=8' : 'TODO: android play link'}
        `;
      socialShare.shareText(msg, 'Check out this track I enjoyed with ShoutOutPlay');
    });
  }
}