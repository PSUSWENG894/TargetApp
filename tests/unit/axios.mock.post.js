// https://forum.vuejs.org/t/jest-and-mocking-axios-responses/27937
const mockAxios = {
    post: jest.fn().mockImplementation(() => {
      return new Promise( (res, rej) => {
        mockAxios._resolve = res;
        mockAxios._reject = rej;
      });
    }),
    mockSuccess (resp) {
      this._resolve(resp);
    },
    mockError (resp) {
      this._reject(resp);
    },
    _resolve: null,
    _reject: null
  };
  
  export default mockAxios;
