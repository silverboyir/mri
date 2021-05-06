import React from 'react';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import {fieldListObject} from './types';
import {useSelector} from 'react-redux';
import {selectOrderById} from './orderSlice';


type Props = {
    id : number;
    fields : Array<fieldListObject>;
};

// eslint-disable-next-line require-jsdoc
export function OrderRow(params : Props) : React.ReactElement {
  const row = useSelector((state) => selectOrderById(state, params.id));
  if (row === undefined) {
    return <React.Fragment />;
  }
  return (<tr className="c-datatable__row">
    <td className="c-datatable__td">
      <div className="c-datatable__header-button-holder">
        <a className="c-imagebutton c-imagebutton--aligned-center">
          <CheckBoxOutlineBlankIcon />
        </a>
      </div>
    </td>
    {params.fields.map((field) => {
      return (
        <td key={field.key} className="c-datatable__td">
          <div>{field.render(row[field.field])}</div>
        </td>
      );
    })}
  </tr>);
}
