/* @flow */

import React from 'react';
import type {FontCategory} from '../App';

import styles from './font-controls.module.css';

type Props = {
    fontCategories: FontCategory[],
    fontHeaderCategory: FontCategory,
    fontBodyCategory: FontCategory,
    onChange: (name: string, categoryName: FontCategory) => void,
};

export class FontControls extends React.Component<Props> {
    render() {
        return (
            <div className={styles['font-controls']}>
                <label className={styles.label}>Headers</label>
                <select
                    onChange={this.handleHeaderChange}
                    value={this.props.fontHeaderCategory}
                >
                    {this.props.fontCategories.map((category: string) => {
                        return (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        );
                    })}
                </select>
                <label className={styles.label}>Body</label>
                <select
                    onChange={this.handleBodyChange}
                    value={this.props.fontBodyCategory}
                >
                    {this.props.fontCategories.map((category: string) => {
                        return (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        );
                    })}
                </select>
            </div>
        );
    }

    handleHeaderChange = (e: SyntheticInputEvent<*>) => {
        // $FlowIgnore
        this.props.onChange('fontHeaderCategory', e.target.value);
    };

    handleBodyChange = (e: SyntheticInputEvent<*>) => {
        // $FlowIgnore
        this.props.onChange('fontBodyCategory', e.target.value);
    };
}
