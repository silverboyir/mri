/* eslint-disable require-jsdoc */
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import {fieldListObject} from './types';

type Props = {
    orderedField : string;
    orderedType : boolean;
    fields : Array<fieldListObject>;
    onOrderChanged : (param : {orderField: string, orderType: boolean}) => void
};

export function TableHeader(params : Props) : React.ReactElement {
  return (<thead>
    <tr className="c-datatable__row c-datatable__table-header">
      <th className="c-datatable__th">
        <div className="c-datatable__header-button-holder">
          <a className="c-imagebutton c-imagebutton--h-aligned-center">
            <CheckBoxOutlineBlankIcon />
          </a>
        </div>
      </th>
      {params.fields.map((item) => {
        return (
          <th key={item.key} onClick={() => {
            params.onOrderChanged({
              orderField: item.key,
              orderType: params.orderedField === item.key ?
               !params.orderedType : true});
          }} className={params.orderedField !== item.key ?
           'c-datatable__th' : 'c-datatable__th c-datatable__th--sort-active'}>
            {params.orderedField !== item.key ? (<div>{item.title}</div>) : (
                   <a className="">
                     <div className="c-datatable__th-sort-icon">
                       {params.orderedType === true ?
                         (<ArrowUpwardIcon style={{fontSize: 14}} />) :
                         (<ArrowDownwardIcon style={{fontSize: 14}} />)}
                     </div>
                     <span>{item.title}</span>
                   </a>
               )}
          </th>
        );
      })}
    </tr>
  </thead>);
};
