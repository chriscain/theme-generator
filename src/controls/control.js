/* @flow */

import React from 'react';
import styles from './control.module.css';

type Props = {
    name: string,
    label: string,
    onChange: (name: string, value: string) => void,
    value: string | number,
    prefix?: string,
    suffix?: string,
    isStopped: boolean,
    onToggleActiveState: (name: string, newActiveState: boolean) => any,
    preventStopping?: boolean,
};

export class Control extends React.Component<Props> {
    render() {
        return (
            <div className={styles.control}>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <div className={styles['input-container']}>
                    {this.props.prefix || null}
                    <input
                        onFocus={this.forceStop}
                        name={this.props.name}
                        value={this.props.value}
                        onChange={this.handleChange}
                    />
                    {this.props.suffix || null}
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

    handleChange = (e: SyntheticInputEvent<*>) => {
        this.props.onChange(this.props.name, e.target.value);
    };

    forceStop = () => {
        this.props.onToggleActiveState(this.props.name, true);
    };

    handleStop = () => {
        this.props.onToggleActiveState(this.props.name, !this.props.isStopped);
    };
}
