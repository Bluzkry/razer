import { initialData } from './initialData';
import profileReducer, {
  setSelectedProfile,
  moveProfile,
  addProfile,
  deleteProfile,
  renameProfile,
} from './profileSlice';
import { Profile, ProfileState } from './profileTypes';

const customProfiles = [
  { id: '43378683', position: 5, type: 'custom', name: 'custom 1', active: false },
  { id: '40220112', position: 6, type: 'custom', name: 'demo long text demo long text demo', active: false },
];
const initialState: ProfileState = {
  data: [...initialData, ...customProfiles],
  error: null,
};

describe('Profile Reducer', () => {
  const testProfile = customProfiles[0];
  const getTestProfile = (data: Array<Profile>) => data.find(({ id }) => id === testProfile.id);

  it('creates an initial state', () => {
    expect(profileReducer(undefined, { type: 'unknown' })).toEqual({
      data: initialData,
      error: null,
    });
  });

  it('sets a selected profile', () => {
    const { data } = profileReducer(initialState, setSelectedProfile(testProfile.id));

    expect(getTestProfile(data)?.active).toBe(true);
  });

  it('moves a profile up', () => {
    const { data } = profileReducer(initialState, moveProfile({ id: testProfile.id, moveUp: true }));

    const switchedProfile = data.find(({ id }) => id === initialData[3].id);
    expect(getTestProfile(data)?.position).toBe(4);
    expect(switchedProfile?.position).toBe(5);
  });

  it('moves a profile down', () => {
    const { data } = profileReducer(initialState, moveProfile({ id: testProfile.id, moveUp: false }));

    const switchedProfile = data.find(({ id }) => id === customProfiles[1].id);
    expect(getTestProfile(data)?.position).toBe(6);
    expect(switchedProfile?.position).toBe(5);
  });

  it('adds a profile', () => {
    const { data } = profileReducer(initialState, addProfile());

    const { position, type, name, active } = data[data.length - 1];
    expect(data.length).toBe(initialState.data.length + 1);
    expect(position).toBe(initialState.data.length + 1);
    expect(type).toBe('custom');
    expect(name).toBe('New Profile');
    expect(active).toBeTruthy();
  });

  it('deletes a profile', () => {
    const { data } = profileReducer(
      initialState,
      deleteProfile({ id: testProfile.id, position: testProfile.position }),
    );

    const activeProfile = data.find(({ id }) => id === initialData[3].id);
    const decrementedPositionProfile = data.find(({ id }) => id === customProfiles[1].id);

    expect(data.length).toBe(initialState.data.length - 1);
    expect(activeProfile?.active).toBeTruthy();
    expect(decrementedPositionProfile?.position).toBe(initialState.data.length - 1);
  });

  it('renames a profile', () => {
    const { data } = profileReducer(initialState, renameProfile({ id: testProfile.id, name: 'Alexander Zou' }));

    expect(getTestProfile(data)?.name).toBe('Alexander Zou');
  });
});
