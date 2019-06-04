/* @flow */

import React from 'react';
import {SketchPicker} from 'react-color';
import styles from './control.module.css';

type Props = {
    name: string,
    label: string,
    onChange: (name: string, value: string | number) => void,
    value: string | number,
    isStopped: boolean,
    onToggleActiveState: (name: string, newActiveState: boolean) => any,

    // Optional props
    isPixelValue?: boolean,
    isColorPicker?: boolean,
    preventStopping?: boolean,
};

type State = {
    isColorPickerActive: boolean,
};

export class Control extends React.Component<Props, State> {
    constructor() {
        super();
        this.state = {
            isColorPickerActive: false,
        };
    }

    render() {
        return (
            <div className={styles.control}>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <div className={styles['input-container']}>
                    {this.props.isColorPicker ? <span>#</span> : undefined}
                    <input
                        style={{width: 80}}
                        onFocus={this.handleFocus}
                        name={this.props.name}
                        value={this.props.value}
                        onChange={this.handleInputChange}
                    />
                    {this.state.isColorPickerActive ? (
                        <div className={styles['color-picker-container']}>
                            <div
                                onClick={() =>
                                    this.setState({isColorPickerActive: false})
                                }
                                className={styles['color-picker-blurrer']}
                            />
                            <SketchPicker
                                color={this.props.value}
                                onChangeComplete={this.handleColorChange}
                            />
                        </div>
                    ) : (
                        undefined
                    )}
                    {this.props.isPixelValue ? <span>px</span> : undefined}
                </div>
                {this.props.preventStopping ? (
                    undefined
                ) : (
                    <button onClick={this.handleStop}>
                        {this.props.isStopped ? 'Resume' : 'Stop'}
                    </button>
                )}
            </div>
        );
    }

    handleColorChange = (color: {hex: string}) => {
        this.props.onChange(this.props.name, color.hex.slice(1, 7));
    };

    handleInputChange = (e: SyntheticInputEvent<*>) => {
        const value = this.props.isPixelValue
            ? Number(e.target.value)
            : e.target.value;
        this.props.onChange(this.props.name, value);
    };

    handleFocus = () => {
        this.props.onToggleActiveState(this.props.name, true);

        if (this.props.isColorPicker) {
            this.setState({isColorPickerActive: true});
        }
    };

    handleStop = () => {
        this.props.onToggleActiveState(this.props.name, !this.props.isStopped);
    };
}
