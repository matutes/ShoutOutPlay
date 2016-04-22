// libs
import {TrackModel} from './track.model';

export class PlaylistModel {
  public id: number;
  public name: string;
  public tracks: Array<TrackModel>;
  
  constructor(model?: any) {
    if (model) {
      for (let key in model) {
        this[key] = model[key];
      }
    }
    if (!this.id) {
      this.id = Math.floor(Math.random()*100000000000000000);  
    }
  }
  
  public addTrack(track: TrackModel) {
    if (!this.tracks) {
      this.tracks = [];
    }
    this.tracks.push(track);
  }
}