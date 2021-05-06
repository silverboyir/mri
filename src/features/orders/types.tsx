/* eslint-disable camelcase */
export interface Order {
    [key: string]: any,
    order_number: number
    customer: {
        first_name : string,
        last_name : string,
        address : { [k: string]: any },
    },
    order_details : {
        value : number,
        date : string
    },
    shipping_details : {
        date: string
    },
    // status : 'open' | 'shipped' | 'cancelled'
    status : string
}


export type fieldListObject =
    {
        key : string,
        field : string
        title : string,
        render : (item : any) => string,
        sort : (a : any, b: any, orderedType : boolean) => number,
    };
