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
                />
            </div>
        );
    }

    changeStuff = () => {
        const fontSize = generateRandomNumberInRange(11, 23);
        const lineHeight = generateRandomNumberInRange(0, 6) + fontSize;

        this.setState({
            backgroundColor: generateRandomHex(),
            fontSize: fontSize,
            lineHeight: lineHeight,
            textColor: generateRandomHex(),
            horizontalMargin: generateRandomNumberInRange(32, 128),
        });
    };

    handleChange = (name: string, value: any) => {
        this.setState({[name]: value});
    };
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
