import * as R from 'ramda';
import React, {
    Component
} from 'react';

import {
    ICellProps,
    ICellPropsWithDefaults
} from 'dash-table/components/Cell/props';

const CHILDREN_REGEX = /^children$/;

export default class Cell extends Component<ICellProps> {
    constructor(props: ICellProps) {
        super(props);
    }

    private get propsWithDefaults(): ICellPropsWithDefaults {
        return this.props as ICellPropsWithDefaults;
    }

    render() {
        const { classes, property, style } = this.propsWithDefaults;

        return (<td
            ref='td'
            children={(this as any).props.children}
            tabIndex={-1}
            className={classes}
            style={style}
            data-dash-column={property}
        />);
    }

    shouldComponentUpdate(nextProps: any) {
        const props: any = this.props;

        const childProps: any = this.getChildProps(props);
        const nextChildProps: any = this.getChildProps(nextProps);

        return R.any(key =>
            !CHILDREN_REGEX.test(key) && props[key] !== nextProps[key],
            R.keysIn(props)
        ) || R.any(
            key => childProps[key] !== nextChildProps[key],
            R.keysIn(childProps)
        );
    }

    private getChildProps(props: any) {
        return props && props.children && props.children[0] && props.children[0].props;
    }
}