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
    verticalMargin: number,
    headerFont: string,
    bodyFont: string,
    stoppedControls: string[],
    isLoading: boolean,
    fonts: Object[],
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
            verticalMargin: 32,
            headerFont: generateRandomFont(),
            bodyFont: generateRandomFont(),
            stoppedControls: [],
            isLoading: false,
            fonts: [],
        };
    }

    componentDidMount() {
        this.interval = setInterval(this.changeStuff, this.state.interval);

        // fetch(
        //     'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBjnzN-_nm1saTaG_pXEDx3TFlSAXESdt8'
        // )
        //     .then(function(response) {
        //         return response.json();
        //     })
        //     .then(
        //         (response: any) => {
        //             this.setState({
        //                 isLoading: false,
        //                 fonts: response.items,
        //             });
        //         },
        //         err => {
        //             console.log(err);
        //         }
        //     );
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
        if (this.state.isLoading) {
            return null;
        }

        return (
            <div className={styles.container}>
                <Content
                    fontSize={this.state.fontSize}
                    backgroundColor={this.state.backgroundColor}
                    lineHeight={this.state.lineHeight}
                    textColor={this.state.textColor}
                    horizontalMargin={this.state.horizontalMargin}
                    verticalMargin={this.state.verticalMargin}
                />
                <Controls
                    interval={this.state.interval}
                    fontSize={this.state.fontSize}
                    backgroundColor={this.state.backgroundColor}
                    lineHeight={this.state.lineHeight}
                    textColor={this.state.textColor}
                    horizontalMargin={this.state.horizontalMargin}
                    verticalMargin={this.state.verticalMargin}
                    headerFont={this.state.headerFont}
                    bodyFont={this.state.bodyFont}
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
            verticalMargin: this.state.stoppedControls.includes(
                'verticalMargin'
            )
                ? this.state.verticalMargin
                : 32,
            headerFont: this.state.stoppedControls.includes('headerFont')
                ? this.state.headerFont
                : generateRandomFont(),
            bodyFont: this.state.stoppedControls.includes('bodyFont')
                ? this.state.bodyFont
                : generateRandomFont(),
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

function generateRandomFont() {
    return generateRandomHex();
}

// function generate(fonts) {
//     console.lo;
//     this.headingFont = this.fontFilter(this.headingCategory);
//     this.bodyFont = this.fontFilter(this.bodyCategory);

//     const googleUrl = 'https://fonts.google.com/specimen/';
//     this.headingFontUrl =
//         googleUrl + this.headingFont.family.replace(/ /g, '+');
//     this.bodyFontUrl = googleUrl + this.bodyFont.family.replace(/ /g, '+');
//     if (combinedFont == null) {
//         const link = document.createElement('link');
//         link.id = 'combined-font';
//         link.href = `https://fonts.googleapis.com/css?family=${this.headingFont.family.replace(
//             / /g,
//             '+'
//         )}|${this.bodyFont.family.replace(/ /g, '+')}`;
//         link.rel = 'stylesheet';
//         document.head.appendChild(link);
//     } else {
//         combinedFont.href = `https://fonts.googleapis.com/css?family=${this.headingFont.family.replace(
//             / /g,
//             '+'
//         )}|${this.bodyFont.family.replace(/ /g, '+')}`;
//     }
// }

function generateRandomHex() {
    return Math.floor(Math.random() * 16777215).toString(16);
}

function generateRandomNumberInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default App;
