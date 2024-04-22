export type ProfileType = 'default' | 'game' | 'movie' | 'music' | 'custom';

export type Profile = {
  id: string;
  position: number;
  type: string;
  name: string;
  active: boolean;
};

export interface ProfileState {
  data: Array<Profile>;
  error: Error | null;
}
