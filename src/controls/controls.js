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
    verticalMargin: number,
    headerFont: string,
    bodyFont: string,
    onChange: (key: string, value: any) => void,
    stoppedControls: string[],
    onToggleActiveState: (name: string, newActiveState: boolean) => void,
};

export class Controls extends React.Component<Props> {
    render() {
        return (
            <div className={styles.controls}>
                <Control
                    name="interval"
                    label="Speed"
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
                    isColorPicker={true}
                />
                <Control
                    name="textColor"
                    label="Text color"
                    onToggleActiveState={this.handleToggleActiveState}
                    isStopped={this.props.stoppedControls.includes('textColor')}
                    onChange={this.handleChange}
                    value={this.props.textColor}
                    isColorPicker={true}
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
                    isPixelValue={true}
                />
                <Control
                    name="fontSize"
                    label="Font size"
                    onToggleActiveState={this.handleToggleActiveState}
                    isStopped={this.props.stoppedControls.includes('fontSize')}
                    onChange={this.handleChange}
                    value={this.props.fontSize}
                    isPixelValue={true}
                />
                <Control
                    name="verticalMargin"
                    label="Vertical margin"
                    onToggleActiveState={this.handleToggleActiveState}
                    isStopped={this.props.stoppedControls.includes(
                        'verticalMargin'
                    )}
                    onChange={this.handleChange}
                    value={this.props.verticalMargin}
                    isPixelValue={true}
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
                    isPixelValue={true}
                />
                <Control
                    name="headerFont"
                    label="Header font"
                    onToggleActiveState={this.handleToggleActiveState}
                    isStopped={this.props.stoppedControls.includes(
                        'headerFont'
                    )}
                    onChange={this.handleChange}
                    value={this.props.headerFont}
                />
                <Control
                    name="bodyFont"
                    label="Body font"
                    onToggleActiveState={this.handleToggleActiveState}
                    isStopped={this.props.stoppedControls.includes('bodyFont')}
                    onChange={this.handleChange}
                    value={this.props.bodyFont}
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
