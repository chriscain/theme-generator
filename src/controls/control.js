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
};

export class Control extends React.Component<Props> {
    render() {
        return (
            <div className={styles.control}>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <div className={styles['input-container']}>
                    {this.props.prefix || null}
                    <input
                        name={this.props.name}
                        value={this.props.value}
                        onChange={this.handleChange}
                    />
                    {this.props.suffix || null}
                </div>
            </div>
        );
    }

    handleChange = (e: SyntheticInputEvent<*>) => {
        this.props.onChange(this.props.name, e.target.value);
    };
}
