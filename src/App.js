/* @flow */

import React from 'react';
import styles from './App.module.css';
import {Content} from './content/content';
import {Controls} from './controls/controls';

export type FontCategory =
    | 'sans-serif'
    | 'serif'
    | 'monospace'
    | 'display'
    | 'handwriting';

export type Font = {
    category: FontCategory,
    family: string,
    files: {
        italic: string,
        regular: string,
    },
    kind: string,
    lastModified: string,
    subsets: string[],
    variants: string[],
    version: string,
};

type Props = {};
type State = {
    interval: number,
    fontSize: number,
    lineHeight: number,
    textColor: string,
    backgroundColor: string,
    horizontalMargin: number,
    verticalMargin: number,
    fontHeader: string,
    fontBody: string,
    stoppedControls: string[],
    isLoading: boolean,
    fonts: Object[],
    errorMessage: ?string,
    fontCategories: FontCategory[],
    fontHeaderCategory: FontCategory,
    fontHeader: ?Font,
    fontBodyCategory: FontCategory,
    fontBody: ?Font,
};

export class App extends React.Component<Props, State> {
    interval: Function;

    constructor() {
        super();

        const fontSize = generateRandomNumberInRange(11, 23);
        const lineHeight = generateRandomNumberInRange(0, 6) + fontSize;

        this.state = {
            interval: 2000,
            backgroundColor: generateRandomHex(),
            fontSize: fontSize,
            lineHeight: lineHeight,
            textColor: generateRandomHex(),
            horizontalMargin: generateRandomNumberInRange(32, 128),
            verticalMargin: 32,
            stoppedControls: [],
            isLoading: true,
            fonts: [],
            errorMessage: null,
            fontCategories: [],
            fontHeader: null,
            fontHeaderCategory: 'sans-serif',
            fontBody: null,
            fontBodyCategory: 'serif',
        };
    }

    componentDidMount() {
        this.interval = setInterval(this.changeStuff, this.state.interval);

        fetch(
            'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBjnzN-_nm1saTaG_pXEDx3TFlSAXESdt8'
        )
            .then(function(response) {
                return response.json();
            })
            .then(
                (response: {items: Font[]}) => {
                    const allFonts = response.items;
                    const fontCategories = allFonts.reduce(
                        (uniqueCategories: FontCategory[], item) => {
                            return uniqueCategories.includes(item.category)
                                ? uniqueCategories
                                : uniqueCategories.concat([item.category]);
                        },
                        []
                    );

                    this.setState({
                        isLoading: false,
                        fonts: response.items,
                        fontCategories: fontCategories,
                    });
                },
                err => {
                    this.setState({
                        errorMessage: err,
                    });
                }
            );
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

        if (this.state.errorMessage) {
            return <div>{this.state.errorMessage}</div>;
        }

        if (this.state.fontBody && this.state.fontHeader) {
            return (
                <div className={styles.container}>
                    <Content
                        fontSize={this.state.fontSize}
                        backgroundColor={this.state.backgroundColor}
                        lineHeight={this.state.lineHeight}
                        textColor={this.state.textColor}
                        horizontalMargin={this.state.horizontalMargin}
                        verticalMargin={this.state.verticalMargin}
                        fontHeader={this.state.fontHeader}
                        fontBody={this.state.fontBody}
                    />
                    <Controls
                        interval={this.state.interval}
                        fontSize={this.state.fontSize}
                        backgroundColor={this.state.backgroundColor}
                        lineHeight={this.state.lineHeight}
                        textColor={this.state.textColor}
                        horizontalMargin={this.state.horizontalMargin}
                        verticalMargin={this.state.verticalMargin}
                        fontCategories={this.state.fontCategories}
                        fontHeaderCategory={this.state.fontHeaderCategory}
                        fontBodyCategory={this.state.fontBodyCategory}
                        fontBody={this.state.fontBody}
                        fontHeader={this.state.fontHeader}
                        onChange={this.handleChange}
                        onToggleActiveState={this.handleToggleActiveState}
                        stoppedControls={this.state.stoppedControls}
                    />
                </div>
            );
        }

        return null;
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
            fontHeader: this.state.stoppedControls.includes('fontHeader')
                ? this.state.fontHeader
                : generateRandomFont(
                      this.state.fonts,
                      this.state.fontHeaderCategory
                  ),
            fontBody: this.state.stoppedControls.includes('fontBody')
                ? this.state.fontBody
                : generateRandomFont(
                      this.state.fonts,
                      this.state.fontBodyCategory
                  ),
        });
    };

    handleChange = (name: string, value: string | number) => {
        this.setState({[name]: value});
    };

    handleToggleActiveState = (name: string, isStopped: boolean) => {
        this.setState({
            stoppedControls: isStopped
                ? this.state.stoppedControls.concat([name])
                : this.state.stoppedControls.filter(item => item !== name),
        });
    };

    isControlStopped(name: string) {
        return this.state.stoppedControls.includes('name');
    }
}

function generateRandomFont(fonts: Font[], category: FontCategory) {
    const fontsInCategory = fonts.filter(font => {
        return font.category === category;
    });

    const randomIndex = Math.floor(
        Math.random() * (fontsInCategory.length - 1) + 1
    );

    return fontsInCategory[randomIndex];
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
