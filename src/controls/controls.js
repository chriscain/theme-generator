/* @flow */

import React from 'react';

import type {Font, FontCategory} from '../App';
import {Control} from './control';
import {FontControls} from './font-controls';

import styles from './controls.module.css';

type Props = {
    // controls
    interval: number,
    backgroundColor: string,
    textColor: string,
    lineHeight: number,
    fontSize: number,
    horizontalMargin: number,
    verticalMargin: number,

    // fonts
    fontCategories: FontCategory[],
    fontHeaderCategory: FontCategory,
    fontHeader: Font,
    fontBodyCategory: FontCategory,
    fontBody: Font,

    onChange: (key: string, value: string | number) => void,
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
                    name="fontHeader"
                    label="Header font"
                    onToggleActiveState={this.handleToggleActiveState}
                    isStopped={this.props.stoppedControls.includes(
                        'fontHeader'
                    )}
                    value={this.props.fontHeader.family}
                />
                <Control
                    name="fontBody"
                    label="Body font"
                    onToggleActiveState={this.handleToggleActiveState}
                    isStopped={this.props.stoppedControls.includes('fontBody')}
                    value={this.props.fontBody.family}
                />

                <FontControls
                    fontCategories={this.props.fontCategories}
                    fontHeaderCategory={this.props.fontHeaderCategory}
                    fontBodyCategory={this.props.fontBodyCategory}
                    onChange={this.handleChange}
                />
            </div>
        );
    }

    handleChange = (name: string, value: string | number) => {
        this.props.onChange(name, value);
    };

    handleToggleActiveState = (name: string, newActiveState: boolean) => {
        this.props.onToggleActiveState(name, newActiveState);
    };
}
