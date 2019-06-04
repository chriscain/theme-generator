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
    stoppedControls: string[],
    onToggleActiveState: (name: string, newActiveState: boolean) => void,
};

export class Controls extends React.Component<Props> {
    render() {
        return (
            <div className={styles.controls}>
                <h3>Control panel</h3>
                <Control
                    name="interval"
                    label="Interval"
                    onToggleActiveState={this.handleToggleActiveState}
                    isStopped={this.props.stoppedControls.includes('interval')}
                    onChange={this.handleChange}
                    value={this.props.interval}
                    preventStopping={true}
                />
                <Control
                    name="backgroundColor"
                    label="Background color"
                    onToggleActiveState={this.handleToggleActiveState}
                    isStopped={this.props.stoppedControls.includes(
                        'backgroundColor'
                    )}
                    onChange={this.handleChange}
                    value={this.props.backgroundColor}
                    prefix="#"
                />
                <Control
                    name="textColor"
                    label="Text color"
                    onToggleActiveState={this.handleToggleActiveState}
                    isStopped={this.props.stoppedControls.includes('textColor')}
                    onChange={this.handleChange}
                    value={this.props.textColor}
                    suffix="px"
                />
                <Control
                    name="lineHeight"
                    label="Line height"
                    onToggleActiveState={this.handleToggleActiveState}
                    isStopped={this.props.stoppedControls.includes(
                        'lineHeight'
                    )}
                    onChange={this.handleChange}
                    value={this.props.lineHeight}
                    suffix="px"
                />
                <Control
                    name="fontSize"
                    label="Font size"
                    onToggleActiveState={this.handleToggleActiveState}
                    isStopped={this.props.stoppedControls.includes('fontSize')}
                    onChange={this.handleChange}
                    value={this.props.fontSize}
                    suffix="px"
                />
                <Control
                    name="horizontalMargin"
                    label="Horizontal margin"
                    onToggleActiveState={this.handleToggleActiveState}
                    isStopped={this.props.stoppedControls.includes(
                        'horizontalMargin'
                    )}
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

    handleToggleActiveState = (name: string, newActiveState: boolean) => {
        this.props.onToggleActiveState(name, newActiveState);
    };
}
