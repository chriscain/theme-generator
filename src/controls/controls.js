/* @flow */

import React from 'react';
import styles from './controls.module.css';
import {Control} from './control';

type Props = {
    interval: number,
    backgroundColor: string,
    textColor: string,
    lineHeight: number,
    fontSize: number,
    horizontalMargin: number,
    onChange: (key: string, value: any) => void,
};

export class Controls extends React.Component<Props> {
    render() {
        return (
            <div className={styles.controls}>
                <h3>Control panel</h3>
                <Control
                    name="interval"
                    label="Interval"
                    onChange={this.handleChange}
                    value={this.props.interval}
                    prefix="#"
                />
                <Control
                    name="backgroundColor"
                    label="Background color"
                    onChange={this.handleChange}
                    value={this.props.backgroundColor}
                    prefix="#"
                />
                <Control
                    name="textColor"
                    label="Text color"
                    onChange={this.handleChange}
                    value={this.props.textColor}
                    suffix="px"
                />
                <Control
                    name="lineHeight"
                    label="Line height"
                    onChange={this.handleChange}
                    value={this.props.lineHeight}
                    suffix="px"
                />
                <Control
                    name="fontSize"
                    label="Font size"
                    onChange={this.handleChange}
                    value={this.props.fontSize}
                    suffix="px"
                />
                <Control
                    name="horizontalMargin"
                    label="Horizontal margin"
                    onChange={this.handleChange}
                    value={this.props.horizontalMargin}
                    suffix="px"
                />
            </div>
        );
    }

    handleChange = (name: string, value: any) => {
        this.props.onChange(name, value);
    };
}
