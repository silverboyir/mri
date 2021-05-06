/* eslint-disable max-len */
import {Provider} from 'react-redux';
import Enzyme, {mount} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import configureMockStore from 'redux-mock-store';
import * as redux from 'react-redux';
import sampleData from '../../../test/data.json';

import * as OrderRow from './OrderRow';
import {Orders} from './Orders';
const mockStore = configureMockStore();

Enzyme.configure({adapter: new Adapter()});


describe('Order Component', () => {
  let wrapper;
  beforeEach(() => {
    OrderRow.OrderRow = jest.fn(() => <tr data-test="tweet" />);
    const spy = jest.spyOn(redux, 'useSelector');
    const mockUseDispatch = jest.spyOn(redux, 'useDispatch');

    spy.mockReturnValue(sampleData);
    mockUseDispatch.mockReturnValue(() => {});

    const store = mockStore({
      startup: {complete: false},
    });
    wrapper = mount(
        <Provider store={store}>
          <Orders />
        </Provider>,
    );
  });
  afterEach(() => {
    OrderRow.OrderRow.mockClear();
  });

  test('the id of first row should be the same as first item in the array', () => {
    expect(OrderRow.OrderRow.mock.calls[0][0].id).toEqual(100000);
  });

  test('by clicking on the id column title, the first row Id shoud be 1000101', () => {
    wrapper.find('.c-datatable__th').at(1).simulate('click');
    OrderRow.OrderRow.mockClear();
    wrapper.find('.c-datatable__th').at(1).simulate('click');
    expect(OrderRow.OrderRow.mock.calls[0][0].id).toEqual(1000101);
  });
});
