import React, {useEffect, useState} from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import {useDispatch, useSelector} from 'react-redux';
import {fetchOrders, selectAllOrders} from './orderSlice';

import '../../Style.scss';
import FilterListIcon from '@material-ui/icons/FilterList';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {TableHeader} from './TableHeader';
import {fieldListObject} from './types';
import {OrderRow} from './OrderRow';

// eslint-disable-next-line require-jsdoc
function convertDateToString(data : string) : string {
  const date = new Date(data);
  return date.getFullYear()+
  '-'+
  ('0' + (date.getMonth()+1)).slice(-2)+
  '-'+
  ('0' + date.getDate()).slice(-2);
}

const fields : Array<fieldListObject> = [
  {
    key: 'order_number',
    field: 'order_number',
    title: 'Order Number',
    render: (item : string) => item,
    sort: (a : any, b : any, orderedType : boolean) : number => {
      if (orderedType) {
        if ( a < b ) {
          return -1;
        }
        if ( a > b ) {
          return 1;
        }
      } else {
        if ( b < a ) {
          return -1;
        }
        if ( b > a ) {
          return 1;
        }
      }
      return 0;
    },
  },
  {
    key: 'customer_name',
    field: 'customer',
    title: 'Customer Name',
    render: (item : {[k: string]: any}) => item.first_name+' '+item.last_name,
    sort: (a : any, b : any, orderedType : boolean) : number => {
      return orderedType ?
        a.last_name.localeCompare(b.last_name) :
        b.last_name.localeCompare(a.last_name);
    },
  },
  {
    key: 'customer_address',
    field: 'customer',
    title: 'Customer Address',
    render: (item : {[k: string]: any}) => item.address.line1,
    sort: (a : any, b : any, orderedType : boolean) : number => {
      return orderedType ?
          a.address.line1.localeCompare(b.address.line1) :
          b.address.line1.localeCompare(a.address.line1);
    },
  },
  {
    key: 'order_value',
    field: 'order_details',
    title: 'Order Value',
    render: (item : {[k: string]: any}) => item.value,
    sort: (a : any, b : any, orderedType : boolean) : number => {
      if (orderedType) {
        if ( a.value < b.value ) {
          return -1;
        }
        if ( a.value > b.value ) {
          return 1;
        }
      } else {
        if ( b.value < a.value ) {
          return -1;
        }
        if ( b.value > a.value ) {
          return 1;
        }
      }
      return 0;
    },
  },
  {
    key: 'order_date',
    field: 'order_details',
    title: 'Order Date',
    render: (item : {[k: string]: any}) => {
      return convertDateToString(item.date);
    },
    sort: (a : any, b : any, orderedType : boolean) : number => {
      return orderedType ?
            // eslint-disable-next-line max-len
            convertDateToString(a.date).localeCompare(convertDateToString(b.date)) :
            // eslint-disable-next-line max-len
            convertDateToString(b.date).localeCompare(convertDateToString(a.date));
    },

  },
  {
    key: 'ship_date',
    field: 'shipping_details',
    title: 'Ship Date',
    render: (item : {[k: string]: any}) => {
      return convertDateToString(item.date);
    },
    sort: (a : any, b : any, orderedType : boolean) : number => {
      return orderedType ?
              // eslint-disable-next-line max-len
              convertDateToString(a.date).localeCompare(convertDateToString(b.date)) :
              // eslint-disable-next-line max-len
              convertDateToString(b.date).localeCompare(convertDateToString(a.date));
    },
  },
  {
    key: 'status',
    field: 'status',
    title: 'Status',
    render: (item : string) => item,
    sort: (a : any, b : any, orderedType : boolean) : number => {
      return orderedType ?
            a.localeCompare(b) :
            b.localeCompare(a);
    },
  },
];

// eslint-disable-next-line require-jsdoc
export function Orders() : React.ReactElement {
  const [orderField, setOrderField] = useState('');

  const [orderType, setOrderType] = useState(true); // true = asc . false = dec
  // eslint-disable-next-line no-unused-vars
  const orders = useSelector(selectAllOrders);


  if (orderField !== '') {
    const filteredRow =fields.filter((row) => {
      return row.key === orderField;
    });
    const key : string = filteredRow[0].field;
    orders.sort((a, b) => {
      return filteredRow[0].sort(a[key],
          b[key], orderType);
    });
  }
  const dispatch = useDispatch();
  useEffect(() => {
    const load = () => {
      dispatch(fetchOrders());
    };
    load();
  }, []);

  return (<div className="c-datatable u-mt3">
    <div className="c-datatable__header">
      <h4 className="c-datatable__title">Orders</h4>
      <div className="c-datatable__header-icons">
        <a className="c-imagebutton u-mh1b">
          <FilterListIcon />
        </a>
        <a className="c-imagebutton">
          <MoreVertIcon />
        </a>
      </div>
    </div>
    <table className="c-datatable__table">
      <TableHeader orderedField={orderField}
        orderedType={orderType} fields={fields} onOrderChanged={(param) => {
          setOrderField(param.orderField);
          setOrderType(param.orderType);
        }} />
      <tbody>
        {orders.map((order) => {
          return <OrderRow key={order.order_number}
            id={order.order_number} fields={fields} />;
        })}
      </tbody>
    </table>
    <div className="c-datatable__footer">
      <div></div>
      <div className="c-datatable__pagination">
        <span>Row per page:</span>
        <div className="c-select u-mh1">
          <select>
            <option value="test">5</option>
            <option value="test2">10</option>
          </select>
          <div className="icon-holder">
            <ArrowDropDownIcon />
          </div>
        </div>
        <div className="u-mr1">1-10 of 100</div>
        <a className="c-imagebutton u-mr1">
          <ChevronLeftIcon />
        </a>
        <a className="c-imagebutton u-mhs">
          <ChevronRightIcon />
        </a>
      </div>
    </div>
  </div>

  );
};

