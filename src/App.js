/* @flow */

import React from 'react';
import styles from './App.module.css';
import {Content} from './content/content';
import {Controls} from './controls/controls';

type Props = {};
type State = {
    interval: number,
    fontSize: number,
    lineHeight: number,
    textColor: string,
    backgroundColor: string,
    horizontalMargin: number,
    stoppedControls: string[],
};

export class App extends React.Component<Props, State> {
    interval: Function;

    constructor() {
        super();

        const fontSize = generateRandomNumberInRange(11, 23);
        const lineHeight = generateRandomNumberInRange(0, 6) + fontSize;

        this.state = {
            interval: 1000,
            backgroundColor: generateRandomHex(),
            fontSize: fontSize,
            lineHeight: lineHeight,
            textColor: generateRandomHex(),
            horizontalMargin: generateRandomNumberInRange(32, 128),
            stoppedControls: [],
        };
    }

    componentDidMount() {
        this.interval = setInterval(this.changeStuff, this.state.interval);
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (prevState.interval !== this.state.interval) {
            clearInterval(this.interval);
            this.interval = setInterval(this.changeStuff, this.state.interval);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className={styles.container}>
                <Content
                    fontSize={this.state.fontSize}
                    backgroundColor={this.state.backgroundColor}
                    lineHeight={this.state.lineHeight}
                    textColor={this.state.textColor}
                    horizontalMargin={this.state.horizontalMargin}
                />
                <Controls
                    interval={this.state.interval}
                    fontSize={this.state.fontSize}
                    backgroundColor={this.state.backgroundColor}
                    lineHeight={this.state.lineHeight}
                    textColor={this.state.textColor}
                    horizontalMargin={this.state.horizontalMargin}
                    onChange={this.handleChange}
                    onToggleActiveState={this.handleToggleActiveState}
                    stoppedControls={this.state.stoppedControls}
                />
            </div>
        );
    }

    changeStuff = () => {
        const fontSize = this.state.stoppedControls.includes('fontSize')
            ? this.state.fontSize
            : generateRandomNumberInRange(11, 23);
        const generatedLineHeight = this.state.stoppedControls.includes(
            'lineHeight'
        )
            ? this.state.lineHeight
            : generateRandomNumberInRange(0, 6);
        const realLineHeight = this.state.stoppedControls.includes('lineHeight')
            ? this.state.lineHeight
            : generatedLineHeight + fontSize;

        this.setState({
            backgroundColor: this.state.stoppedControls.includes(
                'backgroundColor'
            )
                ? this.state.backgroundColor
                : generateRandomHex(),
            fontSize: fontSize,
            lineHeight: realLineHeight,
            textColor: this.state.stoppedControls.includes('textColor')
                ? this.state.textColor
                : generateRandomHex(),
            horizontalMargin: this.state.stoppedControls.includes(
                'horizontalMargin'
            )
                ? this.state.horizontalMargin
                : generateRandomNumberInRange(32, 128),
        });
    };

    handleChange = (name: string, value: any) => {
        this.setState({[name]: value});
    };

    handleToggleActiveState = (name: string, isStopped: boolean) => {
        this.setState({
            stoppedControls: isStopped
                ? this.state.stoppedControls.concat(name)
                : this.state.stoppedControls.filter(item => !item),
        });
    };

    isControlStopped(name: string) {
        return this.state.stoppedControls.includes('name');
    }
}

function generateRandomHex() {
    return Math.floor(Math.random() * 16777215).toString(16);
}

function generateRandomNumberInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default App;
